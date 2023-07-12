"use client";
import { getQuestions } from "@src/utils/questions";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Question } from "@src/utils/types";
import { PulseLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import { Prism } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkgfm from "remark-gfm";
import { MdAssignmentTurnedIn } from "react-icons/md";

const Page = ({ params }: { params: { questionID: string } }) => {
    const [liked, setLiked] = useState(false);
    const [question, setQuestion] = useState<Question | undefined>();
    useEffect(() => {
        async function getQuestion() {
            // await new Promise((r) => setTimeout(r, 5000));
            const questions = await getQuestions("", {
                _id: params.questionID,
            });
            setQuestion(questions[0]);
        }
        getQuestion();
    }, []);
    const str = `
### hello
- hello
- world
~~~js
console.log("hello world");
~~~
    `;
    question != undefined ? console.log(question.description) : "";
    return (
        <div className="min-h-screen">
            <div className="h-screen w-2/3 mx-auto my-10 py-10 px-5 flex flex-col gap-12">
                {question !== undefined ? (
                    <>
                        <div className="flex justify-start">
                            <Link href="/user/questions" className="grow">
                                <button className="flex items-center justify-center gap-2 px-4 py-2 border-primary-btn border-2 rounded-lg hover:bg-primary-btn duration-300">
                                    <BsArrowLeft className="text-2xl" />
                                    Go back
                                </button>
                            </Link>
                            <div
                                className={`text-4xl hover:scale-110 flex justify-center items-center gap-3 border-primary-btn hover:bg-primary-btn duration-300 border-2 px-3 py-1 rounded-md ${
                                    liked ? "bg-primary-btn" : ""
                                }`}
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
                        <div className="text-center font-bold text-4xl">
                            {question.question}
                        </div>
                        <div className="flex items-center justify-center border-2 border-slate-600 rounded-full w-fit gap-4 p-3">
                            <div className=" text-4xl text-primary-btn hover:scale-110 hover:brightness-125 rounded-full duration-150 p-2">
                                <MdAssignmentTurnedIn />
                            </div>
                            <input
                                type="text"
                                className="bg-bg-dark outline-none text-2xl tracking-tight font-light px-2"
                                placeholder="Enter your answer here"
                            />
                        </div>
                        <div className="prose lg:prose-xl">
                            <ReactMarkdown
                                children={str}
                                remarkPlugins={[remarkgfm]}
                                components={{
                                    code({
                                        node,
                                        inline,
                                        className,
                                        children,
                                        ...props
                                    }) {
                                        const match = /language-(\w+)/.exec(
                                            className || ""
                                        );
                                        return !inline && match ? (
                                            <Prism
                                                {...props}
                                                children={String(
                                                    children
                                                ).replace(/\n$/, "")}
                                                style={oneDark}
                                                language={match[1]}
                                                PreTag="div"
                                            />
                                        ) : (
                                            <code
                                                {...props}
                                                className={className}
                                            >
                                                {children}
                                            </code>
                                        );
                                    },
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <PulseLoader
                            color="#9f56fc"
                            margin={5}
                            size={25}
                            speedMultiplier={0.5}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
