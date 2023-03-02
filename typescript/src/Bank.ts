import { Currency } from './Currency'
import { MissingExchangeRateError } from './MissingExchangeRateError'

export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map()

  /**
   * @param currency1
   * @param currency2
   * @param rate
   * 
   * Permet de renseigner le taux de change entre les 2 currencies
   * 
   * @return Une banque avec le aux de change indiqué
   */
  static withExchangeRate(currency1: Currency, currency2: Currency, rate: number): Bank {
    const bank = new Bank()
    bank.AddExchangeRate(currency1, currency2, rate)
    return bank
  }

  /**
   * @param currency1
   * @param currency2
   * @param rate
   * 
   * Demande l'ajout d'un taux de change
   * 
   */
  AddExchangeRate(currency1: Currency, currency2: Currency, rate: number): void {
    this._exchangeRates.set(currency1 + '->' + currency2, rate)
  }

  /**
   * @param amount
   * @param currency1
   * @param currency2
   * 
   * Convertit la currency1 en currency2 en fonction du taux de change si il existe
   */
  Convert(amount: number, currency1: Currency, currency2: Currency): number {
    if (!(this.canConvert(currency1, currency2))) { throw new MissingExchangeRateError(currency1, currency2) }

    if (currency2 === currency1) {
      return amount
    }
    return amount * this._exchangeRates.get(currency1 + '->' + currency2)

  }

  private canConvert(currency1: Currency, currency2: Currency) {
    return currency1 === currency2 || this._exchangeRates.has(currency1 + '->' + currency2)
  }
}
