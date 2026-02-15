import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPass) {
    return NextResponse.json(
      { success: false, message: "Server not configured" },
      { status: 500 }
    );
  }

  if (username !== adminUser || password !== adminPass) {
    return NextResponse.json(
      { success: false, message: "Wrong credentials" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set("username", username, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  cookieStore.set(
    "message",
    "Login success! Welcome to Blood Donation Camp.",
    {
      sameSite: "lax",
      path: "/",
    }
  );

  return NextResponse.json({ success: true });
}
