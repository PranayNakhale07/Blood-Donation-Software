import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const rows = db.prepare(`
    SELECT
      Id,
      Name,
      PhoneNumber,
      AdharNumber,
      Address,
      Bloodgroup,
      Sevakendra,
      DateofBirth,
      Email
    FROM registration
    ORDER BY Id DESC
  `).all();

  return NextResponse.json(rows);
}

export async function PUT(req: Request) {
  try {
    const d = await req.json();

    const info = db.prepare(`
      UPDATE registration
      SET
        Name = ?,
        PhoneNumber = ?,
        AdharNumber = ?,
        Address = ?,
        Bloodgroup = ?,
        Sevakendra = ?,
        DateofBirth = ?,
        Email = ?
      WHERE Id = ?
    `).run(
      d.Name,
      d.PhoneNumber,
      d.AdharNumber,
      d.Address,
      d.Bloodgroup,
      d.Sevakendra,
      d.DateofBirth,
      d.Email,
      d.Id
    );

    if (info.changes === 0) {
      return NextResponse.json({ error: "Donor not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
