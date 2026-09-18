"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getBackups() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("backups")
    .select("*")
    .order("backup_date", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function createBackup(backup: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("backups")
    .insert(backup)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/backups");

  return data;
}

export async function restoreBackup(id: string) {
  const supabase = await createClient();

  // In a real scenario, this would trigger an actual backup restoration
  const { data, error } = await supabase
    .from("backups")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  // Log restoration attempt
  await supabase.from("audit_logs").insert({
    action: "restore_backup",
    entity_type: "backup",
    entity_id: id,
  });

  revalidatePath("/panel-admin/backups");

  return data;
}

export async function deleteBackup(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("backups").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/panel-admin/backups");
}

export async function getBackupStats() {
  const supabase = await createClient();

  const { data: allBackups } = await supabase.from("backups").select("*");

  const { data: completedBackups } = await supabase
    .from("backups")
    .select("*")
    .eq("status", "completado");

  const totalSize = allBackups?.reduce((sum, b) => sum + (b.size_gb || 0), 0) || 0;
  const lastBackup = allBackups?.[0];

  return {
    total: allBackups?.length || 0,
    completed: completedBackups?.length || 0,
    totalSizeGB: totalSize.toFixed(1),
    lastBackupDate: lastBackup?.backup_date,
  };
}
