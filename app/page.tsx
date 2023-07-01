"use client";
<<<<<<< HEAD
import { motion } from "framer-motion";
import React from "react";
import { BsFillCircleFill } from "react-icons/bs";

const chatMessages: { message: string; delay: number; user: "me" | "other" }[] =
	[
		{
			message: "Hey! How are you?",
			delay: 1,
			user: "other",
		},
		{
			message: "I'm fine!",
			delay: 4,
			user: "me",
		},
		{
			message: "So what are you doing?",
			delay: 7,
			user: "other",
		},
		{
			message:
				"I am finding a site where i can chat like discord and get help in coding problems like stackoverflow.",
			delay: 10,
			user: "me",
		},
		{
			message:
				"Bro, you are at right place , this is the site you are looking for!",
			delay: 13,
			user: "other",
		},
		{
			message:
				"Oh! i never thought a site like this would be made. Thanks for telling!",
			delay: 16,
			user: "me",
		},
	];

const page = () => {
	return (
		<div className="flex flex-col items-center px-10 py-20 min-h-screen w-full">
			<div className="flex items-center w-full gap-10">
				<div className="border-[1.5px] border-slate-600 w-1/2 rounded-lg">
					<div className="flex justify-start items-center gap-3 px-8 py-5">
						<BsFillCircleFill className="text-red-500 text-lg" />
						<BsFillCircleFill className="text-yellow-500 text-lg" />
						<BsFillCircleFill className="text-green-500 text-lg" />
					</div>
					<div className="p-6 flex flex-col gap-5">
						{chatMessages.map((chatMessage) => {
							return (
								<motion.div
									className={`chat ${
										chatMessage.user === "me" ? "chat-start" : "chat-end"
									}`}
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: chatMessage.delay }}
									key={chatMessage.message}
								>
									<div
										className={`chat-bubble ${
											chatMessage.user === "me"
												? "bg-slate-600"
												: "bg-[#641AE6]"
										}`}
									>
										{chatMessage.message}
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
			<div></div>
		</div>
	);
=======
import { decodeToken } from "@/src/utils/jwt";
import React, { useEffect } from "react";

const page = () => {
  useEffect(() => {
    const getUser = async () => {
	  const clientToken = localStorage.getItem("jwt");
	  let token;
	  if(clientToken){
		token = decodeToken(clientToken)
	  }
      const res = await fetch("http://192.168.1.7:8000/api/auth/check", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token && token}`,
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      const data = await res.json();
      console.log(data);
    };
    getUser();
  });
  return <div className="h-screen">page</div>;
>>>>>>> 43cf7768d2b9c23ab49eb2dadfb27b330eaabe89
};

export default page;
