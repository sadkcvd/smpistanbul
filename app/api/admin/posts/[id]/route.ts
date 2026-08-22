import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { unauthorizedResponse, verifyAdminFromRequest } from "@/lib/admin-auth";

const patchSchema = z.object({
  title: z.string().min(2).optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminFromRequest(req))) return unauthorizedResponse();
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Geçersiz yazı güncellemesi." },
        { status: 400 }
      );
    }

    const updated = await prisma.adminPost.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ ok: true, data: updated });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Yazı güncellenemedi." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminFromRequest(req))) return unauthorizedResponse();
  try {
    const { id } = await params;
    await prisma.adminPost.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Yazı silinemedi." },
      { status: 500 }
    );
  }
}
