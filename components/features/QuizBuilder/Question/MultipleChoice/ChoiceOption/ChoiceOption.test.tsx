import React from "react";
import ChoiceOption from "./ChoiceOption";
import { fireEvent, render } from "@testing-library/react";
import { v4 as uuid } from "uuid";
import { act } from "react-dom/test-utils";

describe("Choice Option component test suite", () => {
  test("testing render component", () => {
    const id = uuid();
    const { getByTestId } = render(
      <ChoiceOption option={{ id: id, correct: false }} />
    );
    getByTestId(`ChoiceOption-${id}`);
  });
  test("testing correct choice option", () => {
    const id = uuid();
    const { getByTestId } = render(
      <ChoiceOption
        option={{ id: id, content: "Test Option", correct: true }}
      />
    );
    const option = getByTestId(`ChoiceOption-${id}`);
    expect(option.classList).toContain("correct");
  });
  test("test preview choice option", () => {
    const id = uuid();
    const { getByTestId } = render(
      <ChoiceOption
        option={{ id: id, content: "Test Option", correct: true }}
        isPreview
      />
    );
    const option = getByTestId(`ChoiceOption-${id}`);
    expect(option.classList).toContain("preview");
  });
  test("test edit choice option empty content", () => {
    const id = uuid();
    const { getByTestId } = render(
      <ChoiceOption option={{ id: id, correct: true }} />
    );
    const option = getByTestId(`ChoiceOption-${id}`);
    const editButton = getByTestId(`EditButton-${id}`);
    act(() => {
      editButton.click();
    });
    expect(option.classList).toContain("editing");
  });
  test("test edit choice option", () => {
    const id = uuid();
    const { getByTestId } = render(
      <ChoiceOption
        option={{ id: id, content: "Test Option", correct: true }}
      />
    );
    const option = getByTestId(`ChoiceOption-${id}`);
    const editButton = getByTestId(`EditButton-${id}`);
    act(() => {
      editButton.click();
    });
    expect(option.classList).toContain("editing");
  });
  test("test edit choice option callback undefined", () => {
    const id = uuid();
    const { getByTestId } = render(
      <ChoiceOption
        option={{ id: id, content: "Test Option", correct: true }}
      />
    );
    const option = getByTestId(`ChoiceOption-${id}`);
    const editButton = getByTestId(`EditButton-${id}`);
    act(() => {
      editButton.click();
    });
    let editChoice = getByTestId("EditChoiceInput");
    expect(option.classList).toContain("editing");
    act(() => {
      fireEvent.change(editChoice, { target: { value: "Hello" } });
    });
  });
  test("test edit choice option callback", () => {
    const id = uuid();
    let content = "";
    const { getByTestId } = render(
      <ChoiceOption
        option={{ id: id, content: "Test Option", correct: true }}
        onEditOption={(choice) => {
          content = choice.content;
        }}
      />
    );
    const option = getByTestId(`ChoiceOption-${id}`);
    const editButton = getByTestId(`EditButton-${id}`);
    act(() => {
      editButton.click();
    });
    let editChoice = getByTestId("EditChoiceInput");
    expect(option.classList).toContain("editing");
    act(() => {
      fireEvent.change(editChoice, { target: { value: "Hello" } });
    });
    expect(content).toBe("Hello")
  });
  test("test edit choice option cancel", () => {
    const id = uuid();
    const { getByTestId } = render(
      <ChoiceOption
        option={{ id: id, content: "Test Option", correct: true }}
      />
    );
    const option = getByTestId(`ChoiceOption-${id}`);
    const editButton = getByTestId(`EditButton-${id}`);
    act(() => {
      editButton.click();
    });
    act(() => {
      editButton.click();
    });
    expect(option.classList).not.toContain("editing");
  });
  test("test edit choice option blurred", () => {
    const id = uuid();
    const { getByTestId } = render(
      <ChoiceOption
        option={{ id: id, content: "Test Option", correct: true }}
      />
    );
    const option = getByTestId(`ChoiceOption-${id}`);
    let editButton = getByTestId(`EditButton-${id}`);
    act(() => {
      fireEvent.click(editButton);
    });
    let editChoice = getByTestId("EditChoiceInput");
    act(() => {
      fireEvent.blur(editChoice, { relatedTarget: editButton });
    });
    act(() => {
      fireEvent.blur(editChoice);
    });
    expect(option.classList).not.toContain("editing");
  });
  test("test choice option remove callback undefined", () => {
    const id = uuid();
    const { getByTestId } = render(
      <ChoiceOption
        option={{ id: id, content: "Test Option", correct: true }}
      />
    );
    const removeButton = getByTestId(`RemoveChoiceOption`);
    act(() => {
      removeButton.click();
    });
  });
  test("test choice option remove callback undefined", () => {
    const id = uuid();
    let removed = false;
    const { getByTestId } = render(
      <ChoiceOption
        option={{ id: id, content: "Test Option", correct: true }}
        onRemoveOption={() => {
          removed = true;
        }}
      />
    );
    const removeButton = getByTestId(`RemoveChoiceOption`);
    act(() => {
      removeButton.click();
    });
    expect(removed).toBe(true);
  });
  test("test choice option on click callback undefined", () => {
    const id = uuid();
    const { getByTestId } = render(
      <ChoiceOption
        option={{ id: id, content: "Test Option", correct: false }}
      />
    );
    const option = getByTestId(`ChoiceOption-${id}`);
    act(() => {
      option.click();
    });
  });
  test("test choice option on click callback", () => {
    const id = uuid();
    let correct = false;
    const { getByTestId } = render(
      <ChoiceOption
        option={{ id: id, content: "Test Option", correct: false }}
        onEditOption={(option) => {
          correct = option.correct;
        }}
      />
    );
    const option = getByTestId(`ChoiceOption-${id}`);
    act(() => {
      option.click();
    });
    expect(correct).toBe(true);
  });
});
