import { Question } from "./types";

interface response {
    success: boolean;
    questions: Question[];
}

const getQuestions = async (sortBy: string, filter: string | {}) => {
    const _questions = await fetch(
        process.env.BACKEND_URL + "/questions/getQuestions",
        {
            method: "POST",
            body: JSON.stringify({ sortBy, filter }),
            cache: "no-store",
        }
    );
    const questions: response = await _questions.json();
    let availableTags;
    for (let index = 0; index < questions.questions.length; index++) {
        const element = questions.questions[index];
        if (element?.type) {
            questions.questions.splice(index, 1);
            availableTags = element.availableTags;
        }
    }
    return { questions: questions["questions"], availableTags: availableTags };
};

export { getQuestions };
