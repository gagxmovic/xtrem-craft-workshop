import { Currency } from './Currency'
import { MissingExchangeRateError } from './MissingExchangeRateError'

export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map()

  /**
   * @param currencyFrom
   * @param currencyTo
   * @param rate
   * 
   * Permet de renseigner le taux de change entre les 2 currencies
   * 
   * @return Une banque avec le aux de change indiqué
   */
  static withExchangeRate(currencyFrom: Currency, currencyTo: Currency, rate: number): Bank {
    const bank = new Bank()
    bank.AddExchangeRate(currencyFrom, currencyTo, rate)
    return bank
  }

  /**
   * @param currencyFrom
   * @param currencyTo
   * @param rate
   * 
   * Demande l'ajout d'un taux de change
   * 
   */
  AddExchangeRate(currencyFrom: Currency, currencyTo: Currency, rate: number): void {
    this._exchangeRates.set(this.keyForExchangeRates(currencyFrom, currencyTo), rate)
  }

  /**
   * @param amount
   * @param currencyFrom
   * @param currencyTo
   * 
   * Convertit la currencyFrom en currencyTo en fonction du taux de change si il existe
   */
  Convert(amount: number, currencyFrom: Currency, currencyTo: Currency): number {
    if (!(this.canConvert(currencyFrom, currencyTo))) { throw new MissingExchangeRateError(currencyFrom, currencyTo) }

    if (currencyTo === currencyFrom) {
      return amount
    }
    return amount * this._exchangeRates.get(this.keyForExchangeRates(currencyFrom, currencyTo))

  }

  private keyForExchangeRates(currencyFrom: Currency, currencyTo: Currency): string {
    return currencyFrom + '->' + currencyTo
  }

  private canConvert(currencyFrom: Currency, currencyTo: Currency) {
    return currencyFrom === currencyTo || this._exchangeRates.has(this.keyForExchangeRates(currencyFrom, currencyTo))
  }
}
