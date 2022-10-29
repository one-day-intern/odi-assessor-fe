import { TimeField } from "./TimeField";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

const mockedFunction = jest.fn();

describe("Input element test", () => {
    beforeEach(() => {
        render(
            <TimeField label="email" value="" onChange={ mockedFunction }/>
        )
    });

    it("Test if input field render properly", () => {
        const inputElement = screen.getByTestId("timeField");
        expect(inputElement).toBeInTheDocument();
    });

    it("Test if input field respond to change event", () => {
        const inputElement = screen.getByTestId("timeField");
        fireEvent.change(inputElement, { target: {
            value: "00:15"
        }});

        expect(mockedFunction).toBeCalledTimes(1);
    });
})