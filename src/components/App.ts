import "./App.scss"
import { Component } from "@/@modules/core"
import { CalculatorServiceImpl } from "@/@modules/interfaces/impls"

interface Props {
  calculatorService: CalculatorServiceImpl
}

interface State {
  exp: string
}

export default class App extends Component<Props, State> {
  initState() {
    return {
      exp: "0",
    }
  }

  template(): string {
    return `
      <div class="calculator">
        <h1 id="total">${this.state.exp}</h1>
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
}
