import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function GET(req: NextRequest) {
    const oAuthToken = await getToken({ req });
    if (oAuthToken) {
        return NextResponse.json(
            {
                success: true,
                user: oAuthToken.user,
            },
            { status: 200 }
        );
    }
    const token = req.cookies.get("jwt");
    if (!token?.value)
        return NextResponse.json({
            success: true,
            loggedIn: false,
            user: null,
        });
    const res = await fetch(`${process.env.BACKEND_URL}/auth/check`, {
        credentials: "include",
        headers: {
            Authorization: `Bearer ${token ? token.value : "null"}`,
        },
    });
    const data = await res.json();
    console.log(data);
    return NextResponse.json(
        {
            ...data,
        },
        { status: data?.status }
    );
}
