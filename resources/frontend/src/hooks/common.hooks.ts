import { useState, useCallback } from "react";
import type { AsyncState, LoadingState } from "../handler/types";

export function useAsyncState<T>(initialData: T): AsyncState<T> & {
    setData: (data: T) => void;
    setLoading: (loading: LoadingState) => void;
    setError: (error: string | null) => void;
    reset: () => void;
} {
    const [data, setData] = useState<T>(initialData);
    const [loading, setLoading] = useState<LoadingState>("idle");
    const [error, setError] = useState<string | null>(null);

    const reset = useCallback(() => {
        setData(initialData);
        setLoading("idle");
        setError(null);
    }, [initialData]);

    return {
        data,
        loading,
        error,
        setData,
        setLoading,
        setError,
        reset,
    };
}

export function useLocalStorage<T>(
    key: string,
    initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
}

export function useToggle(
    initialValue: boolean = false,
): [boolean, () => void, (value: boolean) => void] {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue((prev) => !prev);
    }, []);

    const setToggle = useCallback((value: boolean) => {
        setValue(value);
    }, []);

    return [value, toggle, setToggle];
}
