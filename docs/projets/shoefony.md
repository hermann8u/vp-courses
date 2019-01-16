---
sidebarDepth: 2
---

# Shoefony

## Cahier des charges

### Objectifs
Il s'agit d'un projet imaginé dans le but de vous faire découvrir le framework de développement Symfony. Etape par étape, nous allons concevoir ensemble un site vitrine s'appuyant sur l'ensemble des notions de base du framework.

Shoefony est le projet qui a été imaginé pour vous faire découvrir Symfony. C'est une boutique spécialisée dans les accessoires de sport dont les principales fonctionnalités sont les suivantes :
- Affichage des baskets
- Présentation de la boutique
- Prendre contact avec l'équipe

### Contexte du projet
Shoefony est une petite boutique spécialisée dans les accessoires de sport et notamment les baskets de course à pied. Le responsable de l'enseigne souhaite faire connaître sa boutique au niveau national et a la volonté de réaliser un site web présentant l'ensemble de sa gamme de baskets. Il désire également parler de son point de vente physique, ainsi que de l'équipe qui l'anime. Par ailleurs, les visiteurs devront pouvoir prendre contact avec son équipe par l'intermédiaire d'un formulaire de contact.

Deux appels d'offres ont été organisés, le premier concernant la maquette graphique, et le second concernant la partie développement du site vitrine. Un webdesigner indépendant a décroché le premier contrat et a réalisé un template de base, qu'il a ensuite intégré en HTML / CSS. Vous êtes l'heureux élu ayant remporté le deuxième contrat. Votre mission sera donc de réaliser le site web en utilisant le thème vous ayant été fourni au préalable. La principale contrainte technique étant l'utilisation du framework Symfony dernière version.

<!-- Vous serez également dans un deuxième temps missionné pour la réalisation d'un back-office de gestion du catalogue produits. Les besoins concernant cet outil d'administration vous seront communiqués dans un deuxième temps. -->

### Déroulé fonctionnel

Le site web devra proposer dès la page d'accueil un menu principal permettant de naviguer à travers la vitrine et un moteur de recherche de produits, disponible sur l'ensemble des pages.

#### Page d'accueil

La page d'accueil doit présenter un carrousel mettant en avant les offres promotionnelles organisées par l'enseigne. En dessous, doivent apparaître les 4 derniers produits ajoutés dans le catalogue, ainsi que les 4 produits les plus populaires (en se basant sur le nombre d'avis laissés).

Les vignettes des produits présentés sur la page d'accueil sont composés du visuel produit, du nom du produit, d'une description courte, du tarif et d'un bouton permettant de consulter la fiche détaillée du produit.

![Shoefony homepage](/img/shoefony/homepage.png)


#### Présentation

La présentation est une page statique qui a pour unique objectif de présenter l'enseigne, son point de vente, ainsi que son équipe.

![Shoefony présentation](/img/shoefony/presentation.png)

#### Catalogues produit

La page de présentation des produits est composée d'une sidebar gauche proposant l'ensemble des marques de baskets disponibles sur la vitrine. Sur la partie droite nous retrouvons la liste des produits sous la forme de vignettes, ces dernières doivent être présentées de la même manière que sur la page d'accueil. Un système de pagination est présent en bas de page afin de ne charger que 9 produits à la fois sur une même page.

Par défaut, les produits seront affichés de manière décroissante par rapport à leur date de dernière mise à jour.

Les liens, vers les différentes marques, présents au sein de la sidebar permettent de filtrer les produits à afficher. Un clic sur une marque appliquera une sélection sur les produits afin de ne faire afficher que ceux de la marque en question.

![Shoefony liste des produits](/img/shoefony/product-list.png)

#### Fiche produit

La fiche détaillée d'un produit affichera sur la gauche la même sidebar que celle présente sur le catalogue de produits. Sur la partie droite, un bouton de retour à la liste des produits est à faire apparaître, ainsi que la fiche de présentation du produit en consultation.

Les informations à afficher sont le visuel produit, le nom du produit, le tarif, la description courte et la description longue.

Un module additionnel présent sous la fiche du produit permettra aux visiteurs de donner leur opinion sur le produit en question. Ces avis seront composés du nom du donneur d'avis et d'un commentaire. Néanmoins, avant de pouvoir visualiser un avis sur une fiche produit, ce dernier devra être modéré par un administrateur.

![Shoefony détail d'un produit](/img/shoefony/product-detail.png)

#### Contact

La page de contact permet simplement, à l'aide d'un formulaire, d'envoyer un message par email au propriétaire du site web.

![Shoefony contact](/img/shoefony/contact.png)

## Templates

[Télécharger les templates](/shoefony-template.zip)