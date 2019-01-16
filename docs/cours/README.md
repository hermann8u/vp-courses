# Introduction

## Qu'est ce qu'un framework ?

### Définition
Un framework de développement constitue un ensemble de composants apportant une base de travail structurée pour la réalisation d'un projet. Une bonne métaphore valant parfois mieux que de longues explications, c'est à la cuisine que nous pouvons faire référence afin d'illustrer au mieux l'intérêt du framework.

L'objectif est de réaliser un bon gâteau (ou un bon projet). De manière générale, les personnes ne sachant pas cuisiner ou aimant une recette très connue choisissent un gâteau tout prêt, c'est ce que l'on peut apparenter, en développement web, à un CMS (par exemples Wordpress, Drupal, etc.). C'est quelque chose de très pratique, le produit est là, il fonctionne, mais l'inconvénient principal est qu'il ne nous est pas possible d'en modifier la recette. Au mieux, vous pouvez rajouter un peu de nappage mais cela reste très succinct.

Heureusement, lorsque l'on sait cuisiner, tous ces inconvénients disparaissent pour nous laisser choisir nos propres ingrédients et confectionner notre propre recette. Le problème de cette méthode est qu'elle prend énormément de temps et demande une maîtrise pointue de toutes les techniques. Or, il existe des combinaisons d'ingrédients que l'on retrouve dans toutes les recettes, comme casser les oeufs, monter les blancs en neige, ect. 
Et c'est là que le framework intervient, il vous propose directement ces combinaisons d'ingrédients qu'il ne vous reste plus qu'à assembler afin de créer votre propre recette. Il s'agit donc d'un ensemble de composants rassemblés dans un cadre de travail stable.

### Objectifs d'un framework
Les objectifs sont multiples et peuvent profiter aussi bien au développeur web, qu'à l'entreprise d'un point de vue économique.
Le framework permet de faciliter la mise en oeuvre des fonctionnalités liées à son domaine d'activité.
Il doit permettre au développeur de se concentrer sur les tâches spécifiques à l'application à développer plutôt qu'à des tâches techniques récurrentes telles que par exemple :
- L'architecture de base de l'application
- L'accès aux données
- L'internationalisation
- La mise en place de logs
- La sécurité (authentification et gestion des rôles)
- Le paramétrage de l'application
- La mise en place d'un système de cache

Sa mise en oeuvre permet donc de :
- Capitaliser le savoir-faire sans "réinventer la roue"
- Imposer un cadre de travail
- Standardiser le développement
- Faciliter le travail en équipe
- Améliorer la productivité

### Avantages et inconvénients d'un framework
La mise en place d'une telle solution présente bien évidemment de nombreux avantages permettant d'accroître notamment la productivité des équipes de développement, ainsi que de limiter la monotonie de leur travail.

Voici les principaux avantages que nous pouvons lister :

- Une structure de projet stable et sécurisée
- Un développement axé sur la logique métier
- Une pérennité garantie
- Une maintenabilité améliorée
- Une communauté en ligne

Malheureusement, et comme pour toutes bonnes choses, il existe quelques points négatifs (mais il faut avouer qu'ils sont peu nombreux) :

- Nécessité de se former à l'usage du framework (peut s'avérer long)
- Coût de mise oeuvre assez important
- Lenteurs engendrées (les frameworks de développement ont tendances à voir leurs performances améliorées, donc cet inconvénient devient des moindres depuis ces dernières années)

## Découvrir Symfony

### Présentation générale

