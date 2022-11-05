import { render, screen, fireEvent } from "@testing-library/react";
import NotificationGroup from "./NotificationGroup";
import React from "react";

describe("Notification test suite", () => {
  it("Test if notification renders properly for count > 9", () => {
    render(<NotificationGroup count={11} />);
    const noOfNotif = screen.getByText("9+")
    expect(noOfNotif).toBeInTheDocument();
  });

  it("Test if notification renders properly for count <>> 9", () => {
    render(<NotificationGroup count={5} />);
    const noOfNotif = screen.getByText("5")
    expect(noOfNotif).toBeInTheDocument();
  });
});
