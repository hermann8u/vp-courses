# Contrôleur et Routing

## Requête et réponse

Le but des frameworks HTTP comme Symfony est de transformer une requête en réponse. Le composant HttpFoundation est le composant le plus bas niveau de Symfony. Son but est notamment d'ajouter une couche orientée objet pour gérer la requête, qui en PHP, est contenu dans des variables globales ($_POST, $_GET, $_FILES, $_SESSION, $_COOKIE, $_SERVER, ...). On y retrouve donc les objets :
- **Symfony\Component\HttpFoundation\Request**
- **Symfony\Component\HttpFoundation\Response**

La requête est créée dans notre Front Controller à partir de ces variables globales à la ligne 24 :

``` php {2}
$kernel = new Kernel($_SERVER['APP_ENV'], (bool) $_SERVER['APP_DEBUG']);
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
```

On peut également noter à la ligne suivante qu'elle est passée en argument de la fonction **handle** de notre Kernel (le noyau de notre application) pour générer la réponse.

Le routing rentre alors en jeu.

## Routing

Le rôle du routeur est, à partir d'une URL, de déterminer quel contrôleur appeler et avec quels arguments. Cela permet de configurer son application pour avoir de belles URL. Il s'agit là d'un point important pour le référencement et même pour le confort des visiteurs.

> Exemple :
> - **Non réécrite** : /index.php?controleur=produit&id=2&name=pantalon-jean-homme
> - **Réécrite** : /produit/2/pantalon-jean-homme

### Fonctionnement

Le but du routeur est, à partir d'une URL, de trouver la route correspondante et de retourner les paramètres de sortie que définit cette route, dont le contrôleur. Pour trouver la bonne route, le routeur va les parcourir une par une, dans l'ordre du fichier, et s'arrêter à la première route qui fonctionne.

::: warning
L'ordre de définition des routes est donc important, car la premiere route qui correspond est exécutée.
:::