Symfony est un framework de développement Open source écrit en PHP et lancé en 2005 par Fabien Potencier pour la société française [SensioLabs](https://sensiolabs.com)

Comme beaucoup d'autre, ce framework est basé sur une structure **MVC** (Modèle Vue Contrôleur), ce qui permet de travailler dans le respect des bonnes pratiques et de réutiliser des méthodologies de conception standardisées. Il s'agit d'un **design pattern** ayant déjà fait ses preuves et qui s'avère aujourd'hui un indispensable en programmation.

![MVC](/img/mvc.png)

Le **modèle** est la partie du code se chargeant d'interagir avec la base de données. On y retrouve donc notamment les appels SQL.

La **vue** est la partie du code qui se charge uniquement d'afficher les données qui lui ont été fournies. En aucun cas, la vue ne doit effectuer de traitement sur les données, sauf dans le but d'en embellir l'affichage.

Le **contrôleur** est le centre du design pattern MVC, il reçoit la requête HTTP du client, l'interprète et coordonne le tout. Il se charge de demander au modèle les données puis effectue plus ou moins de traitements dessus afin d'envoyer à la vue les données à afficher et de retourner une réponse à l'émetteur de la requête.

On remarque que chaque phase du travail est bien séparée, ce qui permet une organisation plus claire du code.

Par ailleurs, Doctrine utilise PDO, une solution qui vous permet d'ajouter une couche d'abstraction entre votre base de données et votre code.

![ORM](/img/orm.png)

Ainsi, vous n'avez plus besoin de vous soucier du type de base de données qui fonctionne derrière votre application. Un framework embarque également un ORM (Object Relational Mapper) qui permet d'installer une couche d'abstraction supplémentaire entre les appels à votre base de données et votre code. Vous pouvez ainsi faire des opérations courantes comme la récupération de données ou la sauvegarde d'un objet sans vous soucier du code SQL à écrire. Dans Symfony, l'ORM embarqué est Doctrine.

D'autres fonctionnalités très intéressantes sont proposées par Symfony dont voici quelques exemples :

- Gestion d'utilisateurs : La plupart des frameworks ont tout ce qu'il faut pour pouvoir gérer l'authentification d'utilisateurs. Ils gèrent la connexion, la déconnexion, la création, la gestion des sessions et des droits.

- Gestion des erreurs et bien plus : Certains frameworks comme Symfony offrent de très bon outils de débogage ainsi qu'un "profiler" qui permet de vous renseigner sur tout ce qu'il se passe dans votre application (variables globales, requêtes de base de données, logs, temps de chargement, etc.).

- Gestion des formulaires : Le framework offre la possibilité de générer en grande partie tous les widgets HTML, il se charge de la validation du formulaire et de la sécurité CSRF (Cross-Site Request Forgery).

- Internationalisation : Les frameworks vous permettent de créer facilement le multilingue pour vous et ce, de manière native la plupart du temps.

- Moteur de template : De nombreux frameworks intègrent un moteur de templates. Celui-ci permet de simplifier grandement l'écriture de votre code HTML tout en étant propre et efficace.

- Notion d'environnement : Symfony propose 3 environnements, l'environnement de développement, de test et de production.

### Pourquoi Symfony et pas un autre ?

Symfony est un framework codé en PHP qui va nous permettre de développer une immensité d'applications web de la plus simple à la plus complexe imaginable. Il définit un squelette de base à respecter, mais dans lequel on peut y mettre tout le code que l'on souhaite.

Il n'y a donc aucune limite ! Seule votre motivation pourra vous freiner, mais nous avons tous un énorme potentiel qui ne demande qu'à être exploité. Symfony est là pour nous aider à le mettre en avant.

En résumé, nous allons étudier Symfony car il possède :
- De nombreuses années d'expérience
- Une reconnaissance à l'internationale
- Une communauté fournie et active
- Un respect des standards (exemple : PSR-4)
- Une grande capacité d'évolution
- Des références connues (exemples : Yahoo!, DailyMotion, AdopteUnMec, BlaBlaCar, Allocine, ...)
- Une bonne notoriété dans les entreprises et crée de l'emploi

### Vocabulaire à connaître

Le vocabulaire utile lorsque l'on commence à travailler avec Symfony :
- **BUNDLE** : Un module, une fonctionnalité de l'application.
- **DOCTRINE** : Librairie PHP de gestion de base de données.
- **FIXTURE** : Scripts permettant de générer des ensembles de données de départ à injecter dans la base de données.
- **TWIG** : Moteur de template pour les applications PHP.
- **ROUTING** : Fonctionnalité qui mappe les URLs aux actions du controller

## Pour aller plus loin

- [Documentation de Symfony](https://symfony.com/doc/current/index.html)
- [Create your own framework - par Fabien Potencier (Niveau avancé)](https://symfony.com/doc/current/create_framework/index.html)