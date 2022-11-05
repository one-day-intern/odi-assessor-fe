import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import FormSearch from "./FormSearch";

const mockedFunction = jest.fn();
const mockedSubmit = jest.fn();

describe("Form search test suite", () => {
  beforeEach(() => {
    render(
      <FormSearch
        value=""
        onInputChange={mockedFunction}
        onSubmit={mockedSubmit}
      />
    );
  });

  it("Test if form field render properly", () => {
    const formElement = screen.getByTestId("formField");
    expect(formElement).toBeInTheDocument();
    expect(formElement).not.toHaveAttribute("style");
  });

  it("Test if input field respond to change event", () => {
    const inputElement = screen.getByTestId("inputField");
    fireEvent.change(inputElement, {
      target: {
        value: "hello",
      },
    });

    expect(mockedFunction).toBeCalledTimes(1);
  });

  it("Test if form is submitted properly", () => {
    const formElement = screen.getByTestId("formField");
    fireEvent.submit(formElement);

    expect(mockedSubmit).toBeCalledTimes(1);
  });

  it("Test if input is focused", () => {
    const formElement = screen.getByTestId("formField");
    const inputElement = screen.getByTestId("inputField");

    fireEvent.focus(inputElement);

    expect(formElement).toHaveAttribute("style");

    fireEvent.blur(inputElement);
    expect(formElement).toHaveAttribute("style");
  });
});
