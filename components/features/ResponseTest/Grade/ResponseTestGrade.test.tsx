import React from "react";
import { render, screen } from "@testing-library/react";
import ResponseTestGrade from "./ResponseTestGrade";

describe("ResponseTestGrade test suite", () => {
  test("Test if component render properly", () => {
    render(<ResponseTestGrade assesseeEmail="a@a.com" submission={{subject: "Subject", response: "Response", submitted_time: new Date("2020-10-11").toISOString()}} />);
    const response = screen.getByTestId("response");
    expect(response).toBeInTheDocument();
});
});