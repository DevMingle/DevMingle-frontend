"use client";
import React, { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";
import { github, google } from "@/src/utils/oAuth";
import { Logo } from "@/public";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { userType } from "../../src/utils/types";
import {
    setUser,
    startLoading,
    setError,
} from "../../src/store/features/userSlice";
import Swal from "sweetalert2";

const isNameValid = (name: string) => {
    return name.length >= 3;
};

const isEmailValid = (email: string) => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.toLowerCase().match(emailRegex)) {
        return true;
    } else {
        return false;
    }
};

const isPasswordValid = (password: string) => {
    return password.length >= 8;
};

const isConfirmPasswordValid = (password: string, confirmPassword: string) => {
    if (password.length < 1) return false;
    else return password === confirmPassword;
};

const SignUp = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.userReducer.status);
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
        if (password !== confirmPassword) {
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            return toast.error(
                "Confirm password doesn't match with the password!",
                {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }
            );
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
        try {
            dispatch(startLoading());
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
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
            Swal.fire({
                title: "Success!",
                text: "You were signed up successfully",
                icon: "success",
                confirmButtonText: "Continue",
            }).then(() => {
                dispatch(setUser(data.user as userType));
                window.location.href = "/user/me";
            });
        } catch (err) {
            dispatch(setError(String(err)));
        }
    };
    const isReadyToRegister = () => {
        if (
            acceptedPolicy &&
            isNameValid(formData.name) &&
            isEmailValid(formData.email) &&
            isPasswordValid(formData.password) &&
            isConfirmPasswordValid(formData.password, formData.confirmPassword)
        ) {
            return false;
        } else {
            return true;
        }
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
                        Already have an account?{" "}
                        <Link href="/signin">Sign in</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="relative w-full formInput group">
                        <input
                            type="text"
                            required={true}
                            onChange={handleInputChange}
                            name="name"
                            className={`border-2 duration-300 ${
                                isNameValid(formData.name)
                                    ? "border-green-500"
                                    : "border-red-500"
                            }`}
                        />
                        <span
                            className={`border-2 ${
                                isNameValid(formData.name)
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            Name
                        </span>
                    </div>
                    <div className="relative w-full formInput">
                        <input
                            type="text"
                            required={true}
                            onChange={handleInputChange}
                            name="email"
                            className={`border-2 duration-300 ${
                                isEmailValid(formData.email)
                                    ? "border-green-500"
                                    : "border-red-500"
                            }`}
                        />
                        <span
                            className={`border-2 ${
                                isEmailValid(formData.email)
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            Email address
                        </span>
                    </div>
                    <div className="relative w-full formInput">
                        <input
                            type="password"
                            required={true}
                            onChange={handleInputChange}
                            name="password"
                            className={`border-2 duration-300 ${
                                isPasswordValid(formData.password)
                                    ? "border-green-500"
                                    : "border-red-500"
                            }`}
                        />
                        <span
                            className={`border-2 ${
                                isPasswordValid(formData.password)
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            Password
                        </span>
                    </div>
                    <div className="relative w-full formInput">
                        <input
                            type="password"
                            required={true}
                            onChange={handleInputChange}
                            name="confirmPassword"
                            className={`border-2 duration-300 ${
                                isConfirmPasswordValid(
                                    formData.password,
                                    formData.confirmPassword
                                )
                                    ? "border-green-500"
                                    : "border-red-500"
                            }`}
                        />
                        <span
                            className={`border-2 ${
                                isConfirmPasswordValid(
                                    formData.password,
                                    formData.confirmPassword
                                )
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            Confirm Password
                        </span>
                    </div>
                    <div className="flex justify-start">
                        <div
                            className={`flex gap-2 justify-center items-center text-accent-dark
							${acceptedPolicy ? "brightness-150" : ""}
						`}
                        >
                            <input
                                type="checkbox"
                                className="h-5 w-5"
                                onChange={(e) => {
                                    setAcceptedPolicy(e.target.checked);
                                }}
                            />
                            Accept our policy
                        </div>
                    </div>
                    <button
                        className={`w-full h-12 bg-primary-btn text-xl flex items-center justify-center rounded-lg duration-300  ${
                            isReadyToRegister() === false
                                ? "hover:brightness-95"
                                : "brightness-75 cursor-not-allowed"
                        }`}
                        onClick={handleRegister}
                        disabled={isReadyToRegister()}
                    >
                        {status === "loading" ? "Signin..." : "Sign Up"}
                    </button>
                    <div className="flex justify-center items-center text-accent-dark gap-2"></div>
                </div>
                <div className="flex gap-3 justify-center items-center">
                    <div className="w-32 h-1 bg-slate-600" />
                    Or
                    <div className="w-32 h-1 bg-slate-600" />
                </div>
                <div className="flex justify-center items-center gap-12 md:gap-20">
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
