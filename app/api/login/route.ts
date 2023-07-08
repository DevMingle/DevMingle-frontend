import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const user = await req.json();
    const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    const response = NextResponse.json(
      {
        ...data,
      },
      { status: data?.status }
    );
    if (data.success) {
      response.cookies.set({
        name: "jwt",
        value: data.token,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    return response;
  } catch (err) {
    return NextResponse.json(
      {
        err,
      },
      { status: 500 }
    );
  }
}
