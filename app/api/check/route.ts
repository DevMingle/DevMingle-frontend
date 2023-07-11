import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const token = req.cookies.get("jwt");
  console.log(token?.value);
  const res = await fetch(`${process.env.BACKEND_URL}/auth/check`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token ? token.value : "null"}`,
    },
  });
  const data = await res.json();
  return NextResponse.json(
    {
      ...data,
    },
    { status: data?.status }
  );
}
