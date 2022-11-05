import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ToolPicker from "./ToolPicker";

const change = jest.fn();

describe("Tool Picker Test", () => {
    beforeEach(() => {
        render(<ToolPicker onChange={change} options={[]}/>)
    });

    it("Test if tool picker renders properly", () => {
        const picker = screen.getByTestId("toolpicker");
        expect(picker).toBeInTheDocument();
    })
});