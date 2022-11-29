import React from "react";
import QuizBuilder from "./QuizBuilder";
import { render } from "@testing-library/react";

describe("QuizBuilder component test suite", () => {
  test("test render component", () => {
    render(<QuizBuilder />);
  });
});
