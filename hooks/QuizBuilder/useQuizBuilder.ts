import { useState } from "react";
import { v4 as uuid } from "uuid";

export enum UPDATE_ACTIONS {
  ADD,
  REMOVE,
  UPDATE,
}

const useQuizBuilder = (initialQuestions?: Question[]): QuizBuilderHook => {
  const [questions, setQuestions] = useState<Question[]>(
    initialQuestions ?? []
  );
  const [currentQuestionId, setCurrentQuestionId] = useState<string>();
  const [errors, setErrors] = useState<QuizValidationError>(new Map());

  const addQuestion = () => {};

  const removeQuestion = (questionId: string) => {};

  const setCurrentQuestionType = (type: "mcq" | "essay") => {};

  const setCurrentQuestion = (questionId: string) => {};

  const nextQuestion = () => {};

  const prevQuestion = () => {};

  const updateQuestionPrompt = (questionId: string, prompt: string) => {};

  const updateQuestionOptions = (
    questionId: string,
    action: UPDATE_ACTIONS,
    option?: MultipleChoiceQuestionOption
  ) => {};

  const updateQuestionPoints = (questionId: string, points: number) => {};

  const updateQuestionAnswerKey = (questionId: string, answerKey: string) => {};

  const validateQuiz = () => {};

  return {
    questions,
    currentQuestion: questions.find(
      (question) => question.id === currentQuestionId
    ),
    addQuestion,
    removeQuestion,
    controller: {
      updateQuestionPrompt,
      updateQuestionPoints,
      updateQuestionAnswerKey,
      updateQuestionOptions,
      setCurrentQuestion,
      setCurrentQuestionType,
      nextQuestion,
      prevQuestion,
    },
    meta: {
      currentQuestionId,
      errors,
      setQuestions,
      validateQuiz,
    },
  };
};

export default useQuizBuilder;
