"use client";
import React from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setUser } from "@/src/store/features/userSlice";
import { redirect } from "next/navigation";

const page = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.userReducer.user);
    const logout = async () => {
        console.log("Logging out...");
        const { data } = await axios.get("/api/logout");
        if (data.oAuth) {
            signOut({
                callbackUrl: "/signin",
            });
        }
        if (data.success) {
            dispatch(setUser(null));
            return redirect("/signin");
        }
    };
    const fetchEdit = async () => {
        console.log("Fetching...");
        const { data } = await axios.post("/api", {
            method: "POST",
            url: "users/edit",
            body: {
                name: "Test OBJ",
            },
        });
        console.log(data);
    };
    return (
        <div className="flex">
            <button
                onClick={logout}
                className="bg-transparent rounded-md p-3 text-4 border-primary-btn"
            >
                Log out:
                {user?.name}
            </button>
            <button onClick={fetchEdit}>Fetch Middleware</button>
        </div>
    );
};

export default page;
