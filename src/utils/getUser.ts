import { cache } from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { cookies } from "next/headers";
import axios from "axios";
import { userType } from "./types";
export const getUser = cache(
    async (): Promise<{
        user: null | userType;
        error: boolean;
        errMsg: undefined | string;
    }> => {
        const oAuthToken: {
            token: string;
        } | null = await getServerSession(nextAuthOptions);
        let token = cookies().get("jwt")?.value;
        if (oAuthToken) token = oAuthToken.token;
        console.log(oAuthToken)
        try {
            const {
                data: { user },
            }: {
                data: {
                    user: userType | null;
                };
            } = await axios.get(`${process.env.BACKEND_URL}/auth/check`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return { error: false, errMsg: undefined, user };
        } catch (err) {
            return { error: true, errMsg: String(err), user: null };
        }
    }
);
