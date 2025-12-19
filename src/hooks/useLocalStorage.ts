import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  const setStoredValue: Dispatch<SetStateAction<T>> = useCallback((val) => {
    setValue(val);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`useLocalStorage: Problem with recording "${key}", error`);
    }
  }, [key, value]);

  return [value, setStoredValue];
}
