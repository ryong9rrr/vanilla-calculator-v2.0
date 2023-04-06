import "./App.scss"
import { Component } from "@/@modules/core"
import { CalculatorServiceImpl } from "@/@modules/interfaces/impls"
import { hasClassFor } from "@/utils"

interface Props {
  calculatorService: CalculatorServiceImpl
}

interface State {
  exp: string
}

const createActionTypeForButton = ($button: HTMLButtonElement) => {
  if (hasClassFor($button, "digit") || hasClassFor($button, "operation")) {
    return "OPERATE"
  }

  if (hasClassFor($button, "delete")) {
    return "DELETE"
  }

  if (hasClassFor($button, "modifier")) {
    return "INIT"
  }

  if (hasClassFor($button, "equal")) {
    return "EQUAL"
  }

  return ""
}

export default class App extends Component<Props, State> {
  initState() {
    return {
      exp: "",
    }
  }

  template(): string {
    return `
      <div class="calculator">
        <h1 id="total">${this.state.exp || 0}</h1>
        <div class="modifiers">
          <button class="delete">del</button>
          <button class="modifier">AC</button>
        </div>
        <div class="digits">
          <button class="digit">9</button>
          <button class="digit">8</button>
          <button class="digit">7</button>
          <button class="digit">6</button>
          <button class="digit">5</button>
          <button class="digit">4</button>
          <button class="digit">3</button>
          <button class="digit">2</button>
          <button class="digit">1</button>
          <button class="digit">0</button>
        </div>
        <div class="operations">
          <button class="operation">/</button>
          <button class="operation">X</button>
          <button class="operation">+</button>
          <button class="operation">-</button>
          <button class="operation bracket">(</button>
          <button class="operation bracket">)</button>
          <button class="operation dot">.</button>
          <button class="equal">=</button>
        </div>
      </div>
    `
  }

  setEvent(): void {
    this.addEvent("click", "button", (e) => {
      const $button = e.target as HTMLButtonElement
      this.actionForButton($button)
    })
  }

  actionForButton($button: HTMLButtonElement) {
    const type = createActionTypeForButton($button)
    switch (type) {
      case "OPERATE": {
        this.handleClickExp($button.textContent as string)
        return
      }
      case "DELETE": {
        this.handleClickDel()
        return
      }
      case "INIT": {
        this.handleClickInit()
        return
      }
      case "EQUAL": {
        this.handleClickEqual()
        return
      }
      default: {
        return
      }
    }
  }

  handleClickExp(val: string) {
    if (!this.state.exp && val === "0") {
      return
    }
    const nextExp = this.state.exp ? this.state.exp + val : val
    this.setState({ exp: nextExp })
  }

  handleClickDel() {
    const nextExp =
      this.state.exp.length > 0
        ? this.state.exp.slice(0, this.state.exp.length - 1)
        : ""
    this.setState({ exp: nextExp })
  }

  handleClickInit() {
    this.setState({ exp: "" })
  }

  handleClickEqual() {
    try {
      const result = this.props.calculatorService.calculate(this.state.exp)
      this.setState({ exp: String(result) })
    } catch (error) {
      window.alert("올바른 식을 입력해주세요.")
    }
  }
}
