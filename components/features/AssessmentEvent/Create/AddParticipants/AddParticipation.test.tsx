import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import AddParticipants  from "./AddParticipants";

const mockUpdate = jest.fn();
const mockAddEmpty = jest.fn();
const mockRemove = jest.fn();
const mockValidate = jest.fn();
const mockSelect = jest.fn();

const data = {
    name: "",
    start_date: "",
    test_flow: "",
    list_of_participants: []
}

describe("MultistepIndex test", () => {
  beforeEach(() => {
    render(
        <AddParticipants selectStep={mockSelect} addEmptyParticipation={mockAddEmpty} assessmentData={data} removeParticipation={mockRemove} updateParticipation={mockUpdate} validateParticipationBeforeSubmit={mockValidate}/>
    );
  });

  it("Test if element rendered properly", () => {
    const element = screen.getByTestId("add-part");
    expect(element).toBeInTheDocument();
  });

  it("Test if adding new participant triggers update", async () => {
    const addButton = screen.getAllByTestId("button");
    fireEvent.click(addButton[0]);

    expect(mockAddEmpty).toBeCalledTimes(1);
    fireEvent.click(addButton[1]);

    await new Promise(resolve => setTimeout(resolve, 500));

  })
});
