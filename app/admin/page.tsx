"use client";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { useAdminAuth } from "@/features/admin/useAdminAuth";

export default function AdminPage() {
  const { isLoading, isAdmin } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAdmin ? <AdminDashboard /> : <AdminLoginForm />}
    </div>
  );
}