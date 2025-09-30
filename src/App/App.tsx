import React from "react";

import ButtonPanel from "../ButtonPanel/ButtonPanel";
import Display from "../Display/Display";
import { useCalculator } from "../hooks/useCalculator";
import buttons from "../buttons";

import css from "./App.module.css";

const App: React.FC = () => {

  const { display, handleButtonClick } = useCalculator();

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
