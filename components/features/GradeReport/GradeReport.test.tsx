import { render, screen } from "@testing-library/react";
import React from "react";
import GradeReport from "./GradeReport";

describe("AssesseeParticipation test suite", () => {
  it("Test if element renders properly for empty assessment events", () => {
    render(<GradeReport assesseeEmail="rashad@aziz.com" listOfGrades={[]} />);
    const main = screen.getByTestId("main");
    expect(main).toBeInTheDocument();
  });
  it("Test if element renders properly for non-empty assessment events", () => {
    render(
      <GradeReport
        assesseeEmail="rashad@aziz.com"
        listOfGrades={[
          {
            tool_name: "My Project",
            tool_description: "Rashad asks you to do this project",
            is_attempted: true,
            grade: 15,
            note: "",
            type: "responsetest",
          },
        ]}
      />
    );
    const main = screen.getByTestId("main");
    expect(main).toBeInTheDocument();
  });
});
