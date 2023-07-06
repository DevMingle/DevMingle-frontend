import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const token = req.cookies.get("jwt");
  console.log(token)
  return NextResponse.json(
    {
      status:true,
    },
    { status: 200 }
  );
}
