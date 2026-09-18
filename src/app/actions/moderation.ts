"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getModerationReports(filters?: {
  status?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("moderation_reports")
    .select("*, reported_by:profiles!reported_by(full_name, email), reported_user:profiles!reported_user_id(full_name, email)")
    .order("created_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function createModerationReport(report: any) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No authenticated user");

  const { data, error } = await supabase
    .from("moderation_reports")
    .insert({
      ...report,
      reported_by: user.id,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/moderacion");

  return data;
}

export async function updateModerationReport(id: string, updates: any) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("moderation_reports")
    .update({
      ...updates,
      resolved_by: user?.id,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/moderacion");

  return data;
}

export async function getModerationStats() {
  const supabase = await createClient();

  const { data: allReports } = await supabase
    .from("moderation_reports")
    .select("*");

  const { data: openReports } = await supabase
    .from("moderation_reports")
    .select("*")
    .eq("status", "abierto");

  const { data: resolvedReports } = await supabase
    .from("moderation_reports")
    .select("*")
    .eq("status", "resuelto");

  return {
    total: allReports?.length || 0,
    open: openReports?.length || 0,
    resolved: resolvedReports?.length || 0,
    pending: (allReports?.length || 0) - (resolvedReports?.length || 0),
  };
}
