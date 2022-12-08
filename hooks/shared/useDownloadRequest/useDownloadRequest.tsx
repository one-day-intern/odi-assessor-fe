import { useAuthContext } from "@context/Authentication";
import { AuthDispatchTypes } from "@context/Authentication/AuthDispatchTypes";
import { useCallback, useReducer } from "react";

interface State {
  data?: Blob;
  error?: Error;
  status: "loading" | "fetched" | "error" | "initial";
}

interface UseGetRequest extends State {
  fetchData: () => Promise<Blob | FetchError | undefined>;
}

interface FetchError extends Error {
  status?: number;
}

interface Options {
  requiresToken?: boolean;
}

// discriminated union type
type Action =
  | { type: "loading" }
  | { type: "fetched"; payload: Blob }
  | { type: "error"; payload: FetchError };

function useGetRequest(uri?: string, options?: Options): UseGetRequest {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${uri}`;

  const initialState: State = {
    error: undefined,
    data: undefined,
    status: "initial",
  };

  // Keep state logic separated
  const fetchReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "loading":
        return { ...initialState, status: "loading" };
      case "fetched":
        return {
          ...initialState,
          status: "fetched",
          data: action.payload,
          error: undefined,
        };
      case "error":
        return { ...initialState, status: "error", error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const {
    accessToken,
    refreshToken,
    dispatch: authDispatch,
    user,
  } = useAuthContext();

  const fetchData = useCallback(async () => {
    dispatch({ type: "loading" });

    // If a cache exists for this url, return it
    // If token is required, cache is automatically disabled

    if (!options?.requiresToken) {
      const response = await fetch(url);
      const blob = await response.blob();

      if (blob.type === "application/json") {
        const error: FetchError = new Error(response.statusText);
        const json = JSON.parse(await blob.text());
        error.status = response.status;
        error.message = json?.message;
        dispatch({ type: "error", payload: error });
        return;
      }

      dispatch({ type: "fetched", payload: blob });

      return blob;
    }

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.blob();

      if (data.type === "application/json") {
        const error: FetchError = new Error(response.statusText);
        const json = JSON.parse(await data.text());
        error.status = response.status;
        error.message = json?.message;
        throw error;
      }

      dispatch({ type: "fetched", payload: data });
      return data;
    } catch (error) {
      if ((error as FetchError)?.status === 401) {
        try {
          const REQUEST_ACCESS_TOKEN_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/api/token/refresh/`;

          const requestNewAccessToken = await fetch(REQUEST_ACCESS_TOKEN_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: refreshToken,
            }),
          });

          const { access, refresh } = await requestNewAccessToken.json();

          if (!requestNewAccessToken.ok) throw new Error();

          authDispatch({
            type: AuthDispatchTypes.LOGIN,
            payload: {
              accessToken: access,
              refreshToken: refresh,
              remember: !!refresh,
              user,
            },
          });

          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          });
          const data = await response.blob();
          if (data.type === "application/json") {
            const error: FetchError = new Error(response.statusText);
            const json = JSON.parse(await data.text());
            error.status = response.status;
            error.message = json?.message;
            dispatch({ type: "error", payload: error });
            return error;
          }

          dispatch({ type: "fetched", payload: data });
          return data;
        } catch (e) {
          authDispatch({
            type: AuthDispatchTypes.LOGOUT,
          });
        }
      }
      dispatch({ type: "error", payload: error as FetchError });
      return error as FetchError;
    }
  }, [
    accessToken,
    refreshToken,
    authDispatch,
    url,
    options?.requiresToken,
    user,
  ]);

  return { ...state, fetchData };
}

export default useGetRequest;
