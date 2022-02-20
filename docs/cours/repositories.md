# Les repositories

L'une des principales fonctions de la couche **Modèle** dans une application **MVC**, c'est la récupération des données. Récupérer des données n'est pas toujours évident, surtout lorsqu'on veut récupérer seulement certaines données, les classer selon des critères, etc. Tout cela se fait grâce aux **repositories**, que nous étudions dans ce chapitre.

Un **repository** centralise tout ce qui touche à la **récupération de vos entités**. Concrètement, cela veut dire que c'est à l'intérieur de nos repositories que nous ferons nos requêtes SQL ailleurs. On va donc y construire des méthodes pour récupérer une entité par son id, pour récupérer une liste d'entités suivant un critère spécifique. A chaque fois que vous devez récupérer des entités dans votre base de données, vous utiliserez le **repository** de l'entité correspondante.

Il existe **un repository par entité**. Cela permet de bien organiser son code. Bien sûr, cela n'empêche pas qu'un repository utilise plusieurs entités, dans le cas d'une **jointure** par exemple.

Les **repositories** ne fonctionnent pas par magie, ils utilisent en réalité directement l'**EntityManager** pour faire leur travail. Vous le verrez, parfois nous ferons directement appel à l'EntityManager depuis des méthodes du repository.

## Les méthodes de construction de query

Il existe deux moyens de récupérer les entités : en utilisant du **DQL** ou en utilisant le **QueryBuilder**.

### Doctrine Query Language (DQL)

Le **DQL** n'est rien d'autre que du SQL adapté à la vision par objets que Doctrine utilise. Il s'agit donc de faire ce dont on a l'habitude, des requêtes textuelles comme celle-ci par exemple :

``` php
$query = $this->em->createQuery('SELECT p FROM App\\Entity\\Store\\Product p');
$results = $query->getResult();
```

Vous venez de voir votre première requête DQL. Retenez le principe : avec une requête qui n'est rien d'autre que du texte, on effectue le traitement voulu.

### QueryBuilder

Comme son nom l'indique, il sert à construire une requête, **par étape**, en utilisant le principe de la programmation orientée objet. Si l'intérêt n'est pas évident au début, son utilisation se révèle vraiment pratique ! Voici la même requête que précédemment, mais en utilisant le **QueryBuilder** :

``` php
$results = $this->em->createQueryBuilder()
    ->select('p')
    ->from(Product::class, 'p')
    ->getQuery()
    ->getResult();
```

Un des avantages est qu'il est possible de construire la requête **en plusieurs fois**. Ainsi, vous pouvez développer une méthode qui rajoute une condition à une requête, par exemple pour sélectionner tous les produits visibles. Il suffit pour cela de passer le **QueryBuilder** à une méthode données, et cette méthode peut modifier la requête comme elle veut : ajouter un WHERE, ajouter une jointure, etc. C'est quelque chose qui est beaucoup plus compliqué avec une requête textuelle uniquement ! Pas de panique, on verra des exemples dans la suite du chapitre.

## Récupérer ses entités

### Les méthodes de base

