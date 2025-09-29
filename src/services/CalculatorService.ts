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

  public inputDigit(digit: string): void {
    if (this.waitingForOperand) {
      this.displayValue = digit === "." ? "0." : digit;
      this.waitingForOperand = false;
    } else if (digit === "." && !this.displayValue.includes(".")) {
      this.displayValue += ".";
    } else if (digit !== ".") {
      this.displayValue =
        this.displayValue === "0" ? digit : this.displayValue + digit;
    }

    this.updateFormula();
  }

  private updateFormula(): void {
    this.formula = this.operator
      ? this.formula
          .split(/[-+*/]/)
          .slice(0, -1)
          .concat(this.displayValue)
          .join(this.operator)
      : this.displayValue;

    this.callback(this.formula);
  }

  public inputOperator(nextOperator: string): void {
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
    this.formula = this.displayValue + nextOperator;

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

  public inputEquals(): void {
    if (this.operator && this.firstOperand !== null) {
      const result = this.performOperation(
        this.firstOperand,
        parseFloat(this.displayValue),
        this.operator
      );
      this.displayValue = String(result);
      this.formula = this.displayValue;
      this.firstOperand = null;
      this.operator = null;
      this.waitingForOperand = true;
      this.callback(this.displayValue);
    }
  }

  public clear(): void {
    this.displayValue = "0";
    this.formula = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.callback(this.displayValue);
  }

  private deleteLastDigit(): void {
    if (this.waitingForOperand) return;

    if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.slice(0, -1);
    } else {
      this.displayValue = "0";
    }

    this.updateFormula();
  }

  public handleKey = (key: string): void => {
    if (!isNaN(Number(key)) || key === ".") this.inputDigit(key);
    else if (["+", "-", "*", "/"].includes(key)) this.inputOperator(key);
    else if (key === "=") this.inputEquals();
    else if (key === "C") this.clear();
    else if (key === "←" || key === "Escape" || key === "Backspace") this.deleteLastDigit();
  };
}
