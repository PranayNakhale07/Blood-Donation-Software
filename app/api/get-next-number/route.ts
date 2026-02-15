import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST() {
  const today = new Date().toISOString().split("T")[0];

  const result = await (db.registration as any).aggregate({
    where: {
      created_at: {
        startsWith: today,
      },
    },
    _max: {
      Id: true,
    },
  });

  return NextResponse.json({
    next: (result._max.Id || 0) + 1,
  });
}
