export interface CalculatorServiceImpl {
  calculate: (exp: string) => number
}

export interface ProviderImpl {
  subscribe: (fn: () => void) => void
  unsubscribe: (fn: () => void) => void
}
