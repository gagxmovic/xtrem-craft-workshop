import { Bank } from "../src/Bank";
import { Currency } from "../src/Currency";

class Portfolio {
    private count: { amount: number, currency: Currency }[] = [];

    evaluate(to: Currency, bank: Bank): number {
        return this.count.reduce((acc: number, cur: { amount: number, currency: Currency }): number => {
            return acc + bank.Convert(cur.amount, cur.currency, to)
        }, 0)
    }
    add(amount: number, currency: Currency): void {
        this.count.push({ amount: amount, currency: currency });

    }

}

describe('Portfolio', () => {

    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2);

    test(' 5 USD + 10 EUR = 17 USD', () => {
        //Arrange
        const portfolio = new Portfolio();
        portfolio.add(5, Currency.USD);
        portfolio.add(10, Currency.EUR);

        //Act
        const result = portfolio.evaluate(Currency.USD, bank)


        //Assert
        expect(result).toBe(17);

    })

    it('should be evaluated to 0 when empty', () => {
        //Arrange
        const portfolio = new Portfolio();

        //Act
        const result = portfolio.evaluate(Currency.USD, bank)

        //Assert
        expect(result).toBe(0);

    })

    it('', () => {
        //Arrange
        const portfolio = new Portfolio();
        portfolio.add(5, Currency.USD);

        //Act
        const result = portfolio.evaluate(Currency.USD, bank)

        //Assert
        expect(result).toBe(5);

    })

    test(' 1 USD + 1100 KRW = 2200 KRW', () => {
        //Arrange
        const portfolio = new Portfolio();
        portfolio.add(1, Currency.USD);
        portfolio.add(1100, Currency.KRW);

        bank.AddExchangeRate(Currency.USD, Currency.KRW, 1100);

        //Act
        const result = portfolio.evaluate(Currency.KRW, bank)


        //Assert
        expect(result).toBe(2200);

    })

    test(' 5 USD + 10 EUR = 18940 KRW', () => {
        //Arrange
        const portfolio = new Portfolio();
        portfolio.add(5, Currency.USD);
        portfolio.add(10, Currency.EUR);

        bank.AddExchangeRate(Currency.USD, Currency.EUR, 0.82);
        bank.AddExchangeRate(Currency.EUR, Currency.KRW, 1344);

        //Act
        const result = portfolio.evaluate(Currency.KRW, bank)


        //Assert
        expect(result).toBe(18940);

    })

    test(' 5 USD + 10 EUR = 14,1 EUR', () => {
        //Arrange
        const portfolio = new Portfolio();
        portfolio.add(5, Currency.USD);
        portfolio.add(10, Currency.EUR);
        bank.AddExchangeRate(Currency.USD, Currency.EUR, 0.82);

        //Act
        const result = portfolio.evaluate(Currency.EUR, bank)

        //Assert
        expect(result).toBe(14.1);
    })
})