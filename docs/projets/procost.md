# Procost

## Introduction

Durant nos différentes séances de travaux pratiques, nous avons exploité ensemble les notions de base proposées par le framework de développement Symfony. Vous devriez à présent être en mesure de réaliser vous-même un système complet, et c'est le but de ce projet !

Le sujet porte sur la création d'une interface web, intitulée **Procost**, et permettant de calculer de manière sommaire les coûts de développement des projets réalisés par les équipes de production d'une entreprise.

## Arborescence

Avant même de vous présenter le détail de chaque fonctionnalité à réaliser, voici une vue d'ensemble représentant l'arborescence du projet tel qu'il devra être composé :

![Arborescence du projet Procost](/img/procost/arbo.png)

## Fonctionnalités

Chaque fonctionnalité est décrite avec une quantité d'informations suffisante pour évaluer les implémentations techniques à effectuer. Vous aurez donc une certaine liberté en ce qui concerne certains aspects comme le nommage des tables et champs en base de données, le typage de ces champs, la validation des formulaires, etc.

### Le tableau de bord

Le tableau de bord doit permettre aux utilisateurs d'avoir un aperçu rapide de la situation de leur entreprise. Pour cela, il est nécessaire de leur offrir une visibilité sur les éléments suivants :
- Indicateurs : projets en cours, projets livrés, nombre d'employés, nombre de jours saisies
- **Le taux de projet rentable** : Parmi les projets livrés, le pourcentage dont le coût de production est inférieur au prix de vente.
- **Le taux de livraison** (ratio projets en cours / livrés)
- Fiche du **top employé** (coût total le plus élevé)
- Les **5 derniers projets créés**
- Les **10 dernières saisies** de temps de production

### Les employés

Afin que le manager puisse identifier qui a travaillé sur les projets de l'entreprise, il doit disposer d'un registre des employés de production. Ces employés seront composés des informations suivantes :

| Label           | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| Prénom          | Prénom de l'employé                                                |
| Nom             | Nom de l'employé                                                   |
| Adresse email   | Adresse email professionnelle de l'employé                         |
| Métier          | Métier de l'employé, en relation avec une liste externe et gérable |
| Coût journalier | Coût de production à la journée en €                               |
| Date d'embauche | Date d'embauche de l'employé                                       |

*Exemple de métiers : Web designer, SEO Manager, Web Developer, etc.*

Il est à noter que le manager sera libre d'ajouter ou modifier un intitulé de métier, néanmoins la suppression ne devra être autorisée que dans le cas où ce métier n'est lié à aucun employé.

La liste des employés devra afficher jusqu'à 10 employés, les suivants seront accessibles à l'aide d'une pagination en dessous de cette liste. Cette page devra permettre la création ou la modification d'un employé.

Chaque employé devra également disposer d'une fiche détails, celle-ci affichera toutes les informations du profil employé, un formulaire permettant de réaliser une saisie de temps sur un projet de notre choix pour l'employé en question et une liste paginée de tous les temps saisis (triée du plus récent au plus ancien).

### Les projets

La liste des projets doit être accessible aux utilisateurs afin d'avoir une vue globale sur la situation de l'entreprise. Les projets seront composés des informations suivantes :

| Label             | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| Nom               | Nom du projet                                                            |
| Description       | Description du projet                                                    |
| Prix de vente     | Le prix en € auquel le projet a été vendu au client                      |
| Date de création  | Date de création du projet (jour de l'enregistrement dans l'application) |
| Date de livraison | Date de livraison du projet. NULL si non livré                           |

La liste des projets devra afficher jusqu'à 10 projets, les suivants seront accessibles à l'aide d'une pagination en dessous de cette liste. Cette page devra permettre la création ou la modification d'un projet, ainsi que la livraison.

Lorsqu'un projet est terminé, le manager doit pouvoir cliquer sur un bouton indiquant que le projet a été livré. Un projet livré ne peut plus être modifié ou supprimé, il ne pourra plus non plus accueillir de nouveaux temps de production, son coût est établi et ne changera plus.

Chaque projet devra disposer d'une fiche détails, celle-ci affichera toutes les informations liées au projet (incluant le calcul du coût de production total et le nombre d'employés ayant travaillé dessus) et une liste paginée de tous les employés ayant passés du temps (en affichant leur prénom, nom, nombre de jours passés sur le projet et coût total).

### Les temps de production

Chaque projet doit pouvoir accueillir des temps de production, sachant qu'un employé peut tout à fait se voir attribuer plusieurs saisies de temps pour un même projet. Le temps de production doit être indiqué en nombre de jours travaillés, son coût est déduit d'une simple multiplication entre le nombre de jour de production et le coût journalier de l'employé.

