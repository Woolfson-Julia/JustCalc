import { CalculatorService as CalculatorServiceType } from "../types/types";

export default class CalculatorService implements CalculatorServiceType {
  private displayValue: string = "0";
  private firstOperand: number | null = null;
  private waitingForOperand: boolean = false;
  private operator: string | null = null;
  private callback: (value: string) => void;

  constructor(callback: (value: string) => void) {
    this.callback = callback;
  }

  public inputDigit(digit: string){
    if (this.waitingForOperand) {
      this.displayValue = digit;
      this.waitingForOperand = false;
    } else {
      this.displayValue =
        this.displayValue === "0"
          ? digit
          : this.displayValue + digit;
    }
    this.callback(this.displayValue);
  }

  public inputOperator(nextOperator: string) {
    const inputValue = parseFloat(this.displayValue);
    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.performOperation(this.firstOperand, inputValue, this.operator);
      this.displayValue = String(result);
      this.firstOperand = result;
      this.callback(this.displayValue);
    }
    this.operator = nextOperator;
    this.waitingForOperand = true;
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
      const inputValue = parseFloat(this.displayValue);
      const result = this.performOperation(this.firstOperand, inputValue, this.operator);
      this.displayValue = String(result);
      this.firstOperand = null;
      this.operator = null;
      this.waitingForOperand = true;
      this.callback(this.displayValue);
    }
  }

  public clear() {
    this.displayValue = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.callback(this.displayValue);
  }

  public handleKey = (key: string) => {
    if (/^[0-9]$/.test(key) || key === ".") {
      this.inputDigit(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
      this.inputOperator(key);
    } else if (key === "=") {
      this.inputEquals();
    } else if (key === "C") {
      this.clear();
    }
  }
}
