import { CalculatorService as CalculatorServiceType } from "../types/types";

export default class CalculatorService implements CalculatorServiceType {
  private displayValue: string = "0";
  private formula: string = "";
  private firstOperand: number | null = null;
  private waitingForOperand: boolean = false;
  private operator: string | null = null;
  private callback: (value: string) => void;

  constructor(callback: (value: string) => void) {
    this.callback = callback;
  }

  private inputDigit(digit: string): void {
    const dot = ".";
    const isDot = digit === dot;
    const valueHasDot = this.displayValue.includes(dot);

    if (this.waitingForOperand) {
      this.displayValue = isDot
        ? `${this.displayValue}${valueHasDot}`
          ? ""
          : `${dot}`
        : digit;
      this.waitingForOperand = false;
    } else {
      this.displayValue =
        this.displayValue === "0" ? digit : `${this.displayValue}${digit}`;
    }

    this.updateFormula();
  }

  private updateFormula(): void {
    this.formula = this.operator
      ? `${this.firstOperand ?? ""}${this.operator}${this.displayValue}`
      : this.displayValue;

    this.callback(this.formula);
  }

  private inputOperator(nextOperator: string): void {
    if (
      this.operator &&
      !this.waitingForOperand &&
      this.firstOperand !== null
    ) {
      this.firstOperand = this.performOperation(
        this.firstOperand,
        parseFloat(this.displayValue),
        this.operator
      );
      this.displayValue = String(this.firstOperand);
    } else {
      this.firstOperand = parseFloat(this.displayValue);
    }

    this.operator = nextOperator;
    this.waitingForOperand = true;
    this.formula = `${this.displayValue}${nextOperator}`;

    this.callback(this.formula);
  }

  private performOperation(
    first: number,
    second: number,
    operator: string
  ): number {
    switch (operator) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        return second !== 0 ? first / second : NaN;
      default:
        return second;
    }
  }

  private inputEquals(): void {
    if (this.operator && this.firstOperand !== null) {
      const result = this.performOperation(
        this.firstOperand,
        parseFloat(this.displayValue),
        this.operator
      );
      this.resetTo(result);
    }
  }

  private clear(): void {
    this.resetTo("0");
  }

  private resetTo(value: string | number): void {
    this.displayValue = String(value);
    this.formula = String(value);
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;

    this.callback(this.displayValue);
  }

  private deleteLastDigit(): void {
    this.waitingForOperand = false;
    this.displayValue = this.displayValue.slice(0, -1) || "0";

    this.updateFormula();
  }

  public handleKey = (key: string): void => {
    if (!isNaN(Number(key)) || key === ".") this.inputDigit(key);
    else if (["+", "-", "*", "/"].includes(key)) this.inputOperator(key);
    else if (key === "=") this.inputEquals();
    else if (key === "C") this.clear();
    else if (["←", "Escape", "Backspace"].includes(key)) this.deleteLastDigit();
  };
}
