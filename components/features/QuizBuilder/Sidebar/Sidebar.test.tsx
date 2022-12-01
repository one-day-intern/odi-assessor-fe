import React from "react";
import Sidebar from "./Sidebar";
import useQuizBuilder from "../../../../hooks/QuizBuilder";
import { render, renderHook } from "@testing-library/react";

describe("Sidebar component test suite", () => {
  test("test render component", () => {
    const { result } = renderHook(() => useQuizBuilder());
    const { getByTestId } = render(
      <Sidebar onSave={() => {}} builder={result.current} />
    );
    getByTestId("BuilderSidebar")
  });
});
