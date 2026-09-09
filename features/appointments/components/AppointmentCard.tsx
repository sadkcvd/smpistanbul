import { Appointment } from "../appointment.types";
import { Button } from "@/components/ui/button";

type Props = {
  appointment: Appointment;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
};

export function AppointmentCard({
  appointment,
  onApprove,
  onReject,
  onDelete,
}: Props) {
  const isPending = appointment.status === "pending";

  const statusStyle = {
    pending: "text-yellow-600 bg-yellow-50",
    approved: "text-green-600 bg-green-50",
    rejected: "text-red-600 bg-red-50",
  };

  const statusText = {
    pending: "Beklemede",
    approved: "Onaylandı",
    rejected: "Reddedildi",
  };

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold text-gray-900">
            {appointment.name}
          </div>
          <div className="text-sm text-gray-500">
            {appointment.phone}
          </div>
          <div className="text-sm text-gray-500">
            {appointment.city} • {appointment.hairLossType}
          </div>
        </div>

        <span
          className={`px-2 py-1 rounded-md text-xs font-semibold ${statusStyle[appointment.status]}`}
        >
          {statusText[appointment.status]}
        </span>
      </div>

      {/* MESSAGE */}
      <p className="text-sm text-gray-600">{appointment.message}</p>

      {/* DATE */}
      <div className="text-xs text-gray-400">
        {new Date(appointment.createdAt).toLocaleString("tr-TR")}
      </div>

      {/* ACTIONS */}
      {isPending && (
        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={onApprove}>
            Onayla
          </Button>

          <Button size="sm" variant="outline" onClick={onReject}>
            Reddet
          </Button>

          <Button size="sm" variant="ghost" onClick={onDelete}>
            Sil
          </Button>
        </div>
      )}

      {/* READ ONLY STATE */}
      {!isPending && (
        <div className="text-xs text-gray-400 pt-2">
          Bu randevu üzerinde işlem yapılamaz
        </div>
      )}
    </div>
  );
}