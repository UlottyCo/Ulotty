"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getOperations(filters?: {
  status?: string;
  type?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("operations")
    .select("*, property:properties(title), buyer:profiles!buyer_id(full_name), seller:profiles!seller_id(full_name), agent:profiles!agent_id(full_name)")
    .order("created_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  if (filters?.type) {
    query = query.eq("transaction_type", filters.type);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function getOperationById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("operations")
    .select("*, property:properties(title), buyer:profiles!buyer_id(full_name), seller:profiles!seller_id(full_name), agent:profiles!agent_id(full_name)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createOperation(operation: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("operations")
    .insert(operation)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/operaciones");

  return data;
}

export async function updateOperation(id: string, updates: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("operations")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/operaciones");

  return data;
}

export async function deleteOperation(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("operations").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/operaciones");
}

export async function getOperationStats() {
  const supabase = await createClient();

  const { data: allOperations } = await supabase.from("operations").select("amount");
  const { data: completedOperations } = await supabase
    .from("operations")
    .select("amount")
    .eq("status", "completada");

  const totalAmount = allOperations?.reduce((sum, op) => sum + (op.amount || 0), 0) || 0;
  const completedAmount = completedOperations?.reduce((sum, op) => sum + (op.amount || 0), 0) || 0;

  return {
    total: allOperations?.length || 0,
    completed: completedOperations?.length || 0,
    totalAmount,
    completedAmount,
  };
}
