import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useCreateResponseForm } from "./index";

describe("useCreateResponseForm suite", () => {
  it("Test if setDataValue is correct", () => {
    const { result } = renderHook(() => useCreateResponseForm());
    
    act(() => {
        result.current.setDataValue("message", "rashad's message to the group");
    })

    expect(result.current.data.message).toBe("rashad's message to the group");
  });

  it("Test if validate is correct", () => {
    const { result } = renderHook(() => useCreateResponseForm());

    act(() => {
        result.current.validate();
    });

    expect(result.current.error.message).toBe("Please fill in this field.");
    expect(result.current.error.name).toBe("Please fill in this field.");
    expect(result.current.error.subject).toBe("Please fill in this field.");
  })
});
