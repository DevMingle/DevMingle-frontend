"use client";
import { Question } from "@/src/utils/types";
import React, { useState, useEffect } from "react";
import {
    AiOutlineSearch,
    AiOutlineClose,
    AiOutlineArrowRight,
    AiOutlineLike,
} from "react-icons/ai";
import { MdFilterList } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({
    handleSearch,
    handleEnterPress,
    searchText,
    setSearchText,
}: {
    handleSearch: () => void;
    handleEnterPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    searchText: any;
    setSearchText: any;
}) => {
    return (
        <div className="flex gap-4 border-slate-600 border-2 rounded-full p-3 relative my-10 w-2/3 md:w-1/3 mx-auto">
            <div
                className="flex items-center justify-center text-3xl p-2 rounded-full bg-primary-btn hover:scale-105 duration-150 hover:brightness-125"
                onClick={handleSearch}
            >
                <AiOutlineSearch />
            </div>
            <input
                type="text"
                placeholder="search / difficulty: d [operator] [difficulty/100]"
                className="w-full outline-none text-2xl font-light tracking-tight bg-bg-dark px-5"
                value={searchText}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchText(event.target.value)
                }
                onKeyDown={handleEnterPress}
            />
            {searchText != "" ? (
                <div className="flex justify-center items-center pr-6">
                    <div className="text-red-500 text-3xl cursor-pointer bg-bg-dark">
                        <AiOutlineClose onClick={() => setSearchText("")} />
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

const Filter = ({
    availableCategoriesTags,
    selectedCategories,
    setSelectedCategories,
    availableLanguagesTags,
    selectedLanguages,
    setSelectedLanguages,
    filteredQuestions,
    setFilteredQuestions,
    questions,
}: {
    availableCategoriesTags: string[];
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    availableLanguagesTags: string[];
    selectedLanguages: string[];
    setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
    filteredQuestions: Question[];
    questions: Question[];
    setFilteredQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}) => {
    const [showFilterBox, setShowFilterBox] = useState(false);
    const selectCategory = (event: React.MouseEvent<HTMLDivElement>) => {
        if (selectedCategories.includes(event.currentTarget.id)) {
            setSelectedCategories(
                selectedCategories.filter(
                    (category: string) => category != event.currentTarget.id
                )
            );
        } else {
            setSelectedCategories([
                ...selectedCategories,
                event.currentTarget.id,
            ]);
        }
    };
    useEffect(() => {
        if (selectedCategories.length == 0 && selectedLanguages.length == 0) {
            setFilteredQuestions(questions);
        } else if (
            selectedCategories.length == 0 &&
            selectedLanguages.length != 0
        ) {
            setFilteredQuestions(
                questions.filter((question: Question) => {
                    return question.languages.some((language: string) => {
                        return selectedLanguages.includes(language);
                    });
                })
            );
        } else if (
            selectedCategories.length != 0 &&
            selectedLanguages.length == 0
        ) {
            setFilteredQuestions(
                questions.filter((question: Question) => {
                    return question.categories.some((category: string) => {
                        return selectedCategories.includes(category);
                    });
                })
            );
        } else {
            setFilteredQuestions(
                questions.filter((question: Question) => {
                    return (
                        question.categories.some((category: string) => {
                            return selectedCategories.includes(category);
                        }) &&
                        question.languages.some((language: string) => {
                            return selectedLanguages.includes(language);
                        })
                    );
                })
            );
        }
    }, [selectedCategories, selectedLanguages]);
    const selectLanguage = (event: React.MouseEvent<HTMLDivElement>) => {
        if (selectedLanguages.includes(event.currentTarget.id)) {
            setSelectedLanguages(
                selectedLanguages.filter(
                    (language: string) => language != event.currentTarget.id
                )
            );
        } else {
            setSelectedLanguages([
                ...selectedLanguages,
                event.currentTarget.id,
            ]);
        }
    };
    return (
        <div className="flex justify-start items-center w-1/3 mx-auto">
            <div className="relative grow">
                <div
                    className="w-fit border-[1px] border-slate-500 flex items-center justify-center gap-3 bg-slate-700 rounded-lg p-2 cursor-pointer"
                    onClick={() => setShowFilterBox(!showFilterBox)}
                >
                    <div className="text-xl font-medium">filter</div>
                    <MdFilterList className="text-3xl" />
                </div>
                {showFilterBox && (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="flex gap-4 absolute left-0 mt-2 w-fit p-3 bg-slate-700 rounded-lg border-[1px] border-slate-500"
                        >
                            <div className="p-2">
                                <div className="text-center text-xl font-bold px-2 py-4 mx-auto p-2">
                                    categories
                                </div>
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    {availableCategoriesTags.map(
                                        (tag: string) => {
                                            return (
                                                <div
                                                    key={tag}
                                                    className={`w-full text-lg font-extralight flex justify-center items-center duration-500 cursor-pointer rounded-2xl ${
                                                        selectedCategories.includes(
                                                            tag
                                                        )
                                                            ? "bg-slate-500"
                                                            : ""
                                                    }`}
                                                    id={tag}
                                                    onClick={selectCategory}
                                                >
                                                    {tag}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                            <div className="p-2">
                                <div className="text-center text-xl font-bold px-2 py-4 mx-auto p-2">
                                    languages
                                </div>
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    {availableLanguagesTags.map(
                                        (tag: string) => {
                                            return (
                                                <div
                                                    key={tag}
                                                    className={`w-full text-lg font-extralight flex justify-center items-center duration-500 cursor-pointer rounded-2xl ${
                                                        selectedLanguages.includes(
                                                            tag
                                                        )
                                                            ? "bg-slate-500"
                                                            : ""
                                                    }`}
                                                    id={tag}
                                                    onClick={selectLanguage}
                                                >
                                                    {tag}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
            <div
                className="text-xl font-extralight text-text-dark/70 hover:text-text-dark duration-150 cursor-pointer"
                onClick={() => {
                    setSelectedCategories([]);
                    setSelectedLanguages([]);
                }}
            >
                clear filters
            </div>
        </div>
    );
};

const Question = ({ question }: { question: Question }) => {
    const [liked, setLiked] = useState(false);
    const DifficultyColors = (difficulty: number) => {
        if (difficulty <= 30) {
            return "text-green-500";
        } else if (difficulty <= 60) {
            return "text-orange-500";
        } else {
            return "text-red-500";
        }
    };
    return (
        <div className="rounded-xl bg-slate-700 p-6 flex flex-col gap-4">
            <div className="flex justify-center items-center">
                <div className="flex items-center gap-2 grow">
                    {question.categories.map((category: string) => {
                        return (
                            <div
                                key={category}
                                className="badge border-0 bg-primary-btn"
                            >
                                {category}
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center gap-2">
                    {question.languages.map((language: string) => {
                        return (
                            <div
                                key={language}
                                className="badge border-0 bg-blue-500"
                            >
                                {language}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="text-2xl font-medium ">{question.question}</div>
            <a className="text-purple-400 inline-flex items-center gap-2">
                Learn More
                <AiOutlineArrowRight className="text-base" />
            </a>
            <div className="flex justify-center items-center">
                <div className="grow">
                    <div className="w-fit">
                        <div
                            className={`radial-progress ${DifficultyColors(
                                question.difficulty
                            )}`}
                            style={
                                {
                                    "--value": question.difficulty,
                                    "--size": "4rem",
                                    "--thickness": "0.4rem",
                                } as React.CSSProperties
                            }
                        >
                            <div className="text-text-dark">
                                {question.difficulty}%
                            </div>
                        </div>
                    </div>
                </div>
                <motion.div
                    className="flex flex-row gap-2 items-center cursor-pointer justify-center text-lg"
                    onClick={() => setLiked(!liked)}
                    initial={{ x: 0, y: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <AiOutlineLike
                        className={`text-3xl ${liked ? "text-blue-500" : ""}`}
                    />
                    {question.likes}
                </motion.div>
            </div>
        </div>
    );
};

const Questions = ({ questions }: { questions: Question[] }) => {
    if (questions.length != 0) {
        return (
            <div className="flex flex-col gap-10 py-8 px-2">
                {questions.map((question: Question) => {
                    return (
                        <Question question={question} key={question.question} />
                    );
                })}
            </div>
        );
    } else {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-2xl font-bold">
                No questions found
            </div>
        );
    }
};

const QuestionsPage = ({
    questions,
    availableTags,
}: {
    questions: Question[];
    availableTags: any;
}) => {
    const availableCategoriesTags = availableTags.categories;
    const availableLanguagesTags = availableTags.languages;
    const [filteredQuestions, setFilteredQuestions] =
        useState<Question[]>(questions);
    const [searchText, setSearchText] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const handleSearch = () => {
        if (searchText == "") {
            setFilteredQuestions(questions);
            return;
        } else {
            if (searchText.match(/difficulty:\s*/)) {
                if (searchText.match(/difficulty:\s*([1-9]\d?|100)\b/i)) {
                    try {
                        setFilteredQuestions(
                            questions.filter((question: Question) => {
                                return (
                                    question.difficulty ==
                                    Number(
                                        searchText.match(
                                            /difficulty:\s*([1-9]\d?|100)\b/i
                                        )?.[1]
                                    )
                                );
                            })
                        );
                    } catch (error) {
                        return;
                    }
                } else if (
                    searchText.match(/difficulty:\s*d\s*(>=|<=)\s*(\d+)/i)
                ) {
                    try {
                        let formattedSearchText: RegExpMatchArray | null =
                            searchText.match(
                                /difficulty:\s*d\s*(>=|<=)\s*(\d+)/i
                            );
                        if (formattedSearchText !== null) {
                            let operator = formattedSearchText[1];
                            let number = Number(formattedSearchText[2]);
                            if (operator == "<=") {
                                setFilteredQuestions(
                                    questions.filter((question: Question) => {
                                        return question.difficulty <= number;
                                    })
                                );
                            } else if (operator == ">=") {
                                setFilteredQuestions(
                                    questions.filter((question: Question) => {
                                        return question.difficulty >= number;
                                    })
                                );
                            }
                        } else {
                            setFilteredQuestions([]);
                        }
                    } catch (error) {
                        return;
                    }
                }
            } else {
                setFilteredQuestions(
                    questions.filter((question: Question) => {
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
            <SearchBar
                handleEnterPress={handleEnterPress}
                handleSearch={handleSearch}
                searchText={searchText}
                setSearchText={setSearchText}
            />
            <Filter
                availableCategoriesTags={availableCategoriesTags}
                availableLanguagesTags={availableLanguagesTags}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedLanguages={selectedLanguages}
                setSelectedLanguages={setSelectedLanguages}
                filteredQuestions={filteredQuestions}
                setFilteredQuestions={setFilteredQuestions}
                questions={questions}
            />
            <div className="w-[50%] mx-auto mt-10">
                <Questions questions={filteredQuestions} />
            </div>
        </div>
    );
};

export default QuestionsPage;
