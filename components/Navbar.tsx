"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Logo } from "@/public";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import {
    setUser,
    startLoading,
    setError,
} from "../src/store/features/userSlice";
import { userType } from "@/src/utils/types";

const NavItems: { name: string; href: string }[] = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "About",
        href: "/",
    },
    {
        name: "Contact",
        href: "/",
    },
    {
        name: "Blog",
        href: "/blog",
    },
];

const NavItem = ({ name, href }: { name: string; href: string }) => {
    return (
        <Link href={href} className="group transition duration-300">
            {name}
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-500"></span>
        </Link>
    );
};

const Navbar = () => {
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
    const [showMenu, setShowMenu] = useState(false);
    return (
        <section className="dark:bg-dark-nav sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto flex flex-wrap px-8 py-6 flex-row items-center justify-center md:justify-normal gap-6">
                <Link
                    href="/"
                    className="flex title-font font-medium items-center justify-center gap-4"
                >
                    <div id="Logo">
                        <Image
                            src={Logo}
                            width={70}
                            height={30}
                            alt="Loading..."
                        />
                    </div>
                    <span className="text-2xl font-bold">ByteChat</span>
                </Link>
                <nav className="hidden md:flex md:ml-auto flex-wrap items-center text-lg justify-center gap-5 font-medium">
                    {NavItems.map((navitem) => {
                        return (
                            <NavItem
                                key={navitem.name}
                                name={navitem.name}
                                href={navitem.href}
                            />
                        );
                    })}
                </nav>
                <Link href="/signup">
                    <button className="btn border-primary-btn hover:border-primary-btn hover:bg-primary-btn duration-300 hidden md:block">
                        Sign Up
                    </button>
                </Link>
                <div
                    className="absolute px-4 py-2 md:hidden top-8 right-4 text-3xl"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    {showMenu === false ? <FaBars /> : ""}
                </div>
                <AnimatePresence>
                    {showMenu && (
                        <div className="absolute md:hidden top-0 right-0 w-full h-screen bg-black bg-opacity-50 flex flex-col items-end">
                            <motion.div
                                initial={{ x: 500 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 0.5 }}
                                exit={{ x: 500 }}
                                className="w-2/3 h-full overflow-y-scroll bg-bg-dark flex flex-col items-center px-4 py-16 relative gap-8"
                            >
                                <div className="absolute top-5 right-5 text-2xl hover:text-red-500">
                                    <AiOutlineClose
                                        onClick={() => setShowMenu(!showMenu)}
                                    />
                                </div>
                                {NavItems.map((navitem) => {
                                    return (
                                        <Link
                                            href={navitem.href}
                                            key={navitem.name}
                                            onClick={() => setShowMenu(false)}
                                        >
                                            <div className="font-medium text-xl">
                                                {navitem.name}
                                            </div>
                                        </Link>
                                    );
                                })}
                                <Link href="/signup">
                                    <button
                                        className="btn border-primary-btn hover:border-primary-btn hover:bg-primary-btn duration-300"
                                        onClick={() => setShowMenu(false)}
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Navbar;
