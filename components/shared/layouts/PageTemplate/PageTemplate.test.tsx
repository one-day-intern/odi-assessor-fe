import { render, screen } from "@testing-library/react";
import React from "react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../mocks/createMockRouter";
import PageTemplate from "./PageTemplate";

describe("Page Template test suite", () => {
  it("Test if component renders properly", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <PageTemplate>
            <p data-testid="test"></p>
        </PageTemplate>
      </RouterContext.Provider>
    );

    const testElement = screen.getByTestId("test");
    expect(testElement).toBeInTheDocument();
  });
});
