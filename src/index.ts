import "./styles/index.scss"
import Calculator from "@/@modules/Calculator"
import App from "./components/App"

const calculator = new Calculator()

new App("#root", {
  calculatorService: calculator,
})
