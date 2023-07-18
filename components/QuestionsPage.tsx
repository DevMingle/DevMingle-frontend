"use client";
import { Question } from "@/src/utils/types";
import React, { useState } from "react";
import {
    AiOutlineSearch,
    AiOutlineClose,
    AiOutlineCheck,
} from "react-icons/ai";
import { MdFilterList } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { RiRestartLine } from "react-icons/ri";

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
                placeholder="Search questions / difficulty: [difficulty/100]"
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
    );
};

const Filter = ({
    availableCategoriesTags,
    selectedCategories,
    setSelectedCategories,
    availableLanguagesTags,
    selectedLanguages,
    setSelectedLanguages,
}: {
    availableCategoriesTags: string[];
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    availableLanguagesTags: string[];
    selectedLanguages: string[];
    setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const [showFilterBox, setShowFilterBox] = useState(false);
    const selectCategory = (event: React.MouseEvent<HTMLDivElement>) => {
        if (selectedCategories.includes(event.currentTarget.id)) {
            setSelectedCategories(
                selectedCategories.filter(
                    (category: string) => category != event.currentTarget.id
                )
            );
        } else
            setSelectedCategories([
                ...selectedCategories,
                event.currentTarget.id,
            ]);
    };
    const selectLanguage = (event: React.MouseEvent<HTMLDivElement>) => {
        if (selectedLanguages.includes(event.currentTarget.id)) {
            setSelectedLanguages(
                selectedLanguages.filter(
                    (language: string) => language != event.currentTarget.id
                )
            );
        } else
            setSelectedLanguages([
                ...selectedLanguages,
                event.currentTarget.id,
            ]);
    };
    return (
        <div className="flex justify-end items-center w-1/3 mx-auto">
            <div className="relative">
                <div
                    className="border-[1px] border-slate-500 flex items-center justify-center gap-3 bg-slate-700 rounded-lg p-2 cursor-pointer"
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
                            <div
                                className="absolute top-2 right-5 text-2xl hover:text-red-500 duration-150 cursor-pointer"
                                onClick={() => {
                                    setSelectedCategories(
                                        availableCategoriesTags
                                    );
                                    setSelectedLanguages(
                                        availableLanguagesTags
                                    );
                                }}
                            >
                                <RiRestartLine />
                            </div>
                            <div className="p-2">
                                <div className="text-center text-xl font-medium px-2 py-4 mx-auto p-2">
                                    categories
                                </div>
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    {availableCategoriesTags.map(
                                        (tag: string) => {
                                            return (
                                                <div
                                                    key={tag}
                                                    className="w-full text-lg font-extralight flex justify-around items-center cursor-pointer"
                                                    id={tag}
                                                    onClick={selectCategory}
                                                >
                                                    {tag}
                                                    <AiOutlineCheck
                                                        className={`text-xl ${
                                                            selectedCategories.includes(
                                                                tag
                                                            )
                                                                ? "visible"
                                                                : "invisible"
                                                        }`}
                                                    />
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                            <div className="w-[2px] h-[80%] bg-slate-800"></div>
                            <div className="p-2">
                                <div className="text-center text-xl font-medium px-2 py-4 mx-auto">
                                    languages
                                </div>
                                <div className="flex flex-col gap-2 items-center justify-center p-2">
                                    {availableLanguagesTags.map(
                                        (tag: string) => {
                                            return (
                                                <div
                                                    key={tag}
                                                    className="w-full text-lg font-extralight flex justify-around items-center cursor-pointer"
                                                    id={tag}
                                                    onClick={selectLanguage}
                                                >
                                                    {tag}
                                                    <AiOutlineCheck
                                                        className={`text-xl ${
                                                            selectedLanguages.includes(
                                                                tag
                                                            )
                                                                ? "visible"
                                                                : "invisible"
                                                        }`}
                                                    />
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
        </div>
    );
};

const Questions = () => {
    return (
        <div className="flex flex-col gap-5 py-8 px-2">
            <div>questions</div>
        </div>
    );
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
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        availableCategoriesTags
    );
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
        availableLanguagesTags
    );

    const handleSearch = () => {
        if (searchText == "") {
            setFilteredQuestions(questions);
            return;
        } else {
            setFilteredQuestions(
                questions.filter((question: Question) => {
                    return question.question
                        .toLowerCase()
                        .includes(searchText.toLowerCase());
                })
            );
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
            />
            <div className="w-3/5 mx-auto">
                <Questions />
            </div>
        </div>
    );
};

export default QuestionsPage;
