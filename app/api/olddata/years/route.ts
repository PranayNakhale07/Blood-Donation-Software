import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const rows = db.prepare(`
      SELECT DISTINCT Year
      FROM old_data
      WHERE Year IS NOT NULL
      ORDER BY Year DESC
    `).all() as { Year: string }[];

        return NextResponse.json(rows.map(r => r.Year));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
