import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Confirmation from "./Confirmation";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../mocks/createMockRouter";

const fakePush = jest.fn();

const data = {
  name: "",
  start_date: "",
  test_flow: "",
  list_of_participants: [],
};

describe("Confirmation test", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={createMockRouter({ push: fakePush })}>
        <Confirmation {...data}/>
      </RouterContext.Provider>
    );
  });

  it("Test if element rendered properly", () => {
    const element = screen.getByTestId("confirm");
    expect(element).toBeInTheDocument();
  });

  it("Test for button click to save event", async () => {
    const button = screen.getByTestId("button");
    fireEvent.click(button);

    await new Promise(resolve => setTimeout(resolve, 600));
    expect(fakePush).toBeCalledTimes(1);
  })
});
