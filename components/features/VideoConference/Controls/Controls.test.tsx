import React from "react";
import Controls from "./Controls";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { render } from "@testing-library/react";

describe("Controls component test suite", () => {
  test("test render component", () => {
    const intersectionObserverMock = () => ({
      observe: () => null,
    });
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock);
    render(<Controls onLeave={() => {}} />, { wrapper: HMSRoomProvider });
  });
});