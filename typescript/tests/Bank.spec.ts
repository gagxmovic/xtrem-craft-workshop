import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'
import { Money } from '../src/Money'

describe('Bank', function () {

  test('convert from EUR to USD, assert it returns the correct number', () => {
    //Arrange
    let bankTest = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)

    //Act
    let result = bankTest.ConvertOld(10, Currency.EUR, Currency.USD)

    //Assert
    expect(result).toBe(12)
  })

  test('convert from EUR to USD, assert it returns the correct number', () => {
    //Arrange
    let bankTest = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    let money = new Money(10, Currency.EUR);
    //Act
    let result = bankTest.Convert(money, Currency.USD)

    //Assert
    expect(result.value).toBe(12)
  })

  test('convert from usd to usd, assert the returns same value', () => {
    //Arrange
    let bankTest = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)

    //Act
    let result = bankTest.ConvertOld(10, Currency.EUR, Currency.EUR)

    //Assert
    expect(result).toBe(10)
  })


  test("convert exchange rate that isn't specified, must throw MissingExchangeRateError", () => {
    //Arrange
    let bankTest = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)

    //Act + Assert
    expect(() => bankTest.ConvertOld(10, Currency.EUR, Currency.KRW)).toThrow(MissingExchangeRateError).toThrow("EUR-> KRW")

  })

  test('Convert same currency but with different exchange rate, must assert that convert result is different', () => {

    //Arrange
    let bankTest = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    let result = bankTest.ConvertOld(10, Currency.EUR, Currency.USD)

    //Act
    bankTest.AddExchangeRate(Currency.EUR, Currency.USD, 1.3)
    let newResult = bankTest.ConvertOld(10, Currency.EUR, Currency.USD)

    //Assert
    expect(result == newResult).toBe(false)

  })
})
