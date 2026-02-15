import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST() {
  const row = db
    .prepare("SELECT MAX(Id) as mx FROM registration")
    .get() as { mx?: number };

  return NextResponse.json({
    next: (row?.mx || 0) + 1,
  });
}
