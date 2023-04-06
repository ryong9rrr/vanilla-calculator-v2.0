export type Operator = "/" | "X" | "+" | "-" | "(" | ")"

export const operators: Operator[] = ["/", "X", "+", "-", "(", ")"]

export const clickDelete = () => {
  cy.get(".delete").click()
}

export const clickClear = () => {
  cy.get(".modifier").click()
}

export const clickEqaul = () => {
  cy.get(".equal").click()
}

export const clickOperator = (operator: Operator) => {
  cy.get(".operation").contains(`${operator}`).click()
}

export const clickNumber = (number: number) => {
  cy.get(".digit").contains(`${number}`).click()
}

export const clickDot = () => {
  cy.get(".dot").click()
}

export const clickOpenBracket = () => {
  cy.get(".bracket").contains("(").click()
}

export const clickClosedBracket = () => {
  cy.get(".bracket").contains(")").click()
}

export const clickExpression = (exp: string) => {
  for (const char of [...exp]) {
    if (!Number.isNaN(Number(char))) {
      clickNumber(Number(char))
      continue
    }

    if (operators.includes(char as Operator)) {
      clickOperator(char as Operator)
      continue
    }

    if (char === "(") {
      clickOpenBracket()
      continue
    }

    if (char === ")") {
      clickClosedBracket()
      continue
    }

    if (char === ".") {
      clickDot()
    }
  }
}

export const assertion = (expected: string) => {
  cy.get("#total").should("have.text", expected)
}
