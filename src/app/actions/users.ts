"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getUsers(filters?: {
  role?: string;
  verified?: boolean;
  page?: number;
  limit?: number;
}) {
  const supabase = await createClient();
  const page = filters?.page || 1;
  const limit = filters?.limit || 25;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filters?.role) {
    query = query.eq("role", filters.role);
  }
  if (filters?.verified !== undefined) {
    query = query.eq("verified", filters.verified);
  }

  const { data, error, count } = await query.range(offset, offset + limit - 1);

  if (error) throw new Error(error.message);
  return {
    data: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export async function getUserById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateUser(id: string, updates: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/usuarios");
  revalidatePath(`/panel-admin/usuarios/${id}`);

  return data;
}

export async function verifyUser(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .update({ verified: true })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/usuarios");
  revalidatePath(`/panel-admin/usuarios/${id}`);

  return data;
}

export async function suspendUser(id: string) {
  const supabase = await createClient();

  // Get current user state
  const { data: currentUser, error: fetchError } = await supabase
    .from("profiles")
    .select("active")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  // Toggle active status
  const newStatus = !(currentUser?.active ?? true);

  const { data, error } = await supabase
    .from("profiles")
    .update({ active: newStatus })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/usuarios");
  revalidatePath(`/panel-admin/usuarios/${id}`);

  return data;
}

export async function getUserStats() {
  const supabase = await createClient();

  const { data: allUsers } = await supabase.from("profiles").select("*");
  const { data: verifiedUsers } = await supabase
    .from("profiles")
    .select("*")
    .eq("verified", true);
  const { data: agentUsers } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "agente");

  return {
    total: allUsers?.length || 0,
    verified: verifiedUsers?.length || 0,
    agents: agentUsers?.length || 0,
    unverified: (allUsers?.length || 0) - (verifiedUsers?.length || 0),
  };
}

export async function getUserActivity(userId: string) {
  const supabase = await createClient();

  const { data: userOperations } = await supabase
    .from("operations")
    .select("*")
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId},agent_id.eq.${userId}`);

  const { data: userProperties } = await supabase
    .from("properties")
    .select("*")
    .eq("owner_id", userId);

  return {
    operations: userOperations?.length || 0,
    properties: userProperties?.length || 0,
  };
}
