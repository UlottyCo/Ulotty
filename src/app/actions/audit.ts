"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createAuditLog(log: {
  action: string;
  entity_type?: string;
  entity_id?: string;
  changes?: any;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No authenticated user");

  const headersList = await headers();
  const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip");
  const userAgent = headersList.get("user-agent");

  const { data, error } = await supabase
    .from("audit_logs")
    .insert({
      ...log,
      user_id: user.id,
      ip_address: ipAddress,
      user_agent: userAgent,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getAuditLogs(filters?: {
  action?: string;
  entityType?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("audit_logs")
    .select("*, user:profiles(full_name, email)")
    .order("created_at", { ascending: false });

  if (filters?.action) {
    query = query.eq("action", filters.action);
  }
  if (filters?.entityType) {
    query = query.eq("entity_type", filters.entityType);
  }
  if (filters?.userId) {
    query = query.eq("user_id", filters.userId);
  }
  if (filters?.startDate) {
    query = query.gte("created_at", filters.startDate);
  }
  if (filters?.endDate) {
    query = query.lte("created_at", filters.endDate);
  }

  const { data, error } = await query.limit(1000);

  if (error) throw new Error(error.message);
  return data;
}

export async function getAuditLogStats() {
  const supabase = await createClient();

  const { data: todayLogs } = await supabase
    .from("audit_logs")
    .select("*")
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  const { data: allLogs } = await supabase
    .from("audit_logs")
    .select("action");

  const actions = allLogs?.reduce((acc: any, log: any) => {
    acc[log.action] = (acc[log.action] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return {
    totalToday: todayLogs?.length || 0,
    totalAll: allLogs?.length || 0,
    actionBreakdown: actions,
  };
}
