import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import EventStatus from "./EventStatusFilter";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../mocks/createMockRouter";

const statusSetter = jest.fn();

describe("Event status filter test suite", () => {
    it("Test if element had rendered properly with 1 assessee", () => {
        render(<EventStatus status="active" setStatus={statusSetter}/>)
        const active = screen.getByTestId("event-active");
        expect(active).toHaveAttribute("style", "color: rgb(255, 255, 255); background: rgb(144, 118, 192);");
    })

    it("Test if archived status setter is changed", () => {
        render(<EventStatus status="active" setStatus={statusSetter}/>)
        const archived = screen.getByTestId("event-archived");
        
        fireEvent.click(archived);
        expect(statusSetter).toBeCalledTimes(1);
    })

    it("Test if active status setter is changed", () => {
        render(<EventStatus status="archived" setStatus={statusSetter}/>)
        const active = screen.getByTestId("event-active");
        fireEvent.click(active);
        expect(statusSetter).toBeCalledTimes(2);
    })


    it("Test if element had rendered properly with 2 assessees", () => {
        render(<EventStatus status="archived" setStatus={statusSetter}/>)
        const archived = screen.getByTestId("event-archived");
        expect(archived).toHaveAttribute("style", "color: rgb(255, 255, 255); background: rgb(144, 118, 192);");
    })
});