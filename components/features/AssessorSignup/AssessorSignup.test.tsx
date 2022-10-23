import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../mocks/createMockRouter";

import AssessorSignupWrapper from "./AssessorSignupWrapper";

describe("Assessor Signup Page Test", () => {
  it("Test if element rendered properly when code exists", () => {
    render(
      <RouterContext.Provider value={createMockRouter({query: {code: "jotar"}})}>
        <AssessorSignupWrapper />
      </RouterContext.Provider>
    );
    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).toBeInTheDocument();
  });

  it("Test if 404 error rendered when code doesn't exist", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <AssessorSignupWrapper />
      </RouterContext.Provider>
    );
    const errorMessage = screen.getByText(/This page could not be found/g);
    expect(errorMessage).toBeInTheDocument();
  });
});
