import { Appointment } from "../appointment.types";
import { Button } from "@/components/ui/button";

type Props = {
  data: Appointment[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
};

export function AppointmentTable({
  data,
  onApprove,
  onReject,
  onDelete,
}: Props) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">
        Henüz randevu bulunmuyor.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left text-xs text-gray-500">
          <tr>
            <th className="p-3">İsim</th>
            <th className="p-3">Telefon</th>
            <th className="p-3">Şehir</th>
            <th className="p-3">Durum</th>
            <th className="p-3">Tarih</th>
            <th className="p-3 text-right">İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a) => {
            const isPending = a.status === "pending";

            const statusStyle =
              a.status === "approved"
                ? "bg-green-100 text-green-700"
                : a.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700";

            const statusText =
              a.status === "approved"
                ? "Onaylandı"
                : a.status === "rejected"
                ? "Reddedildi"
                : "Beklemede";

            return (
              <tr key={a.id} className="border-t">
                <td className="p-3 font-medium">{a.name}</td>
                <td className="p-3 text-gray-600">{a.phone}</td>
                <td className="p-3 text-gray-600">{a.city}</td>

                <td className="p-3">
                  <span className={`px-2 py-1 rounded-md text-xs ${statusStyle}`}>
                    {statusText}
                  </span>
                </td>

                <td className="p-3 text-gray-500">
                  {new Date(a.createdAt).toLocaleString("tr-TR")}
                </td>

                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    {isPending && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => onApprove(a.id)}
                        >
                          Onayla
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onReject(a.id)}
                        >
                          Reddet
                        </Button>
                      </>
                    )}

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(a.id)}
                    >
                      Sil
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}