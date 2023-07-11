"use client";
import React, { useState, useEffect, use } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import QuestionCard from "@component/questionCard";
import { getQuestions } from "@src/utils/questions";
import { ClipLoader } from "react-spinners";
import { Question } from "@src/utils/types";

const page = () => {
	const [searchText, setSearchText] = useState("");
	const [questions, setQuestions] = useState<Question[] | undefined>(undefined);
	const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

	useEffect(() => {
		async function _getQuestions() {
			// await new Promise((resolve) => setTimeout(resolve, 9000));
			const _questions = await getQuestions("", "");
			setQuestions(_questions);
			setFilteredQuestions(_questions);
		}
		_getQuestions();
	}, []);
	const handleSearch = () => {
		if (questions != undefined) {
			if (searchText == "") {
				setFilteredQuestions(questions as Question[]);
				return;
			} else {
				let _questions = questions as Question[];
				setFilteredQuestions(
					_questions.filter((question: Question) => {
						return question.question
							.toLowerCase()
							.includes(searchText.toLowerCase());
					})
				);
			}
		}
	};
	const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		event.key == "Enter" ? handleSearch() : null;
	};
	return (
		<div className="min-h-screen">
			<div className="my-10 w-2/3 md:w-1/3 mx-auto flex gap-4 border-slate-600 border-2 rounded-full p-3 relative">
				<div
					className="flex items-center justify-center text-3xl p-2 rounded-full bg-primary-btn hover:scale-105 duration-150 hover:brightness-125"
					onClick={handleSearch}
				>
					<AiOutlineSearch />
				</div>
				<input
					type="text"
					placeholder="Search questions"
					className="w-full outline-none text-2xl font-light tracking-tight bg-bg-dark px-5"
					value={searchText}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setSearchText(event.target.value)
					}
					onKeyDown={handleEnterPress}
				/>
				{searchText != "" ? (
					<div className="absolute right-7 top-[20px] text-red-500 text-3xl cursor-pointer">
						<AiOutlineClose onClick={() => setSearchText("")} />
					</div>
				) : (
					""
				)}
			</div>
			<div className="w-3/4 md:w-2/4 mx-auto py-20 px-2 flex flex-col gap-16">
				{questions != undefined ? (
					filteredQuestions.map((question: any) => {
						return <QuestionCard key={question.question} question={question} />;
					})
				) : (
					<div className="m-auto">
						<ClipLoader color="#9f56fc" size={81} speedMultiplier={0.8} />
					</div>
				)}
				{questions != undefined && filteredQuestions.length == 0 && (
					<div className="m-auto text-3xl font-bold">No questions found</div>
				)}
			</div>
		</div>
	);
};

export default page;
