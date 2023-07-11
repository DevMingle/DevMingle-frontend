"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/public";
import Image from "next/image";

const MainAnimation = () => {
	const [logoVisible, setLogoVisible] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setLogoVisible(false);
		}, 2500);
	}, []);
	return (
		<motion.div
			className="fixed top-0 left-0 w-full h-screen bg-bg-dark z-[51] flex items-center justify-center"
			initial={{ display: "absolute" }}
			animate={{ display: "none" }}
			transition={{ delay: 5, duration: 0.3 }}
		>
			<AnimatePresence>
				{logoVisible && (
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.5, duration: 2 }}
						exit={{ scale: 2, opacity: 0 }}
					>
						<Image src={Logo} alt="loading..." height={200} width={200} />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default MainAnimation;
