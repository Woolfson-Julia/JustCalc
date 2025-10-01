import React, { MouseEventHandler } from "react";

import css from "./Button.module.css";

interface ButtonProps {
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({ value, onClick }) => (
  <button
    type="button"
    className={`${css.button} ${css[`button-${value}`]}`}
    onClick={onClick}
  >
    {value}
  </button>
);

export default Button;