# Contrôleur et Routing

## Routing

Le rôle du routeur est, à partir d'une URL, de déterminer quel contrôleur appeler et avec quels arguments. Cela permet de configurer son application pour avoir de belles URL. Il s’agit là d’un point important pour le référencement et même pour le confort des visiteurs.

> Exemple :
> - **Non réécrite** : /index.php?controleur=produit&id=2&name=pantalon-jean-homme
> - **Réécrite** : /produit/2/pantalon-jean-homme

### Fonctionnement

L'objectif est de créer ce que l'on appelle le mapping des routes. Cela passe par un fichier permettant d’assurer la correspondance entre l’URL saisie et un bundle. Puis au sein du bundle lui même il s’agit de définir les chemins via chaque actions à l’aide des annotations.

Le principale fichier de correspondance vers les mappings de votre application se trouve ici : **/config/routes.yaml**

Le mapping propre à votre contrôleur est situé dans l’architecture même de votre contrôleur : src/Controller/StoreController.php

Le but du routeur est donc, à partir d'une URL, de trouver la route correspondante et de retourner les paramètres de sortie que définit cette route, dont le contrôleur. Pour trouver la bonne route, le routeur va les parcourir une par une, dans l'ordre du fichier, et s'arrêter à la première route qui fonctionne.