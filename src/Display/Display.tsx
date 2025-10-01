import React from "react";

import css from "./Display.module.css"

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => (
  <div className={css.calculator__display}>
    <div className={css.calculator__formula}>{value}</div>
  </div>
);

export default Display;