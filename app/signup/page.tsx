"use client";
import React, { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";
import { github, google } from "@/src/utils/oAuth";
import { Logo } from "@/public";
import { ToastContainer, toast } from "react-toastify";
import { encodeToken } from "@/src/utils/jwt";
import "react-toastify/dist/ReactToastify.css";
import { BsGooglePlay } from "react-icons/bs";

const SignUp = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [acceptedPolicy, setAcceptedPolicy] = useState(false);

	const handleInputChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [target.name]: target.value });
	};

	const handleRegister = async (e: React.MouseEvent<HTMLElement>) => {
		const { name, email, password, confirmPassword } = formData;
		if (password !== confirmPassword) {
			setFormData({ name: "", email: "", password: "", confirmPassword: "" });
			return toast.error("Confirm password doesn't match with the password!", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
		if (password.length < 8) {
			return toast.error("Plase choose a strong password!", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
		if (name.length < 3) {
			return toast.error("Please choose a valid name!", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
		if (!acceptedPolicy) {
			return toast.error("Please accept our policy to continue!", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
		if (
			!email
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			return toast.error("Please choose a valid email!", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
		try {
			const res = await fetch("http://localhost:8000/api/auth/register", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (!data.success)
				return toast.error(data.message, {
					position: "top-center",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
			const clientToken = await encodeToken(data.token);
			console.log(data.token, clientToken);
			localStorage.setItem("jwt", clientToken);
		} catch (err) {}
		e.preventDefault();
	};
	return (
		<div className="min-h-screen flex flex-col justify-center items-center p-10">
			<ToastContainer
				position="top-center"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<div className="flex flex-col justify-center gap-10">
				<div className="flex items-center justify-center flex-col gap-5">
					<Image src={Logo} alt="loading..." width={70} height={30} />
					<div className="text-4xl font-semibold">Sign Up</div>
					<div className="flex gap-2 hover:brightness-150 duration-300 text-accent-dark ">
						Already have an account? <Link href="/signin">Sign in</Link>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<div className="relative w-full formInput">
						<input
							type="text"
							required={true}
							onChange={handleInputChange}
							name="name"
						/>
						<span>Name</span>
					</div>
					<div className="relative w-full formInput">
						<input
							type="text"
							required={true}
							onChange={handleInputChange}
							name="email"
						/>
						<span>Email address</span>
					</div>
					<div className="relative w-full formInput">
						<input
							type="password"
							required={true}
							onChange={handleInputChange}
							name="password"
						/>
						<span>Password</span>
					</div>
					<div className="relative w-full formInput">
						<input
							type="password"
							required={true}
							onChange={handleInputChange}
							name="confirmPassword"
						/>
						<span>Confirm Password</span>
					</div>
					<div className="flex justify-around text-accent-dark">
						<div className="flex gap-2 justify-center items-center">
							<input
								type="checkbox"
								className="h-5 w-5"
								onChange={(e) => {
									setAcceptedPolicy(e.target.checked);
								}}
							/>
							Accept our policy
						</div>
						<Link href="/signup">Forgot password?</Link>
					</div>
					<button
						className={`w-full h-12 bg-primary-btn text-xl flex items-center justify-center rounded-lg duration-300  ${
							acceptedPolicy ? "hover:bg-opacity-60" : "bg-opacity-80"
						}`}
						onClick={handleRegister}
						disabled={!acceptedPolicy}
					>
						Sign Up
					</button>
					<div className="flex justify-center items-center text-accent-dark gap-2"></div>
				</div>
				<div className="flex gap-3 justify-center items-center">
					<div className="w-32 h-1 bg-slate-600" />
					Or
					<div className="w-32 h-1 bg-slate-600" />
				</div>
				<div className="flex justify-center items-center gap-20">
					<div
						className="flex items-center justify-center gap-4 border-slate-600 hover:bg-slate-600 cursor-pointer rounded-lg border-2 p-3 duration-300"
						onClick={google}
					>
						<FcGoogle className="text-3xl" />
						Google
					</div>
					<div
						className="flex items-center justify-center gap-4 border-slate-600 hover:bg-slate-600 cursor-pointer rounded-lg border-2 p-3 duration-300"
						onClick={github}
					>
						<AiFillGithub className="text-3xl" />
						Github
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
