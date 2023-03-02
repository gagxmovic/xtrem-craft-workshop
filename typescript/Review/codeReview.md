# Première review (découverte du code) #

Le code permet dans les grandes lignes de convertir une monnaie dans une autre via un taux de change que l'on donne en paramètre.

Pour convertir une monnaie dans une autre on est obligé de spécifier le taux de change.

On peut également effectuer des calculs sur ces monnaies comme des additions, des divisions et des multiplications.

# Deuxième code review => qu'est ce qui ne va pas dans le code #

La première chose qui ne va pas est le paramètre non utilisé dans les méthodes Add, Devide et Times.

Il faudrait modifier cela, pour que l'on puisse faire ces calculs sur des monnaies différents. Car pour le moment le code par du principe que ces calculs ne se font que sur des monnaie similaire.

La seconde -> quand on rajoute une exchangeRate cela crée à chaque fois une nouvelle banque et donc on ne peut pas stocker plusieurs exchange, et on ne peut pas utiliser plusieurs fois le même sans créer une nouvelle banque à chaque fois.