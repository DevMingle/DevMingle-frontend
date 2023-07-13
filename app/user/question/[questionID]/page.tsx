"use client";
import { getQuestions } from "@src/utils/questions";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
    BsArrowLeft,
    BsClipboard,
    BsClipboardCheck,
    BsFillPencilFill,
} from "react-icons/bs";
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
    const [copied, setCopied] = useState(false);
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
    const handleCopy = () => {
        if (question != undefined) {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2500);
            navigator.clipboard.writeText(question._id);
        }
    };
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
                        <div className="text-justify font-light tracking-tighter text-4xl px-10">
                            {/* {question.question} */}
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Veniam, enim distinctio at perferendis
                            consectetur tempora minima doloribus illum fugiat
                            provident nihil, porro voluptate consequuntur quasi.
                        </div>
                        <div className="border-slate-600 border-2 rounded-lg collapse collapse-arrow bg-base-200">
                            <input
                                type="radio"
                                name="my-accordion-2"
                                checked={true}
                            />
                            <div className="collapse-title text-2xl font-medium">
                                Description of question
                            </div>
                            <div className="collapse-content p-4">
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
                                                const match =
                                                    /language-(\w+)/.exec(
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
                            </div>
                        </div>
                        <div className="border-slate-600 border-2 rounded-lg collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-2xl font-medium">
                                Solution of question
                            </div>
                            <div className="collapse-content p-4">
                                <div className="prose lg:prose-xl">
                                    <ReactMarkdown
                                        children={question.answer}
                                        remarkPlugins={[remarkgfm]}
                                        components={{
                                            code({
                                                node,
                                                inline,
                                                className,
                                                children,
                                                ...props
                                            }) {
                                                const match =
                                                    /language-(\w+)/.exec(
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
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="grow">
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
                            </div>
                            <div className="font-bold text-xl text-slate-400 flex items-center justify-center gap-3">
                                <BsFillPencilFill /> {question.madeBy}
                            </div>
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
