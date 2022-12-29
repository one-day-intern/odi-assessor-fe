import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { AssessorDetails } from "./AssessorDetails";

import { AssessorSignupStoreProvider } from "../../../../context/Signup/AssessorSignupStoreContext";
import { AssessorSignupStepProvider } from "../../../../context/Signup/AssessorSignupStepContext";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../mocks/createMockRouter";

const google = jest.fn();

describe("Assessor Details Test", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <AssessorSignupStepProvider googleLoginCallback={google}>
          <AssessorSignupStoreProvider>
            <AssessorDetails googleLogin={google}/>
          </AssessorSignupStoreProvider>
        </AssessorSignupStepProvider>
      </RouterContext.Provider>
    );
  });

  it("Test if element renders properly", () => {
    const form = screen.getByTestId("form");
    expect(form).toBeInTheDocument();
  });

  it("Test if when input is invalid, first element is focused", () => {
    const button = screen.getByTestId("button");
    fireEvent.click(button);

    const firstInputElement = screen.getAllByTestId("inputField")[0];
    expect(firstInputElement).toHaveFocus();
  });

  it("Test if input is valid, no error shows up", () => {
    const [fNameElement, lastNameElement, dateOfBirth] =
      screen.getAllByTestId("inputField");
    fireEvent.change(fNameElement, {
      target: {
        value: "Rashad",
      },
    });
    fireEvent.change(lastNameElement, {
      target: {
        value: "Aziz",
      },
    });

    fireEvent.change(dateOfBirth, {
      target: {
        value: "2021-11-10",
      },
    });
    const errorMessage = screen.queryByText(/Please fill in this field/g);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
