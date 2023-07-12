import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const oAuthToken = await getToken({ req });
    const token = req.cookies.get("jwt");
    console.log(oAuthToken, token, "middleware");
    if (!oAuthToken && !token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }
}

export const config = {
    matcher: "/user/me",
};
