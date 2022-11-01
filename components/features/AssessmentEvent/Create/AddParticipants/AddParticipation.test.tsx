import React from "react";
import {render, screen} from "@testing-library/react";
import AddParticipants  from "./AddParticipants";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../mocks/createMockRouter";

const fakePush = jest.fn();
const setCurrentData = jest.fn();
const setCurrentError = jest.fn();

const data = {
    name: "",
    start_date: "",
    test_flow: "",
    list_of_participants: []
}

describe("MultistepIndex test", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={createMockRouter({ push: fakePush })}>
        <AddParticipants assessmentData={data} assessmentErrors={data} setAssessmentData={setCurrentData} setAssessmentErrors={setCurrentError}/>
      </RouterContext.Provider>
    );
  });

  it("Test if element rendered properly", () => {
    const element = screen.getByTestId("add-part");
    expect(element).toBeInTheDocument();
  })
});
