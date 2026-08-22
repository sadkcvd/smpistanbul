"use client";

import { useEffect, useState } from "react";

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("/api/admin/me");
        const json = await res.json();

        setIsAdmin(json.ok);
      } catch {
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    }

    check();
  }, []);

  return { isAdmin, isLoading };
}