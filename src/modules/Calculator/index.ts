import { CalculatorServiceImpl } from "../interfaces/impls"
import {
  calculateForPostfix,
  postfix,
  sliceExpression,
  validateForBracket,
  validateForDecimal,
} from "./algorithms"

export default class Calculator implements CalculatorServiceImpl {
  calculate(exp: string): number {
    this.validate(exp)
    return calculateForPostfix(postfix(sliceExpression(exp)))
  }

  private validate(exp: string) {
    validateForBracket(exp)
    validateForDecimal(exp)
  }
}
