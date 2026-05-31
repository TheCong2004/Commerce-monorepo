"use client";
import { useEffect, useState } from "react";

export function useLocalStorage(key: string, defaultValue: any = null) {
   const [value, setValue] = useState(defaultValue);
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      try {
         const item = localStorage.getItem(key);
         const parsedValue = item ? JSON.parse(item) : defaultValue;
         setValue(parsedValue);
         setIsLoaded(true);
      } catch (error) {
         console.error(`❌ Error reading localStorage for "${key}":`, error);
         setValue(defaultValue);
         setIsLoaded(true);
      }
   }, [key, defaultValue]);

   const setStoredValue = (newValue: any) => {
      try {
         setValue(newValue);

         localStorage.setItem(key, JSON.stringify(newValue));

      } catch (error) {
         console.error(`❌ Error setting localStorage for "${key}":`, error);
      }
   };

   return [value, setStoredValue, isLoaded] as const;
}