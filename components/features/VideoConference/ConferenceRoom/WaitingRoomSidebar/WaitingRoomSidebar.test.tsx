import React from "react";
import WaitingRoomSidebar from "./WaitingRoomSidebar";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { render } from "@testing-library/react";

describe("WaitingRoomSidebar component test suite", () => {
  test("test render component", () => {
    const intersectionObserverMock = () => ({
      observe: () => null,
    });
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock);
    render(<WaitingRoomSidebar />, { wrapper: HMSRoomProvider });
  });
});