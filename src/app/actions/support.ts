"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getSupportTickets(filters?: {
  status?: string;
  priority?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("support_tickets")
    .select("*, user:profiles!user_id(full_name, email), assigned_to_user:profiles!assigned_to(full_name)")
    .order("created_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  if (filters?.priority) {
    query = query.eq("priority", filters.priority);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function createSupportTicket(ticket: any) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No authenticated user");

  const { data, error } = await supabase
    .from("support_tickets")
    .insert({
      ...ticket,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/soporte");

  return data;
}

export async function updateSupportTicket(id: string, updates: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("support_tickets")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/soporte");

  return data;
}

export async function assignSupportTicket(id: string, assignedToId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("support_tickets")
    .update({ assigned_to: assignedToId })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/soporte");

  return data;
}

export async function closeSupportTicket(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("support_tickets")
    .update({ status: "cerrado" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/soporte");

  return data;
}

export async function getSupportTicketStats() {
  const supabase = await createClient();

  const { data: allTickets } = await supabase
    .from("support_tickets")
    .select("*");

  const { data: openTickets } = await supabase
    .from("support_tickets")
    .select("*")
    .neq("status", "cerrado");

  const { data: highPriorityTickets } = await supabase
    .from("support_tickets")
    .select("*")
    .eq("priority", "alta");

  return {
    total: allTickets?.length || 0,
    open: openTickets?.length || 0,
    highPriority: highPriorityTickets?.length || 0,
    closed: (allTickets?.length || 0) - (openTickets?.length || 0),
  };
}
