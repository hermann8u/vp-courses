# Structure du projet

La structure du nouveau projet est la suivante :

![Structure d'un projet Symfony 4](/img/structure.png)

## La console de Symfony

Le framework mets à votre disposition une console au sein de son application. C'est un fichier PHP qui s'exécute, à partir de la racine de notre projet, de la manière suivante :

``` sh{4}
php bin/console
```

Vous pouvez accéder à la liste des commandes disponibles dans Symfony en faisant :

``` sh{4}
php bin/console list
```

Dans la liste des commandes disponibles, vous trouverez notamment une commande permettant de connaître la version de Symfony installée :

``` sh{4}
php bin/console -V
```

Ce qui devrait vous afficher le résultat suivant :

![Symfony version commande](/img/symfony-v.png)

## Configuration

La configuration se trouve dans le dossier **/config/**. Le format par défaut pour la configuration est le format **Yaml**.

::: tip
Bien que Yaml est le format conseiller pour la configuration dans Symfony, il est aussi possible d'utiliser le format XML ou même PHP. C'est pourquoi dans la documentation de Symfony, les exemples sont affichés dans ces trois formats.
:::

Comme vous pouvez le voir, il y a un dossier **/config/packages/** dans lequel se trouve un fichier de configuration pour chaque package installé. On retrouve également des sous dossiers **dev/**, **prod/** et **test/** qui permettent de surcharger la configuration pour l'environnement courant.

Le routing est aussi définie dans le dossier de configuration. Nous y reviendrons prochainement.

## La partie publique

Le dossier **/public/** représente la partie public de l'application. Concrètement, ça signifie que si l'on met en ligne notre projet shoefony sur le domaine http://shoefony.fr, il faudra faire pointer la configuration serveur sur ce dossier public et faire en sorte que toutes les requêtes arrivent sur le fichier index.php (avec Apache, on peut faire cette configuration dans un fichier **.htaccess** par exemple). Ce système permet de faire en sorte que tous nos fichiers ne soient pas accessibles directement depuis le navigateur, notamment pour des raisons de sécurité.

::: tip
Le fait de faire passer toutes les requêtes par notre fichier index.php est un **pattern design** appelé "Front Controller".
:::

C'est aussi dans ce dossier public que se trouvera le css, les images et le javascript de notre application. En bref, toutes les ressources accessibles depuis le navigateur se trouvent dans ce dossier.

## Le code source PHP

Le dossier **/src/** contient tout le code source de notre application (tous nos fichiers PHP). C'est dans ce dossier que l'on le passera 90 % de notre temps. Si l'on regarde dedans, on peut voir qu'il y a déjà quelques dossiers dont **Controller** (pour le C de MVC) et **Entity** et **Repository** (pour le M de MVC) dont nous reparlerons plus tard.

### Un point sur le Kernel

On y retrouve également le noyau de notre application, le fichier **Kernel.php** contenant le classe **App\Kernel** qui sera instancié depuis notre Front Controller.
Si l'on regarde de plus près le code de ce Kernel, on peut voir qu'il se charge des points suivants :
- Définir l'emplacement les dossiers de cache et de log
- Enregistrer tous les bundles définis dans le fichier **/config/bundles.php** en fonction de l'environnement courant.
- Configurer le **"container"** pour l'injection de dépendances en fonction de la configuration du dossier **/config/**
- Configurer les routes de notre applications à partir du fichier **/config/routes.yaml** et du dossier **/config/routes/** en fonction de l'environnement courant.

## Les templates

Le dossier **/templates/** contiendra toutes nos vues. Par défaut dans Symfony, on utilise le moteur de templates [**Twig**](https://twig.symfony.com/) pour gérer nos vos vues. C'est pourquoi vous pouvez déjà y trouver le fichier base.html.twig. Un chapitre sera dédié plus tard à Twig.

## Les fichiers temporaires

::: danger
Le contenu de ce dossier ne doit pas être partagé car il est très lourd et géré par le framework lui-même. Ca signifie qu'il ne faut ni l'ajouter au repository git, ni l'ajouter à une quelconque archive.
:::

Le dossier **/var/** contiendra principalement les fichiers temporaires de l'application. On y retrouve donc les dossiers suivants :

### Le dossier /var/cache/

Tout le code mis en cache par le framework pour éviter de trop travailler (surtout en production), avec un sous-dossier par environnement. Sont mis en cache principalement :
- La configuration (y compris le routing)
- Les templates Twig
- Les traductions
- Le mapping des entités Doctrine

::: tip
Si vous avez une erreur bizarre, essayez de vider le cache. Si ça ne marche pas, c'est que l'erreur vient de vous :wink:
:::

::: danger
Le cache n'est jamais vidé en environnement de production, il faut donc penser à le vider à chaque modification une fois le site en ligne.
:::

### Le dossier /var/log/

Les logs sont des historiques de l'exécution de votre application. Là aussi, il y a un fichier par environnement car en fonction de lui les informations sont plus ou moins complètes.

Les logs sont surtout utiles lorsque votre application est en production et que vous tombez sur une erreur. Ce sera alors votre principal outil pour comprendre d'où provient le problème.

## Les dépendances

Toutes nos dépendances se trouveront dans le dossier **/vendor/**. Si vous jetez un coup d'oeil dedans, vous pourrez retrouver par example le dossier qui contient le code source de Symfony (/vendor/symfony). On y trouve aussi un dossier **composer** avec principalement la gestion de l'autoload généré par ce dernier.

::: danger
Vous ne devez pas modifier le contenu de ce dossier. Composer est là pour ça !
:::

::: danger
Comme pour le dossier **/var/**, le contenu de ce dossier ne doit pas être partagé. Les dépendances doivent s'installer lorsque l'on reçoit un projet grâce à la commande **composer install** (ou **composer update** si l'on souhaite mettre les dépendances à jour).
:::

## Les variables d'environnement

Les variables d'environnement sont des informations sensibles de l'application (accès à la base de données, environnement courant, ...). De plus, ces variables changent d'une copie de l'application à l'autre. C'est pourquoi des valeurs par défaut se trouve dans le fichier **.env** qui doivent être surchargées dans le fichier **.env.local**

::: tip
Les fichiers commençant par un point (.env, .env.local, .htaccess, ...) sont des fichiers cachés. Si vous ne les voyez pas, pensez à activer leur affichage.
:::

::: warning
En production, il est conseillé de ne pas du tout utiliser les fichiers .env mais de réaliser la déclaration de variable dans la configuration du serveur pour éviter d'exposer leur contenu.
:::

## La configuration de Composer

Le dernier fichier que je vais détailler est **composer.json**. Il est très important dans le sens où il contient toute la configuration de Composer.

Dans la partie **require** et **require-dev**, on retrouve nos fameuses dépendances (respectivement globale et pour le développement uniquement) avec les versions adéquates.

La partie **autoload** et également intéressante car elle définie le namespace de base de notre dossier **/src/**. Ainsi, toutes les classes dans ce dossier auront un namespace commençant par "App\" (par exemple **App\Kernel**)