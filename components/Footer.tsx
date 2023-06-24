import React from "react";
import Link from "next/link";

const Footer = () => (
	<div id="footer" className="text-white bg-[#222222] relative bottom-0 w-full">
		<div className="container mx-auto flex md:items-center space-y-10 md:space-y-0 flex-col md:flex-row md:justify-between px-10 py-10">
			<div className="max-w-md">
				<h1 className="mb-2 text-[#efe0fe] font-bold">About</h1>
				<p className="opacity-50">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic placeat
					deleniti cum magni iusto commodi quasi tempora ad fugit
					exercitationem.
				</p>
			</div>

			<div className="flex flex-col">
				<h1 className="mb-2 text-[#efe0fe] font-bold">Links</h1>
				<a className="opacity-50" href="#">
					Instagram
				</a>
				<a
					className="opacity-50"
					target="_blank"
					href="https://github.com/WebDevSync"
				>
					Github
				</a>
				<Link className="opacity-50" href="/about">
					About
				</Link>
				<Link className="opacity-50" href="/contact">
					Contact
				</Link>
			</div>

			<div>
				<h1 className="mb-2 text-[#efe0fe] font-bold">Contact Us</h1>
				<div className="relative flex items-center">
					<input
						className="rounded-xl focus:border-none focus:outline-none bg-[#373737] p-2"
						type="text"
					/>
					<button className="absolute right-0 bg-[#784cfb] p-1 w-10 rounded-full">
						&gt;
					</button>
				</div>
			</div>
		</div>
		<div className="md:mt-10 mx-auto max-w-4xl mt-5 flex flex-col md:flex-row items-center justify-between pb-4">
			<div>
				<h3>
					Made by{" "}
					<span className="text-[#6440b9] font-semibold">
						<a href="https://github.com/WebDevSync" target="_blank">
							DevSync engineers
						</a>
					</span>
				</h3>
			</div>

			<div className="flex items-center space-x-3">
				<h2>Follow Us ---- Insta Logo</h2>
				<button className="p-3 bg-[#784cfb] rounded-[50%] rotate-90">
					&lt;
				</button>
			</div>
		</div>
	</div>
);

export default Footer;
