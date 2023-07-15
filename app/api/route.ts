import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function POST(req: NextRequest) {
  let token:RequestCookie | undefined = req.cookies.get("jwt");
  const oAuthToken = await getToken({ req });
  if (oAuthToken) token = (oAuthToken?.token as RequestCookie);
  
  const { url, method, body } = await req.json();
  console.log(url, method, body);
  
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/${url}`, {
      method,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(body), 
    });
    const data = await res.json();
    return NextResponse.json(
      {
        ...data,
      },
      { status: res.status }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: String(err),
      },
      { status: 500 }
    );
  }
}
