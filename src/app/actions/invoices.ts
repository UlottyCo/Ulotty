"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getInvoices(filters?: {
  status?: string;
  userId?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("invoices")
    .select("*, user:profiles!user_id(full_name, email)")
    .order("created_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  if (filters?.userId) {
    query = query.eq("user_id", filters.userId);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function createInvoice(invoice: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("invoices")
    .insert(invoice)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/facturacion");

  return data;
}

export async function updateInvoice(id: string, updates: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("invoices")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/facturacion");

  return data;
}

export async function markInvoiceAsPaid(id: string, paymentDate: string, paymentMethod: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("invoices")
    .update({
      status: "pagada",
      payment_date: paymentDate,
      payment_method: paymentMethod,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/facturacion");

  return data;
}

export async function getInvoiceStats() {
  const supabase = await createClient();

  const { data: allInvoices } = await supabase
    .from("invoices")
    .select("amount");

  const { data: paidInvoices } = await supabase
    .from("invoices")
    .select("amount")
    .eq("status", "pagada");

  const { data: pendingInvoices } = await supabase
    .from("invoices")
    .select("amount")
    .eq("status", "pendiente");

  const totalAmount = allInvoices?.reduce((sum, i) => sum + (i.amount || 0), 0) || 0;
  const paidAmount = paidInvoices?.reduce((sum, i) => sum + (i.amount || 0), 0) || 0;
  const pendingAmount = pendingInvoices?.reduce((sum, i) => sum + (i.amount || 0), 0) || 0;

  return {
    total: allInvoices?.length || 0,
    paid: paidInvoices?.length || 0,
    pending: pendingInvoices?.length || 0,
    totalAmount,
    paidAmount,
    pendingAmount,
  };
}
