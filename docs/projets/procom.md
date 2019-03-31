# Procom

## Introduction

Durant nos différentes séances de travaux pratiques, nous avons exploité ensemble les notions de bases proposées par le framework de développement Symfony 4. Vous devriez à présent être en mesure de réaliser vous-même un système complet, et c'est le but de ce projet !

Le sujet porte sur la création d'une interface web, intitulée **Procom**, et permettant de calculer de manière sommaire les coûts de développement des projets réalisés par les équipes de production d'une entreprise. Afin de simplifier les choses, nous partirons du principe qu'il s'agit d'une application web qui sera déployée sur un environnement local accessible uniquement par son directeur. Ainsi, il n'y aura pas lieu de prévoir un système d'authentification.

## Arborescence

Avant même de vous présenter le détail de chaque fonctionnalité à réaliser, voici une vue d'ensemble représentant l'arborescence du projet tel qu'il devra être composé :

![Arborescence du projet Procom](/img/procom/arbo.png)

## Fonctionnalités

Chaque fonctionnalité est décrite avec une quantité d'informations suffisante pour évaluer les implémentations techniques à effectuer. Vous aurez donc une certaine liberté en ce qui concerne certains aspects comme le nommage des tables et champs en base de données, le typage de ces champs, la validation des formulaires, etc.

### Le tableau de bord

Le tableau de bord doit permettre au directeur d'avoir un aperçu rapide de la situation de son entreprise. Pour cela, il est nécessaire de lui offrir une visibilité sur les éléments suivants :
- Indicateurs : projets en cours, projets livrés, nombre d'employés, nombre de jours saisis
- Indicateur du taux de rentabilité (ratio capex / opex)
- Indicateur du taux de livraison (ratio projets en cours / livrés)
- Fiche du « top employé » (coût total le plus élevé)
- Les 5 derniers projets créés et leur coût actuel
- Les 10 dernières saisies de temps de production

### Les employés

Afin que le directeur puisse identifier qui a travaillé sur les projets de l'entreprise, il doit disposer d'un registre des employés de production. Ces employés seront composés des informations suivantes :

| Label           | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| Prénom          | Prénom de l'employé                                                |
| Nom             | Nom de l'employé                                                   |
| Adresse email   | Adresse email professionnelle de l'employé                         |
| Métier          | Métier de l'employé, en relation avec une liste externe et gérable |
| Coût journalier | Coût de production à la journée en €                               |
| Date d'embauche | Date d'embauche de l'employé                                       |

*Exemple de métiers : Web designer, SEO Manager, Web Developer, etc.*

Il est à noter que le directeur sera libre d'ajouter ou modifier un intitulé de métier, néanmoins la suppression ne devra être autorisée que dans le cas où ce métier n'est lié à aucun employé.

La liste des employés devra afficher jusqu'à 10 employés, les suivants seront accessibles à l'aide d'une pagination en dessous de cette liste. Cette page devra permettre la création ou la modification d'un employé, ainsi que l'archivage qui ne devra pour autant pas faire disparaître l'employé du système. Cet archivage aura simplement pour effet de ne plus proposer la saisie de temps de production pour l'employé en question (ne plus proposer l'employé dans les formulaires de saisie), et faire apparaître ce dernier avec un prénom et nom barrés à chaque fois qu'il est affiché dans une liste (les temps enregistrés jusqu'alors pour cet employés sont conservés).

Chaque employé devra également disposer d'une fiche détails, celle-ci affichera toutes les informations du profil employé, un formulaire permettant de réaliser une saisie de temps sur un projet de notre choix pour l'employé en question et une liste paginée de tous les temps saisis (triée du plus récent au plus ancien).

### Les projets

La liste des projets doit être accessible au directeur afin d'avoir une vue globale sur la situation de l'entreprise. Les projets seront composés des informations suivantes :

| Label            | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| Intitulé         | Intitulé du projet                                                       |
| Description      | Description du projet                                                    |
| Type             | Type de projet. Valeurs possibles : Capex, Opex                          |
| Est livré        | Statut de livraison du projet. Valeurs possibles : Oui, Non              |
| Date de création | Date de création du projet (jour de l'enregistrement dans l'application) |

- *Capex : Le projet crée une valeur ajoutée pour l'entreprise et rapportera directement des fonds.*
- *Opex : Le projet n'apporte pas de retour sur investissement sur un court terme.*

La liste des projets devra afficher jusqu'à 10 projets, les suivants seront accessibles à l'aide d'une pagination en dessous de cette liste. Cette page devra permettre la création ou la modification d'un projet, ainsi que la suppression. Dans ce dernier cas, avant de procéder à la suppression du projet et toutes ses informations, le directeur doit recevoir un compte rendu automatique de ce projet par email. Celui-ci comprendra les informations liées au projet, ainsi que le coût total de ce dernier et le nombre d'employés différents étant intervenus dessus (pour lesquels une saisie de temps avait été effectuée).

