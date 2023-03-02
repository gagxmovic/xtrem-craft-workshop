import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'

describe('Bank', function () {

  test('convert from EUR to USD, assert it returns the correct number', () => {
    //Arrange
    let bankTest = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)

    //Act
    let result = bankTest.Convert(10, Currency.EUR, Currency.USD)

    //Assert
    expect(result).toBe(12)
  })

  test('convert from usd to usd, assert the returns same value', () => {
    //Arrange
    let bankTest = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)

    //Act
    let result = bankTest.Convert(10, Currency.EUR, Currency.EUR)

    //Assert
    expect(result).toBe(10)
  })


  test("convert exchange rate that isn't specified, must throw MissingExchangeRateError", () => {
    //Arrange
    let bankTest = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)

    //Act + Assert
    expect(() => bankTest.Convert(10, Currency.EUR, Currency.KRW)).toThrow(MissingExchangeRateError).toThrow("EUR-> KRW")

  })

  test('Convert same currency but with different exchange rate, must assert that convert result is different', () => {

    //Arrange
    let bankTest = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    let result = bankTest.Convert(10, Currency.EUR, Currency.USD)

    //Act
    bankTest.AddExchangeRate(Currency.EUR, Currency.USD, 1.3)
    let newResult = bankTest.Convert(10, Currency.EUR, Currency.USD)

    //Assert
    expect(result == newResult).toBe(false)

  })
})
