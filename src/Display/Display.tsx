import React from "react";

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => (
  <div className="calculator-display">
    <div className="calculator-input">{value}</div>
  </div>
);

export default Display;