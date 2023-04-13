import { prototype } from "events";
import { Bank } from "../src/Bank";
import { Currency } from "../src/Currency";
import { Money } from "../src/Money";

class Portfolio {
    private moneys: Money[] = [];

        public constructor(moneys : Money[] = []){
            this.moneys = moneys;
        }
        evaluate(to: Currency, bank: Bank): Money {
        return this.moneys.reduce((acc: Money, mon: Money): Money => {
            let money = new Money(mon.value,mon.currency);
            return new Money(acc.value + bank.Convert(money , to).value, to);
        }, new Money(0,to))
    }
    add(money: Money): Portfolio {
        const newList = [...this.moneys].concat([money]);
        let portfolio = new Portfolio(newList);
        return portfolio;

    }

}

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

describe('Portfolio', () => {

    const bank = BankBuilder.aBank().withPivotCurrency(Currency.USD).addExchangeRate(Currency.EUR,0.82).addExchangeRate(Currency.KRW,1100).build();

    test(' 5 USD + 10 EUR = 17 USD', () => {

        const myBank = BankBuilder.aBank().withPivotCurrency(Currency.EUR).addExchangeRate(Currency.USD,1.2).build();
        //Arrange
        const portfolio = new Portfolio();
        
        const finalPortfolio = portfolio.add(new Money(5, Currency.USD)).add(new Money(10, Currency.EUR));

        //Act
        const result = finalPortfolio.evaluate(Currency.USD, myBank)


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
        const finalPortfolio = portfolio.add(new Money(5, Currency.USD));

        //Act
        const result = finalPortfolio.evaluate(Currency.USD, bank)

        //Assert
        expect(result.value).toBe(5);

    })

    test(' 1 USD + 1100 KRW = 2200 KRW', () => {
        //Arrange
        const portfolio = new Portfolio();
        const finalPortfolio = portfolio.add(new Money(1, Currency.USD)).add(new Money(1100, Currency.KRW));


        const finalBank = BankBuilder.aBank().withPivotCurrency(Currency.USD).addExchangeRate(Currency.KRW,1100).build();


        //Act
        const result = finalPortfolio.evaluate(Currency.KRW, finalBank)


        //Assert
        expect(result.value).toBe(2200);

    })

    test(' 5 USD + 10 EUR = 18940 KRW', () => {
        //Arrange
        const portfolio = new Portfolio();
        const finalPortfolio = portfolio.add(new Money(5, Currency.USD)).add(new Money(10, Currency.EUR));

        const finalBank = BankBuilder.aBank().withPivotCurrency(Currency.USD).addExchangeRate(Currency.EUR,0.82).addExchangeRate(Currency.KRW,1100).build();

        //Act
        const result = finalPortfolio.evaluate(Currency.KRW, finalBank)


        //Assert
        expect(result.value).toBeGreaterThan(18940 - (18940*0.01)) && expect(result.value).toBeLessThan(18940 + (18940*0.01));

    })

    test(' 5 USD + 10 EUR = 14,1 EUR', () => {
        //Arrange
        const portfolio = new Portfolio();
        const finalPortfolio = portfolio.add(new Money(5, Currency.USD)).add(new Money(10, Currency.EUR));

        const finalBank = BankBuilder.aBank().withPivotCurrency(Currency.USD).addExchangeRate(Currency.EUR,0.82).build();

        //Act
        const result = finalPortfolio.evaluate(Currency.EUR, finalBank)

        //Assert
        expect(result.value).toBe(14.1);
    })
})