import { appointmentRepo } from "./appointment.repo";
import { appointmentRequestSchema } from "@/lib/validation/appointment";
import { AppointmentStatus } from "./appointment.types";

export const appointmentService = {
  async create(input: unknown) {
    const parsed = appointmentRequestSchema.safeParse(input);

    if (!parsed.success) {
      throw {
        type: "VALIDATION_ERROR",
        issues: parsed.error.flatten().fieldErrors,
      };
    }

    const data = parsed.data;

    return appointmentRepo.create({
      name: data.name,
      phone: data.phone,
      city: data.city,
      hairLossType: data.hairLossType,
      preferredDate: new Date(data.preferredAppointmentDate),
      message: data.message,
    });
  },

  getAll() {
    return appointmentRepo.findAll();
  },

  updateStatus(id: string, status: AppointmentStatus) {
    return appointmentRepo.updateStatus(id, status);
  },

  delete(id: string) {
    return appointmentRepo.delete(id);
  },
};