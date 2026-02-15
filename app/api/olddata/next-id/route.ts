import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const result = await db.old_data.aggregate({
    _max: {
      ID: true,
    },
  });
  const next_id = (result._max.ID || 0) + 1;
  return NextResponse.json({ next_id });
}
