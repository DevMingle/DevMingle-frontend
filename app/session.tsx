"use client";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useAppDispatch } from "@/src/store/hooks";
import {
    startLoading,
    setError,
    setUser,
} from "@/src/store/features/userSlice";
import { userType } from "@/src/utils/types";
export default function Session({ children }: { children: JSX.Element }) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const getUser = async () => {
            try {
                dispatch(startLoading());
                const res = await fetch("/api/check", {
                    method: "GET",
                });
                const data = await res.json();
                if (data.success) {
                    dispatch(setUser(data.user as userType));
                } else {
                    dispatch(setError(data.message || "Couldn't load user"));
                }
            } catch (error) {
                dispatch(setError(String(error)));
            }
        };
        getUser();
    }, []);
    return <SessionProvider>{children}</SessionProvider>;
}
