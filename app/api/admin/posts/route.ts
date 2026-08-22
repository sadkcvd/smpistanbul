import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { unauthorizedResponse, verifyAdminFromRequest } from "@/lib/admin-auth";

const postSchema = z.object({
  title: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().default(""),
  content: z.string().default(""),
  published: z.boolean().optional().default(false),
});

export async function GET(req: NextRequest) {
  if (!(await verifyAdminFromRequest(req))) return unauthorizedResponse();
  try {
    const data = await prisma.adminPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Yazılar alınamadı." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdminFromRequest(req))) return unauthorizedResponse();
  try {
    const body = await req.json();
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Geçersiz yazı verisi." },
        { status: 400 }
      );
    }

    const created = await prisma.adminPost.create({ data: parsed.data });
    return NextResponse.json({ ok: true, data: created });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Yazı oluşturulamadı." },
      { status: 500 }
    );
  }
}
