import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import GradingForm from "./GradingForm";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../mocks/createMockRouter";

const mockPush = jest.fn();
const grader = jest
  .fn()
  .mockImplementation((grade: number, note: string) =>
    console.log(grade, note)
  );

describe("GradingForm test suite", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={createMockRouter({ push: mockPush })}>
        <GradingForm grader={grader} status="loading" />
      </RouterContext.Provider>
    );
  });

  it("Test if element renders properly", () => {
    const gradingForm = screen.getByTestId("grading-form");
    expect(gradingForm).toBeInTheDocument();
  });

  it("Test if gradeInputisChanged to non-number", () => {
    const numberInputter = screen.getByTestId("inputField");
    fireEvent.change(numberInputter, {
      target: {
        value: "13.a",
      },
    });
    expect((numberInputter as HTMLInputElement).value).toBe("");
  });

  it("Test if gradeInputisChanged to number", () => {
    const numberInputter = screen.getByTestId("inputField");
    fireEvent.change(numberInputter, {
      target: {
        value: "13.",
      },
    });
    expect((numberInputter as HTMLInputElement).value).toBe("13.");
  });

  it("Test submission of scores", async () => {
    const numberInputter = screen.getByTestId("inputField");
    fireEvent.change(numberInputter, {
      target: {
        value: "13",
      },
    });

    const button = screen.getByTestId("button");
    fireEvent.click(button);

    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
});
