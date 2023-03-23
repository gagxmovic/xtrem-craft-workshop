import { Currency } from "../src/Currency";
import { Money } from "../src/Money";

describe('Money', function () {

    test('multiply EUR by 2 and return twice the amount in EUR', () => {
      //Arrange
      let money = new Money(2, Currency.EUR);
  
      //Act
      let result = money.times(2);
  
      //Assert
      expect(result.currency).toBe(Currency.EUR);
      expect(result.amount).toBe(4)
    })
  
   
  })
  