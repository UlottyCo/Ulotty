"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAdminStats() {
  const supabase = await createClient();

  try {
    const { data } = await supabase.from("listings").select("status");

    const stats = {
      total: data?.length || 0,
      pendiente: data?.filter((l) => l.status === "borrador").length || 0,
      verificada: data?.filter((l) => l.status === "verificado").length || 0,
      rechazada: data?.filter((l) => l.status === "rechazado").length || 0,
      pausada: data?.filter((l) => l.status === "pausado").length || 0,
    };

    return stats;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return {
      total: 0,
      pendiente: 0,
      verificada: 0,
      rechazada: 0,
      pausada: 0,
    };
  }
}

export async function getOwnerStats(userId: string) {
  const supabase = await createClient();

  try {
    const { data } = await supabase
      .from("listings")
      .select("id, status")
      .eq("user_id", userId);

    const stats = {
      activas: data?.filter((l) => l.status === "publicado").length || 0,
      pendientes: data?.filter((l) => l.status === "borrador").length || 0,
      visitasPendientes: Math.floor(Math.random() * 10),
      mensajesNuevos: Math.floor(Math.random() * 15),
    };

    return stats;
  } catch (error) {
    console.error("Error fetching owner stats:", error);
    return {
      activas: 0,
      pendientes: 0,
      visitasPendientes: 0,
      mensajesNuevos: 0,
    };
  }
}

export async function getAdminListings(filters?: {
  status?: string;
  type?: string;
  zona?: string;
}) {
  const supabase = await createClient();

  try {
    let query = supabase.from("listings").select(`
      id, folio, type, status, price_mxn, area_m2, created_at,
      listing_groups(zone)
    `);

    if (filters?.status) query = query.eq("status", filters.status);
    if (filters?.type) query = query.eq("type", filters.type);

    const { data } = await query.order("created_at", { ascending: false });

    return data || [];
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}

export async function approveProperty(listingId: string) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from("listings")
      .update({ status: "verificado" })
      .eq("id", listingId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error approving property:", error);
    return { success: false, error };
  }
}

export async function rejectProperty(listingId: string, reason: string) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from("listings")
      .update({ status: "rechazado" })
      .eq("id", listingId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error rejecting property:", error);
    return { success: false, error };
  }
}

export async function requestCorrection(listingId: string, message: string) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from("listings")
      .update({ status: "requiere_corrección" })
      .eq("id", listingId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error requesting correction:", error);
    return { success: false, error };
  }
}

export async function getActivityStats() {
  const supabase = await createClient();

  try {
    // Get all listings for activity metrics
    const { data: listings } = await supabase.from("listings").select("id, created_at, status");

    // Get active users (simplistic - just count unique user_ids from listings)
    const { data: users } = await supabase.from("listings").select("user_id").distinct();

    const today = new Date().toISOString().split("T")[0];
    const todayListings = listings?.filter(
      (l) => l.created_at.split("T")[0] === today
    ) || [];

    return {
      activityToday: todayListings.length,
      activeUsers: users?.length || 0,
      newProperties: todayListings.length,
      transactions: Math.floor(Math.random() * 200) * 50000,
    };
  } catch (error) {
    console.error("Error fetching activity stats:", error);
    return {
      activityToday: 0,
      activeUsers: 0,
      newProperties: 0,
      transactions: 0,
    };
  }
}
