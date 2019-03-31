# La mise en ligne

## Personnaliser les pages d'erreur

Avec Symfony, lorsqu'une exception est déclenchée, le noyau l'attrape. Cela lui permet ensuite d'effectuer l'action adéquate.

Le comportement par défaut du noyau consiste à appeler un contrôleur particulier intégré à Symfony : **TwigBundle:Exception:show**. Ce contrôleur récupère les informations de l'exception, choisi le template adéquat (un template différent par type d'erreur : 404, 500, etc.), passe les informations au template et envoie la réponse générée.

À partir de là, il est facile de personnaliser ce comportement : **TwigBundle** étant un bundle, on peut surcharger ses vues pour les adapter à nos besoins ! Mais ce n'est pas tout, le comportement que nous voulons changer, c'est juste l'apparence de nos pages d'erreur. Il suffit donc de créer nos propres templates et de dire à Symfony d'utiliser nos templates et non ceux par défaut.

Les pages d'erreur de Symfony sont affichées lorsque le noyau attrape une exception. Il existe deux pages différentes : celle en mode **dev** et celle en mode **prod**.

Il est possible de personnaliser les deux, mais celle qui nous intéresse le plus ici est la page d'erreur en mode production. En effet, c'est celle qui sera affichée à nos visiteurs.

Voici à quoi ressemble la page d'erreur **404** standard :

![Page 404 de base](/img/404.png)

Il est très simple de remplacer les vues d'un bundle quelconque par les nôtres. Il suffit de créer le répertoire **/templates/bundles/NomDuBundle/** et d'y placer nos vues à nous ! Et cela est valable quelque soit le bundle.

Dans notre cas, ce sera **/templates/bundles/TwigBundle/Exception**. Et au sein de ce répertoire, le bundle utilise la convention suivante pour chaque nom de template :

- Il vérifie d'abord l'existence de la vue error[code_erreur].html.twig, par exemple error404.html.twig dans le cas d'une page introuvable (erreur 404).
- Si ce template n'existe pas, il utilise la vue error.html.twig, une sorte de page d'erreur générique.

Je vous conseille de créer un error404.html.twig pour les pages non trouvées, en plus du error.html.twig générique. Cela vous permet d'afficher un petit texte sympa pour que l'utilisateur ne soit pas trop perdu.

Pour savoir quoi mettre dans ces vues, je vous propose de jeter un oeil à celle qui existe déjà, error.html.

Vous la trouvez comme indiqué plus haut dans le répertoire :
**vendor\symfony\src\Symfony\Bundle\TwigBundle\Resources\views\Exception**

::: tip
Vous pouvez donc utiliser Twig pour générer vos pages d'erreur, ce qui signifie que vous pouvez par exemple étendre le layout (avec la barre de navigation, ...) dans celles-ci !
:::

## Vérifier son site Symfony

Votre site web terminé et prêt à être mis en production, il arrive régulièrement que vous soyez obligé de déployer votre projet sur un serveur distant. Il y a plusieurs points auxquels il est nécessaire de porter une attention particulière lorsqu'il s'agit du framework Symfony.

La méthodologie est la suivante :
1. Uploader votre code à jour sur le serveur de production (toujours sans les fichiers et dossiers à exclure du **.gitignore**)
2. Mettre à jour vos dépendances via Composer
3. Mettre à jour votre base de données
4. Vider le cache

### Tester son application

Bien évidemment, la première chose à faire avant d'envoyer son application sur un serveur, c'est de bien vérifier que tout fonctionne chez soi ! Vous êtes habitués à travailler dans l'environnement de développement et c'est normal, mais pour bien préparer le passage en production, il va falloir tester l'application dans l'environnement de production. Et pour ce faire il faut passer son application en mode production, dans le fichier **.env** adéquat, puis vider le cache.

### Vérifier la qualité du code