Lorsqu'un projet est terminé, le directeur doit pouvoir cliquer sur un bouton indiquant que le projet a été livré. Un projet livré ne peut plus être modifié ou supprimé, il ne pourra plus non plus accueillir de nouveaux temps de production, son coût est établi et ne changera plus.

Chaque projet devra disposer d'une fiche détails, celle-ci affichera toutes les informations liées au projet (incluant le calcul du coût de production total et le nombre d'employés ayant travaillé dessus), un formulaire permettant de réaliser une saisie de temps sur le projet pour un employé de notre choix et une liste paginée de tous les employés ayant passés du temps (en affichant leur prénom, nom, nombre de jours passés sur le projet et coût total).

### Les temps de production

Chaque projet doit pouvoir accueillir des temps de production, sachant qu'un employé peut tout à fait se voir attribuer plusieurs saisies de temps pour un même projet. Le temps de production doit être indiqué en nombre de jours travaillés, son coût est déduit d'une simple multiplication entre le nombre de jours de production et le coût journalier de l'employé.

Les modes de saisie de temps de production ont été explicités dans les parties précédentes, il est à noter qu'un temps ne peut être qu'ajouté ou supprimé, il ne sera ainsi pas possible de modifier un temps déjà saisi. La suppression d'un temps passé ne pourra se faire que depuis la fiche détails de l'employé ayant passé ce temps.

### La recherche

La recherche proposée ne se fera que par simple saisie d'un mot clé et n'interviendra que sur les projets. Lors d'une recherche, la page des résultats devra correspondre à la liste des projets filtrée en fonction de la correspondance entre le mot clé saisi et l'intitulé du projet ou sa description. C'est-à-dire que la présence du mot clé saisi dans l'un de ces champs permettra d'afficher le projet au sein des résultats. Le titre de la page devra laisser entrevoir que nous sommes sur un résultat de recherche et non pas simplement la liste des projets.

### Bonus : Formulaire de connexion

En bonus, vous pourrez implémenter une connexion pour le directeur de l'agence. Ca signifie également qu'il ne sera possible d'accéder à l'application sans passer par ce formulaire de connexion.

::: tip
Utilisez les commandes du **MakerBundle** pour générer le mécanisme de connexion !
:::

## Ressources

Afin de vous aider dans la réalisation de ce projet vous pourrez bien entendu faire usage régulier de la documentation officielle du framework Symfony, ainsi que du cours. 

Le but de ce projet étant de mesurer vos compétences dans le framework de développement Symfony, il vous est mis à disposition un template reposant sur la librairie Bootstrap. Celui-ci propose 5 pages que vous devrez utiliser, ainsi que décliner afin d'implémenter toutes les fonctionnalités demandées.

[Télécharger les templates](/projects/procom-template.zip)

## Dépôt du projet

### Comment

Vous créerez un repository privé sur [GitHub](https://github.com/) en respectant la convention de nommage suivante : **symfony_procom_pnom** (« pnom » devra être remplacé par la première lettre de votre prénom suivi de votre nom) Vous accorderez les droits à l'utilisateur suivant : **hermann8u**.

Je vous ai écrit un petit guide pour vous expliquer comment procéder ici : [Partager son projet avec Git et Github](/ressources/git.html)

### Quoi

Le repository devra comporter l'ensemble des sources du projet qui utilisera **Symfony 4.2.x**, ainsi qu'un fichier **README.md** déclinant votre prénom, nom, email. Vous y ajouterez des notes pouvant être utiles à l'évaluation du projet (partie ne fonctionnant pas, précisions concernant d'éventuels fixtures, etc.).

### Quand

Au plus tard le **dimanche 21 avril 2019 à minuit**. Le dernier commit ne doit pas dépasser cette date, sous peine de pénalité.

## Critères d'évaluations

| Critères | Points | Description |
| -------- | :---: | --- |
| **Fonctionnalités** | 10 | Les fonctionnalités et comportements demandés dans ce présent document sont implémentés et fonctionnels. Les templates fournis pour la réalisation de ce projet ont été utilisés et de manière adéquate. |
| **Conventions**     | 4  | Les principes fondamentaux et principales [conventions de codage](/ressources/conventions.html) du framework Symfony sont respectés. Le code est clair, correctement indenté et commenté. |
| **Qualité**         | 3  | Le schéma de base de données est bien structuré, les formulaires sont soumis à contraintes, les réflexes à avoir en développement web sont adoptés (ex : erreurs 404 gérées, absences d'erreurs 500, etc.). |
| **Données de test** | 2  | Script de fixtures permettant de charger des données de test complètes au sein de la base de données du projet. |
| **Ressources**      | 1  | Des ressources externes proposées dans le contexte du framework Symfony ont été utilisées (ex : bundles externes populaires). Attention : Sans excès, 2 à 3 maximum ! |
| **Bonus**           | 1  | Le formulaire de connexion est intégré et complètement fonctionnel. Le reste de l'application n'est pas disponible sans se connecter. |

::: danger
Il s'agit d'un projet **individuel**, toutes similitudes trop poussées entre deux projets pourront entraîner des pénalités sur la note.
:::