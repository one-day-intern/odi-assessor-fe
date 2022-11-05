import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import CreateAssignment from "./CreateAssignment";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../mocks/createMockRouter";

const mockBack = jest.fn();
const mockPush = jest.fn();

describe("Test create assignment", () => {
    it("Test if element rendered properly", () => {
        render(
            <RouterContext.Provider
              value={createMockRouter({ back: mockBack, push: mockPush })}
            >
              <CreateAssignment />
            </RouterContext.Provider>
          );
          const mainContent = screen.getByTestId("main");
          expect(mainContent).toBeInTheDocument();
    })
})