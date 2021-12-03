# Bundles, Flex et auto-configuration

## Qu'est ce qu'un bundle ?
Les bundles sont les **blocs de construction** élémentaires de n'importe quelle application Symfony. En fait le framework Symfony est lui même un bundle ! Les bundles permettent de séparer le code en briques **fonctionnelles** et **réutilisables**. Ils encapsulent le fonctionnement des diverses composantes telles que les contrôleurs, le modèle, les templates ainsi que les diverses ressources, aussi bien images que CSS.

En d'autres termes, un bundle est un librairie PHP avec une couche qui permet son intégration au sein du framework.

Avant la version 4 de Symfony, il était recommandé d'organiser son code en utilisant les bundles. C'est à dire que le code source de l'application (le dossier **/src/**) était divisé en bundle. Ce n'est plus le cas et les bundles doivent être **seulement** utilisés pour **partager du code et des fonctionnalités** d'un projet à un autre.

::: tip
Les bundles restent très important dans Symfony. Sur internet, on trouve une multitude de bundles nous permettant d'intégrer des fonctionnalités déjà développées.
:::

Pour être fonctionnels dans votre application, les bundles doivent être définis dans le fichier **/config/bundles.php**. Il contient une array associative avec, en clé, le namespace complet la classe du bundle pour l'initialisation, et en valeur, les environnements pour lequel/lesquels ce bundle est activé.

Je vous ai préparé une liste de quelques bundles à connaître/utiliser. Vous pouvez les retrouver dans la partie [ressources/bundles](/ressources/bundles.html) de ce site.

::: warning
Symfony 6 vient de sortir et il est possible que certain de ces bundles ne soit pas encore compatible avec cette nouvelle version majeure.
:::

## Symfony et Flex

Symfony Flex est un plugin pour Composer qui a été introduit avec Symfony 4. Son but est d'auto-configurer les bundles et composants que vous installez dans votre projet. Pour cela, le bundle doit avoir **une recette**, c'est à dire des instructions sur la manière dont il doit être configuré par défaut.

Les bundles et composants disposant d'une recette sont tous référencés sur le site [https://flex.symfony.com](https://flex.symfony.com). Je vous conseille de regarder d'abord sur ce site si vous êtes à la recherche d'une librairie (ou d'un bundle) pour répondre à une fonctionnalité dont vous avez besoin.

Les principales fonctionnalités de Flex sont les suivantes :
- Configuration automatique des librairies
- Définition d'alias : Il n'est plus nécessaire de taper le nom complet d'un package s'il possède un alias, par exemple **composer req admin** à la place de **composer require easycorp/easyadmin-bundle**
- Plus besoin non plus de taper *symfony* pour installer un package de Symfony (**composer req serializer**)
- Le fichier **/config/bundles.php** se remplit automatiquement à l'installation d'un bundle, même si celui-ci n'a pas de recette.

### Nettoyage du projet

Je vous ai précisé dans le chapitre d'installation qu'il y avait deux façons de commencer un projet Symfony :
- **symfony/website-skeleton** : C'est la méthode que nous avons utilisée. Notre projet est initialisé avec beaucoup de dépendances.
- **symfony/skeleton** : Le projet est initialisé avec le minimum de dépendances. Il faut ensuite les installer une à une, ou au fur et à mesure que le projet grossit.

Puisque nous avons choisi la première solution, nous allons nous servir de Flex, non pas pour configurer, mais pour dé-configurer les dépendances dont nous nous ne servirons pas.

<!-- #### Unpack le pack

Pour faciliter l'installation avec Flex, certaines dépendances ont été groupées par pack. Nous avons besoin de supprimer une seule dépendances du pack **symfony/orm-pack**, donc on va commencer par le dépacker pour faire apparaître les dépendances explicitement.

``` bash
composer unpack orm
``` -->

#### Suppression des packages

La suppression des packages se fait en une étape en utilisant la commande Composer **remove** :
``` bash
composer rem package-name-or-alias
```

Voici la liste des package que nous pouvons supprimer dans notre cas : **phpdocumentor/reflection-docblock annot expression-language http-client notifier process proxy-manager-bridge serializer web-link phpunit/phpunit browser-kit css-selector phpunit-bridge**

Notre projet est déjà plus léger ! Vous devriez avoir remarqué que certains dossiers et fichiers (principalement de configurations) ont disparus. Par exemple, le dossier des */tests* à la racine du projet n'est plus présent. 

<!--
#### Comparaison

Et voilà, notre projet est déjà un peu plus léger ! Regardons ce qui a changé :

##### Le dossier /config/packages

![config packages](/img/flex/config.png)

Quatre fichiers de configuration ont disparu : **translation.yaml**, **sensio_framework_extra.yaml**, **security.yaml** et **doctrine_migrations.yaml**

##### composer.json

![Le fichier composer.json](/img/flex/composer-json.png)

C'est le fichier qui a le plus changer, même si il reste encore pas mal de dépendances !

##### vendor

![Le dossier vendor](/img/flex/vendor.png)

Il faudrait regarder les sous-dossier ici pour voir une réelle différence, mais quand même plusieurs dossiers ont disparus.

##### Bundles

![Les bundles](/img/flex/bundles.png)

Là aussi, trois bundles de moins. Toujours ça de moins à instancier : **SensioFrameworkExtraBundle**, **SecurityBundle** et **DoctrineMigrationsBundle**
-->
