import { useState, useEffect } from "react";

export function useDebouncedState<T>(
  initialValue: T,
  time: number,
): [T, React.Dispatch<T | ((v: T) => T)>] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, time);
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [value, time]);

  return [debouncedValue, setValue];
}
