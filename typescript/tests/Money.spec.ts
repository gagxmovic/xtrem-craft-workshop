import { Currency } from "../src/Currency";
import { Money } from "../src/Money";
import { NegativeValueError } from "../src/NegativeValueError";
import { WrongTypeOfCurrencyError } from "../src/WrongTypeOfCurrencyError";

describe('Money', function () {

    test('multiply 2 EUR by 2 and return twice the amount in EUR', () => {
        //Arrange
        let money = new Money(2, Currency.EUR);

        //Act
        let result = money.times(2);

        //Assert
        expect(result.currency).toBe(Currency.EUR);
        expect(result.value).toBe(4)
    })

    test('Add 5 USD to 90 USD and return 95 USD', () => {
        //Arrange
        let money = new Money(90, Currency.USD);

        //Act
        let result = money.add(new Money(5, Currency.USD));

        //Assert
        expect(result.currency).toBe(Currency.USD);
        expect(result.value).toBe(95)
    })

    test('Divide 20 KRW by 5 and return 4 KRW', () => {
        //Arrange
        let money = new Money(20, Currency.KRW);

        //Act
        let result = money.divide(5);

        //Assert
        expect(result.currency).toBe(Currency.KRW);
        expect(result.value).toBe(4)
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


    test('unable to divide by negative', () => {
        //Arrange
        let money = new Money(20, Currency.KRW);

        //Act
        const action = () => money.divide(-69);

        //Assert
        expect(action).toThrow(NegativeValueError);
    })

    test('unable to add with different Currency', () => {
        //Arrange
        let money = new Money(20, Currency.KRW);

        //Act
        const action = () => money.add(new Money(5, Currency.USD));;

        //Assert
        expect(action).toThrow(WrongTypeOfCurrencyError);
    })

})
