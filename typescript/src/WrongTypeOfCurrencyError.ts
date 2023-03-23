import { Currency } from "./Currency"

export class WrongTypeOfCurrencyError extends Error {
  constructor(money1: Currency, money2: Currency) {
    super(money1 + '-> ' + money2)
  }

  message: string
}
