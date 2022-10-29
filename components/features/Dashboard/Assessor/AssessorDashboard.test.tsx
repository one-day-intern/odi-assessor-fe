import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import AssessorDashboard from "./AssessorDashboard";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../mocks/createMockRouter";

describe("Assessor Signup Page Test", () => {
  it("Test if element rendered properly when code exists", () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { code: "jotar" } })}
      >
        <AssessorDashboard />
      </RouterContext.Provider>
    );
    const mainContent = screen.getByTestId("main");
    expect(mainContent).toBeInTheDocument();
  });
});
