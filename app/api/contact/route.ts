import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema, formatZodErrors } from "@/lib/validation";
import {
  createContactNotificationHtml,
  createContactNotificationText,
} from "@/lib/email-templates";
import { checkRateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL ?? "sandeevents8@gmail.com";
const SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL ?? "onboarding@resend.dev";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      { success: false, error: "Troppe richieste. Riprova tra qualche minuto." },
      { status: 429 }
    );
  }

  const contentLength = parseInt(request.headers.get("content-length") ?? "0", 10);
  if (contentLength > 10_000) {
    return NextResponse.json(
      { success: false, error: "Richiesta troppo grande." },
      { status: 413 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Richiesta non valida." },
      { status: 400 }
    );
  }

  const result = contactFormSchema.safeParse(body);

  if (!result.success) {
    const errors = formatZodErrors(result.error);
    return NextResponse.json(
      { success: false, error: "Dati non validi", errors },
      { status: 400 }
    );
  }

  const data = result.data;

  try {
    const { error: resendError } = await resend.emails.send({
      from: `Sande Events <${SENDER_EMAIL}>`,
      to: [NOTIFICATION_EMAIL],
      subject: `Nuova richiesta da ${data.name} - ${data.occasion}`,
      html: createContactNotificationHtml(data),
      text: createContactNotificationText(data),
    });

    if (resendError) {
      console.error("Resend error:", { message: resendError.message, name: resendError.name });
      return NextResponse.json(
        { success: false, error: "Errore nell'invio dell'email. Riprova più tardi." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Messaggio inviato con successo!" },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[contact-api] ${message}`);
    return NextResponse.json(
      { success: false, error: "Errore del server. Riprova più tardi." },
      { status: 500 }
    );
  }
}
