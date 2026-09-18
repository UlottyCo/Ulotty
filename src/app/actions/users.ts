"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getUsers(filters?: {
  role?: string;
  verified?: boolean;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.role) {
    query = query.eq("role", filters.role);
  }
  if (filters?.verified !== undefined) {
    query = query.eq("verified", filters.verified);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
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

  return data;
}

export async function suspendUser(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .update({ active: false })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/usuarios");

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
