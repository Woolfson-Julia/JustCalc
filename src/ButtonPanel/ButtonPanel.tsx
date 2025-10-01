import React from "react";

import Button from "../Button/Button";

import css from "./ButtonPanel.module.css"

interface ButtonPanelProps {
  buttons: string[];
  onButtonClick: (value: string) => void;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({ buttons, onButtonClick }) => {


  return (
    <div className={css.calculator__buttons}>
      {buttons.map((btn) => (
        <Button key={btn} value={btn} onClick={() => onButtonClick(btn)} />
      ))}
    </div>
  );
};

export default ButtonPanel;