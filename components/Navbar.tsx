import React from "react";
import Image from "next/image";
import { Logo } from "@/public";
import Link from "next/link";

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
		name: "Explore",
		href: "/",
	},
];

const NavItem = ({ name, href }: { name: string; href: string }) => {
	return (
		<Link
			href={href}
			className="hover:text-slate-200 hover:-translate-y-1 duration-300"
		>
			{name}
		</Link>
	);
};

const Navbar = () => (
	<section className="dark:text-text-dark dark:bg-dark-nav body-font">
		<div className="container mx-auto flex flex-wrap px-8 py-6 flex-row items-center justify-center md:justify-normal">
			<Link
				href="/"
				className="flex title-font font-medium items-center justify-center gap-4"
			>
				<Image src={Logo} width={40} height={60} alt="Loading..." />
				<span className="text-xl">ByteChat</span>
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
			<button className="absolute px-4 py-2 md:hidden top-7 right-4">
				nav
			</button>
		</div>
	</section>
);

export default Navbar;
