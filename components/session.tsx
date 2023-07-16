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
export default function Session({
    children,
    user,
    error,
    errMsg,
}: {
    children: JSX.Element;
    user: null | userType;
    error: boolean;
    errMsg: undefined | string;
}) {
    const dispatch = useAppDispatch();
    if(!error){
        dispatch(setUser(user));
    }else{
        dispatch(setError(errMsg || "Sorry, but we are facing some problems today"))
    }
   
    return <SessionProvider>{children}</SessionProvider>;
}
