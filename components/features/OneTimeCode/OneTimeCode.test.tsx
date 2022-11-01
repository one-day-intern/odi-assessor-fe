import React from "react";
import { render, screen } from "@testing-library/react";
import OneTimeCode from "./OneTimeCode";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../mocks/createMockRouter";

const fakePush = jest.fn();

describe("One Time Code Test", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={createMockRouter({ push: fakePush })}>
        <OneTimeCode />
      </RouterContext.Provider>
    );
  });

  it("Test if element rendered properly", () => {
    const element = screen.getByTestId("otc");
    expect(element).toBeInTheDocument();
  })
});
