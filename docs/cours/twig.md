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
- **{% ... %}** : C'est la syntaxe des **tags**. Ils sont utilisés pour exécuter des instructions spéciales comme la boucle **for** ou la condition **if** par exemples.
- **{# ... #}** : C'est la syntaxe utilisé pour les **commentaires**. Il est préférable d'utiliser les commentaires de Twig à la place de ceux fournit par HTML afin qu'il n'apparaissent pas dans le code sur de la page renvoyé au client.
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

Twig contient également des **filtres**. Ce sont des fonctions qui s'appliquent à des variables afin de les formatter pour l'affichage.

## A vous de jouer

Les différentes pages de notre site existes mais elles ne ressemblent pour le moment à pas grand chose. Utilisons le template qui nous a été fourni pour mettre en page notre site web.

1. Reprendre l'exemple de ce document concernant l'héritage multiple dans votre projet afin d'obtenir la même structure puis tester le rendu.
2. Observer les sources des templates Bootstrap qui vous ont été fournis dans le cadre du projet Shoefony et identifier un schéma d'héritage efficace sur trois niveaux.
3. Intégrer le layout de base.html.twig, le layout (second niveau), ainsi que le template de la page d'accueil.
4. Inclure le CSS, le Javascript et les images grâce à la fonction proposée par Twig.
5. Intégrer le reste des templates de vos pages et créer des liens vers chacune d'entre elles via le menu principal.
6. Une date est affichée dans le footer de vos pages web, rendre cette date dynamique à l'aide de Twig.