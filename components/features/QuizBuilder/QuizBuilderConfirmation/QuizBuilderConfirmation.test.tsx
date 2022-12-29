import React from "react";
import QuizBuilderConfirmation from "./QuizBuilderConfirmation";
import { render, renderHook } from "@testing-library/react";
import useQuizBuilder from "../../../../hooks/QuizBuilder";
import { v4 as uuid } from "uuid";

const questions = [
  {
    id: uuid(),
    prompt: "Hello World",
    points: 5,
    options: [{ id: uuid(), content: "Hello", correct: true }],
  },
  {
    id: uuid(),
    prompt: "Hello World",
    points: 10,
    answerKey: "World"
  }
];

describe("Quiz Builder Confirmation test suite", () => {
  test("test render component", () => {
    const { result } = renderHook(() => useQuizBuilder(questions));
    render(<QuizBuilderConfirmation setIsSaving={() => {}} builder={result.current} />)
  });
});
