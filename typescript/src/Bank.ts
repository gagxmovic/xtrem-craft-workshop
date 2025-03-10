import { Currency } from './Currency'
import { MissingExchangeRateError } from './MissingExchangeRateError'
import { Money } from './Money'

export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map()
  private readonly _currencyPivot: Currency;

  public constructor(exchangeRates: Map<string, number> = new Map(), _currencyPivot: Currency) {
    this._exchangeRates = exchangeRates
    this._currencyPivot = _currencyPivot
  }

  /**
   * @param currencyFrom
   * @param currencyTo
   * @param rate
   * 
   * Permet de renseigner le taux de change entre les 2 currencies
   * 
   * @return Une banque avec le aux de change indiqué
   */
  /**static withExchangeRate(currencyFrom: Currency, currencyTo: Currency, rate: number): Bank {
    const bank = new Bank()
    const test = bank.NewAddExchangeRate(currencyFrom, currencyTo, rate);
    return test
  
  }

  /**
   * @param currencyFrom
   * @param currencyTo
   * @param rate
   * 
   * Demande l'ajout d'un taux de change
   * 
   */
  OldAddExchangeRate(currencyFrom: Currency, currencyTo: Currency, rate: number): void {
    this._exchangeRates.set(this.keyForExchangeRates(currencyFrom, currencyTo), rate)
  }

  NewAddExchangeRate(currency: Currency, rate: number): Bank {
    const newMap = new Map(this._exchangeRates);
    newMap.set(this.keyForExchangeRates(this._currencyPivot, currency), rate)
    newMap.set(this.keyForExchangeRates(currency, this._currencyPivot), 1 / rate)
    return new Bank(newMap, this._currencyPivot);

  }

  /**
   * @param money
   * @param currency
   * 
   * Convertit la currencyFrom en currencyTo en fonction du taux de change si il existe
   */


  Convert(money: Money, currency: Currency): Money {

    if (money.currency === currency) {
      return money
    }


    if (!(this.canConvert(money.currency, currency))) {
      if (currency !== this._currencyPivot && money.currency !== this._currencyPivot) {
        let tmp = new Money(money.value * this._exchangeRates.get(this.keyForExchangeRates(money.currency, this._currencyPivot)), this._currencyPivot)
        return new Money(tmp.value * this._exchangeRates.get(this.keyForExchangeRates(this._currencyPivot, currency)), currency)
      } else {
        throw new MissingExchangeRateError(money.currency, currency)
      }

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
