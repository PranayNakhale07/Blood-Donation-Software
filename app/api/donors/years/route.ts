import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const donors = await db.registration.findMany({
            select: {
                created_at: true,
            },
            where: {
                NOT: {
                    created_at: null,
                },
            },
        });

        const years = Array.from(
            new Set(
                donors
                    .map((d) => d.created_at?.split("-")[0])
                    .filter((y): y is string => !!y && y.length === 4)
            )
        ).sort((a, b) => b.localeCompare(a));

        return NextResponse.json(years);
    } catch (error: any) {
        console.error("Error fetching registration years:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
