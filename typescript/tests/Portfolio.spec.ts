import { prototype } from "events";
import { Bank } from "../src/Bank";
import { Currency } from "../src/Currency";
import { Money } from "../src/Money";

class Portfolio {
    private count: Money[] = [];

        evaluate(to: Currency, bank: Bank): Money {
        return this.count.reduce((acc: Money, mon: Money): Money => {
            let money = new Money(mon.value,mon.currency);
            return new Money(acc.value + bank.Convert(money , to).value, to);
        }, new Money(0,to))
    }
    add(money: Money): Portfolio {
        let portfolio = new Portfolio();
        portfolio.count = this.count;
        portfolio.count.push(money);
        return portfolio;

    }

}

describe('Portfolio', () => {

    const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2);

    test(' 5 USD + 10 EUR = 17 USD', () => {
        //Arrange
        const portfolio = new Portfolio();
        
        portfolio.add(new Money(5, Currency.USD));
        portfolio.add(new Money(10, Currency.EUR));

        //Act
        const result = portfolio.evaluate(Currency.USD, bank)


        //Assert
        expect(result.value).toBe(17);

    })

    it('should be evaluated to 0 when empty', () => {
        //Arrange
        const portfolio = new Portfolio();

        //Act
        const result = portfolio.evaluate(Currency.USD, bank)

        //Assert
        expect(result.value).toBe(0);

    })

    it('', () => {
        //Arrange
        const portfolio = new Portfolio();
        portfolio.add(new Money(5, Currency.USD));

        //Act
        const result = portfolio.evaluate(Currency.USD, bank)

        //Assert
        expect(result.value).toBe(5);

    })

    test(' 1 USD + 1100 KRW = 2200 KRW', () => {
        //Arrange
        const portfolio = new Portfolio();
        portfolio.add(new Money(1, Currency.USD));
        portfolio.add(new Money(1100, Currency.KRW));

        bank.AddExchangeRate(Currency.USD, Currency.KRW, 1100);

        //Act
        const result = portfolio.evaluate(Currency.KRW, bank)


        //Assert
        expect(result.value).toBe(2200);

    })

    test(' 5 USD + 10 EUR = 18940 KRW', () => {
        //Arrange
        const portfolio = new Portfolio();
        portfolio.add(new Money(5, Currency.USD));
        portfolio.add(new Money(10, Currency.EUR));

        bank.AddExchangeRate(Currency.USD, Currency.EUR, 0.82);
        bank.AddExchangeRate(Currency.EUR, Currency.KRW, 1344);

        //Act
        const result = portfolio.evaluate(Currency.KRW, bank)


        //Assert
        expect(result.value).toBe(18940);

    })

    test(' 5 USD + 10 EUR = 14,1 EUR', () => {
        //Arrange
        const portfolio = new Portfolio();
        portfolio.add(new Money(5, Currency.USD));
        portfolio.add(new Money(10, Currency.EUR));
        bank.AddExchangeRate(Currency.USD, Currency.EUR, 0.82);

        //Act
        const result = portfolio.evaluate(Currency.EUR, bank)

        //Assert
        expect(result.value).toBe(14.1);
    })
})