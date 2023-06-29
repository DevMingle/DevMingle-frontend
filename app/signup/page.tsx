"use client";
import React, { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";
import { github, google } from "@/src/utils/oAuth";
import { encodeToken } from "@/src/utils/jwt";

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
  const handleRegister = async (
    e: React.MouseEventHandler<HTMLButtonElement>
  ) => {
    const { name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) return alert("Passwords dont match");
    if (password.length < 8) return alert("Please enter a strong password");
    if (name.length < 3) return alert("Please enter a valid name");
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return alert("Please enter a valid email");
    try {
      const res = await fetch("http://192.168.1.7:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) return alert(data.message);
      const clientToken = await encodeToken(data.token)
      console.log(data.token, clientToken)
      localStorage.setItem("jwt", clientToken);
    } catch (err) {}
  };
  return (
    <main className="p-16 bg-[#e0daf1] text-[#040307] min-h-screen">
      <div className="flex md:shadow-lg md:border-4 md:p-10 space-x-8">
        <div className="mx-auto container flex items-stretch flex-col">
          <div className="mb-10">
            <h1 className="font-bold text-4xl mb-5">Get Started Now</h1>
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

            <button
              onClick={github}
              className="border hidden hover:scale-110 transition lg:flex items-center px-3 py-2 border-gray-500 rounded-lg"
            >
              <AiFillGithub className="mr-1" />
              Sign Up With Github
            </button>

            <button
              onClick={google}
              className="border hidden hover:scale-110 transition lg:flex items-center px-3 py-2 border-gray-500 rounded-lg"
            >
              <FcGoogle className="mr-1" />
              Sign Up With Google
            </button>
          </div>

          <div className="flex flex-col max-w-md mb-5">
            <label className="py-3">Username</label>
            <input
              onChange={handleInputChange}
              name="name"
              className="px-2 py-3 rounded-md focus:outline-[#c766ae]"
              placeholder="Username..."
              type="text"
            />

            <label className="py-3">Email</label>
            <input
              onChange={handleInputChange}
              name="email"
              className="px-2 py-3 rounded-md focus:outline-[#c766ae]"
              placeholder="Example@gmail.com"
              type="email"
            />

            <label className="py-3">Password</label>
            <input
              onChange={handleInputChange}
              name="password"
              className="px-2 py-3 rounded-md focus:outline-[#c766ae]"
              placeholder="Password..."
              type="password"
            />

            <label className="py-3">Confirm Password</label>
            <input
              onChange={handleInputChange}
              name="confirmPassword"
              className="px-2 py-3 rounded-md focus:outline-[#c766ae]"
              placeholder="Confirm Password"
              type="password"
            />
          </div>

          <div className="max-w-md">
            <input
              checked={acceptedPolicy}
              onChange={(e) => {
                setAcceptedPolicy(e.target.checked);
              }}
              className="accent-[#c766ae]"
              type="checkbox"
            />{" "}
            <span>
              I{`'`}m ready to agree to the{" "}
              <span className="font-semibold">privacy policy</span>
            </span>{" "}
            <br />
            <button
              disabled={!acceptedPolicy}
              onClick={handleRegister}
              className={`bg-[#ae66c7] ${
                acceptedPolicy && "hover:bg-[#8a0cb4]"
              } transition w-full text-center py-3 rounded-xl my-2`}
            >
              Sign Up
            </button>
            <p>
              Already have account?{" "}
              <Link href={"/signin"} className="ml-1 cursor-pointer underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="md:flex hidden items-center justify-center">
          <Image
            src={
              "https://images.pexels.com/photos/4473400/pexels-photo-4473400.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
            width={"900"}
            height={"500"}
            alt="..."
          />
        </div>
      </div>
    </main>
  );
};

export default SignUp;
