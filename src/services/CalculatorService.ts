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

  public inputDigit(digit: string) {
    if (digit === ".") {
      if (this.waitingForOperand) {
        this.displayValue = "0.";
        this.waitingForOperand = false;
      } else if (!this.displayValue.includes(".")) {
        this.displayValue += ".";
      }
    } else {
      if (this.waitingForOperand) {
        this.displayValue = digit;
        this.waitingForOperand = false;
      } else {
        this.displayValue =
          this.displayValue === "0" ? digit : this.displayValue + digit;
      }
    }

    this.updateFormula();
  }

  private updateFormula() {
    if (!this.operator) {
      this.formula = this.displayValue;
    } else {
      const parts = this.formula.split(/[-+*/]/);
      parts[parts.length - 1] = this.displayValue;
      this.formula = parts.join(this.operator ?? "");
    }
    this.callback(this.formula);
  }

  public inputOperator(nextOperator: string) {
    if (this.operator && !this.waitingForOperand) {
      const result = this.performOperation(
        this.firstOperand!,
        parseFloat(this.displayValue),
        this.operator
      );
      this.firstOperand = result;
      this.displayValue = String(result);
      this.formula = String(result) + nextOperator;
    } else {
      this.firstOperand = parseFloat(this.displayValue);
      this.formula = this.displayValue + nextOperator;
    }
    this.operator = nextOperator;
    this.waitingForOperand = true;

    this.callback(this.formula);
  }

  private performOperation(first: number, second: number, operator: string) {
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

  public inputEquals() {
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

  public clear() {
    this.displayValue = "0";
    this.formula = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.callback(this.displayValue);
  }

  public handleKey = (key: string) => {
    if (!isNaN(Number(key)) || key === ".") {
      this.inputDigit(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
      this.inputOperator(key);
    } else if (key === "=") {
      this.inputEquals();
    } else if (key === "C") {
      this.clear();
    }
  };
}
