import React, { MouseEventHandler } from "react";

interface ButtonProps {
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({ value, onClick }) => (
  <button
    className={`calc-btn calc-btn-${value}`}
    onClick={onClick}
  >
    {value}
  </button>
);

export default Button;