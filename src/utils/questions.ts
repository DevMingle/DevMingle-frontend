import { Question } from "./types";

interface response {
    success: boolean;
    questions: Question[];
}

const getQuestions = async (sortBy: string, filter: string | {}) => {
    const _questions = await fetch(
        process.env.base_url + "/api/questions/getQuestions",
        {
            method: "POST",
            body: JSON.stringify({ sortBy, filter }),
            cache: "no-store",
        }
    );
    const questions: response = await _questions.json();
    return questions["questions"];
};

export { getQuestions };
