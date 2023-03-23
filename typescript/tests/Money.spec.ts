import { Currency } from "../src/Currency";
import { Money } from "../src/Money";
import { NegativeValueError } from "../src/NegativeValueError";

describe('Money', function () {

    test('multiply 2 EUR by 2 and return twice the amount in EUR', () => {
        //Arrange
        let money = new Money(2, Currency.EUR);

        //Act
        money.times(2);

        //Assert
        expect(money.currency).toBe(Currency.EUR);
        expect(money.value).toBe(4)
    })

    test('Add 5 USD to 90 USD and return 95 USD', () => {
        //Arrange
        let money = new Money(90, Currency.USD);

        //Act
        money.add(new Money(5, Currency.USD));

        //Assert
        expect(money.currency).toBe(Currency.USD);
        expect(money.value).toBe(95)
    })

    test('Divide 20 KRW by 5 and return 4 KRW', () => {
        //Arrange
        let money = new Money(20, Currency.KRW);

        //Act
        money.divide(5);

        //Assert
        expect(money.currency).toBe(Currency.KRW);
        expect(money.value).toBe(4)
    })

    test('unable to divide by 0', () => {
        //Arrange
        let money = new Money(20, Currency.KRW);

        //Act
        const action = () => money.divide(0);

        //Assert
        expect(action).toThrow(NegativeValueError);
    })

    test('unable to multiply by negative', () => {
        //Arrange
        let money = new Money(78, Currency.USD);

        //Act
        const action = () => money.times(-69);

        //Assert
        expect(action).toThrow(NegativeValueError);
    })


})
