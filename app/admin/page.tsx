/* import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

async function isAdminLoggedIn() {
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export default async function AdminPage() {
  const loggedIn = await isAdminLoggedIn();
  console.log("adminPage");
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {loggedIn ? <AdminDashboard /> : <AdminLoginForm />}
    </div>
  );
}
 */

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