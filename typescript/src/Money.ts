import { Currency } from "./Currency";
import { NegativeValueError } from "./NegativeValueError";
import { WrongTypeOfCurrencyError } from "./WrongTypeOfCurrencyError";

export class Money {
    public value: number;
    public currency: Currency;

    constructor(value: number, currency: Currency) {
        if(value < 0) {
            throw new NegativeValueError();
        }
        this.value = value;
        this.currency = currency;
    }

    public add(amount: Money): Money {
        if (amount.currency != this.currency) {
            throw new WrongTypeOfCurrencyError(amount.currency, this.currency);
        } else {
            let newMoney = new Money( this.value + amount.value, this.currency);
            return newMoney;
        }
    }

    public times(amount: number): Money {
        if (amount < 0) {
            throw new NegativeValueError();
        } else {
            let newMoney = new Money( amount * this.value, this.currency);
            return newMoney;
        }
    }

    public divide(amount: number): Money {
        if (amount <= 0) {
            throw new NegativeValueError();
        } else {
            let newMoney = new Money( this.value / amount, this.currency);
            return newMoney;
        }
    }
}