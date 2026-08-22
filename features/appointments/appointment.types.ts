export type AppointmentStatus = "pending" | "approved" | "rejected";

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  city: string;
  hairLossType: string;
  preferredDate: string;
  message: string;
  status: AppointmentStatus;
  createdAt: string;
};