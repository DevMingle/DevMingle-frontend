"use client";
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
};

export default page;
