import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useCreateAssignmentStore } from "./index";

describe("useCreateAssignmentStore suite", () => {
  it("Test if adding new value is correct", () => {
    const { result } = renderHook(() => useCreateAssignmentStore());

    act(() => {
      result.current.setAssignmentValue("name", "rashad minterm");
    });

    expect(result.current.assignmentData.name).toBe("rashad minterm");
  });

  it("Test if adding new error is correct", () => {
    const { result } = renderHook(() => useCreateAssignmentStore());

    act(() => {
      result.current.setAssignmentError("name", "rashad minterm");
    });

    expect(result.current.assignmentError.name).toBe("rashad minterm");
  });
});
