/**
 * VALIDATION DEPENDENCIES REQUIRED
 * ================================
 * Install these packages before using this file:
 *
 * npm install zod react-hook-form @hookform/resolvers
 *
 * Or with pnpm:
 * pnpm add zod react-hook-form @hookform/resolvers
 */

import { z } from "zod";

/**
 * Contact form validation schema
 *
 * Polish language validation messages for the Sande Events contact form
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, "Imię musi mieć minimum 3 znaki")
    .max(50, "Imię może mieć maksymalnie 50 znaków"),

  email: z
    .string()
    .min(1, "Email jest wymagany")
    .email("Nieprawidłowy adres email"),

  phone: z
    .string()
    .regex(/^\+?[\d\s-]{9,15}$/, "Nieprawidłowy numer telefonu")
    .optional()
    .or(z.literal("")),

  occasion: z
    .string()
    .min(1, "Wybierz rodzaj przyjęcia"),

  date: z
    .string()
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .min(10, "Wiadomość musi mieć minimum 10 znaków")
    .max(500, "Maksymalnie 500 znaków"),
});

/**
 * Type inference from the schema
 * Use this type for form state and API requests
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Validation error type
 */
export type ValidationError = {
  field: keyof ContactFormData;
  message: string;
};

/**
 * Helper function to format Zod errors for display
 */
export function formatZodErrors(error: z.ZodError<any>): ValidationError[] {
  return error.issues.map((err) => ({
    field: (err.path?.[0] as keyof ContactFormData) || 'name',
    message: err.message,
  }));
}
