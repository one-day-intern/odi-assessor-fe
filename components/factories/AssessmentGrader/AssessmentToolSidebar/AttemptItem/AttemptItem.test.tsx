import { render, screen } from "@testing-library/react";
import React from "react";
import AttemptItem from "./AttemptItem";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../mocks/createMockRouter";

const mockPush = jest.fn();

describe("AttemptItem test suite", () => {
  it("Test if AttemptItem renders properly for assignment", () => {
    render(
      <RouterContext.Provider value={createMockRouter({ push: mockPush })}>
        <AttemptItem
          name="jabba the hut"
          type="assignment"
          attempt_id="asfdjklasdfjkal"
        />
      </RouterContext.Provider>
    );

    const item = screen.getByTestId("attemptCard");
    expect(item).toBeInTheDocument();
  });

  it("Test if AttemptItem renders properly for assignment not null", () => {
    render(
      <RouterContext.Provider value={createMockRouter({ push: mockPush })}>
        <AttemptItem name="jabba the hut" type="assignment" attempt_id={null} />
      </RouterContext.Provider>
    );
    const item = screen.getByTestId("attemptCard");
    expect(item).toBeInTheDocument();
  });
});
