---
sidebarDepth: 0
---

# Listes des principales commandes

Voici une liste des principales commandes disponible dans Symfony à connaître. Elle sera complété au fûr et à mesure du cours.

[[toc]]

::: tip
Toutes ces commandes s'exécutent par défaut pour l'environnement défini par la variable d'environnement **APP_ENV**. Vous pouvez utiliser l'option *--env* pour l'exécuter pour un autre environnement (ex : *php bin/console cache:clear --env=prod*).
:::

## Global
- **php bin/console** : Affiche la liste des complètes des commandes disponible dans l'application avec la version actuelle de Symfony. Utilisez la commande précédente avvec l'option *-V* pour afficher seulement la version.
- **php bin/console list** : Affiche la liste des commandes disponible dans l'application. Vous pouvez ajouter un argument pour avoir seulement la liste pour un namespace donné. Par exemple, la commande *php bin/console list debug* affichera seulement les commandes de debug.

## Cache
- **php bin/console cache:clear** : Vide le cache pour l'environnement courant et le reconstruit partiellement.

## Debug
- **php bin/console debug:router** : Permet d'afficher toutes les routes de notre application avec leur nom, leur méthode HTTP et leur path
- **php bin/console debug:autowiring** : Liste les classes et interfaces à utiliser pour l'autowiring.
- **php bin/console debug:container** : Liste tous les services disponibles dans l'application.
- **php bin/console debug:event-dispatcher** : Liste tous les events avec leurs listeners et subscribers associées.

## Maker
- **php bin/console make:controller** : Génère un contrôleur vide avec le nom donné
- **php bin/console make:entity** : Génère ou modifie une Entity Doctrine, ses propriétés et son Repository
- **php bin/console make:form** : Génère un formulaire en se basant (ou non) sur une entité Doctrine

## Doctrine
- **php bin/console doctrine:database:create** : Crée la base de données à partir des variables d'environnement définis
- **php bin/console doctrine:schema:update --dump-sql** : Affiche toutes les requêtes SQL nécessaire pour que la base de données correspondent à la définition de nos entités.
- **php bin/console doctrine:schema:update --force** : Execute les requêtes SQL pour mettre à jour notre base de données par rapport à la définition de nos entités.
