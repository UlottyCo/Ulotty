"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAnalyticsData(period?: "day" | "week" | "month") {
  const supabase = await createClient();

  const dateOffset = period === "day" ? 1 : period === "week" ? 7 : 30;
  const startDate = new Date(Date.now() - dateOffset * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const { data: trafficData } = await supabase
    .from("audit_logs")
    .select("*")
    .gte("created_at", startDate);

  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .gte("created_at", startDate);

  const { data: operations } = await supabase
    .from("operations")
    .select("*")
    .gte("created_at", startDate);

  return {
    traffic: trafficData?.length || 0,
    newProperties: properties?.length || 0,
    newOperations: operations?.length || 0,
    period,
  };
}

export async function getDeviceBreakdown() {
  const supabase = await createClient();

  const { data: sessions } = await supabase
    .from("sessions")
    .select("device")
    .eq("active", true);

  const deviceBreakdown: Record<string, number> = {};
  sessions?.forEach((session) => {
    const device = session.device || "Unknown";
    deviceBreakdown[device] = (deviceBreakdown[device] || 0) + 1;
  });

  return deviceBreakdown;
}

export async function getTopPages() {
  const supabase = await createClient();

  const { data: logs } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1000);

  const pageVisits: Record<string, number> = {};
  logs?.forEach((log) => {
    const page = log.entity_type || "Unknown";
    pageVisits[page] = (pageVisits[page] || 0) + 1;
  });

  return Object.entries(pageVisits)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([page, visits]) => ({ page, visits }));
}

export async function getTrafficSources() {
  const supabase = await createClient();

  const { data: sessions } = await supabase
    .from("sessions")
    .select("location")
    .eq("active", true);

  const locations: Record<string, number> = {};
  sessions?.forEach((session) => {
    const location = session.location || "Unknown";
    locations[location] = (locations[location] || 0) + 1;
  });

  return Object.entries(locations)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([location, count]) => ({ location, count }));
}

export async function getAnalyticsStats() {
  const supabase = await createClient();

  const { data: activeSessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("active", true);

  const { data: todayLogs } = await supabase
    .from("audit_logs")
    .select("*")
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  const { data: todayOperations } = await supabase
    .from("operations")
    .select("*")
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  return {
    activeSessions: activeSessions?.length || 0,
    pageViews: todayLogs?.length || 0,
    transactions: todayOperations?.length || 0,
    avgSessionDuration: 0, // Calculate based on real data
  };
}
