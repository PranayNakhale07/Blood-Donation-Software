import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID!,
  process.env.TWILIO_TOKEN!
);

export async function POST(req: Request) {
  try {
    const d = await req.json();

    await (db.registration as any).create({
      data: {
        Id: d.ID || d.Id,
        Name: d.Name,
        PhoneNumber: d.PhoneNumber,
        AdharNumber: d.AdharNumber,
        Address: d.Address,
        Bloodgroup: d.Bloodgroup,
        Sevakendra: d.Sevakendra,
        DateofBirth: d.DateofBirth,
        Email: d.Email,
        created_at: new Date().toISOString(),
      },
    });


    return NextResponse.json({ message: "Data saved successfully!" });
  } catch (error: any) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save registration data" },
      { status: 500 }
    );
  }
}
