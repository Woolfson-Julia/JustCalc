import { useState, useEffect, useRef, useCallback } from "react";
import CalculatorService from "../services/CalculatorService";

export const CALCULATOR_STORAGE_KEY = "calculatorDisplay";

export const useCalculator = () => {
  const [display, setDisplay] = useState<string>(() => {
    return localStorage.getItem(CALCULATOR_STORAGE_KEY) || "0";
  });

  const calculatorRef = useRef<CalculatorService | undefined>(undefined);
  if (!calculatorRef.current) {
    calculatorRef.current = new CalculatorService(setDisplay);
  }

  const calculator = calculatorRef.current;

  const handleButtonClick = useCallback((key: string) => {
    calculator.handleKey(key);
  }, [calculator]);

  useEffect(() => {
    localStorage.setItem(CALCULATOR_STORAGE_KEY, display);
  }, [display]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      calculator.handleKey(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [calculator]);

  return { display, handleButtonClick };
};