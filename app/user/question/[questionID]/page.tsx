"use client";
import { getQuestions } from "@src/utils/questions";
import Link from "next/link";
import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Page = async ({ params }: { params: { questionID: string } }) => {
	const [liked, setLiked] = useState(false);
	const questions = await getQuestions("", { _id: params.questionID });
	const question = questions[0];
	return (
		<div className="min-h-screen">
			<div className="w-2/3 mx-auto my-10 py-10 px-5 flex flex-col gap-10">
				<div className="flex justify-around ">
					<Link href="/user/questions">
						<button className="flex items-center justify-center gap-2 px-4 py-2 border-primary-btn border-2 rounded-lg hover:bg-primary-btn duration-300">
							<BsArrowLeft className="text-2xl" />
							Go back
						</button>
					</Link>
					<div
						className="text-4xl hover:scale-110 flex justify-center items-center gap-3 border-primary-btn hover:bg-primary-btn duration-300 border-2 px-3 py-1 rounded-md"
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
				<div className="">
					<ReactMarkdown
						children={question.description}
						remarkPlugins={[remarkGfm]}
						components={{
							code({ node, inline, className, children, ...props }) {
								const match = /language-(\w+)/.exec(className || "");
								return !inline && match ? (
									<SyntaxHighlighter
										{...props}
										children={String(children).replace(/\n$/, "")}
										style={atomDark}
										language={match[1]}
										PreTag="div"
									/>
								) : (
									<code {...props} className={className}>
										{children}
									</code>
								);
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Page;