La saisie de temps se passe sur la page de détail d'un employé. Il est à noter qu'un temps ne peut être qu'ajouté, il ne sera ainsi pas possible de modifier un temps déjà saisi.

<!-- ### Les rôles et les droits

Deux types de personnes pourront se connecter à l'application. Les managers et les employés. Ces *types* seront traduit dans l'application par des **rôles**.

Le tableau suivant passe en revu chaque action réalisable sur l'application et indique si l'utilisateur à le droit de la faire en fonction de son rôle.

|                          | Manager            | Employé                 |
| ------------------------ | :----------------: | :---------------------: |
| **Tableau de bord**      | :heavy_check_mark: | :heavy_check_mark:      |
| **Liste des projets**    | :heavy_check_mark: | :heavy_check_mark:      |
| **Voir un projet**       | :heavy_check_mark: | :heavy_check_mark:      |
| **Créer un projet**      | :heavy_check_mark: |                         |
| **Éditer un projet**     | :heavy_check_mark: |                         |
| **Livrer un projet**     | :heavy_check_mark: |                         |
| **Liste des métiers**    | :heavy_check_mark: | :heavy_check_mark:      |
| **Ajouter un métier**    | :heavy_check_mark: |                         |
| **Éditer un métier**     | :heavy_check_mark: |                         |
| **Supprimer un métier**  | Seulement si lié à aucun employé |           |
| **Liste des employés**   | :heavy_check_mark: | :heavy_check_mark:      |
| **Voir un employé**      | :heavy_check_mark: | Seulement lui-même      |
| **Ajouter un employé**   | :heavy_check_mark: |                         |
| **Éditer un employé**    |                    | Seulement lui-même      |
| **Ajouter du temps**     | :heavy_check_mark: | Seulement pour lui-même | -->

## Ressources

Afin de vous aider dans la réalisation de ce projet vous pourrez bien entendu faire usage régulier de la documentation officielle du framework Symfony, ainsi que du cours. 

Le but de ce projet étant de mesurer vos compétences dans le framework de développement Symfony, il vous est mis à disposition un template reposant sur la librairie Bootstrap. Celui-ci propose 5 pages que vous devrez utiliser, ainsi que décliner afin d'implémenter toutes les fonctionnalités demandées.

[Télécharger les templates](/projects/procost-template.zip)

## Dépôt du projet

### Comment

Vous créerez un repository privé sur [GitHub](https://github.com/) en respectant la convention de nommage suivante : **symfony_procost_pnom** (« pnom » devra être remplacé par la première lettre de votre prénom suivi de votre nom) Vous accorderez les droits à l'utilisateur suivant : **hermann8u**.

Un guide est à disposition pour vous expliquer comment procéder ici : [Partager son projet avec Git et Github](/ressources/git.html)

### Quoi

Le repository devra comporter l'ensemble des sources du projet qui utilisera **Symfony 6.0.x** (ou Symfony 5.4 si vous n'utilisez pas PHP 8), ainsi qu'un fichier **README.md** contenant votre prénom, nom, email. Vous y ajouterez des notes pouvant être utiles à l'évaluation du projet (partie ne fonctionnant pas, précisions concernant d'éventuels fixtures, etc.).

### Quand

Au plus tard le **samedi 19 mars 2022 à 23h59**. Le dernier commit ne doit pas dépasser cette date, sous peine de pénalité.

## Critères d'évaluations

| Critères | Points | Description |
| -------- | :---: | --- |
| **Fonctionnalités** | 10 | Les fonctionnalités et comportements demandés dans ce présent document sont implémentés et fonctionnels. Les templates fournis pour la réalisation de ce projet ont été utilisés et de manière adéquate. |
| **Conventions**     | 4  | Les principes fondamentaux et principales [conventions de codage](/ressources/conventions.html) du framework Symfony sont respectés. Le code est clair, correctement formaté. |
| **Qualité**         | 4  | Le schéma de base de données est bien structuré, les formulaires sont soumis à contraintes, les réflexes à avoir en développement web sont adoptés (ex : erreurs 404 gérées, absences d'erreurs 500, etc.), utilisation correct des codes HTTP. |
| **Données de test** | 2  | Script de fixtures permettant de charger des données de test complètes au sein de la base de données du projet. |
| **Bonus**           | 1  | Des ressources externes proposées dans le contexte du framework Symfony ont été utilisées (ex : bundles externes populaires). Attention : Sans excès, 2 maximum ! |


::: danger
Il s'agit d'un projet **individuel**, toutes similitudes entre deux projets pourront entraîner des pénalités sur la note.
:::
