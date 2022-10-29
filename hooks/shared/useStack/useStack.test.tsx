import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useStack } from "./useStack";

describe("useStack hook test suite", () => {
  it("Test if hook renders properly", () => {
    const { result } = renderHook(() => useStack<string>());
    expect(result.current).toBeDefined();
  });

  it("Test if push functionality works properly", () => {
    const { result } = renderHook(() => useStack<string>());

    act(() => {
      result.current.push("rashad");
    });

    expect(result.current.stack.length).toBe(1);
    expect(result.current.peek()).toBe("rashad");
  });

  it("Test if pop functionality works properly", () => {
    const { result } = renderHook(() => useStack<string>());
    let poppedOut: string;

    act(() => {
        result.current.push("jo");
    });

    act(() => {
        poppedOut = result.current.pop()!;
    })

    expect(result.current.stack.length).toBe(0);
    expect(poppedOut!).toBe("jo");

    act(() => {
        result.current.pop()!;
    })
    expect(result.current.isEmpty()).toBe(true);
  });

  it("Test if clear functionality works properly", () => {
    const { result } = renderHook(() => useStack<string>());

    act(() => {
        result.current.push("rashad1");
        result.current.push("rashad2");
        result.current.push("rashad3");
    });

    act(() => {
        result.current.clear();
    });

    expect(result.current.isEmpty()).toBe(true);
  });
});
