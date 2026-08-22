import { Review } from "../review.types";
import { Button } from "@/components/ui/button";

type Props = {
  data: Review[];
  onApprove: (id: string) => void;
  onHide: (id: string) => void;
  onDelete: (id: string) => void;
};

export function ReviewTable({
  data,
  onApprove,
  onHide,
  onDelete,
}: Props) {
  if (data.length === 0) {
    return (
      <div className="border rounded-xl bg-white p-6 text-sm text-gray-500">
        Yorum bulunamadı.
      </div>
    );
  }

  return (
    <div className="border rounded-xl bg-white overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left text-xs text-gray-500">
          <tr>
            <th className="p-3">İsim</th>
            <th className="p-3">Puan</th>
            <th className="p-3">Yorum</th>
            <th className="p-3">Durum</th>
            <th className="p-3 text-right">İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {data.map((r) => {
            return (
              <tr key={r.id} className="border-t">
                <td className="p-3 font-medium">{r.name}</td>

                <td className="p-3 text-yellow-500">
                  {"★".repeat(r.rating)}
                </td>

                <td className="p-3 text-gray-600 max-w-[400px]">
                  {r.comment}
                </td>

                <td className="p-3">
                  {r.approved ? (
                    <span className="text-green-600 text-xs">
                      Onaylandı
                    </span>
                  ) : (
                    <span className="text-yellow-600 text-xs">
                      Beklemede
                    </span>
                  )}
                </td>

                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    {!r.approved && (
                      <Button
                        size="sm"
                        onClick={() => onApprove(r.id)}
                      >
                        Onayla
                      </Button>
                    )}

                    {r.approved && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onHide(r.id)}
                      >
                        Gizle
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(r.id)}
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