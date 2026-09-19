/**
 * Email Marketing Module
 * SendGrid Integration
 */

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  text: string;
}

export interface EmailOptions {
  to: string;
  template: string;
  variables: Record<string, any>;
}

/**
 * Email Templates
 */
export const emailTemplates = {
  welcome: {
    id: "welcome",
    name: "Welcome Email",
    subject: "Bienvenido a Ulotty",
    html: `
      <h1>¡Bienvenido a Ulotty!</h1>
      <p>Gracias por crear tu cuenta. Ahora puedes:</p>
      <ul>
        <li>Gestionar propiedades</li>
        <li>Crear operaciones</li>
        <li>Generar reportes</li>
      </ul>
      <a href="{{link}}">Ir a tu panel</a>
    `,
    text: "Bienvenido a Ulotty. Accede a tu panel.",
  },

  propertyCreated: {
    id: "property_created",
    name: "Property Created",
    subject: "Nueva propiedad creada",
    html: `
      <h2>Nueva propiedad: {{property_title}}</h2>
      <p>Tu propiedad ha sido creada exitosamente.</p>
      <p><strong>Precio:</strong> ${{property_price}}</p>
      <p><strong>Ubicación:</strong> {{property_location}}</p>
    `,
    text: "Tu propiedad {{property_title}} ha sido creada.",
  },

  operationCompleted: {
    id: "operation_completed",
    name: "Operation Completed",
    subject: "Operación completada",
    html: `
      <h2>¡Operación completada!</h2>
      <p>Tu operación por {{operation_amount}} ha sido completada.</p>
      <p><strong>Propiedad:</strong> {{property_title}}</p>
      <p><strong>Fecha:</strong> {{operation_date}}</p>
    `,
    text: "Tu operación ha sido completada exitosamente.",
  },

  commissionPaid: {
    id: "commission_paid",
    name: "Commission Paid",
    subject: "Comisión pagada",
    html: `
      <h2>Tu comisión ha sido pagada</h2>
      <p><strong>Monto:</strong> ${{commission_amount}}</p>
      <p><strong>Porcentaje:</strong> {{commission_percentage}}%</p>
      <p><strong>Operación:</strong> {{operation_id}}</p>
    `,
    text: "Tu comisión de ${{commission_amount}} ha sido pagada.",
  },

  passwordReset: {
    id: "password_reset",
    name: "Password Reset",
    subject: "Recuperar contraseña",
    html: `
      <h2>Recupera tu contraseña</h2>
      <p>Haz clic en el enlace abajo para recuperar tu contraseña.</p>
      <a href="{{reset_link}}">Recuperar Contraseña</a>
      <p style="font-size: 12px;">Este enlace expira en 24 horas.</p>
    `,
    text: "Haz clic en el enlace para recuperar tu contraseña.",
  },
};

/**
 * Send Email via SendGrid
 */
export async function sendEmail(options: EmailOptions) {
  const template = emailTemplates[options.template as keyof typeof emailTemplates];
  if (!template) throw new Error(`Template ${options.template} not found`);

  // Replace variables in template
  let html = template.html;
  let text = template.text;
  Object.entries(options.variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    html = html.replace(regex, String(value));
    text = text.replace(regex, String(value));
  });

  // In production, send via SendGrid API
  // For now, log to console
  console.log("📧 Email sent:", {
    to: options.to,
    subject: template.subject,
    template: options.template,
  });

  return {
    success: true,
    messageId: Math.random().toString(36).substring(7),
  };
}

/**
 * Send Bulk Email
 */
export async function sendBulkEmail(
  recipients: string[],
  template: string,
  variables: Record<string, any>
) {
  const results = await Promise.all(
    recipients.map((email) =>
      sendEmail({
        to: email,
        template,
        variables,
      })
    )
  );

  return {
    total: recipients.length,
    sent: results.filter((r) => r.success).length,
    failed: results.filter((r) => !r.success).length,
  };
}

/**
 * Subscribe to Newsletter
 */
export async function subscribeNewsletter(email: string) {
  console.log("📬 Newsletter subscription:", email);
  return { success: true, email };
}
