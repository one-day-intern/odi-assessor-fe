import React from "react";
import {render, screen} from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../../mocks/createMockRouter";
import MultistepNumber from "./MultistepNumber";

const fakePush = jest.fn();
const setCurrentData = jest.fn();


describe("MultistepIndex test", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={createMockRouter({ push: fakePush })}>
        <MultistepNumber id={1} isPrevious={true} isSelected={true} name="Some component" onSelect={setCurrentData}/>
      </RouterContext.Provider>
    );
  });

  it("Test if element rendered properly", () => {
    const element = screen.getByTestId("number");
    expect(element).toBeInTheDocument();
  })
});
