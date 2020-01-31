---
sidebarDepth: 0
---

# Listes de bundles

Vous trouverez ici une liste de quelques bundles Symfony intéressant à connaître/utiliser

[[toc]]

## Symfony

- [symfony/framework-bundle](https://packagist.org/packages/symfony/framework-bundle) : Le bundle contenant le framework lui-même
- [symfony/twig-bundle](https://packagist.org/packages/symfony/twig-bundle) : Intégration de **Twig** dans Symfony (Ajout de méthodes et de la configuration)
- [symfony/webpack-encore-bundle](https://packagist.org/packages/symfony/webpack-encore-bundle) : Intégration de **Webpack** pour la gestion des assets avec une simplification de la syntaxe de configuration.
- [symfony/maker-bundle](https://packagist.org/packages/symfony/maker-bundle) : Permet de générer du code depuis la console (disponible depuis la version 4 de Symfony).

- [sensio/framework-extra-bundle](https://packagist.org/packages/sensio/framework-extra-bundle) : Gestion des annotations pour les contrôleurs (Routing, View, Cache, Security, ParamConverter, ...). Il est donc nécessaire pour pouvoir utiliser les annotations comme type de routing.

## Doctrine
- [doctrine/doctrine-bundle](https://packagist.org/packages/doctrine/doctrine-bundle) : Le bundle intégrant l'ORM Doctrine à Symfony.
- [doctrine/doctrine-fixtures-bundle](https://packagist.org/packages/doctrine/doctrine-fixtures-bundle) : Permet de gérer des fixtures dans un projet Symfony utilisant Doctrine.
- [doctrine/doctrine-migrations-bundle](https://packagist.org/packages/doctrine/doctrine-migrations-bundle) : Intègre le système de migrations de base de données à l'ORM Doctrine.

## FriendsOfSymfony

- [friendsofsymfony/rest-bundle](https://packagist.org/packages/friendsofsymfony/rest-bundle) : Fournit différents outils pour faciliter le développement d'une api REST avec Symfony.
- [friendsofsymfony/elastica-bundle](https://packagist.org/packages/friendsofsymfony/elastica-bundle) : Permet d'utiliser Elacticsearch avec son wrapper PHP Elastica dans une application Symfony.
- [friendsofsymfony/jsrouting-bundle](https://packagist.org/packages/friendsofsymfony/jsrouting-bundle) : Permet d'exposer certaines routes de notre application au client pour les utilser en Javascript. Pratique pour faire des appels AJAX !

## Autre

- [stof/doctrine-extensions-bundle](https://packagist.org/packages/stof/doctrine-extensions-bundle) : Ajoute des annotations pour réaliser des tâches courantes sur vos entités Doctrine (Génération de slug, Gestion des createdAt/updatedAt, ...).
- [lexik/jwt-authentication-bundle](https://packagist.org/packages/lexik/jwt-authentication-bundle) : Gestion de Json Web Token pour gérer l'authentification. Principalement si vous développez une API.
- [easycorp/easyadmin-bundle](https://packagist.org/packages/easycorp/easyadmin-bundle) : Génération de tout un back-office en se basant sur vos entités Doctrine.
- [api-platform/api-pack](https://packagist.org/packages/api-platform/api-pack) : API Platform permet de générer toute une API en se basant sur vos entités Doctrine.
- [liip/imagine-bundle](https://packagist.org/packages/liip/imagine-bundle) : Redimensionnement et mis en cache d'image pour l'affichage.
- [babdev/pagerfanta-bundle](https://packagist.org/packages/babdev/pagerfanta-bundle) : Fournit différents outils pour gérer la pagination.
- [whiteoctober/breadcrumbs-bundle](https://packagist.org/packages/white-october/breadcrumbs-bundle) : Fournit différents outils pour générer un "breadcrumb" (ou fil d'ariane en français) sur votre application.