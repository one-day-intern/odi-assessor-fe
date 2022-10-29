import React from "react";
import SidebarTile from "./SidebarTile";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { render } from "@testing-library/react";

describe("SidebarTile component test suite", () => {
  test("test render component", () => {
    const intersectionObserverMock = () => ({
      observe: () => null,
    });
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock);
    render(
      <SidebarTile onAdmit={() => {}} onReject={() => {}} peerName={""} />,
      { wrapper: HMSRoomProvider }
    );
  });
});
