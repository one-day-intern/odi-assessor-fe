import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import ListOfAssessees from "./ListOfAssessees";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../mocks/createMockRouter";

describe("Assessor Signup Page Test", () => {
  it("Test if element rendered properly when code exists", () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { code: "jotar" } })}
      >
        <ListOfAssessees />
      </RouterContext.Provider>
    );
    const mainContent = screen.getByTestId("main");
    expect(mainContent).toBeInTheDocument();
  });
});
