"use client"
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { google, github } from "@/src/utils/oAuth";
const SignIn = () => {
	return (
		<main className="p-16 bg-[#e0daf1] text-[#040307] min-h-screen">
			<div className="flex md:shadow-lg md:border-4 md:p-10 space-x-8">
				<div className="mx-auto container flex items-stretch flex-col">
					<div className="mb-10">
						<h1 className="font-bold text-4xl mb-5">Welcome Back!</h1>
						<p>
							Welcome in our service, create account to start your experience
						</p>
					</div>

					<div className="flex items-center space-x-5 mb-9">
						<button className="border text-2xl lg:hidden flex items-center px-3 py-2 border-gray-500 rounded-lg">
							<AiFillGithub />
						</button>

						<button className="border text-2xl lg:hidden flex items-center px-3 py-2 border-gray-500 rounded-lg">
							<FcGoogle />
						</button>

						<button onClick={github} className="border hidden hover:scale-110 transition lg:flex items-center px-3 py-2 border-gray-500 rounded-lg">
							<AiFillGithub className="mr-1" />
							Sign In With Github
						</button>

						<button onClick={google} className="border hidden hover:scale-110 transition lg:flex items-center px-3 py-2 border-gray-500 rounded-lg">
							<FcGoogle className="mr-1" />
							Sign In With Google
						</button>
					</div>

					<div className="flex flex-col max-w-md mb-5">
						<label className="py-3">Email</label>
						<input
							className="px-2 py-3 rounded-md focus:outline-[#c766ae]"
							placeholder="Example@gmail.com"
							type="email"
						/>

						<label className="py-3">Password</label>
						<input
							className="px-2 py-3 rounded-md focus:outline-[#c766ae]"
							placeholder="Password..."
							type="password"
						/>
					</div>

					<div className="max-w-md">
						<input className="accent-[#c766ae]" type="checkbox" />{" "}
						<span>
							I{`'`}m ready to agree to the{" "}
							<span className="font-semibold">privacy policy</span>
						</span>{" "}
						<br />
						<button className="bg-[#ae66c7] hover:bg-[#8a0cb4] transition w-full text-center py-3 rounded-xl my-2">
							Sign In
						</button>
						<p>
							Don{`'`}t have an account?{" "}
							<span className="ml-1 cursor-pointer underline">Sign Up</span>
						</p>
					</div>
				</div>

				<div className="md:flex hidden items-center justify-center">
					<Image
						alt="..."
						src={
							"https://images.pexels.com/photos/4473400/pexels-photo-4473400.jpeg?auto=compress&cs=tinysrgb&w=600"
						}
						width={"900"}
						height={"500"}
					/>
				</div>
			</div>
		</main>
	);
};

export default SignIn;
