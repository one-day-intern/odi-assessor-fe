import { renderHook, act } from "@testing-library/react";
import useTestFlowHandler from "./useTestFlowHandler";

describe("Test suite for useCreateToolHandler", () => {
  it("Changing the value of name", () => {
    const { result } = renderHook(() => useTestFlowHandler());

    act(() => {
      result.current.setData("name", "Test");
    });

    expect(result.current.data.name).toBe("Test");
  });

  it("Changing the value of test flow tool", () => {
    const { result } = renderHook(() => useTestFlowHandler());

    act(() => {
      result.current.setData("tool", {
        tool_id: "1",
        name: "test",
        type: "vidcon"
      });
    });

    expect(result.current.data.tool.length).toBe(1);
  });
});
