import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");

    let query = `
      SELECT ID as Id, Name, Phone as PhoneNumber, BloodGroup as Bloodgroup, Year
      FROM old_data
    `;
    const params = [];

    if (year) {
      query += ` WHERE Year = ?`;
      params.push(year);
    }

    query += ` ORDER BY ID DESC`;

    const rows = db.prepare(query).all(...params);

    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
