import { Currency } from '../src/Currency'
import { MoneyCalculator } from '../src/MoneyCalculator'

describe('Money', function () {
  test('Add USD, assert that 5 + 10 return 15', () => {
    let result = MoneyCalculator.Add(5, Currency.USD, 10)
    expect(result).toBe(15)
  })

  test('Multiply EUR, assert that 10 * 2 return 20', () => {
    let result = MoneyCalculator.Times(10, Currency.EUR, 2)
    expect(result).toBe(20)
  })

  test('Divide KRW, assert that 4002 / 4 return 1000.5', () => {
    let result = MoneyCalculator.Divide(4002, Currency.KRW, 4)
    expect(result).toBe(1000.5)
  })
})
