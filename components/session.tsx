"use client"
import { SessionProvider } from "next-auth/react";

export default function Session({ children }: { children: JSX.Element }) {
  return <SessionProvider>{children}</SessionProvider>;
}
