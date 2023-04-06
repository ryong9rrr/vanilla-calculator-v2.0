import * as Utils from "../support/App.utils"

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9999")
  })

  it("숫자를 누른다.", () => {
    for (let number = 0; number <= 9; number += 1) {
      Utils.clickNumber(number)
    }
    Utils.assertion("123456789")
  })

  it("연산자를 누른다.", () => {
    Utils.operators.forEach((oper) => {
      Utils.clickOperator(oper)
    })
    Utils.assertion("/X+-()")
  })

  it("식을 누른다.", () => {
    Utils.clickExpression("5+3")
    Utils.assertion("5+3")
  })

  it("del 버튼을 누르면 맨 마지막 연산을 취소한다.", () => {
    Utils.clickExpression("5+3")
    Utils.clickDelete()
    Utils.assertion("5+")
  })

  it("하나의 연산만 있을 때 del 버튼을 누르면 0이 된다.", () => {
    Utils.clickNumber(5)
    Utils.clickDelete()
    Utils.assertion("0")
  })

  it("AC 버튼을 누르면 연산을 0으로 초기화한다.", () => {
    Utils.clickExpression("5+5")
    Utils.clickClear()
    Utils.assertion("0")
  })

  it("맨 처음에 0을 계속 입력하면 0이다.", () => {
    for (let i = 0; i < 4; i++) {
      Utils.clickNumber(0)
      Utils.assertion("0")
    }
  })

  it("0을 한번 입력하고 숫자를 입력하면 그 숫자가 렌더링된다.", () => {
    Utils.clickExpression("01")
    Utils.assertion("1")
  })

  it("예외 테스트 : 잘못된 괄호 테스트", () => {
    Utils.clickExpression("(1))")
    Utils.clickEqaul()
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("올바른 식을 입력해주세요.")
    })
  })

  it("예외 테스트 : 잘못된 소수점 테스트", () => {
    Utils.clickExpression("1.1.1")
    Utils.clickEqaul()
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("올바른 식을 입력해주세요.")
    })
  })

  it("첫번째 값 음수 테스트", () => {
    Utils.clickExpression("-1")
    Utils.clickEqaul()
    Utils.assertion("-1")
  })

  it("음수 연산 테스트", () => {
    Utils.clickExpression("-1+5")
    Utils.clickEqaul()
    Utils.assertion("4")
  })

  it("연속된 연산 테스트", () => {
    Utils.clickExpression("-1+5")
    Utils.clickEqaul()
    Utils.assertion("4")
    Utils.clickExpression("-9")
    Utils.clickEqaul()
    Utils.assertion("-5")
  })

  it("복잡한 연산 테스트", () => {
    Utils.clickExpression("(24.8-1.6)X2-3X(1+2)")
    Utils.clickEqaul()
    Utils.assertion("37.4")
  })
})
