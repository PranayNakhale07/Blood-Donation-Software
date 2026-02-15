import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { year } = await req.json();

  const result = await (db.old_data as any).aggregate({
    where: {
      Year: year,
    },
    _max: {
      ID: true,
    },
  });

  const next_id = (result._max.ID || 0) + 1;
  return NextResponse.json({ next_id });
}
