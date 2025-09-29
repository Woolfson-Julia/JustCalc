import React, { useState, useRef } from "react";

import ButtonPanel from "../ButtonPanel/ButtonPanel";
import Display from "../Display/Display";
import CalculatorService from "../services/CalculatorService";
import buttons from "../buttons";

import css from "./App.module.css";

const App: React.FC = () => {
  
  const [display, setDisplay] = useState(() => {
    return localStorage.getItem("calculatorDisplay") || "0";
  });

  React.useEffect(() => {
    localStorage.setItem("calculatorDisplay", display);
  }, [display]);


  const calculatorRef = useRef<CalculatorService | undefined>(undefined);
  if (!calculatorRef.current) {
    calculatorRef.current = new CalculatorService(setDisplay);
  }

  const calculator = calculatorRef.current;

  const handleButtonClick = (key: string) => {
    calculator.handleKey(key);
  };

  return (
    <div className={css.calculator}>
      <div className={css.calculator__container}>
      <Display value={display} />
      <ButtonPanel buttons={buttons} onButtonClick={handleButtonClick} />
      </div>
      </div>
  );
};

export default App;
