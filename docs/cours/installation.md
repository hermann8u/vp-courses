# Installation

## Prérequis

L'installation de Symfony nécessite un environnement de travail spécifique, pour cela vous avez plusieurs possibilités : 
- Créer une machine virtuelle avec une distribution Linux
- Déployer un serveur web physique avec Linux
- Utiliser un environnement local avec Wamp, Lamp, etc.
- Utiliser le PHP built-in server (nécessite d'avoir PHP d'installer sur sa machine)

Dans tous les cas il est impératif de posséder un moteur de base de données, **MySQL** dans notre cas, et **PHP 7.2.5** (ou plus) correctement installé.

## Télécharger et installer Symfony

Il y a deux manières d'installer un projet Symfony:
- Avec [le binaire de Symfony](https://symfony.com/download)
- Avec Composer

Dans notre cas, nous allons utiliser Composer.

### Parenthèse sur Composer
[Composer](https://getcomposer.org) est **LA** librairie de gestion de dépendances pour PHP. Son utilisation se fait à travers une invite de commande (ou CLI). Il permet notamment de :
- Créer un projet.
- Installer des librairies/packages PHP listé sur le site [https://packagist.org](https://packagist.org)
- Gérer les versions des différents packages installées.
- Générer un système d'autoload pour charger les fichiers du projet. C'est fini les "include" barbares :tada:

Pour l'installation [https://getcomposer.org/download](https://getcomposer.org/download). Si vous êtes sur Windows, vous pouvez utiliser le Windows installer qui vous guidera lors de l'installation.

Pour vérifier que composer est installé correctement, ouvrez une nouvelle invite de commande et taper la commande suivante :

``` bash{4}
composer -v
```

### Premier projet Symfony

Une fois Composer installé, on peut exécuter la commande suivante pour créer notre premier projet Symfony (où "shoefony" est le nom du dossier dans lequel sera créé votre projet) :

``` bash{4}
composer create-project symfony/website-skeleton shoefony
```
Il ne reste plus qu'à attendre que Composer installe toutes les dépendances et initialise votre projet.

::: tip
Symfony propose deux différents projets de base lors de l'installation. Si vous utilisez le package symfony/skeleton dans la commande précédente, vous obtiendrez une version beaucoup plus légère du framework. C'est pratique si vous décidez d'installer seulement les packages nécessaires à votre application.
:::

Une fois l'installation terminée, rendez-vous dans le dossier du projet nouvellement créé et lancer le [PHP built-in server](https://www.php.net/manual/fr/features.commandline.webserver.php) :
``` bash{4}
cd shoefony
php -S localhost:8000 -tv public
```

::: tip OPTIONNEL
Si vous en voulez simplifier la commande pour lancer le *built-in server*, vous pouvez compléter les scripts du fichier *composer.json* de votre projet.
:::

En vous rendant à l'url indiqué (qui devrait être quelque chose comme [http://localhost:8000](http://localhost:8000)), vous devriez tomber sur cette page :

![Symfony welcome page](/img/sf-home.png)

::: tip OPTIONNEL
Vous pouvez suivre les instructions présentes dans la documentation afin de vérifier que votre système a tous les prérequis pour faire fonctionner Symfony [https://symfony.com/doc/current/reference/requirements.html](https://symfony.com/doc/current/reference/requirements.html)
:::

#### La Web Debug Toolbar

Vous constaterez la présence en bas de votre navigateur de la barre de debug Symfony.
Nous apprendrons à nous en servir tout au long de la formation, celle-ci permet notamment :
- De voir le nombre de requêtes SQL exécutés sur sa page
- De mesurer le temps d'exécution de sa page
- D'intercepter des emails envoyés depuis l'environnement de développement
- De consulter les logs
- D'analyser les requêtes HTTP envoyées
- ...

#### Avec un serveur Apache

Si vous décidez d'utiliser un serveur Apache, il vous faudra un fichier .htaccess adapté à Symfony qu'on obtiendra avec la commande suivante :

``` bash{4}
composer require symfony/apache-pack
```

Après validation, le fichier **.htaccess** devrait apparaître dans votre dossier /public/. Son but est de renvoyer toutes les requêtes vers notre Front Controller **public/index.php**. Les fichiers .htaccess servent uniquement pour Apache.

## Pour aller plus loin

- [Documentation de Symfony sur l'installation](https://symfony.com/doc/current/setup.html)
- [Symfony Best Practices: Creating the project](https://symfony.com/doc/current/best_practices.html#creating-the-project)
- [Symfony coding standard](https://symfony.com/doc/current/contributing/code/standards.html)
- [Demo d'application complète Symfony](https://github.com/symfony/demo)
