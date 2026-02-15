import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");

    const rows = await db.old_data.findMany({
      where: year ? { Year: year } : {},
      orderBy: {
        ID: "desc",
      },
      select: {
        ID: true,
        Name: true,
        Phone: true,
        BloodGroup: true,
        Year: true,
      },
    });

    const mappedRows = rows.map((row) => ({
      Id: row.ID,
      Name: row.Name,
      PhoneNumber: row.Phone,
      Bloodgroup: row.BloodGroup,
      Year: row.Year,
    }));

    return NextResponse.json(mappedRows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
