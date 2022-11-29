import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CircularProgressBar  from "./CircularProgressBar";

describe("Circular Progress Bar Test Suite", () => {
    it("Progress bar renders properly", () => {
        render(<CircularProgressBar progress={45}/>);
        const bar = screen.getByTestId("circular-bar");
        expect(bar).toBeInTheDocument();
    });

    it("Progress bar counts up to progress", async () => {
        render(<CircularProgressBar progress={45}/>);

        await new Promise(resolve => setTimeout(resolve, 3000));
        const text = screen.getByText(/45/i);
        expect(text).toBeInTheDocument();
    });

    it("Test Progress Bar if content is 0", () => {
        render(<CircularProgressBar progress={0}/>);
        const text = screen.getByText(/0/i);
        expect(text).toBeInTheDocument();
    });

    it("Test Progress Bar if with options it renders properly", () => {
        render(<CircularProgressBar progress={45} options={{bgColor: "pink", fontSize: "5ch", size: "10ch"}}/>);
        const bar = screen.getByTestId("circular-bar");
        expect(bar).toBeInTheDocument();
    })
})