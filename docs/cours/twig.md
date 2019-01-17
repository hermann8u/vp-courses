# Le moteur de template Twig

## Les templates dans Symfony

Un template est un simple fichier texte qui peut générer n'importe quel format basé sur du texte (HTML, XML, CSV, LaTeX ...). Le type de template le plus connu est le template PHP.

Il y a 2 options par défaut pour les templates lorsque l'on utilise Symfony : **Twig** et PHP. Vous pouvez bien sûr n'utiliser ni l'un ni l'autre et opter pour une autre librairie. C'est possible grâce au container d'injection de dépendances. Nous allons utiliser Twig comme moteur de template pour un certain nombre de raisons :

- **Twig est rapide** : Les templates Twig sont compilés en code PHP et mis en cache, il y a donc très peu de surcharge lors de l'utilisation des templates.

- **Twig est concis** : Twig nous permet de réaliser les fonctionnalités liées au templates en très peu de code. C'est à comparer avec le PHP, qui peut parfois s'avérer très verbeux.

- **Twig supportes l'héritage de template** : Les templates ont la capacité d'étendre et surcharger d'autres templates, ce qui permet aux templates enfants de remplacer ce qui a été proposé par défaut par les parents.

- **Twig est sûr** : Twig échappe par défaut ce qu'il affiche pour éviter d'exécuter du code.

- **Twig est extensible** : Twig propose de base un certain nombre de fonctionnalités récurrentes que vous êtes en droit d'attendre d'un moteur de template, mais pour les situations où vous pourriez avoir des besoins spécifiques, il est facile d'étendre Twig.

Les templates Twig peuvent et doivent être utilisés partout dans Symfony, même dans la conception des emails.

Le contrôleur peut renvoyer vers une vue, mais également en récupérer son contenu sans pour autant l'afficher directement, afin de l'envoyer par email par exemple :

``` php
return $this->render('main/product.html.twig', [
    'id' => $id,
    'slug' => $slug,
    'ip' => $request->getClientIp()
]);
```

Et voici un deuxième exemple montrant comment récupérer le contenu d'un template depuis le contrôleur :

``` php
$templateAsString = $this->renderView('email/resetting.html.twig', [
    'name' => $name,
]);
```
## La syntaxe de Twig

