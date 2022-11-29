import React from "react";
import { render, screen } from "@testing-library/react";
import CountdownTimer  from "./CountdownTimer";

describe("Countdown timer Test Suite", () => {
    it("Timer renders countdown if assessment haven't ended", async () => {
        render(<CountdownTimer timeEndFromUnixEpoch={1500} nowTime={1000}/>);

        await new Promise(resolve => setTimeout(resolve, 1000));
        const text = screen.getByText(/Time until assessment ends:/i)
        expect(text).toBeInTheDocument();
    });

    it("Timer renders countdown if assessment has ended", () => {
        render(<CountdownTimer timeEndFromUnixEpoch={1500} nowTime={2000}/>);
        const text = screen.getByText(/Completed/i)
        expect(text).toBeInTheDocument();
    });
})