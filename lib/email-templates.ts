import type { ContactFormData } from "./validation";

interface EmailField {
  label: string;
  value: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createFieldRow(field: EmailField): string {
  return `
    <tr>
      <td style="padding: 10px 16px; font-weight: 600; color: #6b7280; width: 140px; font-size: 14px; vertical-align: top;">
        ${escapeHtml(field.label)}
      </td>
      <td style="padding: 10px 16px; color: #1f2937; font-size: 14px;">
        ${field.value}
      </td>
    </tr>`;
}

export function createContactNotificationHtml(data: ContactFormData): string {
  const fields: EmailField[] = [
    { label: "Nome", value: escapeHtml(data.name) },
    { label: "Email", value: `<a href="mailto:${escapeHtml(data.email)}" style="color: #FF6B9D;">${escapeHtml(data.email)}</a>` },
    { label: "Telefono", value: escapeHtml(data.phone || "Non fornito") },
    { label: "Tipo di festa", value: escapeHtml(data.occasion) },
    { label: "Data prevista", value: escapeHtml(data.date || "Non definita") },
    { label: "Messaggio", value: escapeHtml(data.message).replace(/\n/g, "<br>") },
  ];

  return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuova richiesta - Sande Events</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #FF6B9D 0%, #A855F7 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                &#127880; Nuova Richiesta
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                Qualcuno ha compilato il form di contatto
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${fields.map((field) => createFieldRow(field)).join("\n")}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Sande Events &mdash; Decorazioni con Palloncini<br>
                Varese, Como, Canton Ticino
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function createContactNotificationText(data: ContactFormData): string {
  return `
Nuova richiesta dal sito Sande Events
========================================

Nome: ${data.name}
Email: ${data.email}
Telefono: ${data.phone || "Non fornito"}
Tipo di festa: ${data.occasion}
Data prevista: ${data.date || "Non definita"}

Messaggio:
${data.message}

---
Sande Events - Decorazioni con Palloncini
Varese, Como, Canton Ticino`.trim();
}
