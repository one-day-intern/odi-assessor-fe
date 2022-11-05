import React from "react";
import {render, screen} from "@testing-library/react";
import MultistepIndex  from "./MultistepIndex";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../mocks/createMockRouter";

const fakePush = jest.fn();
const setCurrentStep = jest.fn();

describe("MultistepIndex test", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={createMockRouter({ push: fakePush })}>
        <MultistepIndex currentStepId={0} setCurrentStepId={setCurrentStep} steps={[]}/>
      </RouterContext.Provider>
    );
  });

  it("Test if element rendered properly", () => {
    const element = screen.getByTestId("multistep");
    expect(element).toBeInTheDocument();
  })
});
