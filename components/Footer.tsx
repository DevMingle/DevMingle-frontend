"use client";
import React from "react";
import { Logo } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

const FooterItems = [
    {
        name: "github",
        icon: AiFillGithub,
        href: "https://github.com/DevMingle",
    },
    {
        name: "githu",
        icon: AiFillGithub,
        href: "https://github.com/DevMingle",
    },
    {
        name: "gith",
        icon: AiFillGithub,
        href: "https://github.com/DevMingle",
    },
    {
        name: "git",
        icon: AiFillGithub,
        href: "https://github.com/DevMingle",
    },
];

const FooterItem = ({ Icon, href }: { Icon: any; href: string }) => {
    return (
        <a
            className="dark:text-gray-400 dark:hover:text-gray-200 hover:scale-[1.3] duration-300"
            href={href}
            target="_blank"
        >
            <Icon className="text-2xl" />
        </a>
    );
};

const Footer = () => {
    return (
        <footer className="dark:text-gray-400 dark:bg-gray-900 body-font relative bottom-0">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col justify-around gap-10">
                <Link
                    href="/"
                    className="flex title-font font-medium items-center justify-center dark:text-white gap-3"
                >
                    <Image src={Logo} alt="logo" width={45} height={25} />
                    <span className="text-xl">ByteChat</span>
                </Link>
                <p className="text-sm dark:text-gray-400 sm:border-l-2 dark:sm:border-gray-800">
                    © 2023 ByteChat —
                    <a
                        href="https://github.com/Devaunch"
                        className="dark:text-gray-500 ml-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @Devaunch team
                    </a>
                </p>
                <span className="flex justify-center items-center gap-3 sm:ml-auto">
                    {FooterItems.map((item) => {
                        return (
                            <FooterItem
                                key={item.name}
                                Icon={item.icon}
                                href={item.href}
                            />
                        );
                    })}
                </span>
            </div>
        </footer>
    );
};

export default Footer;
