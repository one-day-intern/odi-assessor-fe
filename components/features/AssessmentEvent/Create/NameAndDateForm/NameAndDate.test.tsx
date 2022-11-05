import React from "react";
import { render, screen } from "@testing-library/react";
import NameAndDateForm from "./NameAndDateForm";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../mocks/createMockRouter";

const fakePush = jest.fn();
const fakeSelect = jest.fn();
const fakeSetData = jest.fn();
const fakeSetError = jest.fn();

describe("Login Details Test", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={createMockRouter({ push: fakePush })}>
        <NameAndDateForm
          selectStep={fakeSelect}
          assessmentData={{ name: "", start_date: "", test_flow: "" }}
          setAssessmentData={fakeSetData}
          assessmentErrors={{ name: "", start_date: "", test_flow: "" }}
          setAssessmentErrors={fakeSetError}
          testFlowList={[]}
        />
      </RouterContext.Provider>
    );
  });

  it("Test if element rendered properly", () => {
    const element = screen.getByTestId("name-form");
    expect(element).toBeInTheDocument();
  });

});
