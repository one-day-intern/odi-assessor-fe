import React from "react";
import MultipleChoice from "./MultipleChoice";
import { render } from "@testing-library/react";
import { v4 as uuid } from "uuid";

describe("Multiple Choice component test suite", () => {
  test("test render component", () => {
    const id = uuid();
    const options = [{ id: id, content: "Hello", correct: true }];
    const { getByTestId } = render(<MultipleChoice options={options} />);
    getByTestId(`ChoiceOption-${id}`)
  });
  test("test preview mode", () => {
    const id = uuid();
    const options = [{ id: id, content: "Hello", correct: true }];
    render(<MultipleChoice options={options} isPreview />);
  });
  test("test preview mode no options", () => {
    render(<MultipleChoice options={[]} isPreview />);
  });
});
