import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { unauthorizedResponse, verifyAdminFromRequest } from "@/lib/admin-auth";

const patchSchema = z.object({
  id: z.string().min(1),
  approved: z.boolean(),
});

export async function GET(req: NextRequest) {
  if (!(await verifyAdminFromRequest(req))) return unauthorizedResponse();
  try {
    const data = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Yorumlar alınamadı." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await verifyAdminFromRequest(req))) return unauthorizedResponse();
  try {
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Geçersiz güncelleme verisi." },
        { status: 400 }
      );
    }

    const updated = await prisma.review.update({
      where: { id: parsed.data.id },
      data: { approved: parsed.data.approved },
    });
    return NextResponse.json({ ok: true, data: updated });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Yorum güncellenemedi." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdminFromRequest(req))) return unauthorizedResponse();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ ok: false, message: "id gerekli." }, { status: 400 });
    }
    await prisma.review.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Yorum silinemedi." },
      { status: 500 }
    );
  }
}
