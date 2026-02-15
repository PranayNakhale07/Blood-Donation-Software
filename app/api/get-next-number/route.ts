import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST() {
  const currentYear = new Date().getFullYear().toString();

  const result = await (db.registration as any).aggregate({
    where: {
      created_at: {
        startsWith: currentYear,
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
