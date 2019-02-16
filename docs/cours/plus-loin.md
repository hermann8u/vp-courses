# Pour aller plus loin

Le but de ce cours était de vous présenter le framework Symfony dans son ensemble afin que vous puissiez réaliser une application web, c'est pourquoi tous les points n'ont pas forcément été approfondis au maximum. Il reste encore beaucoup à découvrir !

Voici une liste de quelques points à découvrir ou approfondir par vous-même.
- **EventDispatcher** : Tout au long du cycle de vie d'une requête, des **Events** sont envoyés par le framework. Il est possible d'écouter ces events pour agir sur la requête ou la réponse grâce à ce qu'on appelle des **EventListener** (et **EventSubscriber**). On peut également créer nos propres events pour exécuter du code lorsqu'ils surviennent.
- **Les commandes** : Je l'ai déjà évoqué, mais il est possible de créer ses propres commandes pour exécuter du code depuis la console. Ce code est écrit en PHP et, comme tous services, peut avoir des dépendances sur d'autres services (ex: EntityManager, Logger, SwiftMailer, ...). C'est très pratique, notamment pour réaliser de petit script pour éviter de faire manuellement des tâches répétitives ou complexes.
- **SecurityBundle** : Ce bundle intégrer à Symfony permet de gérer tout ce qui est en rapport avec la sécurité et principalement la gestion des utilisateurs, de leurs droits d'accès, etc...
- **Les services (encore)** : Nous avons également vu un chapitre sur les services, mais nous n'avons pas eu l'occasion dans notre application simple de voir leur réel intérêt. Là où ils deviennent intéressants, c'est qu'ils permettent d'éviter la duplication de code, mais également de découpler la logique métier de nos contrôleurs. Les contrôleurs servent donc uniquement à rassembler les appels aux différents services, qui eux se chargent de la logique métier.
- **Webpack encore** : Webpack encore est une librairie javascript spécialement conçue pour intégrer Webpack à Symfony avec un minimum d'effort. Cette librairie simplifie notamment la configuration de webpack à travers un wrapper et tout en nous en fournissant une par défaut.

D'une manière générale, si vous avez l'intention de continuer à développer avec Symfony, je vous conseille de commencer par :
- Lire les [bonnes pratiques](https://symfony.com/doc/current/best_practices/index.html) dans leur ensemble
- Jeter un coup d'oeil à [l'application de démo de Symfony](https://github.com/symfony/demo) et d'apprendre du code