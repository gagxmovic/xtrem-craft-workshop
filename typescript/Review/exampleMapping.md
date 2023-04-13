## Define Pivot Currency (post-it jaunes)

> Question (post-it rouge)
 
#### Règle Métier (post-it bleu)

Toutes les convertions passent forcément par cette monnaie. Un seul taux de change est nécessaire.

Exemple: (post-it vert)

Convertion de 5 EUR en USD
```gherkin
Given A bank with dollar as pivot currency
When I convert 5 EUR to USD
Then Return 5 x 1.2 = 6 USD
```

Exemple: (post-it vert)

Convertion de 6 USD en EUR
```gherkin
Given A bank with dollar as pivot currency
When I convert 6 USD to EUR
Then Return 6 x 0.8334 = 5 EUR
```

## Add an exchange rate (post-it jaunes)

> Que se passe-t-il si on veut ajouter un taux de change qui ne contient pas la devise pivot (post-it rouge)
 
#### Règle Métier (post-it bleu)

On ne peut pas avoir un taux de change qui ne contient pas la devise pivot

Ajout d'un taux de change non valide
Exemple: (post-it vert)
```gherkin
Given A bank with eur as pivot currency
When add a exchange rate from USD TO KRW
Then return an exception
```

#### Règle Métier (post-it bleu)

Ajout d'un taux de change entre deux monnaie est possible si contient il la monnaie pivot

Ajout d'un taux de change valide

Exemple: (post-it vert)
```gherkin
Given A bank with USD as pivot currency
When add a exchange rate from USD TO KRW
Then work
```

## Convert a Money (post-it jaunes)

>  Que se passe-t-il si nous voulons convertir dans une devise inconnue du système ?  (post-it rouge)


#### Règle Métier (post-it bleu)

Si on souhaite faire une convertion dans une devise inconnue -> retourne une erreur

Exemple: (post-it vert)

Erreur en cas de devise inconnue

```gherkin
Given a bank with Euro as Pivot Currency
When I convert 10 Euros to Korean Wons
Then I receive an error explaining that the system has no exchange rate
```

>  Que se passe-t-il si nous voulons convertir dans une devise qui est présente ?  (post-it rouge)


#### Règle Métier (post-it bleu)

Convertion dans une devise présente est possible

Exemple: (post-it vert)

Convertion possible

```gherkin
Given a bank with Euro as Pivot Currency
When I convert 10 Euros to Korean Wons
Then I receive 10 x 1344 = 13440
```

#### Règle Métier (post-it bleu)

Faire une convertion dans le même taux de change que celui de départ n'est pas possible

Exemple: (post-it vert)

Impossible de faire une convertion dans le même taux de change

```gherkin
Given a bank with Euro as Pivot Currency
When I convert 10 Euros to Euro
Then return an error
```

#### Règle Métier (post-it bleu)

Si le résultat de la convertion est impossible à réaliser avec de la vraie monnaie -> on arrondit le résultat

Exemple: (post-it vert)

Arrondie du résultat

```gherkin
Given a bank with EUR as Pivot Currency
When I convert 5632.1 USD to EUR
Then 5 632.1 x 0.82 -> 4 618.322 so return 4 618.32
```