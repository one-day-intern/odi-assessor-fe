import { renderHook } from "@testing-library/react";
import React from "react";
import { RouterContext } from "next/dist/shared/lib/router-context";

import { AuthProvider } from "../../context/Authentication";
import { createMockRouter } from "../../mocks/createMockRouter";
import { useLogout } from "./useLogout";
import { act } from "react-dom/test-utils";

interface HOCProps {
  children: JSX.Element;
}

const mockPush = jest.fn();
const wrapper = ({ children }: HOCProps) => {
  return (
    <RouterContext.Provider value={createMockRouter({ push: mockPush })}>
      <AuthProvider>{children}</AuthProvider>
    </RouterContext.Provider>
  );
};

describe("useLogout test suite", () => {
    it("Test if logout is called", () => {
        const { result } = renderHook(() => useLogout(), { wrapper });
        
        act(() => {
            result.current.logout()
        });;

        expect(mockPush).toBeCalledTimes(1);
    })
});
