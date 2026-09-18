"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProperties(filters?: {
  status?: string;
  type?: string;
  operation?: string;
  city?: string;
  page?: number;
  limit?: number;
}) {
  const supabase = await createClient();
  const page = filters?.page || 1;
  const limit = filters?.limit || 25;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("properties")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  if (filters?.type) {
    query = query.eq("type", filters.type);
  }
  if (filters?.operation) {
    query = query.eq("operation", filters.operation);
  }
  if (filters?.city) {
    query = query.eq("city", filters.city);
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

export async function getPropertyById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createProperty(property: any) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No authenticated user");

  const { data, error } = await supabase
    .from("properties")
    .insert({
      ...property,
      owner_id: user.id,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/propiedades");
  revalidatePath("/propiedades");

  return data;
}

export async function updateProperty(id: string, updates: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/propiedades");
  revalidatePath(`/propiedades/${id}`);

  return data;
}

export async function deleteProperty(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("properties").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/propiedades");
  revalidatePath("/propiedades");
}

export async function getPropertyStats() {
  const supabase = await createClient();

  const { data: allProperties } = await supabase.from("properties").select("*");
  const { data: publishedProperties } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "aprobada");
  const { data: pendingProperties } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "pendiente");

  return {
    total: allProperties?.length || 0,
    published: publishedProperties?.length || 0,
    pending: pendingProperties?.length || 0,
    rejected: (allProperties?.length || 0) - (publishedProperties?.length || 0) - (pendingProperties?.length || 0),
  };
}
