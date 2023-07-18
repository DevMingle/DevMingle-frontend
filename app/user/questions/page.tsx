import { getQuestions } from "@src/utils/questions";
import React from "react";
import QuestionsPage from "@component/QuestionsPage";

const page = async () => {
    const questions = await getQuestions("", "");
    return (
        <QuestionsPage
            questions={questions.questions}
            availableTags={questions.availableTags}
        />
    );
};

export default page;
