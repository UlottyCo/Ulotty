"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCommissions(filters?: {
  status?: string;
  agentId?: string;
  page?: number;
  limit?: number;
}) {
  const supabase = await createClient();
  const page = filters?.page || 1;
  const limit = filters?.limit || 25;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("commissions")
    .select("*, agent:profiles!agent_id(full_name, email), operation:operations(id, amount)", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  if (filters?.agentId) {
    query = query.eq("agent_id", filters.agentId);
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

export async function getCommissionById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("commissions")
    .select("*, agent:profiles!agent_id(full_name, email), operation:operations(id, amount)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createCommission(commission: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("commissions")
    .insert(commission)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/comisiones");

  return data;
}

export async function updateCommission(id: string, updates: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("commissions")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/comisiones");

  return data;
}

export async function payCommission(id: string, paymentDate: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("commissions")
    .update({
      status: "pagada",
      payment_date: paymentDate
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/comisiones");

  return data;
}

export async function getCommissionStats() {
  const supabase = await createClient();

  const { data: allCommissions } = await supabase
    .from("commissions")
    .select("amount");

  const { data: paidCommissions } = await supabase
    .from("commissions")
    .select("amount")
    .eq("status", "pagada");

  const { data: pendingCommissions } = await supabase
    .from("commissions")
    .select("amount")
    .eq("status", "pendiente");

  const totalAmount = allCommissions?.reduce((sum, c) => sum + (c.amount || 0), 0) || 0;
  const paidAmount = paidCommissions?.reduce((sum, c) => sum + (c.amount || 0), 0) || 0;
  const pendingAmount = pendingCommissions?.reduce((sum, c) => sum + (c.amount || 0), 0) || 0;

  return {
    total: allCommissions?.length || 0,
    paid: paidCommissions?.length || 0,
    pending: pendingCommissions?.length || 0,
    totalAmount,
    paidAmount,
    pendingAmount,
  };
}
