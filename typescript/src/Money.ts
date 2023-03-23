import { Currency } from "./Currency";
import { WrongTypeOfCurrencyError } from "./WrongTypeOfCurrencyError";

export class Money {
    public value: number;
    public currency: Currency;

    constructor(value: number, currency: Currency){
        this.value = value;
        this.currency = currency;
    }

    public add(amount: Money): number {
        if(amount.currency != this.currency) {
            throw new WrongTypeOfCurrencyError(amount.currency, this.currency);
        }
    }
}