Depuis Symfony 4 (et principalement en raison de Symfony Flex), le routing est divisé en plusieurs fichiers et dossiers appelés dans l'ordre suivant :
- **/config/routes.yaml** : Un fichier pour définir vos routes au format YAML (nous ne l'utiliserons pas).
- **/config/routes/{environnement_courant}/** : Le dossier qui contiendra les routes des différents packages installés pour chaque environnement.
- **/config/routes/** : Même chose qu'au-dessus mais sans restriction d'environnement.

Regardons le contenu de notre fichier **/config/routes/annotations.yaml** : 

``` yaml
controllers:
    resource: ../../src/Controller/
    type: annotation
```

Cette configuration active les annotations comme moyen de routing pour tous nos contrôleurs ! Les annotations de routing sont situées dans l'architecture même des contrôleurs. Comme nous allons utiliser uniquement ce format, nous n'avons pas besoin de configurer quoi que ce soit.

::: tip
Le format recommandé dans Symfony pour gérer les routes dans votre application est le format **annotations** mais il est également possible d'utiliser YAML, XML ou PHP.
:::

### Configuration d'une route

Voici les paramètres les plus importants pour la configuration de route :

<!-- #### path

Ce paramètre est tout simplement l'URL qui correspondra à votre route. Avec les annotations, il n'est pas explicitement écrit quand il est en premier, même si il peut l'être.

``` php
/**
 * @Route("/products")
 */
```

#### name

C'est le nom unique de la route. Il est important de garder une certaine cohérence quant à ce nom pour pouvoir le deviner plus facilement. Je vous conseille la syntax suivante : **{contrôleur}_{fonction}**

#### requirements

Ce paramètre est un

> Exemple:
> - main_index
> - product_show -->

| Nom du paramètre | Contenu                                                     | Requis                        |
| ---------------- | ----------------------------------------------------------- | :---------------------------: |
| path             | Le chemin                                                   | :white_check_mark:            |
| name             | Le nom                                                      | :white_check_mark:            |
| requirements     | Array qui définit la forme des paramètres                   | :negative_squared_cross_mark: |
| defaults         | Array qui définit les valeurs par défaut des paramètres     | :negative_squared_cross_mark: |
| methods          | Array qui définit les méthodes HTTP que la route doit gérer | :negative_squared_cross_mark: |

### Les paramètres d'une route

Certaines routes peuvent nécessiter la prise en compte de paramètres, par exemple lorsque vous voudrez afficher la fiche d'un produit sur votre site vitrine, il vous faudra passer en paramètre l'identifiant du produit.

``` php
/**
 * @Route("/product/{id}/details", requirements={"id" = "\d+"})
 */
```

Grâce au paramètre **{id}** dans notre route, toutes les URLs du type **/product/{id}/details** seront
gérées par cette route, par exemple : **/product/3/details**

La paramètre **{id}** est obligatoire et devra impérativement correspondre à un nombre, c'est la propriété indiquée dans requirements qui l'impose. Sans cette dernière, vous pourriez passer ce que vous voulez en paramètre, même une chaîne de type texte. Bien entendu, vous pouvez tout à fait multiplier les paramètres. 

L'intérêt du routeur n'est pas simplement de créer des URLs jolies, il va vous permettre de rendre ces paramètres accessibles depuis votre contrôleur afin de les utiliser et éventuellement les transmettre à la vue (votre template).

### Debug des routes

Afin de vous aider à vous y retrouver un peu plus facilement dans votre routage, vous pouvez utiliser la barre de debug Symfony. Si votre application est en environnement de développement, vous avez la possibilité d'accéder au détail de la route empruntée en passant la souris sur le nom de la route.

![Routing debug bar](/img/routing-debug.png)

Vous pouvez également cliquer sur cet élément pour entrer dans le **profiler** et obtenir plus d'informations.

Pour lister toutes les routes de votre application, vous avez également à disposition une commande :

``` bash
php bin/console debug:router
```

## Contrôleur

L'objectif du contrôleur est très simple, il exécute une action qui doit retourner une instance de Response. Voici un exemple de contrôleur fictif :

``` php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("", name="main_")
 */
class MainController extends AbstractController
{
    /**
     * @Route("/product/{id}", name="product", requirements={"id" = "\d+"})
     */
    public function product(int $id)
    {
        return new Response("Produit d'id $id");
    }

    /**
     * @Route("/products", name="products")
     */
    public function products()
    {
        return $this->render('main/products.html.twig');
    }
}
```
Deux actions sont présentes dans ce contrôleur, la première correspond à l'affichage d'une fiche produit en prenant en charge un paramètre et la deuxième correspond à l'affichage de la liste de produits.

Un contrôleur est donc composé d'actions, il s'agit des fonctions ciblées par le routing et effectuant les traitements nécessaires à l'affichage de notre page. Une action renvoie toujours une instance de Response :
- Dans l'action **product**, on instancie nous même un objet Response avec son contenu.
- Dans l'action **products**, on se sert de la méthode **render** fournit par l'AbstractController étendu par notre classe. Cette fonction renvoie une Response avec comme contenu un template Twig traité.

### Générer des URLs

Nous pouvons générer des URLs à partir du nom des routes directement depuis notre contrôleur. En effet, vu que le routeur a toutes les routes à sa disposition, il est capable d'associer une route à une certaine URL, mais également de reconstruire l'URL correspondant à une certaine route.

Par exemple, nous avons une route nommée **store_products** qui écoute l'URL **/store/products**. Vous décidez un jour de changer vos URLs afin d'y faire apparaître le mot clé en rapport avec la catégorie des produits affichés et vous aimeriez bien que vos produits soient disponibles depuis **/store/{category}/products**. Si vous aviez écrit toutes vos URLs à la main dans vos fichiers, vous auriez dû toutes les changer une par une. Grâce à la génération d'URLs, vous ne modifiez que la route : ainsi, toutes les URLs générées seront mises à jour !

Pour générer une URL, vous devez le demander au routeur en lui donnant deux arguments : le nom de la route ainsi que les éventuels paramètres de cette route. Depuis un contrôleur, c'est la méthode **$this->get('router')->generate()** qu'il faut appeler.

``` php
$url = $this->get('router')->generate('main_products', [
    'category' => 'sport'
]);
```

L'URL ainsi généré sera **/store/sport/products**

Voici un raccourcie disponible dans notre contrôleur qui fournit le même résultat (recommandé).
``` php
$url = $this->generateUrl('main_products', [
    'category' => 'sport'
]);
```
### Manipuler l'objet Request

Nous avons vu un peu plus haut comment récupérer simplement un paramètre dans notre contrôleur lorsque ce dernier passe par une route. Heureusement, nous avons la possibilité de récupérer les paramètres ne passant pas par ce chemin mais tous types de paramètres d'une requête HTTP classique.

Pour ça, il faut injecter la Request dans l'action de notre contrôleur de cette manière :

``` php {2,7}
...
use Symfony\Component\HttpFoundation\Request;
...
    /**
     * @Route("/product/{id}", name="product", requirements={"id" = "\d+"})
     */
    public function product(Request $request, int $id)
    {
        return new Response("Produit d'id $id");
    }

...
```

En admettant que l'on décide d'appeler notre page produit en y ajoutant un paramètre "slug" correspondant au titre de notre article, nous pourrions procéder de la manière suivante afin de récupérer ce paramètre : **/store/product/3/details?slug=titre-de-mon-produit**

``` php {3}
    public function product(Request $request, int $id)
    {
        $slug = $request->query->get('slug');
        ...
```

Nous avons utilisé dans ce cas précis $request->query, cela permet de récupérer un paramètre de type GET, néanmoins il y a bien d'autres possibilités :

| Variables de Request   | Variables Globales  | Exemple                              |
| ---------------------- | ------------------- | ------------------------------------ |
| $request->query        | $_GET               | $request->query->get('tag')          |
| $request->request      | $_POST              | $request->request->get('tag')        |
| $request->cookies      | $_COOKIE            | $request->cookies->get('tag')        |
| $request->server       | $_SERVER            | $request->server->get('REQUEST_URI') |
| $request->headers      | $_SERVER['HTTP\_*'] | $request->header->get('USER_AGENT')  |
| $request->getSession() | $_SESSION           | $request->getSession()->get('tag')   |

## A vous de jouer

1. Créer un **CmsController**
2. Nommer la route vous permettant d'accéder à la page d'accueil de votre projet ( avec l'URL */*) de la manière suivante : **cms_homepage**
3. Créer une route, une action et un template vous permettant d'accéder à la présentation de la boutique Shoefony via l'URL suivant **/presentation** et nommer la route **cms_presentation**.
4. Créer un **StoreController**
5. Créer une route, une action et un template vous permettant d'accéder à la fiche détaillée d'un produit en prenant en paramètre son identifiant, ainsi que son slug, via l'URL suivante **/store/product/{id}/details/{slug}** et nommer la route **store_product**.
6. Créer une route, une action et un template vous permettant d'accéder la page de contact via l'URL suivante **/contact** et nommer la route **cms_contact**
7. Associer un template à la page en charge de l'affichage d'une fiche produit et trouver un moyen d'y afficher l'identifiant et le slug passés en paramètres au contrôleur.
8. Afficher également sur la page détaillée d'un produit l'adresse IP du client ainsi que l'URL de la page en utilisant la méthode associée au composant router.