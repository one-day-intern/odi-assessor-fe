import { useEffect, useState } from "react";

function useDebounce<T>(value: T, timeout: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), timeout ?? 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, timeout]);

  return debouncedValue;
}

export { useDebounce };
