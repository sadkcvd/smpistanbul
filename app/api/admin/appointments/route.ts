import { NextRequest, NextResponse } from "next/server";
import { appointmentService } from "@/features/appointments/appointment.service";
import {
  requireAdmin,
  unauthorizedResponse,
  verifyAdminFromRequest,
} from "@/lib/admin-auth";
import { z } from "zod";

const patchSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "approved", "rejected"]),
});

export async function GET(req: NextRequest) {
  // if (!(await verifyAdminFromRequest(req))) return unauthorizedResponse();

  try {
    await requireAdmin(req);
  } catch {
    return unauthorizedResponse();
  }
  try {
    const data = await appointmentService.getAll();
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Randevular alınamadı." },
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
        { ok: false, message: "Geçersiz veri." },
        { status: 400 }
      );
    }

    const data = await appointmentService.updateStatus(
      parsed.data.id,
      parsed.data.status
    );

    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Güncellenemedi." },
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
      return NextResponse.json(
        { ok: false, message: "id gerekli" },
        { status: 400 }
      );
    }

    await appointmentService.delete(id);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Silinemedi." },
      { status: 500 }
    );
  }
}