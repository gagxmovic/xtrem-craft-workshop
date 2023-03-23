import { Currency } from "../src/Currency";
import { Money } from "../src/Money";

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
  
   
  })
  