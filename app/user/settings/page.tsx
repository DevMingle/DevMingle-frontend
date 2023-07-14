"use client";
import React from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import {useAppDispatch} from "@/src/store/hooks";
import {setUser} from "@/src/store/features/userSlice"

const page = () => {
    const dispatch = useAppDispatch();
    const logout = async () => {
        console.log("Logging out...");
        const { data } = await axios.get("/api/logout");
        if (data.oAuth) {
            signOut();
        }
        if(data.success){
            dispatch(setUser(null))
        }
    };
    return (
        <div className="flex">
            <button
                onClick={logout}
                className="bg-transparent rounded-md p-3 text-4 border-primary-btn"
            >
                Log out
            </button>
        </div>
    );
};

export default page;
