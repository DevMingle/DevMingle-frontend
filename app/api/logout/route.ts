import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function GET(req: NextRequest) {
    const oAuthToken = await getToken({ req });
    const token = req.cookies.get("jwt");
    if (oAuthToken) {
        return NextResponse.json({
            success: true,
            status: 200,
            oAuth: true,
        });
    }
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });
        const data = await res.json();
        console.log(data.success);
        if (data.success) {
            const response = NextResponse.json(
                {
                    ...data,
                },
                { status: 200 }
            );
            response.cookies.set({
                name: "jwt",
                value: "",
                expires: new Date("2016-10-05"),
                path: "/", // For all paths
            });
            return response;
        }
    } catch (err) {
        return NextResponse.json({
            success: false,
            status: 500,
            message: err,
        });
    }
}
