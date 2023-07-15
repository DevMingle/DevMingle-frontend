"use client";
import { updateUser } from "@/src/utils/user";
import React from "react";

const page = async () => {
    const data = await updateUser({
        name: "NaviTheCoderboi",
    });
    console.log(data);
    return <div>page</div>;
};

export default page;
