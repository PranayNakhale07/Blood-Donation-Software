import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const d = await req.json();

  db.prepare(`
    INSERT INTO enquiry_registration
    (Name, Phone, Aadhar, Address, BloodGroup, Email, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    d.Name,
    d.Phone,
    d.Aadhar,
    d.Address,
    d.BloodGroup,
    d.Email,
    new Date().toISOString()
  );

  return NextResponse.json({ message: "Data added successfully!" });
}
