import React from "react";
import QuestionTypeToggler from "./QuestionTypeToggler";
import { fireEvent, render } from "@testing-library/react";

describe("QuestionTypeToggler component test suite", () => {
  test("test render component", () => {
    render(<QuestionTypeToggler currentType="essay" onToggle={() => {}} />);
  });
  test("test change type", async () => {
    let value = "";
    const { getByTestId, getByText, findByText } = render(
      <QuestionTypeToggler
        currentType="mcq"
        onToggle={(_val) => {
          value = _val;
        }}
      />
    );
    const dropdown = getByTestId("QuestionType");
    fireEvent.keyDown(dropdown.firstElementChild!, { key: "ArrowDown" });
    await findByText("Essay");
    fireEvent.click(getByText("Essay"));
    expect(value).toBe("essay");
  });
});
