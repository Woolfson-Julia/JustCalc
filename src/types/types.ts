export interface CalculatorService {
  handleKey?: (key: any) => void;
}
export type displayValue = string & { __brand: "displayValue" };
