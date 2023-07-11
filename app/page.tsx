"use client";
import { useAppSelector } from "@src/store/hooks";
import React from "react";

const page = () => {
    const user = useAppSelector((state) => state.userReducer.user);
    console.log(user);
    return <div className="min-h-screen py-10 px-5"></div>;
};

export default page;
