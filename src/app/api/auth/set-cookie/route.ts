import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  debugger;
  const res = NextResponse.json({ success: true });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
  });

  return res;
}
