import { z } from "zod";

/**
 * Contact form validation schema
 *
 * Italian language validation messages for the Sande Events contact form
 */

const OCCASIONS = [
  "Compleanno",
  "Baby Shower",
  "Battesimo",
  "Cresima",
  "Evento Aziendale",
  "Altro",
] as const;

export { OCCASIONS };

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, "Il nome deve avere almeno 3 caratteri")
    .max(50, "Il nome può avere massimo 50 caratteri"),

  email: z
    .string()
    .min(1, "L'email è richiesta")
    .email("Indirizzo email non valido"),

  phone: z
    .string()
    .regex(/^\+?[\d\s-]{9,15}$/, "Numero di telefono non valido")
    .optional()
    .or(z.literal("")),

  occasion: z
    .enum(OCCASIONS, { message: "Scegli il tipo di festa" }),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato data non valido")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .min(10, "Il messaggio deve avere almeno 10 caratteri")
    .max(500, "Massimo 500 caratteri"),
});

/**
 * Type inference from the schema
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Validation error type
 */
export type ValidationError = {
  field: string;
  message: string;
};

/**
 * Helper function to format Zod errors for display
 */
export function formatZodErrors(error: z.ZodError<ContactFormData>): ValidationError[] {
  return error.issues.map((issue) => ({
    field: (issue.path?.[0] as string) || "name",
    message: issue.message,
  }));
}
