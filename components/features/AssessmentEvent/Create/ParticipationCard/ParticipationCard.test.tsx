import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ParticipationCard from "./ParticipationCard";

const mockSave = jest.fn();
const mockUpdate = jest.fn();
const mockRemove = jest.fn();
const mockValidate = jest.fn().mockReturnValue([true, ""]);

describe("Participation Card Test suite", () => {
    beforeEach(() => {
        render(<ParticipationCard onSave={mockSave} removeParticipation={mockRemove} updateParticipation={mockUpdate} validateParticipation={mockValidate}/>);
    });

    it("Test if element renders properly", () => {
        const participation = screen.getByTestId("participation-card");
        expect(participation).toBeInTheDocument();
    });

    it("Test if submission is conducted properly", () => {
        const participationInput = screen.getAllByTestId("inputField");
        fireEvent.change(participationInput[0], {
            target: {
                value: "rashad@rashad.com"
            }
        })
        const participation = screen.getByTestId("participation-card");
        fireEvent.submit(participation);
        expect(mockSave).toBeCalledTimes(1);
        expect(mockUpdate).toBeCalledTimes(1);
    });

    it("Test if closing is conducted properly", () => {
        const close = screen.getByTestId("close");
        fireEvent.click(close);
        expect(mockRemove).toBeCalledTimes(1);
    })


})