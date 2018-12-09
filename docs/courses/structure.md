# Structure du projet

La structure du nouveau projet est la suivante :

![Structure d'un projet Symfony 4](/img/structure.png)

## La console de Symfony

Le framework mets à votre disposition une console au sein de son application. C'est un fichier PHP qui s'execute, à partir de la racine de notre projet, de la manière suivante :

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

La configuration se trouve dans le dossier **config/**. Le format par défaut pour la configuration est le format **Yaml**.

::: tip
Bien que Yaml est le format conseiller pour la configuration dans Symfony, il est aussi possible d'utiliser le format XML ou même PHP. C'est pourquoi dans la documentation de Symfony, les exemples sont affichés dans ces trois formats.
:::

Comme vous pouvez le voir, il y a un dossier **config/packages/** dans lequel se trouve un fichier de configuration pour chaque package installé. On retrouve également des sous dossiers **dev/**, **prod/** et **test/** qui permettent de surcharger la configuration pour l'environnement courant.

Le routing est aussi définie dans le dossier de configuration. Nous y reviendrons prochainement.

## Le dossier public

Le dossier **public/** représente la partie public de l'application. Concrétement, ça signifie que si l'on met en ligne notre projet shoefony sur le domaine http://shoefony.fr, il faudra faire pointer la configuration serveur sur ce dossier public et faire en sorte que toute les requêtes arrive sur le fichier index.php (avec Apache, on peut faire cette configuration dans un fichier **.htaccess** par exemple). Ce système permet de faire en sorte que tout nos fichiers ne soit pas accessible directement depuis le navigateur, notamment pour des raisons de sécurité.

::: tip
Le fait de faire passer toutes les reqûetes par notre fichier index.php est un **pattern design** appelé "Front Controller".
:::

C'est aussi dans ce dossier public que se trouvera aussi le css, les images et le javascript de notre application. En bref, toutes les ressources accessibles depuis le navigateur se trouvent dans ce dossier.

## Le dossier src

Le dossier **src/** contient tout le code source de notre application (tous nos fchiers PHP). C'est dans ce dossier que l'on le passera 90 % de notre temps. Si l'on regarde dedans, on peut voir qu'il y a déjà quelques dossiers dont **Controller** (pour le C de MVC) et **Entity** et **Repository** (pour le M de MVC) dont nous reparlerons plus tard.

On y retrouve également le noyau de notre application, le fichier **Kernel.php** contenant le classe **App\Kernel** qui sera instancié depuis notre Front Controller.