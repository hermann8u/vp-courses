(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{423:function(e,t,s){"use strict";s.r(t);var r=s(56),o=Object(r.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"procost"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#procost"}},[e._v("#")]),e._v(" Procost")]),e._v(" "),s("h2",{attrs:{id:"introduction"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),s("p",[e._v("Durant nos différentes séances de travaux pratiques, nous avons exploité ensemble les notions de base proposées par le framework de développement Symfony. Vous devriez à présent être en mesure de réaliser vous-même un système complet, et c'est le but de ce projet !")]),e._v(" "),s("p",[e._v("Le sujet porte sur la création d'une interface web, intitulée "),s("strong",[e._v("Procost")]),e._v(", et permettant de calculer de manière sommaire les coûts de développement des projets réalisés par les équipes de production d'une entreprise.")]),e._v(" "),s("h2",{attrs:{id:"arborescence"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#arborescence"}},[e._v("#")]),e._v(" Arborescence")]),e._v(" "),s("p",[e._v("Avant même de vous présenter le détail de chaque fonctionnalité à réaliser, voici une vue d'ensemble représentant l'arborescence du projet tel qu'il devra être composé :")]),e._v(" "),s("p",[s("img",{attrs:{src:"/img/procost/arbo.png",alt:"Arborescence du projet Procost"}})]),e._v(" "),s("h2",{attrs:{id:"fonctionnalites"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fonctionnalites"}},[e._v("#")]),e._v(" Fonctionnalités")]),e._v(" "),s("p",[e._v("Chaque fonctionnalité est décrite avec une quantité d'informations suffisante pour évaluer les implémentations techniques à effectuer. Vous aurez donc une certaine liberté en ce qui concerne certains aspects comme le nommage des tables et champs en base de données, le typage de ces champs, la validation des formulaires, etc.")]),e._v(" "),s("h3",{attrs:{id:"le-tableau-de-bord"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#le-tableau-de-bord"}},[e._v("#")]),e._v(" Le tableau de bord")]),e._v(" "),s("p",[e._v("Le tableau de bord doit permettre aux utilisateurs d'avoir un aperçu rapide de la situation de leur entreprise. Pour cela, il est nécessaire de leur offrir une visibilité sur les éléments suivants :")]),e._v(" "),s("ul",[s("li",[e._v("Indicateurs : projets en cours, projets livrés, nombre d'employés, nombre de jours saisies")]),e._v(" "),s("li",[s("strong",[e._v("Le taux de projet rentable")]),e._v(" : Parmi les projets livrés, le pourcentage dont le coût de production est inférieur au prix de vente.")]),e._v(" "),s("li",[s("strong",[e._v("Le taux de livraison")]),e._v(" (ratio projets en cours / livrés)")]),e._v(" "),s("li",[e._v("Fiche du "),s("strong",[e._v("top employé")]),e._v(" (coût total le plus élevé)")]),e._v(" "),s("li",[e._v("Les "),s("strong",[e._v("5 derniers projets créés")])]),e._v(" "),s("li",[e._v("Les "),s("strong",[e._v("10 dernières saisies")]),e._v(" de temps de production")])]),e._v(" "),s("h3",{attrs:{id:"les-employes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#les-employes"}},[e._v("#")]),e._v(" Les employés")]),e._v(" "),s("p",[e._v("Afin que le manager puisse identifier qui a travaillé sur les projets de l'entreprise, il doit disposer d'un registre des employés de production. Ces employés seront composés des informations suivantes :")]),e._v(" "),s("table",[s("thead",[s("tr",[s("th",[e._v("Label")]),e._v(" "),s("th",[e._v("Description")])])]),e._v(" "),s("tbody",[s("tr",[s("td",[e._v("Prénom")]),e._v(" "),s("td",[e._v("Prénom de l'employé")])]),e._v(" "),s("tr",[s("td",[e._v("Nom")]),e._v(" "),s("td",[e._v("Nom de l'employé")])]),e._v(" "),s("tr",[s("td",[e._v("Adresse email")]),e._v(" "),s("td",[e._v("Adresse email professionnelle de l'employé")])]),e._v(" "),s("tr",[s("td",[e._v("Métier")]),e._v(" "),s("td",[e._v("Métier de l'employé, en relation avec une liste externe et gérable")])]),e._v(" "),s("tr",[s("td",[e._v("Coût journalier")]),e._v(" "),s("td",[e._v("Coût de production à la journée en €")])]),e._v(" "),s("tr",[s("td",[e._v("Date d'embauche")]),e._v(" "),s("td",[e._v("Date d'embauche de l'employé")])])])]),e._v(" "),s("p",[s("em",[e._v("Exemple de métiers : Web designer, SEO Manager, Web Developer, etc.")])]),e._v(" "),s("p",[e._v("Il est à noter que le manager sera libre d'ajouter ou modifier un intitulé de métier, néanmoins la suppression ne devra être autorisée que dans le cas où ce métier n'est lié à aucun employé.")]),e._v(" "),s("p",[e._v("La liste des employés devra afficher jusqu'à 10 employés, les suivants seront accessibles à l'aide d'une pagination en dessous de cette liste. Cette page devra permettre la création ou la modification d'un employé.")]),e._v(" "),s("p",[e._v("Chaque employé devra également disposer d'une fiche détails, celle-ci affichera toutes les informations du profil employé, un formulaire permettant de réaliser une saisie de temps sur un projet de notre choix pour l'employé en question et une liste paginée de tous les temps saisis (triée du plus récent au plus ancien).")]),e._v(" "),s("h3",{attrs:{id:"les-projets"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#les-projets"}},[e._v("#")]),e._v(" Les projets")]),e._v(" "),s("p",[e._v("La liste des projets doit être accessible aux utilisateurs afin d'avoir une vue globale sur la situation de l'entreprise. Les projets seront composés des informations suivantes :")]),e._v(" "),s("table",[s("thead",[s("tr",[s("th",[e._v("Label")]),e._v(" "),s("th",[e._v("Description")])])]),e._v(" "),s("tbody",[s("tr",[s("td",[e._v("Nom")]),e._v(" "),s("td",[e._v("Nom du projet")])]),e._v(" "),s("tr",[s("td",[e._v("Description")]),e._v(" "),s("td",[e._v("Description du projet")])]),e._v(" "),s("tr",[s("td",[e._v("Prix de vente")]),e._v(" "),s("td",[e._v("Le prix en € auquel le projet a été vendu au client")])]),e._v(" "),s("tr",[s("td",[e._v("Date de création")]),e._v(" "),s("td",[e._v("Date de création du projet (jour de l'enregistrement dans l'application)")])]),e._v(" "),s("tr",[s("td",[e._v("Date de livraison")]),e._v(" "),s("td",[e._v("Date de livraison du projet. NULL si non livré")])])])]),e._v(" "),s("p",[e._v("La liste des projets devra afficher jusqu'à 10 projets, les suivants seront accessibles à l'aide d'une pagination en dessous de cette liste. Cette page devra permettre la création ou la modification d'un projet, ainsi que la livraison.")]),e._v(" "),s("p",[e._v("Lorsqu'un projet est terminé, le manager doit pouvoir cliquer sur un bouton indiquant que le projet a été livré. Un projet livré ne peut plus être modifié ou supprimé, il ne pourra plus non plus accueillir de nouveaux temps de production, son coût est établi et ne changera plus.")]),e._v(" "),s("p",[e._v("Chaque projet devra disposer d'une fiche détails, celle-ci affichera toutes les informations liées au projet (incluant le calcul du coût de production total et le nombre d'employés ayant travaillé dessus) et une liste paginée de tous les employés ayant passés du temps (en affichant leur prénom, nom, nombre de jours passés sur le projet et coût total).")]),e._v(" "),s("h3",{attrs:{id:"les-temps-de-production"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#les-temps-de-production"}},[e._v("#")]),e._v(" Les temps de production")]),e._v(" "),s("p",[e._v("Chaque projet doit pouvoir accueillir des temps de production, sachant qu'un employé peut tout à fait se voir attribuer plusieurs saisies de temps pour un même projet. Le temps de production doit être indiqué en nombre de jours travaillés, son coût est déduit d'une simple multiplication entre le nombre de jour de production et le coût journalier de l'employé.")]),e._v(" "),s("p",[e._v("La saisie de temps se passe sur la page de détail d'un employé. Il est à noter qu'un temps ne peut être qu'ajouté, il ne sera ainsi pas possible de modifier un temps déjà saisi.")]),e._v(" "),s("h2",{attrs:{id:"ressources"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ressources"}},[e._v("#")]),e._v(" Ressources")]),e._v(" "),s("p",[e._v("Afin de vous aider dans la réalisation de ce projet vous pourrez bien entendu faire usage régulier de la documentation officielle du framework Symfony, ainsi que du cours.")]),e._v(" "),s("p",[e._v("Le but de ce projet étant de mesurer vos compétences dans le framework de développement Symfony, il vous est mis à disposition un template reposant sur la librairie Bootstrap. Celui-ci propose 5 pages que vous devrez utiliser, ainsi que décliner afin d'implémenter toutes les fonctionnalités demandées.")]),e._v(" "),s("p",[s("a",{attrs:{href:"/projects/procost-template.zip"}},[e._v("Télécharger les templates")])]),e._v(" "),s("h2",{attrs:{id:"depot-du-projet"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#depot-du-projet"}},[e._v("#")]),e._v(" Dépôt du projet")]),e._v(" "),s("h3",{attrs:{id:"comment"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#comment"}},[e._v("#")]),e._v(" Comment")]),e._v(" "),s("p",[e._v("Vous créerez un repository privé sur "),s("a",{attrs:{href:"https://github.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitHub"),s("OutboundLink")],1),e._v(" en respectant la convention de nommage suivante : "),s("strong",[e._v("symfony_procost_pnom")]),e._v(" (« pnom » devra être remplacé par la première lettre de votre prénom suivi de votre nom) Vous accorderez les droits à l'utilisateur suivant : "),s("strong",[e._v("hermann8u")]),e._v(".")]),e._v(" "),s("p",[e._v("Un guide est à disposition pour vous expliquer comment procéder ici : "),s("RouterLink",{attrs:{to:"/ressources/git.html"}},[e._v("Partager son projet avec Git et Github")])],1),e._v(" "),s("h3",{attrs:{id:"quoi"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#quoi"}},[e._v("#")]),e._v(" Quoi")]),e._v(" "),s("p",[e._v("Le repository devra comporter l'ensemble des sources du projet qui utilisera "),s("strong",[e._v("Symfony 6.2.x")]),e._v(" (ou Symfony 5.4 si vous n'utilisez pas PHP 8), ainsi qu'un fichier "),s("strong",[e._v("README.md")]),e._v(" contenant votre prénom, nom, email. Vous y ajouterez des notes pouvant être utiles à l'évaluation du projet (partie ne fonctionnant pas, précisions concernant d'éventuels fixtures, etc.).")]),e._v(" "),s("h3",{attrs:{id:"quand"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#quand"}},[e._v("#")]),e._v(" Quand")]),e._v(" "),s("p",[e._v("Au plus tard le "),s("strong",[e._v("samedi 1 avril 2023 à 23h59")]),e._v(". Le dernier commit ne doit pas dépasser cette date, sous peine de pénalité.")]),e._v(" "),s("h2",{attrs:{id:"criteres-d-evaluations"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#criteres-d-evaluations"}},[e._v("#")]),e._v(" Critères d'évaluations")]),e._v(" "),s("table",[s("thead",[s("tr",[s("th",[e._v("Critères")]),e._v(" "),s("th",{staticStyle:{"text-align":"center"}},[e._v("Points")]),e._v(" "),s("th",[e._v("Description")])])]),e._v(" "),s("tbody",[s("tr",[s("td",[s("strong",[e._v("Fonctionnalités")])]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("10")]),e._v(" "),s("td",[e._v("Les fonctionnalités et comportements demandés dans ce présent document sont implémentés et fonctionnels. Les templates fournis pour la réalisation de ce projet ont été utilisés et de manière adéquate.")])]),e._v(" "),s("tr",[s("td",[s("strong",[e._v("Conventions")])]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("4")]),e._v(" "),s("td",[e._v("Les principes fondamentaux et principales "),s("RouterLink",{attrs:{to:"/ressources/conventions.html"}},[e._v("conventions de codage")]),e._v(" du framework Symfony sont respectés. Le code est clair, correctement formaté.")],1)]),e._v(" "),s("tr",[s("td",[s("strong",[e._v("Qualité")])]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("4")]),e._v(" "),s("td",[e._v("Le schéma de base de données est bien structuré, les formulaires sont soumis à contraintes, les réflexes à avoir en développement web sont adoptés (ex : erreurs 404 gérées, absences d'erreurs 500, etc.), utilisation correct des codes HTTP.")])]),e._v(" "),s("tr",[s("td",[s("strong",[e._v("Données de test")])]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("2")]),e._v(" "),s("td",[e._v("Script de fixtures permettant de charger des données de test complètes au sein de la base de données du projet.")])]),e._v(" "),s("tr",[s("td",[s("strong",[e._v("Bonus")])]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("1")]),e._v(" "),s("td",[e._v("Des ressources externes proposées dans le contexte du framework Symfony ont été utilisées (ex : bundles externes populaires). Attention : Sans excès, 2 maximum !")])])])]),e._v(" "),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[e._v("DANGER")]),e._v(" "),s("p",[e._v("Il s'agit d'un projet "),s("strong",[e._v("individuel")]),e._v(", toutes similitudes entre deux projets pourront entraîner des pénalités sur la note.")])])])}),[],!1,null,null,null);t.default=o.exports}}]);