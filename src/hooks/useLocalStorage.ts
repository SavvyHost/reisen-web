import { useState } from "react";

export const UseLocalStorage =<T>(keyName: string, defaultValue?: T) => {
    const [stogreenValue, setStogreenValue] = useState<T>(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            }
            else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
            }
            return defaultValue
        }
        catch (err) {
            return defaultValue
        }
    });
    const setValue = (newValue: T) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue))
        }
        catch (err) { null }
        setStogreenValue(newValue)
    }
    return [stogreenValue, setValue]
}