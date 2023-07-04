import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    console.log(JSON.stringify({ name, email, password }));
    const res = await fetch("http://192.168.1.7:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "appliction/json",
      },
      body: {
        name,
        email,
        password,
      },
    });
    const data = await res.json();
    if (!data.success) {
      return NextResponse.json(
        {
          ...data,
        },
        { status: data?.status }
      );
    }
    const response = NextResponse.json({ ...data }, { status: 201 });
    response.cookies.set({
      name: "jwt",
      value: data.token,
      httpOnly: true,
      expires: 60 * 60 * 24 * 30,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: error,
      },
      { status: 500 }
    );
  }
}
