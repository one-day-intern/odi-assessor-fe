import { useState } from "react";

function useStack<T>() {

  const [stack, setStack] = useState<T[]>([]);

  const push = (item: T): void => setStack([...stack, item]);

  const pop = (): T | undefined => {
    if (stack.length === 0) return;

    const item = stack.at(-1);
    setStack(stack.slice(0, -1));;
    return item;
  };

  const peek = (): T | undefined => stack.at(-1);

  const isEmpty = (): boolean => stack.length === 0;

  const clear = () => setStack([]);

  return { push, pop, peek, isEmpty, clear, stack };
}

export { useStack };
