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

  const addQuestion = () => {
    const questionId = uuid();
    const newQuestion: MultipleChoiceQuestion = {
      id: questionId,
      options: [],
      points: 0,
    };
    setQuestions((prev) => [...prev, newQuestion]);
    setCurrentQuestionId(questionId);
  };

  const removeQuestion = (questionId: string) => {
    // prioritize selecting the next question
    if (questionId === currentQuestionId) {
      const removeQuestionIndex = questions.findIndex(
        (question) => question.id === questionId
      );
      const nextQuestion = questions[removeQuestionIndex + 1];
      const prevQuestion = questions[removeQuestionIndex - 1];
      if (nextQuestion) {
        setCurrentQuestionId(nextQuestion.id);
      } else if (prevQuestion) {
        setCurrentQuestionId(prevQuestion.id);
      } else {
        setCurrentQuestionId(undefined);
      }
    }
    setQuestions((prev) =>
      prev.filter((question) => question.id !== questionId)
    );
  };

  const setCurrentQuestionType = (type: "mcq" | "essay") => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id === currentQuestionId) {
          if (Object.hasOwn(question, "options") && type === "essay") {
            const newQuestion: EssayQuestion = {
              id: question.id,
              prompt: question.prompt,
              points: question.points,
              answerKey: "",
            };
            return newQuestion;
          } else if (Object.hasOwn(question, "answerKey") && type === "mcq") {
            const newQuestion: MultipleChoiceQuestion = {
              id: question.id,
              prompt: question.prompt,
              points: question.points,
              options: [],
            };
            return newQuestion;
          }
        }
        return question;
      })
    );
  };

  const setCurrentQuestion = (questionId: string) => {
    setCurrentQuestionId(questionId);
  };

  const nextQuestion = () => {
    const currentQuestionIndex = questions.findIndex(
      (question) => question.id === currentQuestionId
    );
    if (
      currentQuestionIndex !== -1 &&
      currentQuestionIndex < questions.length - 1
    ) {
      setCurrentQuestionId(questions[currentQuestionIndex + 1].id);
    }
  };

  const prevQuestion = () => {
    const currentQuestionIndex = questions.findIndex(
      (question) => question.id === currentQuestionId
    );
    if (currentQuestionIndex !== -1 && currentQuestionIndex > 0) {
      setCurrentQuestionId(questions[currentQuestionIndex - 1].id);
    }
  };

  const updateQuestionPrompt = (questionId: string, prompt: string) => {
    const questionToBeUpdated = questions.find(
      (question) => question.id === questionId
    );
    if (questionToBeUpdated) {
      setQuestions((prev) =>
        prev.map((question) => {
          if (question === questionToBeUpdated) {
            return { ...questionToBeUpdated, prompt: prompt };
          }
          return question;
        })
      );
    }
  };

  const updateQuestionOptions = (
    questionId: string,
    action: UPDATE_ACTIONS,
    option?: MultipleChoiceQuestionOption
  ) => {
    const questionToBeUpdated = questions.find(
      (question) => question.id === questionId
    );
    if (questionToBeUpdated) {
      setQuestions((prev) =>
        prev.map((question) => {
          if (question === questionToBeUpdated) {
            const mcq = questionToBeUpdated as MultipleChoiceQuestion;
            if (action === UPDATE_ACTIONS.ADD) {
              return {
                ...questionToBeUpdated,
                options: [
                  ...mcq.options,
                  { id: uuid(), content: "", correct: false },
                ],
              } as MultipleChoiceQuestion;
            } else if (action === UPDATE_ACTIONS.REMOVE && option) {
              return {
                ...questionToBeUpdated,
                options: mcq.options.filter(
                  (currOption) => currOption.id !== option.id
                ),
              } as MultipleChoiceQuestion;
            } else if (action === UPDATE_ACTIONS.UPDATE && option) {
              return {
                ...questionToBeUpdated,
                options: mcq.options.map((currOption) => {
                  if (currOption.id === option.id) {
                    return option;
                  }
                  // this gives the radio select behaviour
                  // if one option is correct than all others
                  // should be incorrect
                  if (option.correct) {
                    return { ...currOption, correct: false };
                  }
                  return currOption;
                }),
              } as MultipleChoiceQuestion;
            }
          }
          return question;
        })
      );
    }
  };

  const updateQuestionPoints = (questionId: string, points: number) => {
    const questionToBeUpdated = questions.find(
      (question) => question.id === questionId
    );
    if (questionToBeUpdated) {
      setQuestions((questions) =>
        questions.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              points: isNaN(points) || points < 0 ? 0 : points,
            };
          }
          return question;
        })
      );
    }
  };

  const updateQuestionAnswerKey = (questionId: string, answerKey: string) => {
    const questionToBeUpdated = questions.find(
      (question) => question.id === questionId
    );
    if (questionToBeUpdated) {
      setQuestions((questions) =>
        questions.map((question) => {
          if (question.id === questionId) {
            return { ...question, answerKey: answerKey } as EssayQuestion;
          }
          return question;
        })
      );
    }
  };

  const validateQuiz = () => {
    const errorMap: QuizValidationError = new Map();
    for (const question of questions) {
      const currentQuestionErrors = [];
      if (!question.prompt?.trim()) {
        currentQuestionErrors.push("Missing question prompt");
      }
      if (!question.points) {
        currentQuestionErrors.push("Invalid question point(s)");
      }
      const questionIsMcq = Object.hasOwn(question, "options");
      const questionIsEssay = Object.hasOwn(question, "answerKey");
      if (questionIsMcq) {
        let mcq = question as MultipleChoiceQuestion;
        if (mcq.options.length) {
          let correctOptionExists = false;
          for (let option of mcq.options) {
            if (option.correct) {
              correctOptionExists = true;
            }
            if (
              !option.content.trim() &&
              !currentQuestionErrors.includes(
                "Missing content for question option(s)"
              )
            ) {
              currentQuestionErrors.push(
                "Missing content for question option(s)"
              );
            }
          }
          if (!correctOptionExists) {
            currentQuestionErrors.push("Missing correct option");
          }
        } else {
          currentQuestionErrors.push("Missing question option(s)");
        }
      } else if (questionIsEssay) {
        let essay = question as EssayQuestion;
        if (!essay.answerKey.trim()) {
          currentQuestionErrors.push("Missing question answer key");
        }
      }
      if (currentQuestionErrors.length) {
        errorMap.set(question.id, currentQuestionErrors);
      }
    }
    setErrors(errorMap);
  };

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
