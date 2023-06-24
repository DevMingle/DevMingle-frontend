import React from "react";
import Link from "next/link";

const Navbar = () => (
	<section className="w-full bg-gray-600 p-2 py-5 text-white">
		<div className="flex items-center justify-between">
			<div className="flex items-center space-x-3">
				<input
					type="text"
					className="w-[14rem] rounded-md border border-gray-100 outline-none bg-gray-600 px-2 text-white transition-all duration-500 hover:bg-white focus:w-[18rem] outline"
					placeholder="Search"
				/>

				<div className="hidden md:block">
					<ul className="flex space-x-3">
						<li className="hover:brightness-75">
							<Link href="/">Home</Link>
						</li>
						<li className="hover:brightness-75">
							<Link href="/explore">Explore</Link>
						</li>
						<li className="hover:brightness-75">
							<Link href="/about">About</Link>
						</li>
						<li className="hover:brightness-75">
							<Link href="/random"></Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="flex items-center space-x-3">
				<button className="rounded-lg border border-white p-2 hover:brightness-75">
					<Link href="/login">Login</Link>
				</button>
				<button className="rounded-lg border border-white p-2 hover:brightness-75">
					<Link href="/signup">Signup</Link>
				</button>
			</div>
		</div>
	</section>
);

export default Navbar;
