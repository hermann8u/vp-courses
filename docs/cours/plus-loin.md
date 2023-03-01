# Pour aller plus loin

## Sur Symfony
Le but de ce cours était de vous présenter le framework Symfony dans son ensemble afin que vous puissiez réaliser une application web, c'est pourquoi tous les points n'ont pas forcément été approfondis au maximum. Il reste encore beaucoup à découvrir !

Voici une liste de quelques points à découvrir ou approfondir par vous-même.
<!--- **EventDispatcher** : Tout au long du cycle de vie d'une requête, des **Events** sont envoyés par le framework. Il est possible d'écouter ces events pour agir sur la requête ou la réponse grâce à ce qu'on appelle des **EventListener** (et **EventSubscriber**). On peut également créer nos propres events pour exécuter du code lorsqu'ils surviennent.-->
- **Les commandes** : Je l'ai déjà évoqué, mais il est possible de créer ses propres commandes pour exécuter du code depuis la console. Ce code est écrit en PHP et, comme tous services, peut avoir des dépendances sur d'autres services (ex: EntityManager, Logger, SwiftMailer, ...). C'est très pratique, notamment pour réaliser de petit script pour éviter de faire manuellement des tâches répétitives ou complexes.
- **Les services (encore)** : Nous avons également vu un chapitre sur les services, mais nous n'avons pas eu l'occasion dans notre application simple de voir leur réel intérêt. Là où ils deviennent intéressants, c'est qu'ils permettent d'éviter la duplication de code, mais également de découpler la logique métier de nos contrôleurs. Les contrôleurs servent donc uniquement à rassembler les appels aux différents services, qui eux se chargent de la logique métier.
- **Webpack encore** : Webpack encore est une librairie javascript spécialement conçue pour intégrer Webpack à Symfony avec un minimum d'effort. Cette librairie simplifie notamment la configuration de webpack à travers un wrapper et tout en nous en fournissant une par défaut.

D'une manière générale, si vous avez l'intention de continuer à développer avec Symfony, je vous conseille de commencer par :
- Lire les [bonnes pratiques](https://symfony.com/doc/current/best_practices.html) dans leur ensemble
- Jeter un coup d'oeil à [l'application de démo de Symfony](https://github.com/symfony/demo) et d'apprendre du code

## S'améliorer

Vous avez passé cette année à apprendre à écrire du code qui **fonctionne**, vous allez passer le reste de votre carrière de développeur à apprendre à écrire du code qui est **maintenable**.

> Make it work. Make it pretty & maintenable. Make it work again. Repeat.

### Pourquoi

Il est intéressant de savoir que l'on passe **90%** de notre temps à lire du code et donc seulement **10%** à en écrire. A ce titre, la façon dont on écrit notre code est importante pour se faire comprendre du plus grand nombre.

Vous allez également créer des applications qui seront amenées à évoluer avec le temps. Des fonctionnalités seront supprimées, d'autres vont évoluer, et ce, alors même que votre projet ne sera pas fini (et oui, les clients changent souvent d'avis !).

Lorsque votre application contiendra des bugs, et il y en aura ~~toujours~~, ce sera également plus facile de les identifier si votre projet est bien architecturé et vos fichiers bien formatés.

### Comment

Afin d'écrire du code de qualité, nous disposons de plusieurs outils dont notamment :

1. **Le respect des standards** : Que ce soit des standards d'écriture du code (**PSR-1**, **PSR-2**, **PSR-12** pour **PHP**) ou des standards d'architectures comme les **Design Pattern** ou les **Pattern architecturaux**, les **principes SOLID**, ...
2. **Les tests** : Tests fonctionnels **ET** l'écriture de tests unitaires, d'intégration, analyse de statique de code...
3. **La remise en question permanente** : Il est important de savoir se remettre en question et d'admettre que l'on à tord, notamment pour trouver la meilleure solution en équipe !
4. **L'apprentissage constant** : Nous travaillons dans un métier qui évolue de plus en plus vite. A ce titre, il est important de se tenir au courant des dernières évolutions le concernant. On parle de faire de la **veille**.

### Comment apprendre ?

Ca tombe bien, de nos jours, il y a également énormément de ressources pour apprendre et s'améliorer ! Personnellement, j'utilise principalement les moyens suivants :

- Youtube
- Twitter
- Github et l'open source
- Lire des articles
- Lire du code
- [A week of Symfony](https://symfony.com/blog/category/a-week-of-symfony)
- Participer à des événements/conférences -> avec l'[AFUP Lorraine](https://www.meetup.com/fr-FR/afup-lorraine-php/) pourquoi pas

Je vous ai préparer une [liste de quelques ressources](/ressources/apprendre.html) intéressantes pour apprendre et faire de la veille.
