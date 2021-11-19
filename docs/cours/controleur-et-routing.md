# Contrôleur et Routing

## Requête et réponse

Le but des frameworks **HTTP** comme Symfony est de transformer une requête en réponse. Le composant **HttpFoundation** est le composant le plus bas niveau de Symfony. Son but est notamment d'ajouter une couche orientée objet pour gérer la requête, qui en PHP, est contenu dans des variables globales ($_POST, $_GET, $_FILES, $_SESSION, $_COOKIE, $_SERVER, ...). On y retrouve donc les objets :
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

::: warning
Depuis l'arrivé du composant Runtime avec la version 5.2, le contenu du front controller n'est plus celui présenté au dessus. La logique reste cependant la même.
:::

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

Le routing est divisé en plusieurs fichiers et dossiers appelés dans l'ordre suivant :
- **/config/routes/{environnement_courant}/** : Le dossier qui contiendra les routes des différents packages installés pour chaque environnement.
- **/config/routes/** : Même chose qu'au-dessus mais sans restriction d'environnement.
- **/config/routes.yaml** : Un fichier pour définir vos routes au format YAML (nous ne l'utiliserons pas).

Regardons le contenu de notre fichier **/config/routes/annotations.yaml** : 

``` yaml
controllers:
    resource: ../../src/Controller/
    type: annotation
```

Cette configuration active les annotations comme moyen de routing pour tous nos contrôleurs ! Les annotations de routing sont situées dans le code même des contrôleurs. Comme nous allons utiliser uniquement ce format, nous n'avons pas besoin de configurer quoi que ce soit.

::: tip
Le format recommandé dans Symfony pour gérer les routes dans votre application est le format **annotations** mais il est également possible d'utiliser YAML, XML ou PHP.
:::

### Configuration d'une route

Voici les paramètres les plus importants pour la configuration de route :


| Nom du paramètre | Contenu                                           | Type          | Requis             |
| ---------------- | ------------------------------------------------- | :----------:  | :----------------: |
| path             | Le chemin                                         | string        | :heavy_check_mark: |
| name             | Le nom                                            | string        | :heavy_check_mark: |
| requirements     | Définit la forme des paramètres                   | array         | -                  |
| defaults         | Définit les valeurs par défaut des paramètres     | array         | -                  |
| methods          | Définit les méthodes HTTP que la route doit gérer | array\|string | -                  |

### Les paramètres d'une route

Certaines routes peuvent nécessiter la prise en compte de paramètres, par exemple lorsque vous voudrez afficher la fiche d'un produit sur votre site vitrine, il vous faudra passer en paramètre l'identifiant du produit.

``` php
/**
 * @Route("/store/product/{id}", name="store_show_product" requirements={"id" = "\d+"}, methods={"GET"})
 */
public function showProduct(int $id): Response
{
    // ...
}
```

Grâce au paramètre **{id}** dans notre route, toutes les URLs du type **/store/product/{id}** seront
gérées par cette route, par exemple : **/store/product/3**

La paramètre **{id}** est **obligatoire** et devra **impérativement correspondre à un entier positifs**, c'est la propriété indiquée dans requirements qui l'impose. Sans cette dernière, vous pourriez passer ce que vous voulez en paramètre, même une chaîne de type texte.

Bien entendu, vous pouvez tout à fait multiplier les paramètres. 

### Debug des routes

Afin de vous aider à vous y retrouver un peu plus facilement dans votre routage, vous pouvez utiliser la barre de debug de Symfony. Si votre application est en environnement de développement, vous avez la possibilité d'accéder au détail de la route empruntée en passant la souris sur le nom de la route.

![Routing debug bar](/img/routing-debug.png)

Vous pouvez également cliquer sur cet élément pour entrer dans le **profiler** et obtenir plus d'informations.

Pour lister toutes les routes de votre application, vous avez également à disposition une commande :

``` bash
php bin/console debug:router
```

## Contrôleur

L'objectif du contrôleur est très simple, il exécute une action qui doit retourner une instance de **Response**. Voici un exemple de contrôleur fictif :

``` php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StoreController extends AbstractController
{
    /**
     * @Route("/store/product", name="store_list_product")
     */
    public function listProduct(): Response
    {
        return $this->render('product/list.html.twig');
    }

    /**
     * @Route("/store/product/{id}", name="store_show_product", requirements={"id" = "\d+"})
     */
    public function showProduct(int $id): Response
    {
        return new Response("Produit d'id $id");
    }
}
```

Deux **actions** sont présentes dans ce contrôleur, la première correspond à l'affichage de la liste de produits et la deuxième correspond à l'affichage d'une fiche produit en prenant en charge un paramètre *id*.

Un contrôleur est donc composé d'**actions**, il s'agit des méthodes ciblées par le routing et effectuant les traitements nécessaires à l'affichage de notre page.

Une action renvoie toujours une instance de Response :
- Dans l'action **listProduct**, on se sert de la méthode **render** fournit par l'AbstractController que notre classe étend. Cette fonction renvoie une Response avec comme contenu un template Twig traité.
- Dans l'action **showProduct**, on instancie nous même un objet Response avec son contenu.


### Générer des URLs

Nous pouvons générer des URLs à partir du nom des routes directement depuis notre contrôleur. En effet, vu que le routeur a toutes les routes à sa disposition, il est capable d'associer une route à une certaine URL, mais également de reconstruire l'URL correspondant à une certaine route.

Par exemple, nous avons une route nommée **store_products** qui écoute l'URL **/store/products**. Vous décidez un jour de changer vos URLs afin d'y faire apparaître le mot clé en rapport avec la catégorie des produits affichés et vous aimeriez bien que vos produits soient disponibles depuis **/store/{category}/products**. Si vous aviez écrit toutes vos URLs à la main dans vos fichiers, vous auriez dû toutes les changer une par une. Grâce à la génération d'URLs, vous ne modifiez que la route : ainsi, toutes les URLs générées seront mises à jour !

Pour générer une URL, vous devez le demander au routeur en lui donnant deux arguments : le nom de la route ainsi que les éventuels paramètres de cette route. Depuis un contrôleur, nous pouvons utiliser un raccourcie grâce à la méthode **generateUrl** :

``` php
$url = $this->generateUrl('store_products', [
    'category' => 'sport'
]);
```

L'URL ainsi généré sera **/store/sport/products**

### Manipuler l'objet Request

Nous avons vu un peu plus haut comment récupérer simplement un paramètre dans notre contrôleur lorsque ce dernier passe par une route. Heureusement, nous avons la possibilité de récupérer les paramètres ne passant pas par ce chemin mais tous types de paramètres d'une requête HTTP classique.

Pour ça, il faut injecter la Request dans l'action de notre contrôleur de cette manière :

``` php {2,7}
// ...
use Symfony\Component\HttpFoundation\Request;
// ...
    /**
     * @Route("/store/product/{id}", name="store_show_product", requirements={"id" = "\d+"})
     */
    public function showProduct(Request $request, int $id): Response
    {
        // ...
    }
// ...
```

En admettant que l'on décide d'appeler notre page produit en y ajoutant un paramètre GET *slug* correspondant au titre de notre article pour l'URL **/store/product/3/details?slug=titre-de-mon-produit**. Nous pourrions procéder de la manière suivante afin de récupérer ce paramètre :

``` php {3}
    public function showProduct(Request $request, int $id): Response
    {
        $slug = $request->query->get('slug');
        // ...
```

Nous avons utilisé dans ce cas précis **$request->query**, cela permet de récupérer un paramètre de type **GET**, néanmoins il y a bien d'autres possibilités :

| Variables de Request   | Variables Globales  | Exemple                              |
| ---------------------- | ------------------- | ------------------------------------ |
| $request->query        | $_GET               | $request->query->get('tag')          |
| $request->request      | $_POST              | $request->request->get('tag')        |
| $request->cookies      | $_COOKIE            | $request->cookies->get('tag')        |
| $request->server       | $_SERVER            | $request->server->get('REQUEST_URI') |
| $request->headers      | $_SERVER['HTTP\_*'] | $request->header->get('USER_AGENT')  |
| $request->getSession() | $_SESSION           | $request->getSession()->get('tag')   |

## A vous de jouer

1. Créer un **MainController**
2. Nommer la route vous permettant d'accéder à la page d'accueil de votre projet ( avec l'URL */*) de la manière suivante : **main_homepage**
3. Créer une route, une action et un template vous permettant d'accéder à la présentation de la boutique Shoefony via l'URL suivant **/presentation** et nommer la route **main_presentation**.
4. Créer un **StoreController**
5. Créer une route, une action et un template vous permettant d'accéder à la fiche détaillée d'un produit en prenant en paramètre son identifiant, ainsi que son slug, via l'URL suivante **/store/product/{id}/details/{slug}** et nommer la route **store_show_product**.
6. Créer une route, une action et un template vous permettant d'accéder la page de contact via l'URL suivante **/contact** et nommer la route **main_contact**
7. Associer un template à la page en charge de l'affichage d'une fiche produit et trouver un moyen d'y afficher l'identifiant et le slug passés en paramètres au contrôleur.
8. Afficher également sur la page détaillée d'un produit l'adresse IP du client ainsi que l'URL de la page en utilisant la méthode associée au composant router.
