import React, { useState, useRef } from "react";

import ButtonPanel from "../ButtonPanel/ButtonPanel";
import Display from "../Display/Display";
import CalculatorService from "../services/CalculatorService";
import buttons from "../buttons";

import css from "./App.module.css";


const App: React.FC = () => {

  const [display, setDisplay] = useState("0");

  const calculatorRef = useRef<CalculatorService| undefined>(undefined);
  if (!calculatorRef.current) {
    calculatorRef.current = new CalculatorService(setDisplay);
}

  const calculator = calculatorRef.current;

  const handleButtonClick = (key: string) => {
    calculator.handleKey(key);
  };

  return (
    <div className={css.container}>
      <Display value={display} />
      <ButtonPanel buttons={buttons} onButtonClick={handleButtonClick} />
    </div>
  );
};

export default App;