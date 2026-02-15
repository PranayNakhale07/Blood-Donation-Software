import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import twilio from "twilio";

export async function POST(req: Request) {
  const { id } = await req.json();

  const row = db.prepare(`
    SELECT Name, Phone
    FROM old_data
    WHERE ID = ?
  `).get(id) as { Name: string; Phone: string } | undefined;



  if (!row) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const client = twilio(
    process.env.TWILIO_SID!,
    process.env.TWILIO_AUTH_TOKEN!
  );

  await client.messages.create({
    body: `Hello ${row.Name}, thank you for supporting the Blood Donation Camp.`,
    from: process.env.TWILIO_PHONE!,
    to: `+91${row.Phone}`,
  });

  return NextResponse.json({ success: true });
}
