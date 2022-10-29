import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Dropdown } from "./Dropdown";

const mockFunction = jest.fn();

describe("Dropdown test suite", () => {
  describe("Open dropdown test suite", () => {
    beforeEach(() => {
      render(
        <Dropdown
          isOpened
          setOpened={mockFunction}
          dropdownElements={[
            {
              id: 1,
              reactElement: () => <div></div>,
            },
          ]}
        >
          <p>Test</p>
        </Dropdown>
      );
    });

    it("Test if dropdown is opened properly", () => {
      const drop = screen.getByTestId("drop");
      expect(drop).toBeInTheDocument();
    });

    it("Test if dropdown is clicked", () => {
      const dropdown = screen.getByTestId("dropdown");

      fireEvent.click(dropdown);
      expect(mockFunction).toBeCalledTimes(1);
    });
  });

  describe("Closed dropdown test suite", () => {
    it("Test if dropdown is closed properly", () => {
      render(
        <Dropdown
          isOpened={false}
          setOpened={mockFunction}
          dropdownElements={[
            {
              id: 1,
              reactElement: () => <div></div>,
            },
          ]}
        >
          <p>Test</p>
        </Dropdown>
      );
      const dropdown = screen.getByTestId("dropdown");
      expect(dropdown).toBeInTheDocument();
      const drop = screen.queryByTestId("drop");
      expect(drop).not.toBeInTheDocument();
    });
  });
});
