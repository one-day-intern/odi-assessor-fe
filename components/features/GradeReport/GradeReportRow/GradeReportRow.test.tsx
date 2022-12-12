import { render, screen } from "@testing-library/react";
import React from "react";
import GradeReportRow from "./GradeReportRow";

describe("AssesseeParticipation test suite", () => {
  it("Test if element renders properly for attempted", () => {
    render(
      <GradeReportRow
        grade={10}
        is_attempted={true}
        tool_name="Something True"
        type="assignment"
      />
    );

    const reportRow = screen.getByTestId("report");
    expect(reportRow).toBeInTheDocument();
  });
  it("Test if element renders properly for not attempted", () => {
    render(
      <GradeReportRow
        grade={10}
        is_attempted={false}
        tool_name="Something True"
        type="assignment"
      />
    );

    const reportRow = screen.getByTestId("report");
    expect(reportRow).toBeInTheDocument();
  });
});
