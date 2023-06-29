"use client"
import React, { useEffect } from "react";

const page = () => {
	useEffect(() => {
		const getUser = async () => {
		  const res = await fetch("http://localhost:8000/api/auth/check", {
			method: "GET",
			credentials: "include",
			headers: {
			  Accept: "application/json",
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
};

export default page;
