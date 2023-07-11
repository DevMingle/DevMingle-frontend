"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
    BsClipboard,
    BsClipboardCheck,
    BsFillPencilFill,
} from "react-icons/bs";
import { Question } from "@src/utils/types";

const questionCard = ({ question }: { question: Question }) => {
    const [liked, setLiked] = useState(false);
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2500);
        navigator.clipboard.writeText(question._id);
    };
    return (
        <div className="w-full flex justify-center gap-5 relative flex-col bg-slate-700 p-6 rounded-xl shadow-2xl">
            <Link href={`/user/question/${question._id}`}>
                <div className="font-bold text-3xl hover:text-primary-btn duration-150 hover:brightness-150">
                    {question.question}
                </div>
            </Link>
            <div
                className="flex items-center gap-3 text-xl cursor-pointer w-fit"
                onClick={handleCopy}
            >
                <div>
                    {!copied ? (
                        <BsClipboard />
                    ) : (
                        <BsClipboardCheck className="text-green-500" />
                    )}
                </div>
                <div className=" text-slate-400 font-extralight">{`${question._id.substring(
                    0,
                    10
                )}...`}</div>
            </div>
            <div className="flex items-center justify-between">
                <div className=" flex gap-2">
                    {question.categories.map((category) => {
                        return (
                            <div
                                key={category}
                                className="bg-primary-btn rounded-md text-center px-4 py-1 font-extralight"
                            >
                                {category}
                            </div>
                        );
                    })}
                </div>
                <div className="font-bold text-xl text-slate-400 flex items-center justify-center gap-3">
                    <BsFillPencilFill /> {question.madeBy}
                </div>
            </div>
            <div
                className="absolute top-6 right-6 text-4xl hover:scale-110 flex justify-center items-center gap-3 border-primary-btn hover:bg-primary-btn duration-300 border-2 px-3 py-1 rounded-md"
                onClick={() => setLiked(!liked)}
            >
                <div className="text-2xl">{question.likes}</div>
                <div>
                    {liked ? (
                        <AiFillHeart className="text-red-500" />
                    ) : (
                        <AiOutlineHeart />
                    )}
                </div>
            </div>
        </div>
    );
};

export default questionCard;
