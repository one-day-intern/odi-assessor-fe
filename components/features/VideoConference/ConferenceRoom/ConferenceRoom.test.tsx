import React from "react";
import ConferenceRoom from "./ConferenceRoom";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { render } from "@testing-library/react";

describe("ConferenceRoom component test suite", () => {
  test("test render component", () => {
    const intersectionObserverMock = () => ({
      observe: () => null,
    });
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock);
    render(<ConferenceRoom />, { wrapper: HMSRoomProvider });
  });
});