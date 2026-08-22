import { Appointment, AppointmentStatus } from "./appointment.types";

type ApiResponse<T> = {
  ok: boolean;
  data: T;
  message?: string;
};

export async function getAppointments(): Promise<ApiResponse<Appointment[]>> {
  const res = await fetch("/api/admin/appointments");
  return res.json();
}

export async function updateAppointmentStatus(input: {
  id: string;
  status: AppointmentStatus;
}): Promise<ApiResponse<Appointment>> {
  const res = await fetch("/api/admin/appointments", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return res.json();
}

export async function deleteAppointment(
  id: string
): Promise<ApiResponse<null>> {
  const res = await fetch(`/api/admin/appointments?id=${id}`, {
    method: "DELETE",
  });

  return res.json();
}