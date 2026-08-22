"use client";

import { Input } from "@/components/ui/input";

export function ReviewFilters({
  search,
  setSearch,
  filter,
  setFilter,
}: any) {
  return (
    <div className="flex gap-3 bg-white border rounded-xl p-4">
      <Input
        placeholder="Yorum ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border rounded-md px-3 text-sm"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">Tümü</option>
        <option value="approved">Onaylı</option>
        <option value="pending">Bekleyen</option>
      </select>
    </div>
  );
}