import { render, screen } from "@testing-library/react";
import React from "react";
import AssessmentToolSidebar from "./AssessmentToolSidebar";

describe("AssessmentToolSidebar test suite", () => {
  it("Test if component displays properly", () => {
    render(
      <AssessmentToolSidebar
        name="Rashad Dahsar"
        grade={50}
        progress={80}
        attempts={[]}
      />
    );
    const sidebar = screen.getByTestId("tool-sidebar");
    expect(sidebar).toBeInTheDocument();
  });
});