L'importance d'écrire un code de qualité n'est plus à démontrer. Symfony étant un framework très puissant, le code que vous faites se doit d'être à la hauteur, et il n'est pas évident de le passer entièrement en revue pour s'en assurer. Heureusement, il existe un outil qui permet de vérifier automatiquement un grand nombre de points particuliers dans votre code. Il s'agit d'un outil en ligne, [Symfony insight](https://insight.symfony.com/)

Je vous invite à aller voir, à l'adresse précédente, les points que cet outil vérifie. Ils sont tous intéressants à prendre en compte si vous voulez avoir une application Symfony de grande qualité.

Vous pouvez utiliser gratuitement l'outil sur vos projets publics, c'est-à-dire que votre projet doit avoir un Git publiquement accessible

### Vérifier la sécurité de vos dépendances
Un projet Symfony contient beaucoup de dépendances : cela se voit très bien en constatant le nombre de bibliothèques dans le répertoire vendor. Il est impossible de se tenir au courant des failles de sécurité découverte dans toutes ces dépendances... mais pourtant cela serait indispensable ! Vous n'imaginez pas envoyer en ligne votre application alors qu'une de vos dépendances contient une faille de sécurité.

Pour cela, il existe un outil : [Security Checker](https://security.symfony.com/).

## Déployer son site Symfony en ligne

Le déploiement d'une application est toujours une étape délicate qui touche au domaine de la configuration du serveur. En général, on se retrouve dans deux cas :

1. Soit vous n'avez pas accès en SSH à votre serveur (la plupart des hébergements mutualisés, etc.)
2. Soit vous avez accès en SSH à votre serveur (VPS, serveur dédiés, etc.)

Voici une liste des étapes à effectuer dans les deux cas, avec des précisions si nécessaire. Je ne vais pas rentrer dans les détails de la configuration serveur. Pour ça, je vous renvoie à la [documentation de Symfony](https://symfony.com/doc/current/setup/web_server_configuration.html) sur le sujet.

### Sans accès SSH

En local :
1. [Vérifier les dépendances de développement](/cours/mise-en-ligne.html#dependances-de-developpement)
2. [Mettre à jour les dépendances sans celles de développement et en optimisant l'autoload de **Composer**](/cours/mise-en-ligne.html#composer-pour-la-production)

Sur le serveur :
1. [Envoyer les fichiers (via FTP) sur le serveur sans le dossier **/var/** et le fichier **.env.local**](/cours/mise-en-ligne.html#envoie-de-fichier)
2. Créer la base de données avec un script SQL (ex: export de la version local)
3. Recréer le fichier .env.local à partir du .env en adaptant les valeurs (environnement de production, connexion base de données, ...)
5. [Mettre en place un fichier .htaccess à la racine si nécessaire](/cours/mise-en-ligne.html#reecrire-les-url)
6. [Vérifier les droits d'écriture de /var/](/cours/mise-en-ligne.html#regler-les-droits-sur-le-dossier-var)

### Avec accès SSH

En local :
1. [Vérifier les dépendances de développement](/cours/mise-en-ligne.html#dependances-de-developpement)

Sur le serveur :
1. [Envoyer les fichiers sur le serveur (par exemple avec Git) sans les dossiers **/var/** et **/vendor/** et le fichier **.env.local**](/cours/mise-en-ligne.html#envoie-de-fichier)
2. [Mettre à jour les dépendances sans celles de développement et en optimisant l'autoload de **Composer**](/cours/mise-en-ligne.html#composer-pour-la-production)
3. Configurer le serveur web (Apache, NGINX) en pointant sur la partie public de votre projet (ex: /var/www/shoefony/public/)
4. Ajouter les variables d'environnements dans la configuration serveur (environnement de production, connexion base de données, ...)
5. Créer et/ou mettre à jour la base de données en ligne de commande
6. Exécuter la commande **cache:clear** et si erreur : [Vérifier les droits d'écriture de /var/](/cours/mise-en-ligne.html#regler-les-droits-sur-le-dossier-var)

### Explications en détails

#### Dépendances de développement

Lorsque nous développons notre application, nous avons des outils comme la DebugBar, le MakerBundle, etc. Ce sont ce qu'on appelle des dépendances de développement. Ces dépendances doivent se trouver dans la partie **require-dev** de notre fichier **composer.json**. Avant de mettre en production un projet, il est nécessaire de vérifier que les dépendances de développement et de production soit bien séparées.

Lorsque nous avons accès à la configuration de notre serveur web de production, nous pouvons déplacer deux dépendances de plus dans le require-dev :
- **symfony/apache-pack** : Cette dépendance est utile uniquement avec Flex pour créer un fichier **.htaccess** dans le dossier **/public/**. Il est possible de gérer ça directement dans la configuration serveur (ce qui est aussi plus performant).
- **symfony/dotenv** : C'est ce composant qui est chargé de lire nos fichier **.env**. En production, on peut mettre les variables d'environnement dans la configuration serveur (ce qui est également plus sûre).

#### Composer pour la production

En production, nous ne voulons pas des dépendances de développement de notre projet. Pour ne pas les installer, il suffit d'ajouter l'option **--no-dev** lorsque l'on exécute **Composer**.

Nous pouvons également optimiser l'autoload fournit par Composer avec l'option **--optimize-autoloader** ou **-o** en raccourcie.

Ce qui nous donne :

``` bash
# Mise à jour des dépendances sans celles de dev et en optimisant l'autoload
composer update --no-dev -o

# Ou si on ne veut pas mettre à jour les dépendances
composer install --no-dev -o

# Pour seulement re-générer l'autoload en l'optimisant
composer dump-autoload -o
```

#### Envoie de fichier

Notre projet est plein de dossier et de fichiers, seulement, tout ne doit pas être envoyé sur le serveur ! Pour savoir quoi envoyer, vous pouvez consulter le fichier **/.gitignore** à la racine de votre projet.

De manière générale, on n'envoie pas le dossier **/var/** qui contient le cache et les logs de l'application. Il sera généré automatiquement par notre application.

Le dossier **/vendor/**, qui contient les dépendances, ne doit être envoyé que si nous n'avons pas accès à Composer sur le serveur (toujours pas de SSH...). Comme le dossier var, il est très lourd !

Enfin, il ne faut pas envoyer le fichier **/.env.local** qui contient les variables d'environnements. En effet, elles dépendent de la machine sur laquelle l'application est exécutée. On envoie par contre le fichier **/.env** qui contient des données d'exemple pour nous aider à créer le premier cité.

::: tip
Pour envoyer nos fichiers sans accès SSH, ce sera via **FTP**. Dans le cas contraire, on a plusieurs options (dont le FTP d'ailleurs). Personnellement, j'utilise **Git** pour cette tâche.
:::

#### Réécrire les URL

Suivant la configuration de votre serveur vous risquez d'obtenir une URL du type : **http://www.MON-DOMAINE.fr/public/**

Cette dernière n'est pas super, et permettrait à vos visiteurs d'accéder à des répertoires auxquels ils ne devraient jamais avoir à rencontrer. La sécurité avant tout !

Si votre serveur utilise Apache (il y a de très grandes chances), vous pouvez configurer votre espace web à l'aide d'un fichier .htaccess, à la racine de votre projet, en demandant à cibler directement votre répertoire public. Les instructions à ajouter dans ce fichier sont les suivantes :

```
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^(.*)$ public/$1 [QSA,L]
</IfModule>
```

#### Régler les droits sur le dossier var/

Vous le savez, Symfony a besoin de pouvoir écrire dans deux répertoires : **/var/cache** pour y mettre le cache de l'application et ainsi améliorer les performances, et **/var/log** pour y mettre l'historique des informations et erreurs rencontrées lors de l'exécution des pages.

Normalement, vous n'avez pas besoin de créer le dossier vous-même. Il se créera tout seul lors de l'exécution du code. Cependant, si vous avez une erreur, vous pouvez le créer manuellement, mettre les bons droits UNIX dessus (751 par exemple) et laisser Symfony le remplir.

Normalement, votre client FTP devrait vous permettre de régler les droits sur les dossiers. Avec **FileZilla** par exemple, un clic droit sur le dossier **/var/** vous permet de définir les droits.

En ligne de commande sur Linux, ça se fait de la manière suivante :

``` bash
chmod 751 -R ./var
```

## Pour aller plus loin

- [Documentation de Symfony sur la surcharge des templates d'erreurs](https://symfony.com/doc/current/controller/error_pages.html)
- [Documentation de Symfony sur le déploiement](https://symfony.com/doc/current/deployment.html)
- [Documentation de Symfony sur la config serveur](https://symfony.com/doc/current/setup/web_server_configuration.html)