import { z } from "zod";

export const appointmentRequestSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı."),
  phone: z
    .string()
    .min(7, "Telefon numarası çok kısa.")
    .refine(
      (v) => /^[+]?[\d\s()-]{7,}$/.test(v.trim()),
      "Telefon numarası geçersiz."
    ),
  city: z.string().min(2, "Şehir en az 2 karakter olmalı."),
  hairLossType: z.string().min(2, "Lütfen saç kaybı tipinizi seçin."),
  preferredAppointmentDate: z
    .string()
    .min(1, "Tercih ettiğiniz tarih boş bırakılamaz.")
    .refine((val) => !Number.isNaN(Date.parse(val)), "Geçerli bir tarih seçin."),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı."),
});

export type AppointmentRequest = z.infer<typeof appointmentRequestSchema>;

