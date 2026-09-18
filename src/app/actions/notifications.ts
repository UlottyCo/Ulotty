"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getNotifications(userId?: string, unreadOnly = false) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const targetUserId = userId || user?.id;
  if (!targetUserId) throw new Error("No user ID provided");

  let query = supabase
    .from("notifications")
    .select("*")
    .eq("user_id", targetUserId)
    .order("created_at", { ascending: false });

  if (unreadOnly) {
    query = query.eq("read", false);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function markNotificationAsRead(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/notificaciones");

  return data;
}

export async function createNotification(notification: {
  user_id: string;
  title: string;
  message?: string;
  type: string;
  priority?: string;
  link?: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notifications")
    .insert(notification)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteNotification(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("notifications").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/notificaciones");
}

export async function getNotificationStats() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No authenticated user");

  const { data: allNotifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id);

  const { data: unreadNotifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .eq("read", false);

  const { data: highPriorityNotifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .eq("priority", "alta");

  return {
    total: allNotifications?.length || 0,
    unread: unreadNotifications?.length || 0,
    highPriority: highPriorityNotifications?.length || 0,
  };
}
