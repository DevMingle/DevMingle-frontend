import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function GET(req: NextRequest) {
  const oAuthToken = await getToken({ req });
  console.log(oAuthToken, "oAuthToken \n\n")
  if (oAuthToken) {
    console.log("umm yeah dude \n\n\n")
    return NextResponse.json(
      {
        success:true,
        user: oAuthToken.user,
      },
      { status: 200 }
    );
  }
  const token = req.cookies.get("jwt");
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
