import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    console.log(await req.json());
    let token: unknown = req.cookies.get("jwt");
    const oAuthToken = await getToken({ req });
    if (oAuthToken) token = oAuthToken.token;

    const { url, method, body } = await req.json();
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/${url}`, {
            method,
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
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