Twig définit deux types de syntaxe spéciale :
::: v-pre
- **{{ ... }}** : C'est l'instruction **d'affichage**. Elle permet d'afficher le contenu d'une variable. C'est donc l'équivalent de **echo** en PHP.
- **{% ... %}** : C'est la syntaxe des **tags**. Ils sont utilisés pour exécuter des instructions spéciales comme la boucle **for** ou la condition **if** par exemple.
- **{# ... #}** : C'est la syntaxe utilisée pour les **commentaires**. Il est préférable d'utiliser les commentaires de Twig à la place de ceux fournit par HTML afin qu'ils n'apparaissent pas dans le code de la page renvoyée au client.
:::

### Comparaison entre PHP et Twig

Nous allons voir des exemples de syntaxes de Twig en le comparant avec PHP.

#### Condition if
::: v-pre
``` php
// Condition if en PHP

<?php if($membre->getAge() < 12) { ?>
    Il faut avoir 12 ans pour ce film.
<?php } elseif($membre->getAge() < 18) { ?>
    OK bon film.
<?php } else { ?>
    Un peu vieux pour voir ce film, non ?
<?php } ?>
```
:::

::: v-pre
``` twig
{# Condition if en Twig #}

{% if membre.age < 12 %}
    Il faut avoir 12 ans pour ce film.
{% elseif membre.age < 18 %}
    OK bon film.
{% else %}
    Un peu vieux pour voir ce film, non ?
{% endif %}
```
:::

Outre le fait que Twig offre une syntaxe plus lisible, vous pouvez remarquer que les **getters** ne sont pas nécessaire avec Twig car ils seront remplacés pour nous. Vous pouvez donc accéder à vos variables comme si c'était des variables de classe d'accès **public**.

#### Boucle for

::: v-pre
``` php
// Boucle for en PHP

<ul>
<?php if(count($liste_membres) > 0) {
    foreach($liste_membres as $membre) {
        echo '<li>'.$membre->getPseudo().'</li>';
    }
} else { ?>
    <li>Pas d'utilisateur trouvé.</li>
<?php } ?>
</ul>
```
:::

::: v-pre
``` twig
{# Boucle for en Twig #}

<ul>
    {% for membre in liste_membres %}
        <li>{{ membre.pseudo }}</li>
    {% else %}
        <li>Pas d'utilisateur trouvé.</li>
    {% endfor %}
</ul>
```
:::

#### Définition de variables

::: v-pre
``` php
// Définition en PHP

<?php $foo = 'bar'; ?>
```
:::

::: v-pre
``` twig
{# Définition en TWIG #}

{% set foo = 'bar' %}
```
:::

### Les filtres

Twig contient également des **filtres**. Ce sont des fonctions qui s'appliquent à des variables afin de les formater pour l'affichage. La syntaxe est la suivante :

``` twig
{# Affiche le premier caractère en majuscules et le reste en minuscules #}

{{ user.fistName|capitalize }}
```

::: tip
Il est possible d'enchainer les filtres pour en appliquer plusieurs ! Le filtre suivant utilisera le contenu renvoyé par le précédent. L'ordre dans lequel vous les écrivez a donc de l'importance.
:::

Vous trouverez la liste complètes des filtres Twig dans la [documentation](https://twig.symfony.com/doc/2.x/filters/index.html), mais en voici déjà quelques uns.

| Filtre                                                         | Description                                                                                             |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [title](https://twig.symfony.com/doc/2.x/filters/title.html)   | Met la première lettre de chaque mot en majuscule, le reste en minuscule.                              |
| [date](https://twig.symfony.com/doc/2.x/filters/date.html)     | Formate un objet DateTime en texte. Le format du paramètre correspond à celui de la fonction PHP date. |
| [length](https://twig.symfony.com/doc/2.x/filters/length.html) | Nombre d'éléments d'un tableau, ou nombre de caractères d'une chaine.                                   |
| [raw](https://twig.symfony.com/doc/2.x/filters/raw.html)       | Permet au code dans une variable d'être interprété.                                                     |

Démonstration :

``` twig
{# title #}
{{ var|title }}

{# date #}
{{ myDate|date('d-m-Y') }} {# Va afficher la date donnée avec le format "19-01-2019" #}
{{ "now"|date('d-m-Y \\à H:i') }} {# Va afficher la date courante avec le format "19-01-2019 à 09h40" #}

{# length #}
{{ stringOrArray|length }}

{# raw #}
{{ '<p>Ce code HMTL sera interprété.<br/>Essayez de l\'utiliser en enlevant le filtre !</p>'|raw }}

```

## Intégration dans Symfony

Contrairement à d'autres moteurs de templates, il n'est pas possible d'écrire du code PHP à l'intérieur de fichier Twig. Par contre, il est possible d'étendre Twig pour y ajouter vos propres fonctions, tags, ou filtres.

C'est exactement ce que fait Symfony avec les fonctions que nous allons voir maintenant (cette intégration se fait grâce au bundle **symfony/twig-bundle**).

### Génération de lien

Enfin, nous allons voir comment il est possible de créer des liens avec Twig. Il serait en effet fort déplaisant d’avoir des liens écrit manuellement alors que nous avons mis en place des règles de routage censées nous simplifier la vie.

C'est la fonction **path** qui sera utilisé pour ça.

``` twig
{# Génération de lien relatif #}
<a href={{ path('nom_de_la_route') }}>Le lien</a>

{# Génération de lien avec paramètres dynamiques #}
<a href={{ path('nom_de_la_route_avec_param', {'id': id, 'slug': slug}) }}>Le lien</a>

{# Génération de lien absolue (pratique pour les emails) #}
<a href={{ url('nom_de_la_route') }}>Le lien absolue</a>
```

### Gestion des assets

Les templates font aussi très souvent référence à des images, du Javascript, des feuilles de style et d'autres fichiers. Bien sûr vous pouvez coder en dur le chemin vers ces fichiers (/images/logo.png par exemple), mais Symfony fournit une façon de faire plus souple via la fonction **asset** de Twig. L'argument donné à la fonction est une chaîne de caractères représentant un chemin relatif depuis le dossier **/public/** de notre application.

``` twig
<img src="{{ asset('images/logo.png') }}" />

<link href="{{ asset('css/style.css') }}" rel="stylesheet" type="text/css" />
```

Le principal objectif de la fonction **asset** est de rendre votre application plus portable. Si votre application se trouve à la racine de votre hôte (http://example.com par exemple), alors le chemin retourné sera /images/logo.png. Mais si votre application se trouve dans un sous répertoire (http://example.com/my_app par exemple), chaque chemin vers les fichiers sera alors généré avec le sous répertoire (/my_app/images/logo.png). La fonction **asset** fait attention à cela en déterminant comment votre application est utilisée et en générant les chemins corrects.


## Héritage de templates

Bien souvent, les templates d'un projet partagent des éléments communs, comme les entêtes, pieds de page et menus latéraux. Dans Symfony, nous abordons ce problème différemment : un template peut être décoré par un autre. Cela fonctionne exactement comme les classes PHP : l'héritage de template vous permet de bâtir un template « layout » de base qui contient tous les éléments communs de votre site et de définir des blocs (comprenez « classe PHP avec des méthodes de base »). Un template enfant peut étendre le template layout et surcharger n'importe lequel de ses blocs (comprenez « une sous-classe PHP qui surcharge certaines méthodes de sa classe parente »).

Le modèle le plus couramment utilisé est l’héritage à trois niveaux. Ce dernier est composé d’un layout principal pour votre application, un template correspondant au layout de chacune de vos sections et héritant du layout principal. Puis enfin, un template pour chaque page héritant lui même du layout de la section de laquelle il dépend.

Une notion à connaître et qui joue un rôle important dans notre héritage, est la notion de **block**. En effet, vos layouts vont en être composés et cela s’avère vraiment très pratique. Il faut voir un **block** comme un espace dans votre template qu’il va falloir compléter. Ce dernier peut par défaut être composé d’éléments au niveau de votre layout général mais est susceptible d’être complété par la suite par vos templates **enfants**.

Prenons un exemple concret afin d’y voir un peu plus clair. Admettons que nous souhaitions intégrer la structure de page suivante qui reste assez simple :

![Heritage sur 3 niveau](/img/twig-heritage.png)

Cela correspond bien à un système d’héritage à trois niveaux dans lequel nous avons :

- Le layout général **templates/base.html.twig**. Ce layout est commun sur toute l'application.
- Le layout de second niveau **templates/layout.html.twig** héritant du layout général. Il peut y en avoir par exemple un pour le front et un pour le back.
- Le template correspondant à la page actuelle **templates/main/index.html.twig** héritant du layout de second niveau.

Voici à quoi pourraient ressembler le contenu des différents templates en choisissant de les intégrer dans un héritage à 3 niveaux avec Twig.

``` twig
{# base.html.twig #}

<!DOCTYPE html>
<html lang="{{ app.request.locale }}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>{% block title %}Shoefony{% endblock %}</title>
        {% block stylesheets %}
            {# Ce CSS est utilisé sur toute l'application #}
            <link href="{{ asset('css/global.css') }}" rel="stylesheet">
        {% endblock %}
    </head>
    <body>
        {% block body %}{% endblock %}

        {% block javascripts %}
            {# jQuery sera utilisé sur toute l'application #}
            <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        {% endblock %}
    </body>
</html>
```

``` twig
{# layout.html.twig #}

{% extends 'base.html.twig'%}

{% block stylesheets %}
    {{ parent() }}
    <link href="{{ asset('css/css-du-front.css') }}" rel="stylesheet">
{% endblock %}

{% block body %}
    <header>
        <span>Shoefony</span>
        <nav>
            <a href="{{ path('cms_homepage') }}">Home</a>
            <a href="{{ path('cms_presentation') }}">Présentation</a>
        </nav>
    </header>

    {% block content %}{% endblock %}
{% endblock %}

{% block javascripts %}
    {{ parent() }}
    <script href="{{ asset('js/js-du-front.js') }}"></script>
{% endblock %}
```

``` twig
{# main/index.html.twig #}

{% extends 'layout.html.twig'%}

{% block title %}Bienvenue | {{ parent() }}{% endblock %}

{% block content %}
    <h1>Bienvenue sur le site Shoefony</h1>
    <p>Du contenu</p>
{% endblock %}
```

Ce qui va générer le html suivant:

``` html
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Bienvenue | Shoefony</title>
        <link href="/css/global.css" rel="stylesheet">
        <link href="/css/css-du-front.css" rel="stylesheet">
    </head>
    <body>
        <header>
            <span>Shoefony</span>
            <nav>
                <a href="/">Home</a>
                <a href="/presentation">Présentation</a>
            </nav>
        </header>

        <h1>Bienvenue sur le site Shoefony</h1>
        <p>Du contenu</p>

        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script href="/js/js-du-front.js"></script>
    </body>
</html>
```

Ça peut paraître compliqué au début mais vous verrez qu’une fois adopté, vous ne pourrez plus vous en passer !


## A vous de jouer

Les différentes pages de notre site existes mais elles ne ressemblent pour le moment à pas grand chose. Utilisons le template qui nous a été fourni pour mettre en page notre site web.

1. Reprendre l'exemple de ce document concernant l'héritage multiple dans votre projet afin d'obtenir la même structure puis tester le rendu.
2. Observer les sources des templates Bootstrap qui vous ont été fournis dans le cadre du projet Shoefony et identifier un schéma d'héritage efficace sur trois niveaux.
3. Intégrer le layout de base.html.twig, le layout (second niveau), ainsi que le template de la page d'accueil.
4. Inclure le CSS, le Javascript et les images grâce à la fonction proposée par Twig.
5. Intégrer le reste des templates de vos pages et créer des liens vers chacune d'entre elles via le menu principal.
6. Une date est affichée dans le footer de vos pages web, rendre cette date dynamique à l'aide de Twig.