import { useState, useEffect, useCallback, useRef } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Track the current key to detect changes
  const keyRef = useRef(key);
  
  // Get value from localStorage
  const getStoredValue = useCallback((storageKey: string): T => {
    if (typeof window === "undefined" || !storageKey) {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(storageKey);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${storageKey}":`, error);
      return initialValue;
    }
  }, [initialValue]);

  const [storedValue, setStoredValue] = useState<T>(() => getStoredValue(key));

  // Re-read from localStorage when key changes
  useEffect(() => {
    if (key !== keyRef.current) {
      keyRef.current = key;
      if (key) {
        const newValue = getStoredValue(key);
        setStoredValue(newValue);
      }
    }
  }, [key, getStoredValue]);

  // Update localStorage when value changes
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    if (!key) return;
    
    try {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        
        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  // Clear the stored value
  const clearValue = useCallback(() => {
    if (!key) return;
    
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error clearing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes in other tabs/windows
  useEffect(() => {
    if (!key) return;
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T);
        } catch (error) {
          console.warn(`Error parsing storage change for key "${key}":`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue, clearValue];
}
