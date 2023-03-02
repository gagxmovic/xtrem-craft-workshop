import { Currency } from '../src/Currency'
import { MoneyCalculator } from '../src/MoneyCalculator'

describe('Money', function () {
  test('add in usd returns number', () => {

    let result = MoneyCalculator.Add(5, Currency.USD, 10)
    expect(result).toBeNumber()
    expect(result).not.toBeNull()
  })

  test('multiply in eur returns positive number', () => {
    let result = MoneyCalculator.Times(10, Currency.EUR, 2)
    expect(result).toBeGreaterThan(0)
  })

  test('divide in korean won returns number', () => {
    let result = MoneyCalculator.Divide(4002, Currency.KRW, 4)
    expect(result).toBe(1000.5)
  })
})
