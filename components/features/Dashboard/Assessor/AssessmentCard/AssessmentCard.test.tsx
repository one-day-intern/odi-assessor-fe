import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import AssessmentCard from "./AssessmentCard";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../mocks/createMockRouter";

describe("Assessment Card test suite", () => {
    it("Test if element had rendered properly", () => {
        render(<AssessmentCard event_id="id" name="Test" date={new Date()} description="Test" />)
        const card = screen.getByTestId("card");
        expect(card).toBeInTheDocument();
    })
});