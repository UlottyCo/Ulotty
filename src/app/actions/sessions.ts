"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getSessions(filters?: {
  userId?: string;
  active?: boolean;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("sessions")
    .select("*, user:profiles!user_id(full_name, email)")
    .order("created_at", { ascending: false });

  if (filters?.userId) {
    query = query.eq("user_id", filters.userId);
  }
  if (filters?.active !== undefined) {
    query = query.eq("active", filters.active);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function closeSession(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("sessions")
    .update({ active: false })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/sesiones");

  return data;
}

export async function closeAllUserSessions(userId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("sessions")
    .update({ active: false })
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/sesiones");
}

export async function getSessionStats() {
  const supabase = await createClient();

  const { data: activeSessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("active", true);

  const { data: uniqueUsers } = await supabase
    .from("sessions")
    .select("user_id")
    .eq("active", true);

  const { data: uniqueDevices } = await supabase
    .from("sessions")
    .select("device")
    .eq("active", true);

  const uniqueDeviceSet = new Set(uniqueDevices?.map(s => s.device) || []);
  const uniqueUserSet = new Set(uniqueUsers?.map(s => s.user_id) || []);

  return {
    activeSessions: activeSessions?.length || 0,
    activeUsers: uniqueUserSet.size,
    uniqueDevices: uniqueDeviceSet.size,
  };
}
