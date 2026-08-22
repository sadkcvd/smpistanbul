import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_COOKIE_NAME, signAdminToken } from "@/lib/admin-auth";

const schema = z.object({
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Geçersiz istek." },
        { status: 400 }
      );
    }

    if (parsed.data.password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { ok: false, message: "Şifre hatalı." },
        { status: 401 }
      );
    }

    const token = await signAdminToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Sunucu hatası." },
      { status: 500 }
    );
  }
}
