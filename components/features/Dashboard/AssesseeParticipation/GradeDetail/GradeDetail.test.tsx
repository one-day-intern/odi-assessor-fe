import React from "react";
import { render, screen } from "@testing-library/react";
import GradeDetail from "./GradeDetail";

describe("Countdown timer Test Suite", () => {
    it("Timer renders grade after counting up to the grade itself", async () => {
        render(<GradeDetail grade={40}/>);

        await new Promise(resolve => setTimeout(resolve, 1000));
        const text = screen.getByText(/40.0/i)
        expect(text).toBeInTheDocument();
    });
});