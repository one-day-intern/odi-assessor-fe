import { render, screen } from "@testing-library/react";
import React from "react";
import AssesseeParticipation from "./AssesseeParticipation";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../mocks/createMockRouter";

describe("AssesseeParticipation test suite", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider
        value={createMockRouter({})}
      >
        <AssesseeParticipation
          data={{ name: "Test" }}
          endTime={new Date("2022-07-15")}
          tools={[]}
          grade={10}
        >
          <div></div>
        </AssesseeParticipation>
      </RouterContext.Provider>
    );
  });

  it("Test if element renders properly", () => {
    const main = screen.getByTestId("main");
    expect(main).toBeInTheDocument();
  });
});
