import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import AssignmentGrade from "./AssignmentGrade";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../mocks/createMockRouter";

const mockPush = jest.fn();
global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();

describe("Assignment Grade Test Suite", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={createMockRouter({ push: mockPush })}>
        <AssignmentGrade
          assessmentData={{
            assessment_id: "asfjksdajkdlsa",
            name: "Something",
            type: "assignment",
            description: "jkfasdjklsadjlkas",
            expected_file_format: "pdf",
            duration_in_minutes: 15,
            owning_compay_id: "ajsflk",
            owning_company_name: "Rashad's Big Little Company",
          }}
          submission={{
            grade: 0,
            note: "Note",
            submittedTime: "2020-10-05",
            filename: "cuplis.json",
          }}
        />
      </RouterContext.Provider>
    );
  });

  it("Test if AssessmentGrade renders properly", () => {
    const grader = screen.getByTestId("assignment-grader");
    expect(grader).toBeInTheDocument();
  });

  it("Test if downloading file when clicked", async () => {
    const downloadButton = screen.getByText(/Download File/i);
    fireEvent.click(downloadButton);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(global.URL.createObjectURL).toBeCalledTimes(1);
    expect(global.URL.revokeObjectURL).toBeCalledTimes(1);
  });

});

