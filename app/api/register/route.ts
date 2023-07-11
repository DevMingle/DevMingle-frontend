import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();
        const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        console.log(data);
        if (!data.success) {
            return NextResponse.json(
                {
                    ...data,
                },
                { status: data?.status }
            );
        }
        const response = NextResponse.json({ ...data }, { status: 201 });
        console.log(data.token);
        response.cookies.set({
            name: "jwt",
            value: data.token,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
        });
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                success: false,
                status: 500,
                message: error,
            },
            { status: 500 }
        );
    }
}
