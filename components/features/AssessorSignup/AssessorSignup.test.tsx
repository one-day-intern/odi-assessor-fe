import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../mocks/createMockRouter";

import AssessorSignupWrapper from "./AssessorSignupWrapper";

describe("Assessor Signup Page Test", () => {
  it("Test if element rendered properly", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <AssessorSignupWrapper />
      </RouterContext.Provider>
    );
    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).toBeInTheDocument();
  });
});