Vos repositories héritent de la classe **Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository**, qui propose déjà quelques méthodes très utiles pour récupérer des entités (et en même temps permet de définir nos **Repository** comme des **services**, notamment pour l'autowiring). Ce sont ces méthodes là que nous allons voir ici. Il existe quatre méthodes fournit de base, que voici :

::: tip
Que vous ayez défini un repository pour votre classe existe ou non, ces méthodes sont toujours disponibles en utilisant **$em->getRepository(Product::class)** ! Mais, d'une manière générale, on préfère les définir quand même pour pouvoir les injecter avec l'injection de dépendances.
:::

#### find($id)

La méthode **find($id)** récupère l'entité correspondant à l'id de notre entité fournit en paramètre. Dans le cas de notre **ProductRepository**, elle retourne une instance de Product ou *null* si il n'y a pas de résultat. 

``` php
$product = $productRepository->find($id);
```

#### findAll()

La méthode findAll() retourne toutes les entités contenue dans la base de données. Le format du retour est une array d'entités, que vous pouvez parcourir (avec un foreach par exemple) pour utiliser les objets qu'elle contient.

``` php
$products = $productRepository->findAll();

foreach ($products as $product) {
    // ...
}
```

#### findBy()

La méthode **findBy()** est un peu plus intéressante. Comme **findAll()**, elle permet de retourner une liste d'entités, sauf qu'elle est capable d'effectuer un filtre pour ne retourner que les entités correspondantes à un ou plusieurs critère(s). Elle peut aussi trier les entités, et même n'en récupérer qu'un certain nombre (pour une pagination, par exemple). La syntaxe est la suivante :

``` php
// Depuis l'entity Manager ou avec l'injection de dépendance
$productRepository = $this->em->getRepository(Product::class);

$products = $productRepository->findBy(
    ['name' => 'Product 1'], // Critère(s)
    ['createdAt' => 'DESC'], // Tri(s)
    5,                       // Limite
    0,                       // Offset (à partir de la position)
);

foreach ($products as $product) {
    // ...
}
```

Cet exemple va récupérer toutes les entités ayant comme titre "Product 1", en les classant par date décroissante et en en sélectionnant 5 à partir du début (0). Elle retourne un array également. Vous pouvez mettre plusieurs entrées dans le tableau des critères, afin d'appliquer plusieurs filtres.

#### findOneBy()

La méthode **findOneBy()** fonctionne sur le même principe que la méthode **findBy()**, sauf qu'elle ne retourne qu'une seule entité. De ce fait, elle ne conserve que le premier argument des critères.

``` php
// Retourne le produit avec le nom "Product 1"
$product = $productRepository->findOneBy(
    ['name' => 'Product 1'], // Critère(s)
);

// Retourne le dernier produit créé
$lastProduct = $productRepository->findOneBy(
    [],                      // Critère(s)
    ['createdAt' => 'DESC'], // Tri(s)
);
```

Ces méthodes permettent de couvrir pas mal de besoins. Mais pour aller plus loin encore, Doctrine nous offre encore deux autres méthodes.

### Les méthodes magiques

Les méthodes magiques sont des méthodes qui n'existent pas dans la classe mais qui sont émulées. Elles sont prises en charge par la méthode PHP **__call()** qui va exécuter du code en fonction du nom de la méthode appelée.

::: warning
Je vous parle de ces méthodes pour que vous sachiez qu'elles existent, mais je vous déconseille de les utiliser.
:::

#### findByX($value)
Première méthode, en remplaçant « X » par le nom d'une propriété de votre entité. Dans notre cas, pour l'entité **Product**, nous avons donc plusieurs méthodes : **findByName()**, **findByDescription()**, **findByCreatedAt()**, etc.

Cette méthode fonctionne comme si vous utilisiez **findBy()** avec un seul critère, celui du nom de la méthode.

``` php
// Retourne une array de produit avec le nom "Product 1"
$products = $productRepository->findByName('Product 1');
```

#### findOneByX($value)

Deuxième méthode, en remplaçant « X » par le nom d'une propriété de votre entité. Dans notre cas, pour l'entité **Product**, nous avons donc plusieurs méthodes : **findOneByName()**, **findOneByDescription()**, **findOneByCreatedAt()**, etc. Cette méthode fonctionne comme **findOneBy()**, sauf que vous ne pouvez mettre qu'un seul critère, celui du nom de la méthode.

``` php
// Retourne un produit avec le nom "Product 1"
$product = $productRepository->findOneByName('Product 1');
```

### Vos propres méthodes

Toutes les méthodes vu précédemment permettent de récupérer vos entités dans la plupart des cas. Simplement, elles montrent rapidement leurs limites lorsqu'on doit faire des jointures, ou effectuer des conditions plus complexes. Pour cela il faudra faire **nos propres méthodes** de récupération.

Avant tout, il nous faut créer un repository lié à notre entité, pour cela, assurez-vous que la ligne suivante dans la déclaration de la classe de l'entité concernée est bien définie :

``` php {2}
/**
 * @ORM\Entity(repositoryClass="App\Repository\Store\ProductRepository")
 * @ORM\Table(name="sto_product")
 */
class Product
{
    ...
}
```

::: tip
Vos repositories ont déjà été créés puisque nous avons généré nos entités avec le **MakerBundle**. Ils se trouvent dans le dossier **src/Repository/**. Il n'est donc pas nécessaire de compléter votre entité.
:::

#### Découverte du QueryBuilder

Voici le **ProductRepository** complété par une première méthode personnalisée équivalente à findAll() :

``` php
<?php

namespace App\Repository\Store;

use App\Entity\Store\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Product|null find($id, $lockMode = null, $lockVersion = null)
 * @method Product|null findOneBy(array $criteria, array $orderBy = null)
 * @method Product[]    findAll()
 * @method Product[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Product::class);
    }

    public function myFindAll(): array
    {
        // On crée notre un queryBuilder
        $qb = $this->createQueryBuilder('p');
        
        // On récupère un objet query a partir du queryBuilder
        $query = $qb->getQuery();
        
        // On exécute la query pour obtenir les résultats
        return $query->getResult();
    }
}
```

Cette méthode **myFindAll()** retourne exactement le même résultat qu'un **findAll()**, c'est-à-dire un tableau de toutes les entités Product dans notre base de données.

Vous pouvez le voir, faire une simple requête est très facile. Pour mieux le visualiser, je vous propose la même méthode sans les commentaires et en raccourci :

``` php
public function myFindAll(): array
{
    return $this
        ->createQueryBuilder('p')
        ->getQuery()
        ->getResult();
}
```

Et bien sûr, pour récupérer les résultats depuis un contrôleur, il faut faire comme avec n'importe quelle autre méthode du repository, comme ceci, en ayant injecter au préalable le repository :

``` php
$products = $this->productRepository->myFindAll();
```

Le **QueryBuilder** dispose de plusieurs méthodes afin de construire notre requête. Il y a une ou plusieurs méthodes par partie de requête : le **WHERE**, le **ORDER BY**, le **FROM**, etc.

``` php
public function findByNameAndCreatedBefore(string $name, \DateTime $createdAt): array
{
    return $this
        ->createQueryBuilder('p')
        ->where('p.name = :name')
        ->andWhere('p.createdAt < :createdAt')
        ->orderBy('p.createdAt', 'DESC')
        ->setParameter('name', $name)
        ->setParameter('createdAt', $createdAt)
        ->getQuery()
        ->getResult();
}
```

::: warning
Les méthodes **select**, **where** et **orderBy** réinitialisent la partie de la query qui les concernent. Il faut les utiliser avec un préfixe add (par exemple addSelect) pour éviter ce comportement.
:::

Maintenant, voyons un des avantages du **QueryBuilder**. En considérant que la condition "produits publiés durant l'année en cours" est une condition dont on va se resservir souvent. Il faut donc en faire une méthode, que voici :

``` php
private function whereCurrentYear(QueryBuilder $qb)
{
    $qb
        ->andWhere('p.createdAt BETWEEN :start AND :end')
        ->setParameter('start', new \DateTime(date('Y').'-01-01'))
        ->setParameter('end', new \DateTime(date('Y').'-12-31'));
}
```

Vous notez donc que cette méthode ne traite pas une Query, mais bien uniquement le **QueryBuilder**. C'est en cela que ce dernier est très pratique, car faire cette méthode sur une requête en texte simple est possible, mais très compliqué. Il aurait fallu voir si le **WHERE** était déjà présent dans la requête, si oui mettre un **AND** au bon endroit, etc. Bref, pas simple. Pour utiliser cette méthode, voici la démarche :

``` php
public function myFind(string $name): array
{
    // On peut ajouter ce qu'on veut comme condition avant
    $qb = $this
        ->createQueryBuilder('p')
        ->where('p.name = :name')
        ->setParameter('name', $name);

    // On applique notre condition
    $this->whereCurrentYear($qb);

    // On peut ajouter ce qu'on veut après
    $qb->orderBy('p.createdAt', 'DESC');

    return $qb->getQuery->getResult();
}
```

Cette condition peut donc être utilisée dans n'importe laquelle des requêtes créées.

#### Les jointures

La possibilité est également offerte de réaliser des **jointures** à l'aide, c'est assez simple à réaliser :

``` php
public function findOneWithBrand(int $id): Product
{
    return $this
        ->createQueryBuilder('p')
        // En plus de la jointure, on précise qu'on veut
        // récupérer en plus la marque correspondant au produit.
        ->addSelect('b')
        ->leftJoin('p.brand', 'b')
        ->where('p.id = :id')
        ->setParameter('id', $id)
        ->getQuery()
        ->getOneOrNullResult();
}
```

Ou depuis le **BrandRepository**, pour obtenir la marque avec tous ces produits :

``` php
public function findOneWithProducts(int $id): Brand
{
    return $this
        ->createQueryBuilder('b')
        ->addSelect('p')
        ->leftJoin('b.products', 'p')
        ->where('b.id = :id')
        ->setParameter('id', $id)
        ->getQuery()
        ->getOneOrNullResult();
}
```

L'idée est donc la suivante :
- D'abord on crée une jointure avec la méthode **leftJoin()** (ou join() pour faire l'équivalent d'un **INNER JOIN**). Le premier argument de la méthode est la propriété de l'entité principale (celle qui est dans le **FROM** de la requête) sur lequel faire la jointure. Dans l'exemple, l'entité **Brand** possède une propriété **products**. Le deuxième argument de la méthode est l'alias de l'entité jointe.
- Puis on sélectionne également l'entité jointe, via un **addSelect()**. En effet, un **select('p')** tout court aurait écrasé le **select('b')** déjà fait par le **createQueryBuilder()**, rappelez-vous !

#### L'objet Query

Vous l'avez vu, la **Query** est l'objet à partir duquel on extrait les résultats. Il n'y a pas grand chose à savoir sur cet objet en lui-même, car il ne permet pas grand-chose à part récupérer les résultats. Il sert en fait surtout à la gestion du cache des requêtes.

Mais détaillons tout de même les différentes façons d'extraire les résultats de la requête. Ces différentes manières sont toutes à maîtriser, car elles concernent chacune un type de requête.

- **getResult()** : Exécute la requête et retourne un tableau contenant les résultats sous forme d'objets. Vous récupérez ainsi une liste des objets, sur lesquels vous pouvez faire des opérations, des modifications, etc.
- **getArrayResult()** : Exécute la requête et retourne un tableau contenant les résultats sous forme de tableaux. Comme avec getResult(), vous récupérez un tableau même s'il n'y a qu'un seul résultat. Mais dans ce tableau, vous n'avez pas vos objets d'origine, vous avez des simples tableaux. Cette méthode est utilisée lorsque vous ne voulez que lire vos résultats, sans y apporter de modification. Elle est dans ce cas plus rapide que son homologue getResult().
- **getScalarResult()** : Exécute la requête et retourne un tableau contenant les résultats sous forme de valeurs. Comme avec getResult(), vous récupérez un tableau même s'il n'y a qu'un seul résultat.
- **getOneOrNullResult()** : Exécute la requête et retourne un seul résultat, ou null si pas de résultat. Cette méthode retourne donc une instance de l'entité (ou null) et non un tableau d'entités comme getResult().
- **getSingleResult()** : Exécute la requête et retourne un seul résultat. Cette méthode est exactement la même que getOneOrNullResult(), sauf qu'elle déclenche une exception Doctrine\ORM\NoResultException si aucun résultat.
- **getSingleScalarResult()** : Exécute la requête et retourne une seule valeur, et déclenche des exceptions si pas de résultat ou plus d'un résultat.
- **execute()** : Exécute la requête. Cette méthode est utilisée principalement pour exécuter des requêtes qui ne retournent pas de résultats (des UPDATE, INSERT INTO, etc.)

## A vous de jouer
Maintenant que nous savons comment utiliser le **QueryBuilder** et ainsi créer nos propres requêtes, poursuivons notre développement :

1. Dans votre **ProductRepository**, créez une méthode permettant de récupérer les 4 derniers produits ajoutés (en vous basant sur le champ createdAt) et affichez-les sur la page d'accueil.
2. Créez à présent une entité **Comment** permettant de recueillir les avis des visiteurs pour chacun de nos produits (comprenant l'**id**, **un pseudo**, **un message**, **une date et heure de création**). Puis modifiez vos **fixtures** afin de générer un jeu de commentaires 
3. Affichez sur la page d'accueil, en dessous des produits en nouveautés, **les 4 produits les plus commentés**.
4. Votre page listant les produits dispose d'un menu des marques, celui-ci est également présent sur la page détail d'un produit. Faites-en sorte d'éviter le contenu dupliqué en créant un **composant partagé** entre ces deux pages.
5. Maintenant que vous disposez de la liste de vos marques sur l'ensemble de vos pages produits, **rendez actif les liens** permettant d'aller voir une **liste de produits en fonction de la marque** sélectionnée (reposez-vous sur l'id de la marque et pensez à garder le **lien cliqué actif** afin de permettre en un seul coup d'oeil la marque sur laquelle on se trouve).
6. Afin de **mutualiser l'affichage des produits** sur la page d'accueil, créez un template **partial** pour un item de la liste et utilisez le dans vos différents templates.
7. Enfin, **affichez les avis** des visiteurs sur chaque produit, **du plus récent au plus ancien**, et rendez le **formulaire d'ajout d'un nouvel avis** fonctionnel.
8. **Optimisez toutes les requêtes** de l'application afin d'en **limiter le nombre** au strict minimum.

### Aides
- [Embedding Controllers](https://symfony.com/doc/current/templates.html#embedding-controllers)
- [Including Templates](https://symfony.com/doc/current/templates.html#including-templates)