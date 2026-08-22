import { NextRequest, NextResponse } from "next/server";
import { verifyAdminFromRequest } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const ok = await verifyAdminFromRequest(req);

  return NextResponse.json({ ok });
}