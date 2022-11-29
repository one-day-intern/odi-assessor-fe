import React from "react";
import { render, screen } from "@testing-library/react";
import DetailCard from "./DetailCard";

describe("Countdown timer Test Suite", () => {
  it("Timer renders countdown if assessment haven't ended", async () => {
    render(
      <DetailCard>
        <p>Test</p>
      </DetailCard>
    );

    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
  });
});
