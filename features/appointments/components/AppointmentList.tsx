import { Appointment } from "../appointment.types";
import { AppointmentCard } from "./AppointmentCard";

type Props = {
  appointments: Appointment[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
};

export function AppointmentList({
  appointments,
  onApprove,
  onReject,
  onDelete,
}: Props) {
  if (appointments.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        Henüz randevu bulunmuyor.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {appointments.map((a) => (
        <AppointmentCard
          key={a.id}
          appointment={a}
          onApprove={() => onApprove(a.id)}
          onReject={() => onReject(a.id)}
          onDelete={() => onDelete(a.id)}
        />
      ))}
    </div>
  );
}