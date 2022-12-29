import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import AssessmentGrader from "./AssessmentGrader";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../mocks/createMockRouter";

const mockPush = jest.fn();
const grader = jest
  .fn()
  .mockImplementation((grade, notes) => console.log(grade, notes));
describe("Assessment Grader test suite", () => {
  beforeEach(() => {
    render(
        <RouterContext.Provider value={createMockRouter({ push: mockPush })}>

      <AssessmentGrader
        type="assignment"
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
        sidebarMetadata={{
            name: "Rashad Dahsar",
            grade: 50,
            progress: 80,
            attempts: [],
        }}
        grader={grader}
        loadingStatus="loading"
        />
        </RouterContext.Provider>
    );
  });

  it("Test if element rendered properly", () => {
    const assessmentGrader = screen.getByTestId("assessment-grader");
    expect(assessmentGrader).toBeInTheDocument();
  })
});
