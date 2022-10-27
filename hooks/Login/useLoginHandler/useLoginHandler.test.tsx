import { renderHook, act } from "@testing-library/react"
import { useLoginHandler } from "./useLoginHandler";

describe("Login handler hook test suite", () => {
    it("Test setStoreValue", () => {
        const { result } = renderHook(() => useLoginHandler());

        act(() => {
            result.current.setStoreValue("email", "abc@def.com");
        });

        expect(result.current.loginStore.email).toBe("abc@def.com");
    });

    it("Test setErrorValue", () => {
        const { result } = renderHook(() => useLoginHandler());

        act(() => {
            result.current.setErrorValue("email", "There is an error");
        });

        expect(result.current.loginError.email).toBe("There is an error");
    })
})