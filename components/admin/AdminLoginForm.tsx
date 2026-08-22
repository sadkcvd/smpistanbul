"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLoginForm() {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !json.ok) {
        setError(json.message ?? "Giriş başarısız.");
        return;
      }
      window.location.reload();
    } catch {
      setError("Giriş sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-foreground/10 bg-background p-6">
      <h1 className="text-xl font-black tracking-tight text-foreground">Admin Girişi</h1>
      <p className="mt-2 text-sm font-semibold text-foreground/70">
        Devam etmek için yönetici şifresini girin.
      </p>
      <form onSubmit={onSubmit} className="mt-5 grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="admin-password">Şifre</Label>
          <Input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error ? <p className="text-sm font-semibold text-[var(--brand-accent)]">{error}</p> : null}
        <Button type="submit" variant="accent" disabled={loading}>
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </Button>
      </form>
    </div>
  );
}
