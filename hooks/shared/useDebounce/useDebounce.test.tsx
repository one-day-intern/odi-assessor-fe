import { renderHook } from "@testing-library/react";
import { useState } from "react";
import { act } from "react-dom/test-utils";
import { useDebounce } from "./useDebounce";

describe("useDebounce test suite", () => {
  it("Debounce hook value changes", async () => {
    const { result: stateResult } = renderHook(() => useState(""));
    const { result: debounceResult } = renderHook(() =>
      useDebounce(stateResult.current[0], 800)
    );

    act(() => {
      stateResult.current[1]("test");
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(debounceResult.current).toBe("");
  });
});
