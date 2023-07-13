"use client";

import { useAppSelector } from "@/src/store/hooks";

export default function User() {
    const user = useAppSelector((state) => state.userReducer.user);
    return <h1>{user?.name}</h1>;
}
