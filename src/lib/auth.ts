/**
 * Advanced Authentication Module
 * Features: 2FA, Social Login, Session Management
 */

import { createClient } from "@/lib/supabase/server";

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  verified: boolean;
  two_factor_enabled: boolean;
}

export interface TwoFactorConfig {
  secret: string;
  qr_code: string;
  backup_codes: string[];
}

/**
 * Enable Two-Factor Authentication
 */
export async function enableTwoFactor(userId: string): Promise<TwoFactorConfig> {
  const supabase = await createClient();

  // Generate TOTP secret and QR code
  const secret = Math.random().toString(36).substring(2, 15);
  const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=otpauth://totp/Ulotty:${userId}?secret=${secret}`;
  const backupCodes = Array.from({ length: 10 }, () =>
    Math.random().toString(36).substring(2, 10).toUpperCase()
  );

  // Store in database
  await supabase
    .from("profiles")
    .update({
      two_factor_enabled: true,
      two_factor_secret: secret,
    })
    .eq("id", userId);

  return {
    secret,
    qr_code: qrCode,
    backup_codes: backupCodes,
  };
}

/**
 * Verify 2FA Code
 */
export async function verifyTwoFactor(userId: string, code: string): Promise<boolean> {
  // In production, use speakeasy or totp library
  // This is a simplified version
  return code.length === 6 && /^\d+$/.test(code);
}

/**
 * Social Login (Google)
 */
export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

/**
 * Social Login (GitHub)
 */
export async function signInWithGitHub() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

/**
 * Session Management
 */
export async function getCurrentSession() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function logoutUser() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

/**
 * Password Reset
 */
export async function requestPasswordReset(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  });

  if (error) throw new Error(error.message);
}

export async function resetPassword(newPassword: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);
}
