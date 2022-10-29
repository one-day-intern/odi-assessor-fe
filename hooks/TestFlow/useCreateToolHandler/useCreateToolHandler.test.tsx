import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useCreateToolHandler } from "./useCreateToolHandler";

describe("Test suite for useCreateToolHandler", () => {
    it("Changing the value of the content of the hook", () => {
        const { result } = renderHook(() => useCreateToolHandler());

        act(() => {
            result.current.setToolData("start_time", "10:05");
        })

        expect(result.current.tools.start_time).toBe("10:05");
    })
});