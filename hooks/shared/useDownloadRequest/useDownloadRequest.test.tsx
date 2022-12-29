import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { AuthProvider } from "../../../context/Authentication";
import useDownloadRequest from "./useDownloadRequest";
import React, { ReactNode } from "react";
import "blob-polyfill";

let mockLocalStorage = {};

interface HOCProps {
  children: ReactNode;
}

const AuthContextWrapper = ({ children }: HOCProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

describe("useDownloadRequest test suite", () => {
  beforeAll(() => {
    global.Storage.prototype.getItem = jest.fn((key) => mockLocalStorage[key]);
    global.Storage.prototype.setItem = jest.fn((key, value) => {
      mockLocalStorage[key] = value;
    });
    global.Storage.prototype.removeItem = jest.fn(
      (key) => delete mockLocalStorage[key]
    );
  });

  beforeEach(() => {
    mockLocalStorage = {};
  });

  it("Hook called when fetching unprotected file", async () => {
    const { result } = renderHook(() =>
      useDownloadRequest("/file/unprotected")
    );

    act(() => {
      result.current.fetchData();
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    expect(result.current.data?.type).toBe("text/plain");
  });

  it("Hook called when fetching unprotected error", async () => {
    const { result } = renderHook(() =>
      useDownloadRequest("/route/unprotected/")
    );
    act(() => {
      result.current.fetchData();
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    expect(result.current.error?.message).toBe("Unprotected route accessed");
  });

  it("Hook called when fetching protected file success", async () => {
    const { result } = renderHook(
      () => useDownloadRequest("/file/protected", { requiresToken: true }),
      { wrapper: AuthContextWrapper }
    );

    act(() => {
      result.current.fetchData();
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(result.current.data?.type).toBe("text/plain");
  });

  it("Hook called when fetching protected file error", async () => {
    const { result } = renderHook(
      () => useDownloadRequest("/route/protected/", { requiresToken: true }),
      { wrapper: AuthContextWrapper }
    );

    act(() => {
      result.current.fetchData();
    });

    await new Promise(resolve => setTimeout(resolve, 3000));
    expect(result.current.error?.message).toBe("Protected route accessed");
  });
});
