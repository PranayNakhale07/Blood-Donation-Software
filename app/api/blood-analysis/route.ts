import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const rows = await db.registration.groupBy({
    by: ["Bloodgroup"],
    _count: {
      _all: true,
    },
  });

  const formattedRows = rows.map((r) => ({
    label: r.Bloodgroup,
    count: r._count._all,
  }));

  const total = formattedRows.reduce((s: number, r: any) => s + r.count, 0);

  const yearlyData = await db.old_data.groupBy({
    by: ["Year"],
    where: {
      Year: { not: null },
    },
    _count: {
      _all: true,
    },
    orderBy: {
      Year: "asc",
    },
  });

  const formattedYearlyData = yearlyData.map((r) => ({
    year: r.Year,
    count: r._count._all,
  }));

  return NextResponse.json({
    data: formattedRows,
    yearlyData: formattedYearlyData,
    total,
    target: 200,
  });
}
