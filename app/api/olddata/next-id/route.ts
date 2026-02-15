import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const row = db.prepare("SELECT COALESCE(MAX(ID),0)+1 AS next_id FROM old_data").get();
  return NextResponse.json(row);
}
