import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const token = req.cookies.get("jwt");

  const res = await fetch('http://192.168.1.2:8000/api/auth/check',{
      credentials:"include",
      headers:{
          Authorization:`Bearer ${token?.value}`
      }
  })
  const data = await res.json();
  console.log(data)
  return NextResponse.json(
    {
      ...data
    },
    { status: data?.status }
  );
}
