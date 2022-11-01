import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import AssessmentCard from "./AssessmentParticipationCard";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../mocks/createMockRouter";

describe("Assessment Card test suite", () => {
    it("Test if element had rendered properly with 1 assessee", () => {
        render(<AssessmentCard name="Test" date={new Date()} description="Test" duration={new Date()} id="1" numberOfAssesssees={1}/>)
        const card = screen.getByTestId("card");
        expect(card).toBeInTheDocument();
    })

    it("Test if element had rendered properly with 2 assessees", () => {
        render(<AssessmentCard name="Test" date={new Date()} description="Test" duration={new Date()} id="1" numberOfAssesssees={2}/>)
        const card = screen.getByTestId("card");
        expect(card).toBeInTheDocument();
    })
});