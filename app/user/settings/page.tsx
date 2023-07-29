"use client";
import React from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setUser } from "@/src/store/features/userSlice";
import Swal from "sweetalert2";

const page = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.userReducer.user);
    const logout = async () => {
        try {
            console.log("Logging out...");
            const { data } = await axios.get("/api/logout");
            if (data.oAuth) {
                signOut({
                    callbackUrl: "/signin",
                });
            }
            if (data.success) {
                dispatch(setUser(null));
                window.location.href = "/signin";
            }
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: "Error!",
                text: "Sorry, we are facing some issues ,please try again later",
                icon: "error",
                confirmButtonText: "Go back",
            });
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
