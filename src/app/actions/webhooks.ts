"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getWebhooks(filters?: {
  active?: boolean;
  eventType?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("webhooks")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.active !== undefined) {
    query = query.eq("active", filters.active);
  }
  if (filters?.eventType) {
    query = query.eq("event_type", filters.eventType);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function createWebhook(webhook: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("webhooks")
    .insert(webhook)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/webhooks");

  return data;
}

export async function updateWebhook(id: string, updates: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("webhooks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/webhooks");

  return data;
}

export async function deleteWebhook(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("webhooks").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/webhooks");
}

export async function toggleWebhook(id: string, active: boolean) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("webhooks")
    .update({ active })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/webhooks");

  return data;
}

export async function getWebhookStats() {
  const supabase = await createClient();

  const { data: allWebhooks } = await supabase
    .from("webhooks")
    .select("*");

  const { data: activeWebhooks } = await supabase
    .from("webhooks")
    .select("*")
    .eq("active", true);

  const avgSuccessRate =
    allWebhooks?.reduce((sum, w) => sum + (w.success_rate || 0), 0) / (allWebhooks?.length || 1) || 0;

  return {
    total: allWebhooks?.length || 0,
    active: activeWebhooks?.length || 0,
    totalDeliveries: allWebhooks?.reduce((sum, w) => sum + (w.delivery_count || 0), 0) || 0,
    avgSuccessRate: Math.round(avgSuccessRate),
  };
}
