import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const rows = await db.old_data.findMany({
            where: {
                Year: { not: null },
            },
            distinct: ["Year"],
            select: {
                Year: true,
            },
            orderBy: {
                Year: "desc",
            },
        });

        return NextResponse.json(rows.map((r) => r.Year));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
