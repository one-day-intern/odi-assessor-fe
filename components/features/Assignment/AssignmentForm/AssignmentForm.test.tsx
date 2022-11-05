import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import AssignmentForm from "./AssignmentForm";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../mocks/createMockRouter";

const mockBack = jest.fn();
const mockPush = jest.fn();

describe("Test create assignment", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ back: mockBack, push: mockPush })}
      >
        <AssignmentForm />
      </RouterContext.Provider>
    );
  });

  it("Test if element rendered properly", () => {
    const mainContent = screen.getByTestId("form-asg");
    expect(mainContent).toBeInTheDocument();
  });
  
  it("Test if going back, router is going back", () => {
    const backButton = screen.getAllByTestId("button")[0];
    fireEvent.click(backButton);

    expect(mockBack).toBeCalledTimes(1);
  });

  it("Test if filling form correctly redirects", async () =>  {
    const inputField = screen.getByTestId("inputField");
    fireEvent.change(inputField, {
      target: {
        value: "blablabla"
      }
    });

    const textAreaField = screen.getByTestId("textAreaField");
    fireEvent.change(textAreaField, {
      target: {
        value: "blablabla"
      }
    });

    const timeField = screen.getByTestId("timeField");
    fireEvent.change(timeField, {
      target: {
        value: "02:05"
      }
    });

    const submitBtn = screen.getAllByTestId("button")[1];
    fireEvent.click(submitBtn);

    await new Promise(resolve => setTimeout(resolve, 500));

    expect(mockPush).toBeCalledTimes(1);
  })
});
