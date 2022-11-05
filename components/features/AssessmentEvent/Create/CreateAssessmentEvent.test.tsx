import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateAssessmentEvent from "./CreateAssessmentEvent";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../mocks/createMockRouter";

const fakePush = jest.fn();

describe("Login Details Test", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={createMockRouter({ push: fakePush })}>
        <CreateAssessmentEvent testFlows={[]}/>
      </RouterContext.Provider>
    );
  });

  it("Test if element rendered properly", () => {
    const element = screen.getByTestId("backdrop");
    expect(element).toBeInTheDocument();
  })
});
