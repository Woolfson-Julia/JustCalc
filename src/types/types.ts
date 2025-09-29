export interface CalculatorService {
  handleKey: (key: string) => void;
}
export type displayValue = string & { __brand: "displayValue" };
