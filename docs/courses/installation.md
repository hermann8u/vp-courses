# Installation

## Prérequis

L’installation de Symfony nécessite un environnement de travail spécifique, pour cela vous avez plusieurs possibilités : 
- Créer une machine virtuelle avec une distribution Linux
- Déployer un serveur web physique avec Linux
- Utiliser un environnement local avec Wamp, Lamp, etc.
- Utiliser le serveur intégrer de Symfony (nécessite d'avoir PHP d'installer sur sa machine de toute façon)

Dans tous les cas il est impératif de posséder un serveur web (Apache, Nginx), un moteur de base de données (MySQL dans notre cas) et PHP 7.1.3 (ou plus) correctement installé.

Vous l’aurez remarqué juste au dessus, il est préconisé d’utiliser un environnement de développement web fonctionnant sur le système d’exploitation Linux.

## Télécharger et installer Symfony

L'installation de Symfony se fait à travers Composer.

### Parenthèse sur Composer
[Composer](https://getcomposer.org) est **LA** librairie de gestion de dépendances pour PHP. Son utilisation se fait à travers une invite de commande (ou CLI). Il permet notamment de :
- Créer un projet.
- Installer des librairies/packages PHP listé sur le site [https://packagist.org](https://packagist.org)
- Gérer les versions des différents packages installées.
- Génèrer un système d'autoload pour charger les fichiers du projet. C'est fini les "include" barbares :tada:

Pour l'installation [https://getcomposer.org/download](https://getcomposer.org/download). Si vous êtes sur Windows, vous pouvez uyilisé le Windows installer qui vous guidera lors de l'installation.

Pour vérifier que composer est installé correctement, ouvrez une nouvelle invite de commande et taper la commande suivante :

``` sh{4}
composer -v
```

### Mon premier projet Symfony

Une fois Composer installé, on peut exécuter la commande suivante pour créer notre premier projet Symfony (où "shoefony" est le nom du dossier dans lequel sera créer votre projet) :

``` sh{4}
composer create-project symfony/website-skeleton shoefony
```
Plus qu'à attendre que Composer installer toutes les dépendances et initialise votre projet.

::: tip
Symfony propose deux différents projets de base lors de l'installtion. Si vous utilisez le package symfony/skeleton dans la commande précédente, vous obtiendrez une version beaucoup plus légère du framework.
:::

Une fois l'installation terminé, rendez vous dans le dossier du projet nouvellement créé et lancer le serveur de développement intégré à Symfony:
``` sh{4}
cd shoefony
php bin/console server:run
```

En vous rendant à l'url indiquer (qui devrait être quelque chose comme [http://localhost:8000](http://localhost:8000)), vous devriez tomber sur cette page:

![Symfony welcome page](/img/new_sf.png)

Vous constaterez la présence en bas de votre navigateur de la barre de débogage Symfony.
Nous apprendrons à nous en servir tout au long de la formation, celle-ci permet notamment :
- De voir le nombre de requêtes exécutés sur sa page
- De mesurer le temps d’exécution de sa page
- D’intercepter des emails envoyés depuis l’environnement de développement
- De consulter les logs
- D’analyser les requêtes HTTP envoyées
- ...

## Pour aller plus loin

- [Documentation de Symfony sur l'installation](https://symfony.com/doc/current/setup.html)
- [Symfony Best Pratices: Creating the project](https://symfony.com/doc/current/best_practices/creating-the-project.html)
- [Symfony coding standard](https://symfony.com/doc/current/contributing/code/standards.html)
- [Demo d'application complète Symfony](https://github.com/symfony/demo)
