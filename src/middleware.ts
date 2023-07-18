import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const oAuthToken = await getToken({ req });
    const token = req.cookies.get("jwt");
    if (!oAuthToken && (!token || token.value === "")) {
        if (
            req.nextUrl.pathname.includes("/user") &&
            !req.nextUrl.pathname.includes("/profile")
        ) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }
    }
    if (oAuthToken || token) {
        if (
            req.nextUrl.pathname.startsWith("/signin") ||
            req.nextUrl.pathname.startsWith("/signup")
        ) {
            return NextResponse.redirect(new URL("/user/me", req.url));
        }
    }
}

export const config = {
    matcher: ["/user/me", "/signup", "/signin"],
};
