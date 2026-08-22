"use client";

import { Post } from "../posts.types";

type Props = {
  data: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (post: Post) => void;
};

export function PostTable({
  data,
  onEdit,
  onDelete,
  onTogglePublish,
}: Props) {
  return (
    <div className="bg-white border rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-3">Başlık</th>
            <th className="p-3">Slug</th>
            <th className="p-3">Durum</th>
            <th className="p-3 text-right">İşlem</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3 font-medium">{p.title}</td>
              <td className="p-3 text-gray-500">{p.slug}</td>

              <td className="p-3">
                {p.published ? (
                  <span className="text-green-600 font-medium">Yayında</span>
                ) : (
                  <span className="text-gray-500">Taslak</span>
                )}
              </td>

              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="px-3 py-1 text-xs bg-gray-100 rounded"
                  >
                    Düzenle
                  </button>

                  <button
                    onClick={() => onTogglePublish(p)}
                    className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded"
                  >
                    {p.published ? "Gizle" : "Yayınla"}
                  </button>

                  <button
                    onClick={() => onDelete(p.id)}
                    className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded"
                  >
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}