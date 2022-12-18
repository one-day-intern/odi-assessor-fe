import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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
  });

  it("Test form submission", async () => {
    const form = screen.getByTestId("form");
    fireEvent.submit(form);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(fakePush).toBeCalledTimes(1);
  });

  it("Test validation", () => {
    const input = screen.getByTestId("inputField");
    const button = screen.getAllByTestId("button")[1];
    fireEvent.change(input, { target: { value: "rashadaziz" } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: "rashadaziz@gmail.com" } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: "rashadaziz@gmail.com" } });
    fireEvent.click(button);
  });
});
