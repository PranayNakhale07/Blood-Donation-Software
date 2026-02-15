import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");

  const rows = await db.registration.findMany({
    where: year ? {
      created_at: {
        startsWith: year,
      },
    } : {},
    orderBy: {
      created_at: "desc",
    },
  });

  return NextResponse.json(rows);
}

export async function PUT(req: Request) {
  try {
    const d = await req.json();

    const updated = await (db.registration as any).update({
      where: { id: d.id },
      data: {
        Name: d.Name,
        PhoneNumber: d.PhoneNumber,
        AdharNumber: d.AdharNumber,
        Address: d.Address,
        Bloodgroup: d.Bloodgroup,
        Sevakendra: d.Sevakendra,
        DateofBirth: d.DateofBirth,
        Email: d.Email,
      },
    });

    if (!updated) {
      return NextResponse.json({ error: "Donor not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
