(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{411:function(e,s,n){"use strict";n.r(s);var t=n(56),a=Object(t.a)({},(function(){var e=this,s=e.$createElement,n=e._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"l-injection-de-dependances"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#l-injection-de-dependances"}},[e._v("#")]),e._v(" L'injection de dépendances")]),e._v(" "),n("h2",{attrs:{id:"definition"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#definition"}},[e._v("#")]),e._v(" Définition")]),e._v(" "),n("p",[e._v("L'"),n("strong",[e._v("injection de dépendances")]),e._v(" est un concept clé de l'architecture logicielle. Pour l'exemple, imaginons que nous voulons envoyer un email depuis l'un de nos contrôleur. Dans ce but, il serait intéressant d'avoir un objet à notre disposition capable de remplir cette fonction de manière centralisée. De la même manière, cet objet pourrait avoir besoin de paramètres de configuration pour remplir sa fonction. C'est ici que l'injection de dépendance rentre en jeu.")]),e._v(" "),n("p",[e._v("Avec du code, on peut résumer ce concept de la manière suivante :")]),e._v(" "),n("div",{staticClass:"language-php line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-php"}},[n("code",[n("span",{pre:!0,attrs:{class:"token php language-php"}},[n("span",{pre:!0,attrs:{class:"token delimiter important"}},[e._v("<?php")]),e._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// namespace ...")]),e._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// use ...")]),e._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("class")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token class-name-definition class-name"}},[e._v("ProductController")]),e._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[e._v("/** @var Mailer */")]),e._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("private")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$mailer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("public")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("function")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token function-definition function"}},[e._v("__construct")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name type-declaration"}},[e._v("Mailer")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$mailer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n        "),n("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$this")]),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("->")]),n("span",{pre:!0,attrs:{class:"token property"}},[e._v("mailer")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$mailer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("public")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("function")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token function-definition function"}},[e._v("sendEmail")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name type-declaration"}},[e._v("Request")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$request")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token class-name return-type"}},[e._v("Response")]),e._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n        "),n("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$email")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("new")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("Email")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// ... Création de l'email en fonction de la requête")]),e._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// On utilise notre dépendance")]),e._v("\n        "),n("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$this")]),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("->")]),n("span",{pre:!0,attrs:{class:"token property"}},[e._v("mailer")]),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("->")]),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("send")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("email"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// ...")]),e._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("class")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token class-name-definition class-name"}},[e._v("Mailer")]),e._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[e._v("/** @var string */")]),e._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("private")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$dsn")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("public")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("function")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token function-definition function"}},[e._v("__construct")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword type-hint"}},[e._v("string")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$dsn")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n        "),n("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$this")]),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("->")]),n("span",{pre:!0,attrs:{class:"token property"}},[e._v("dsn")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$dsn")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("public")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("function")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token function-definition function"}},[e._v("send")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name type-declaration"}},[e._v("Email")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$email")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token keyword return-type"}},[e._v("void")]),e._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// ...")]),e._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n\n")])])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br"),n("span",{staticClass:"line-number"},[e._v("15")]),n("br"),n("span",{staticClass:"line-number"},[e._v("16")]),n("br"),n("span",{staticClass:"line-number"},[e._v("17")]),n("br"),n("span",{staticClass:"line-number"},[e._v("18")]),n("br"),n("span",{staticClass:"line-number"},[e._v("19")]),n("br"),n("span",{staticClass:"line-number"},[e._v("20")]),n("br"),n("span",{staticClass:"line-number"},[e._v("21")]),n("br"),n("span",{staticClass:"line-number"},[e._v("22")]),n("br"),n("span",{staticClass:"line-number"},[e._v("23")]),n("br"),n("span",{staticClass:"line-number"},[e._v("24")]),n("br"),n("span",{staticClass:"line-number"},[e._v("25")]),n("br"),n("span",{staticClass:"line-number"},[e._v("26")]),n("br"),n("span",{staticClass:"line-number"},[e._v("27")]),n("br"),n("span",{staticClass:"line-number"},[e._v("28")]),n("br"),n("span",{staticClass:"line-number"},[e._v("29")]),n("br"),n("span",{staticClass:"line-number"},[e._v("30")]),n("br"),n("span",{staticClass:"line-number"},[e._v("31")]),n("br"),n("span",{staticClass:"line-number"},[e._v("32")]),n("br"),n("span",{staticClass:"line-number"},[e._v("33")]),n("br"),n("span",{staticClass:"line-number"},[e._v("34")]),n("br"),n("span",{staticClass:"line-number"},[e._v("35")]),n("br"),n("span",{staticClass:"line-number"},[e._v("36")]),n("br"),n("span",{staticClass:"line-number"},[e._v("37")]),n("br"),n("span",{staticClass:"line-number"},[e._v("38")]),n("br"),n("span",{staticClass:"line-number"},[e._v("39")]),n("br"),n("span",{staticClass:"line-number"},[e._v("40")]),n("br"),n("span",{staticClass:"line-number"},[e._v("41")]),n("br"),n("span",{staticClass:"line-number"},[e._v("42")]),n("br")])]),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),n("p",[e._v("Comme vous pouvez le voir, c'est au niveau du constructeur de nos classes que nous définissons et injectons les dépendances de chacune d'entre elles.")])]),e._v(" "),n("p",[e._v("Nous avons donc ici deux classes, dont l'une dépend de l'autre, et l'autre dépend également d'un paramètre de configuration. On peut symboliser ce schéma de dépendances par un graphe :")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v(".\n├─ ProductController\n│  ├─ Mailer\n│  │  ├─ dsn\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br")])]),n("blockquote",[n("p",[e._v("Et si mon contrôleur a plusieurs dépendances ?")])]),e._v(" "),n("p",[e._v("On se rend vite compte que créer nos objets à la main va être un véritable problème. Comment le résoudre ? En centralisant la création dans un autre objet.")]),e._v(" "),n("h2",{attrs:{id:"le-conteneur-d-injection-de-dependances"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#le-conteneur-d-injection-de-dependances"}},[e._v("#")]),e._v(" Le conteneur d'injection de dépendances")]),e._v(" "),n("p",[e._v("Comme dit précédemment, le "),n("strong",[e._v("conteneur d'injection de dépendances")]),e._v(" (ou "),n("em",[e._v("DI container")]),e._v(" en anglais) aura pour rôle de créer nos "),n("em",[e._v("objets dépendants")]),e._v(" (ou desquels l'on dépend). Ce type d'objet aura pour nom "),n("strong",[e._v("service")]),e._v(".")]),e._v(" "),n("p",[e._v("Le container peut être comparé a un tableau clé/valeur, dont :")]),e._v(" "),n("ul",[n("li",[e._v("La clé est le "),n("RouterLink",{attrs:{to:"/ressources/glossaire.html#fqcn"}},[e._v("FQCN")]),e._v(" ou un nom arbitraire")],1),e._v(" "),n("li",[e._v("La valeur est une référence au service demandé, soit créée à la demande, soit restituée depuis la précédente création.")])]),e._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),n("p",[e._v("Dans 99,9% du temps, les services ne sont "),n("strong",[e._v("instancier qu'une seule fois")]),e._v(". C'est pourquoi on évite d'avoir un \"state\" qui évolue lorsqu'on les développe. Gardez ça en tête.")])]),e._v(" "),n("p",[e._v("Pour remplir son rôle, le container aura besoin de comprendre votre "),n("strong",[e._v("graphe de dépendance")]),e._v(". Dans ce but, il y a deux méthodes "),n("em",[e._v("classiques")]),e._v(" qui s'opposent :")]),e._v(" "),n("h3",{attrs:{id:"les-factories"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#les-factories"}},[e._v("#")]),e._v(" Les factories")]),e._v(" "),n("p",[e._v("On instancie un objet container et on lui ajoute des clés correspondant à des fonctions anonymes permettant de créer le service. Cette fonction prend en paramètre le container pour pouvoir obtenir les autres dépendances du service que l'on est en train de créer.")]),e._v(" "),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),n("p",[e._v("Il est interdit d'injecter le container directement pour éviter de \"leaker\" toutes les dépendances de l'application.")])]),e._v(" "),n("p",[e._v("Exemple: "),n("a",{attrs:{href:"https://github.com/silexphp/Pimple",target:"_blank",rel:"noopener noreferrer"}},[e._v("Pimple"),n("OutboundLink")],1)]),e._v(" "),n("h3",{attrs:{id:"la-configuration"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#la-configuration"}},[e._v("#")]),e._v(" La configuration")]),e._v(" "),n("p",[e._v("Le container est instancié en se basant sur des fichiers de configuration. C'est le cas du composant "),n("a",{attrs:{href:"https://symfony.com/doc/current/components/dependency_injection.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("dependency-injection"),n("OutboundLink")],1),e._v(" de Symfony.\nOn définira chacun de nos services en faisant référence à ses dépendances. Cette méthode est plus complète est général.")]),e._v(" "),n("p",[e._v("Heureusement, il y a une troisième méthode !")]),e._v(" "),n("h2",{attrs:{id:"l-autowiring"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#l-autowiring"}},[e._v("#")]),e._v(" L'Autowiring")]),e._v(" "),n("p",[e._v("L'"),n("strong",[e._v("autowiring")]),e._v(" est juste "),n("em",[e._v("magique")]),e._v(" (dans le bon sens du terme) ! Il nous permet de combiner la flexibilité des méthodes précédentes avec le confort de n'avoir presque rien à déclarer manuellement.")]),e._v(" "),n("p",[e._v("Le concept est le suivant : se baser sur le type des arguments du constructeur pour extraire tout le graphe de dépendance de l'application. Bien sûr, il y a quelques points faibles :")]),e._v(" "),n("ul",[n("li",[e._v("Toujours un peu de configuration nécessaire de temps en temps")])]),e._v(" "),n("p",[e._v("Et pour les puristes :")]),e._v(" "),n("ul",[n("li",[e._v("Nécessite une mise en cache préalable pour les performances, donc impossible de déclarer des services dynamiquement (en tout cas dans Symfony)")]),e._v(" "),n("li",[e._v("Peut être moins explicite qu'une configuration manuelle")])]),e._v(" "),n("p",[e._v("Nous verrons dans le prochain chapitre comment l'utiliser.")]),e._v(" "),n("h2",{attrs:{id:"pour-aller-plus-loin"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#pour-aller-plus-loin"}},[e._v("#")]),e._v(" Pour aller plus loin")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/silexphp/Pimple",target:"_blank",rel:"noopener noreferrer"}},[e._v("Pimple"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://www.php-fig.org/psr/psr-11/",target:"_blank",rel:"noopener noreferrer"}},[e._v("PSR-11: Container interface"),n("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=a.exports}}]);