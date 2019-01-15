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

## Maker
- **php bin/console make:controller** : Génère un contrôleur vide avec le nom donné