import { Currency } from "./Currency";
import { NegativeValueError } from "./NegativeValueError";
import { WrongTypeOfCurrencyError } from "./WrongTypeOfCurrencyError";

export class Money {
    public value: number;
    public currency: Currency;

    constructor(value: number, currency: Currency) {
        this.value = value;
        this.currency = currency;
    }

    public add(amount: Money) {
        if (amount.currency != this.currency) {
            throw new WrongTypeOfCurrencyError(amount.currency, this.currency);
        } else {
            this.value += amount.value;
        }
    }

    public times(amount: number) {
        if (amount < 0) {
            throw new NegativeValueError();
        } else {
            this.value = amount * this.value;
        }
    }
}