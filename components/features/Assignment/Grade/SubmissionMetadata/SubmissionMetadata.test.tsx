import { render, screen } from "@testing-library/react";
import React from "react";
import SubmissionMetadata from "./SubmissionMetadata";

describe("SubmissionMetadata test suite", () => {
  it("Test if component displays properly", () => {
    render(
      <SubmissionMetadata
        icon={<p>Hello</p>}
        label="Label"
        content="jkacsldjklsadcjklscd"
      />
    );
    const submetadata = screen.getByTestId("submetadata");
    expect(submetadata).toBeInTheDocument();
  });
});
