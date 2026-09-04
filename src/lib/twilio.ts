// Twilio Verify: nosotros nunca generamos ni guardamos el código — se
// lo pedimos a Twilio ("Verifications") y le preguntamos si el que
// escribió el usuario es válido ("VerificationCheck"). Cero lógica de
// OTP de nuestro lado.

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

function authHeader() {
  const token = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString(
    "base64",
  );
  return `Basic ${token}`;
}

// Este proyecto solo maneja números mexicanos por ahora (sin selector
// de país en el formulario) — asumimos 10 dígitos locales y anteponemos
// +52. Si el negocio empieza a aceptar compradores de otros países,
// esto necesita un campo de país explícito.
export function toE164Mexico(digits: string): string {
  if (digits.startsWith("+")) return digits;
  if (digits.length === 10) return `+52${digits}`;
  return `+${digits}`;
}

export async function startPhoneVerification(
  phoneE164: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SERVICE_SID) {
    console.error("Faltan variables de entorno de Twilio.");
    return { ok: false, error: "Verificación de teléfono no configurada." };
  }

  const res = await fetch(
    `https://verify.twilio.com/v2/Services/${TWILIO_VERIFY_SERVICE_SID}/Verifications`,
    {
      method: "POST",
      headers: {
        Authorization: authHeader(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: phoneE164, Channel: "sms" }),
    },
  );

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    console.error("Error al iniciar verificación de teléfono (Twilio):", {
      status: res.status,
      body,
    });
    return {
      ok: false,
      error: body?.message ?? "No se pudo enviar el código.",
    };
  }

  return { ok: true };
}

export async function checkPhoneVerification(
  phoneE164: string,
  code: string,
): Promise<{ ok: true; approved: boolean } | { ok: false; error: string }> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SERVICE_SID) {
    console.error("Faltan variables de entorno de Twilio.");
    return { ok: false, error: "Verificación de teléfono no configurada." };
  }

  const res = await fetch(
    `https://verify.twilio.com/v2/Services/${TWILIO_VERIFY_SERVICE_SID}/VerificationCheck`,
    {
      method: "POST",
      headers: {
        Authorization: authHeader(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: phoneE164, Code: code }),
    },
  );

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("Error al validar código de teléfono (Twilio):", {
      status: res.status,
      body,
    });
    return {
      ok: false,
      error: body?.message ?? "No se pudo validar el código.",
    };
  }

  return { ok: true, approved: body?.status === "approved" };
}
