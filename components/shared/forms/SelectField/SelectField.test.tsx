import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectField from "./SelectField";

const onChange = jest.fn();

describe("Select field Test suite", () => {
    beforeEach(() => {
        render(<SelectField onChange={onChange} choices={[]}/>);
    });

    it("Test if select field renders properly", () => {
        const select = screen.getByTestId("select");
        expect(select).toBeInTheDocument();
    })
});