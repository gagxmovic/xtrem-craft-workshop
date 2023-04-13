import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'
import { Money } from '../src/Money'

class BankBuilder{
  private _currency: Currency = Currency.EUR;
  private _exchangeRates: Map<Currency, number> = new Map<Currency, number>([[Currency.USD, 1.2]]);
  static aBank = (): BankBuilder => new BankBuilder(); 

  public withPivotCurrency(currency: Currency): BankBuilder{
    this._currency = currency;
    return this;
  }

  addExchangeRate(currency: Currency, rate: number): BankBuilder{
    this._exchangeRates.set(currency, rate);
    return this;
  }

  build(): Bank{
    let bank = new Bank(new Map(), this._currency);
    this._exchangeRates.forEach((rate: number,currency: Currency) =>{
      bank = bank.NewAddExchangeRate(currency, rate);
    })
    return bank;
  }
}
describe('Bank', function () {

  const bank = BankBuilder.aBank().withPivotCurrency(Currency.EUR).addExchangeRate(Currency.USD,1.2).build();
  test('convert from EUR to USD, assert it returns the correct number', () => {
    //Arrange
    let money = new Money(10, Currency.EUR);
    //Act
    let result = bank.Convert(money, Currency.USD)

    //Assert
    expect(result.value).toBe(12)
  })

  test('convert from usd to usd, assert the returns same value', () => {
    //Arrange
    let money = new Money(10, Currency.EUR);

    //Act
    let result = bank.Convert(money, Currency.EUR)

    //Assert
    expect(result.value).toBe(10)
  })

  test("convert exchange rate that isn't specified, must throw MissingExchangeRateError", () => {
    //Arrange
    let money = new Money(10, Currency.EUR);

    //Act + Assert
    expect(() => bank.Convert(money, Currency.KRW)).toThrow(MissingExchangeRateError).toThrow("EUR-> KRW")

  })

  test('Convert same currency but with different exchange rate, must assert that convert result is different', () => {

    const newBank = BankBuilder.aBank().withPivotCurrency(Currency.EUR).addExchangeRate(Currency.USD,1.3).build();

    //Arrange
    let money = new Money(10, Currency.EUR);
    let result = bank.Convert(money, Currency.USD)

    //Act
    let newResult = newBank.Convert(money, Currency.USD)

    //Assert
    expect(result.value == newResult.value).toBe(false)

  })
})
