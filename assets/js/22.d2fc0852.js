(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{420:function(e,s,t){"use strict";t.r(s);var r=t(56),a=Object(r.a)({},(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"structure-du-projet"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#structure-du-projet"}},[e._v("#")]),e._v(" Structure du projet")]),e._v(" "),t("p",[e._v("La structure du nouveau projet est la suivante :")]),e._v(" "),t("p",[t("img",{attrs:{src:"/img/structure.png",alt:"Structure d'un projet Symfony 4"}})]),e._v(" "),t("h2",{attrs:{id:"la-console-de-symfony"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#la-console-de-symfony"}},[e._v("#")]),e._v(" La console de Symfony")]),e._v(" "),t("p",[e._v("Le framework mets à votre disposition une console au sein de son application. C'est un fichier PHP qui s'exécute, à partir de la racine de notre projet, de la manière suivante :")]),e._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("div",{staticClass:"highlight-lines"},[t("br"),t("br")]),t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("php bin/console\n")])]),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("Vous pouvez accéder à la liste des commandes disponibles dans Symfony en faisant :")]),e._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("div",{staticClass:"highlight-lines"},[t("br"),t("br")]),t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("php bin/console list\n")])]),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("Dans la liste des commandes disponibles, vous trouverez notamment une commande permettant de connaître la version de Symfony installée :")]),e._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("div",{staticClass:"highlight-lines"},[t("br"),t("br")]),t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("php bin/console -V\n")])]),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("Ce qui devrait vous afficher un résultat similaire au suivant :")]),e._v(" "),t("p",[t("img",{attrs:{src:"/img/symfony-v.png",alt:"Symfony version commande"}})]),e._v(" "),t("h2",{attrs:{id:"configuration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[e._v("#")]),e._v(" Configuration")]),e._v(" "),t("p",[e._v("La configuration se trouve dans le dossier "),t("strong",[e._v("/config/")]),e._v(". Le format par défaut pour la configuration est le format "),t("strong",[e._v("Yaml")]),e._v(".")]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),t("p",[e._v("Bien que Yaml est le format conseiller pour la configuration dans Symfony, il est aussi possible d'utiliser le format XML ou même PHP. C'est pourquoi dans la documentation de Symfony, les exemples sont affichés dans ces trois formats.")])]),e._v(" "),t("p",[e._v("Comme vous pouvez le voir, il y a un dossier "),t("strong",[e._v("/config/packages/")]),e._v(" dans lequel se trouve un fichier de configuration pour chaque package installé. On retrouve également des sous dossiers "),t("strong",[e._v("dev/")]),e._v(", "),t("strong",[e._v("prod/")]),e._v(" et "),t("strong",[e._v("test/")]),e._v(" qui permettent de surcharger la configuration pour l'environnement courant.")]),e._v(" "),t("p",[e._v("Le routing est aussi définie dans le dossier de configuration. Nous y reviendrons prochainement.")]),e._v(" "),t("h2",{attrs:{id:"la-partie-publique"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#la-partie-publique"}},[e._v("#")]),e._v(" La partie publique")]),e._v(" "),t("p",[e._v("Le dossier "),t("strong",[e._v("/public/")]),e._v(" représente la partie public de l'application. Concrètement, ça signifie que si l'on met en ligne notre projet shoefony sur le domaine http://shoefony.fr, il faudra faire pointer la configuration serveur sur ce dossier public et faire en sorte que toutes les requêtes arrivent sur le fichier index.php (avec Apache, on peut faire cette configuration dans un fichier "),t("strong",[e._v(".htaccess")]),e._v(" par exemple). Ce système permet de faire en sorte que tous nos fichiers ne soient pas accessibles directement depuis le navigateur, notamment pour des raisons de sécurité.")]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),t("p",[e._v("Le fait de faire passer toutes les requêtes par notre fichier index.php est un "),t("strong",[e._v("pattern architectural")]),e._v(' appelé "Front Controller".')])]),e._v(" "),t("p",[e._v("C'est aussi dans ce dossier public que se trouvera le css, les images et le javascript de notre application. En bref, toutes les ressources accessibles depuis le navigateur se trouvent dans ce dossier.")]),e._v(" "),t("h2",{attrs:{id:"le-code-source-php"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#le-code-source-php"}},[e._v("#")]),e._v(" Le code source PHP")]),e._v(" "),t("p",[e._v("Le dossier "),t("strong",[e._v("/src/")]),e._v(" contient tout le code source de notre application (tous nos fichiers PHP). C'est dans ce dossier que l'on le passera 90 % de notre temps. Si l'on regarde dedans, on peut voir qu'il y a déjà quelques dossiers dont "),t("strong",[e._v("Controller")]),e._v(" (pour le C de MVC) et "),t("strong",[e._v("Entity")]),e._v(" et "),t("strong",[e._v("Repository")]),e._v(" (pour le M de MVC) dont nous reparlerons plus tard.")]),e._v(" "),t("h3",{attrs:{id:"un-point-sur-le-kernel"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#un-point-sur-le-kernel"}},[e._v("#")]),e._v(" Un point sur le Kernel")]),e._v(" "),t("p",[e._v("On y retrouve également le noyau de notre application, le fichier "),t("strong",[e._v("Kernel.php")]),e._v(" contenant le classe "),t("strong",[e._v("App\\Kernel")]),e._v(" qui sera instancié depuis notre Front Controller.\nSi l'on regarde de plus près le code de ce Kernel, on peut voir qu'il se charge des points suivants :")]),e._v(" "),t("ul",[t("li",[e._v("Définir l'emplacement les dossiers de cache et de log")]),e._v(" "),t("li",[e._v("Enregistrer tous les bundles définis dans le fichier "),t("strong",[e._v("/config/bundles.php")]),e._v(" en fonction de l'environnement courant.")]),e._v(" "),t("li",[e._v("Configurer le "),t("strong",[e._v('"container"')]),e._v(" pour l'injection de dépendances en fonction de la configuration du dossier "),t("strong",[e._v("/config/")])]),e._v(" "),t("li",[e._v("Configurer les routes de notre applications à partir du fichier "),t("strong",[e._v("/config/routes.yaml")]),e._v(" et du dossier "),t("strong",[e._v("/config/routes/")]),e._v(" en fonction de l'environnement courant.")])]),e._v(" "),t("h2",{attrs:{id:"les-templates"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#les-templates"}},[e._v("#")]),e._v(" Les templates")]),e._v(" "),t("p",[e._v("Le dossier "),t("strong",[e._v("/templates/")]),e._v(" contiendra toutes nos vues. Par défaut dans Symfony, on utilise le moteur de templates "),t("a",{attrs:{href:"https://twig.symfony.com/",target:"_blank",rel:"noopener noreferrer"}},[t("strong",[e._v("Twig")]),t("OutboundLink")],1),e._v(" pour gérer nos vos vues. C'est pourquoi vous pouvez déjà y trouver le fichier base.html.twig. Un chapitre sera dédié plus tard à Twig.")]),e._v(" "),t("h2",{attrs:{id:"les-fichiers-temporaires"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#les-fichiers-temporaires"}},[e._v("#")]),e._v(" Les fichiers temporaires")]),e._v(" "),t("div",{staticClass:"custom-block danger"},[t("p",{staticClass:"custom-block-title"},[e._v("DANGER")]),e._v(" "),t("p",[e._v("Le contenu de ce dossier ne doit pas être partagé car il est très lourd et géré par le framework lui-même. Ca signifie qu'il ne faut ni l'ajouter au repository git, ni l'ajouter à une quelconque archive.")])]),e._v(" "),t("p",[e._v("Le dossier "),t("strong",[e._v("/var/")]),e._v(" contiendra principalement les fichiers temporaires de l'application. On y retrouve donc les dossiers suivants :")]),e._v(" "),t("h3",{attrs:{id:"le-dossier-var-cache"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#le-dossier-var-cache"}},[e._v("#")]),e._v(" Le dossier /var/cache/")]),e._v(" "),t("p",[e._v("Tout le code mis en cache par le framework pour éviter de trop travailler (surtout en production), avec un sous-dossier par environnement. Sont mis en cache principalement :")]),e._v(" "),t("ul",[t("li",[e._v("La configuration (y compris le routing)")]),e._v(" "),t("li",[e._v("Les templates Twig")]),e._v(" "),t("li",[e._v("Les traductions")]),e._v(" "),t("li",[e._v("Le mapping des entités Doctrine")])]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),t("p",[e._v("Si vous avez une erreur bizarre, essayez de vider le cache. Si ça ne marche pas, c'est que l'erreur vient de vous 😉")])]),e._v(" "),t("div",{staticClass:"custom-block danger"},[t("p",{staticClass:"custom-block-title"},[e._v("DANGER")]),e._v(" "),t("p",[e._v("Le cache n'est jamais vidé en environnement de production, il faut donc penser à le vider à chaque modification une fois le site en ligne.")])]),e._v(" "),t("h3",{attrs:{id:"le-dossier-var-log"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#le-dossier-var-log"}},[e._v("#")]),e._v(" Le dossier /var/log/")]),e._v(" "),t("p",[e._v("Les logs sont des historiques de l'exécution de votre application. Là aussi, il y a un fichier par environnement car en fonction de lui les informations sont plus ou moins complètes.")]),e._v(" "),t("p",[e._v("Les logs sont surtout utiles lorsque votre application est en production et que vous tombez sur une erreur. Ce sera alors votre principal outil pour comprendre d'où provient le problème.")]),e._v(" "),t("h2",{attrs:{id:"les-dependances"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#les-dependances"}},[e._v("#")]),e._v(" Les dépendances")]),e._v(" "),t("p",[e._v("Toutes nos dépendances se trouveront dans le dossier "),t("strong",[e._v("/vendor/")]),e._v(". Si vous jetez un coup d'oeil dedans, vous pourrez retrouver par example le dossier qui contient le code source de Symfony (/vendor/symfony). On y trouve aussi un dossier "),t("strong",[e._v("composer")]),e._v(" avec principalement la gestion de l'autoload généré par ce dernier.")]),e._v(" "),t("div",{staticClass:"custom-block danger"},[t("p",{staticClass:"custom-block-title"},[e._v("DANGER")]),e._v(" "),t("p",[e._v("Vous ne devez pas modifier le contenu de ce dossier. Composer est là pour ça !")])]),e._v(" "),t("div",{staticClass:"custom-block danger"},[t("p",{staticClass:"custom-block-title"},[e._v("DANGER")]),e._v(" "),t("p",[e._v("Comme pour le dossier "),t("strong",[e._v("/var/")]),e._v(", le contenu de ce dossier ne doit pas être partagé. Les dépendances doivent s'installer lorsque l'on reçoit un projet grâce à la commande "),t("strong",[e._v("composer install")]),e._v(" (ou "),t("strong",[e._v("composer update")]),e._v(" si l'on souhaite mettre les dépendances à jour).")])]),e._v(" "),t("h2",{attrs:{id:"les-variables-d-environnement"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#les-variables-d-environnement"}},[e._v("#")]),e._v(" Les variables d'environnement")]),e._v(" "),t("p",[e._v("Les variables d'environnement sont des informations sensibles de l'application (accès à la base de données, environnement courant, ...). De plus, ces variables changent d'une copie de l'application à l'autre. C'est pourquoi des valeurs par défaut se trouve dans le fichier "),t("strong",[e._v(".env")]),e._v(" qui doivent être surchargées dans le fichier "),t("strong",[e._v(".env.local")])]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),t("p",[e._v("Les fichiers commençant par un point (.env, .env.local, .htaccess, ...) sont des fichiers cachés. Si vous ne les voyez pas, pensez à activer leur affichage.")])]),e._v(" "),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),t("p",[e._v("En production, il est conseillé de ne pas du tout utiliser les fichiers .env mais de réaliser la déclaration de variable dans la configuration du serveur pour éviter d'exposer leur contenu.")])]),e._v(" "),t("h2",{attrs:{id:"la-configuration-de-composer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#la-configuration-de-composer"}},[e._v("#")]),e._v(" La configuration de Composer")]),e._v(" "),t("p",[e._v("Le dernier fichier que je vais détailler est "),t("strong",[e._v("composer.json")]),e._v(". Il est très important dans le sens où il contient toute la configuration de Composer.")]),e._v(" "),t("p",[e._v("Dans la partie "),t("strong",[e._v("require")]),e._v(" et "),t("strong",[e._v("require-dev")]),e._v(", on retrouve nos fameuses dépendances (respectivement globale et pour le développement uniquement) avec les versions adéquates.")]),e._v(" "),t("p",[e._v("La partie "),t("strong",[e._v("autoload")]),e._v(" et également intéressante car elle définie le namespace de base de notre dossier "),t("strong",[e._v("/src/")]),e._v('. Ainsi, toutes les classes dans ce dossier auront un namespace commençant par "App" (par exemple '),t("strong",[e._v("App\\Kernel")]),e._v(")")])])}),[],!1,null,null,null);s.default=a.exports}}]);