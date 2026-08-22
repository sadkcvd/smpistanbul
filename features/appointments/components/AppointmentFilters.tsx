"use client";

import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
};

export function AppointmentFilters({
  search,
  setSearch,
  status,
  setStatus,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 bg-white border rounded-xl p-4">
      <Input
        placeholder="İsim veya telefon ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border rounded-md px-3 py-2 text-sm"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="all">Tümü</option>
        <option value="pending">Bekleyen</option>
        <option value="approved">Onaylanan</option>
        <option value="rejected">Reddedilen</option>
      </select>
    </div>
  );
}