import { Currency } from "../src/Currency";
import { Money } from "../src/Money";

describe('Money', function () {

    test('multiply EUR by 2 and return twice the amount in EUR', () => {
      //Arrange
      let money = new Money(2, Currency.EUR);
  
      //Act
      money.times(2);
  
      //Assert
      expect(money.currency).toBe(Currency.EUR);
      expect(money.value).toBe(4)
    })
  
   
  })
  