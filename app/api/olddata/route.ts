import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  await db.old_data.create({
    data: {
      ID: body.id,
      Name: body.name,
      Phone: body.phone,
      Gender: body.gender,
      BloodGroup: body.bloodgroup,
      Year: body.year || null,
      Address: body.address || null,
      Sevakendra: body.sevakendra || null,
    },
  });

  return NextResponse.json({ success: true });
}
