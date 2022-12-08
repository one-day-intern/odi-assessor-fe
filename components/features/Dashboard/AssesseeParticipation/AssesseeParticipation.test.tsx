import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import AssesseeParticipation from "./AssesseeParticipation";

describe("AssesseeParticipation test suite", () => {
  beforeEach(() => {
    render(
      <AssesseeParticipation
        data={{ name: "Test" }}
        endTime={new Date("2022-07-15")}
        tools={[]}
      >
        <div></div>
      </AssesseeParticipation>
    );
  });

  it("Test if element renders properly", () => {
    const main = screen.getByTestId("main");
    expect(main).toBeInTheDocument();
  })
});
