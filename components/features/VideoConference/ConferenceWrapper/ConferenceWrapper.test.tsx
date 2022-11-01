import React from "react";
import ConferenceWrapper from "./ConferenceWrapper";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { render } from "@testing-library/react";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: { "assessment-event-id": "dummy-assessment" },
    };
  },
}));
describe("ConferenceWrapper component test suite", () => {
  test("test render component", () => {
    const intersectionObserverMock = () => ({
      observe: () => null,
    });
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock);
    render(<ConferenceWrapper token="" />, { wrapper: HMSRoomProvider });
  });
});