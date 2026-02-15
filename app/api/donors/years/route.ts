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

        const dates = Array.from(
            new Set(
                donors
                    .map((d) => d.created_at?.split("T")[0])
                    .filter((date): date is string => !!date && /^\d{4}-\d{2}-\d{2}$/.test(date))
            )
        ).sort((a, b) => b.localeCompare(a));

        return NextResponse.json(dates);
    } catch (error: any) {
        console.error("Error fetching registration years:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
