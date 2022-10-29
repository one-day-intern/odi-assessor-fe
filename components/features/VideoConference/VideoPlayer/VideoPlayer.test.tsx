import React from "react";
import VideoPlayer from "./VideoPlayer";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { render } from "@testing-library/react";

describe("VideoPlayer component test suite", () => {
  test("test render component", () => {
    const intersectionObserverMock = () => ({
      observe: () => null,
    });
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock);
    render(<VideoPlayer />, { wrapper: HMSRoomProvider });
  });
});
