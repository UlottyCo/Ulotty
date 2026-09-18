"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getReports(filters?: {
  reportType?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("reports")
    .select("*, generated_by:profiles!generated_by(full_name)")
    .order("generated_at", { ascending: false });

  if (filters?.reportType) {
    query = query.eq("report_type", filters.reportType);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function generateSalesReport(startDate: string, endDate: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No authenticated user");

  const { data: operations } = await supabase
    .from("operations")
    .select("*")
    .gte("created_at", startDate)
    .lte("created_at", endDate);

  const totalSales = operations?.reduce((sum, op) => sum + (op.amount || 0), 0) || 0;
  const totalOperations = operations?.length || 0;

  const { data, error } = await supabase
    .from("reports")
    .insert({
      report_type: "ventas",
      title: `Reporte de Ventas ${startDate} a ${endDate}`,
      data: {
        totalSales,
        totalOperations,
        avgSale: totalSales / (totalOperations || 1),
      },
      generated_by: user.id,
      period_start: startDate,
      period_end: endDate,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/reportes");

  return data;
}

export async function generateUserReport(startDate: string, endDate: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No authenticated user");

  const { data: newUsers } = await supabase
    .from("profiles")
    .select("*")
    .gte("created_at", startDate)
    .lte("created_at", endDate);

  const { data, error } = await supabase
    .from("reports")
    .insert({
      report_type: "usuarios",
      title: `Reporte de Usuarios ${startDate} a ${endDate}`,
      data: {
        newUsers: newUsers?.length || 0,
      },
      generated_by: user.id,
      period_start: startDate,
      period_end: endDate,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/reportes");

  return data;
}

export async function generatePropertyReport(startDate: string, endDate: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No authenticated user");

  const { data: newProperties } = await supabase
    .from("properties")
    .select("*")
    .gte("created_at", startDate)
    .lte("created_at", endDate);

  const { data: approvedProperties } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "aprobada")
    .gte("created_at", startDate)
    .lte("created_at", endDate);

  const { data, error } = await supabase
    .from("reports")
    .insert({
      report_type: "propiedades",
      title: `Reporte de Propiedades ${startDate} a ${endDate}`,
      data: {
        newProperties: newProperties?.length || 0,
        approvedProperties: approvedProperties?.length || 0,
      },
      generated_by: user.id,
      period_start: startDate,
      period_end: endDate,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/reportes");

  return data;
}

export async function deleteReport(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("reports").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/reportes");
}
