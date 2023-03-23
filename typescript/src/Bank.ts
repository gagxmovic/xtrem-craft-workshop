import { Currency } from './Currency'
import { MissingExchangeRateError } from './MissingExchangeRateError'
import { Money } from './Money'

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
  ConvertOld(amount: number, currencyFrom: Currency, currencyTo: Currency): number {
    if (!(this.canConvert(currencyFrom, currencyTo))) { throw new MissingExchangeRateError(currencyFrom, currencyTo) }

    if (currencyTo === currencyFrom) {
      return amount
    }
    return amount * this._exchangeRates.get(this.keyForExchangeRates(currencyFrom, currencyTo))

  }
  

  Convert(money: Money, currency: Currency): Money {
    if (!(this.canConvert(money.currency, currency))) { throw new MissingExchangeRateError(money.currency, currency) }

    if (money.currency === currency) {
      return money
    }

    return new Money(money.value * this._exchangeRates.get(this.keyForExchangeRates(money.currency, currency)), currency)
  }

  /**
   * @param currencyFrom 
   * @param currencyTo 
   * @return un string qui correspond à la clé de la map entre 2 currency
   */
  private keyForExchangeRates(currencyFrom: Currency, currencyTo: Currency): string {
    return currencyFrom + '->' + currencyTo
  }

  /**
   * @param currencyFrom 
   * @param currencyTo 
   * @returns vrai si on peut convertir et faux si on peut pas
   */
  private canConvert(currencyFrom: Currency, currencyTo: Currency) {
    return currencyFrom === currencyTo || this._exchangeRates.has(this.keyForExchangeRates(currencyFrom, currencyTo))
  }
}
