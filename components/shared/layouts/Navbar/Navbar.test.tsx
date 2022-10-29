import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Navbar from "./Navbar";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../mocks/createMockRouter";

describe("Navbar test suite", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={createMockRouter({ pathname: "/" })}>
        <Navbar />
        <div data-testid="main"></div>
      </RouterContext.Provider>
    );
  });

  it("Test if navbar renders properly", () => {
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("Test click dropdown and click other dropdown", async () => {

    const [dropdown1, dropdown2] = screen.getAllByTestId("dropdown");
    fireEvent.click(dropdown1);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const drop = screen.getByTestId("drop");
    expect(drop).toBeInTheDocument();

    fireEvent.click(dropdown2);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const drop2 = screen.getByTestId("drop");
    expect(drop2).toBeInTheDocument();

    const main = screen.getByTestId("main");
    fireEvent.click(main);
  });
});
