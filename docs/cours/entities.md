# Les entités Doctrine

L'objectif d'un ORM (pour **Object-Relation Mapper**) est simple : se charger de l'enregistrement de vos données en vous faisant oublier que vous avez une base de données. Comment ? En s'occupant de tout ! Nous n'allons plus écrire de requêtes, ni créer de tables via phpMyAdmin. Dans notre code PHP, nous allons utiliser **Doctrine**, l'ORM par défaut de Symfony.

## Créer une entité

Une entité, ce que l'ORM va manipuler et enregistrer dans la base de données, n'est rien d'autre qu'un simple objet (POPO) représenté par une classe à créer au sein du répertoire Entity de notre Bundle. Cette entité correspondra simplement à une table de notre base de données.

Voici ce à quoi pourrait ressembler l'entité Product de notre site :

``` php
namespace App\Entity\Store;

class Product
{
    private $id;

    private $name;

    private $description;

    private $price

    // Getters and Setters ...
}
```

Comme vous pouvez le voir, c'est très simple. Un objet, des propriétés, et bien sûr, les getters / setters correspondants. On pourrait en réalité utiliser notre objet dès maintenant ! Mais l'ORM ne pourrait pour le moment pas enregistrer notre objet en base de données. 

Nous avions déjà créer une entité dans le chapitre sur les formulaires, **App\\Entity\\Contact**, mais elles pour l'instant encore toutes les deux incomplètes. En effet, afin que Doctrine puisse savoir quoi faire de nos entités, il va falloir lui indiquer à l'aide d'annotations.

Pour générer nos entités, nous n'allons pas le faire manuellement, mais nous servir de la commande mis à disposition par le **maker-bundle** :

``` sh
php bin/console make:entity Store\Product
```

Lorsqu'on l'exécute, elle nous guide pour générer les différentes propriétés en nous demandant, dans l'ordre et pour chacune :
- **Son nom** : A donner en *camelCase*, bien sûr, et sans le "$". Dans la base, il est par défaut convertit en *snake_case*
- **Son type Doctrine** : Vous pouvez rentrer "?" pour lister tous les types disponibles
- **Différentes configurations** : Dépend du type choisi
- **Si elle est nullable** : De type booléen pour la configuration de la base de données. Par défaut à *false*

Les **Getters** et **Setters** seront également générés pour nous. L'avantage est que, là encore, le code généré suit des conventions, notamment de typage pour nos Getters et Setters.

Pour modifier une entité existe, vous pouvez utiliser la même commande, ce qui permettra d'ajouter de nouvelles propriétés !

Voici ce que ça donne pour notre nouvelle entité **App\\Entity\\Store\\Product** :

``` php {9}
<?php

namespace App\Entity\Store;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\Store\ProductRepository")
 * @ORM\Table(name="sto_product")
 */
class Product
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\Column(type="decimal", precision=10, scale=2)
     */
    private $price;

    // Getters and Setters ...
}
```

::: tip
J'ai surligné la **ligne 9** qui n'a pas été ajoutée par la commande. Elle permet de définir le nom que nous voulons pour notre table en base de données, ce qui m'a permit d'ajouter le prefix "sto_" pour celle-ci.
:::

Grâce à ces annotations, Doctrine dispose de toutes les informations nécessaires pour utiliser notre objet, créer la table correspondante, l'enregistrer, définir un identifiant (id) en auto-incrément, nommer les colonnes, etc. Ces informations se nomment les **metadata** de notre entité. Nous n'allons pas nous attarder sur le détail de ces annotations, elles sont suffisamment claires pour être comprises par tous. Ce qu'on vient de faire, à savoir rajouter les metadata à notre objet Product, s'appelle mapper l'objet Product, c'est-à-dire faire le lien entre notre table de la base de données et la représentation physique qu'utilise l'application.

## Gérer l'état de la base de données

Avant de pouvoir utiliser notre entité comme il se doit, on doit d'abord créer la table correspondante dans la base de données. Pour ce faire, il faut commencer par configurer nos accès à la base de données dans le fichier **/.env.local**, en y modifiant la variable **DATABASE_URL**.

Et ensuite, encore des commandes ! Cette fois-ci, on ne va pas utiliser une commande du maker-bundle, mais une des commandes de Doctrine, car on ne veut pas générer du code mais une table dans la base de données.

D'abord, si vous ne l'avez pas déjà fait, il faut créer la base de données. Pour cela, il suffit d'exécuter la commande (vous n'avez à le faire qu'une seule fois évidemment) :

``` sh
php bin/console doctrine:database:create
```

On peut ensuite y modifier nos tables avec la commande :

``` sh
php bin/console doctrine:schema:update --dump-sql
```

Cette dernière commande est vraiment performante. Elle va comparer l'état actuel de la base de données avec ce qu'elle devrait être en tenant compte de toutes nos entités. Puis, elle affiche les requêtes SQL à exécuter pour passer de l'état actuel au nouvel état.

Pour l'instant, rien n'a été fait en base de données, Doctrine nous a seulement affiché la ou les requêtes qu'il s'apprête à exécuter. Pensez à toujours valider rapidement ces requêtes, pour être sûrs de ne pas avoir fait d'erreur dans le mapping des entités. Mais maintenant, il est temps de passer aux choses sérieuses, et d'exécuter concrètement cette requête ! Lancez la commande suivante :

``` sh
php bin/console doctrine:schema:update --force
```

Si tout se passe bien, en ouvrant **phpMyAdmin** et en allant dans votre base de données vous devriez pouvoir constater le résultat. Les tables correspondantes aux entités ont été créées et les annotations prises en compte pour tous les champs.

Vous pouvez également modifier une entité depuis sa classe (ou avec la commande make:entity) en y ajoutant ou en retirant des champs. Une fois l'opération réalisée et le fichier enregistré, il vous faudra relancer les commandes précédentes.
 
::: tip
Pour gérer l'état de la base de données, on peut aussi utiliser le bundle **doctrine/doctrine-migrations-bundle** que nous avons supprimé dans le chapitre sur Flex. Je suis habitué à cette méthode et elle me convient, mais si vous voulez l'essayer plus tard, n'hésitez pas !
:::

## Le service Doctrine

Afin de gérer la persistance de nos objets, nous allons devoir utiliser le service Doctrine, cela nous permettra d'effectuer des enregistrements en base de données et également y récupérer des éléments. Ce service est accessible depuis le contrôleur avec la syntaxe suivante :

``` php
$doctrine = $this->getDoctrine();
```

Les deux choses que ce service va nous permettre de gérer sont :
- Les différentes connexions à des bases de données. C'est la partie **DBAL** de Doctrine. En effet, vous pouvez tout à fait utiliser plusieurs connexions à plusieurs bases de données différentes. Cela n'arrive que dans des cas particuliers, mais c'est toujours bon à savoir que Doctrine le gère bien. Le service Doctrine dispose donc, entre autres, de la méthode **$doctrine->getConnection($name)** qui permet de récupérer une connexion à partir de son nom. Cette partie DBAL permet l'abstraction de la base de données, et donc à Doctrine de fonctionner sur plusieurs types de SGBDR, tels que MySQL, PostgreSQL, etc.

- Les différents gestionnaires d'entités, ou **EntityManager**. C'est la partie ORM de Doctrine. Encore une fois, c'est logique, vous pouvez bien sûr utiliser plusieurs gestionnaires d'entités, ne serait-ce qu'un par connexion ! Le service dispose donc, entre autres, de la méthode dont nous nous servirons beaucoup **$doctrine->getManager($name)** qui permet de récupérer un ORM à partir de son nom.

On vient de le voir, le service qui va nous intéresser vraiment n'est pas doctrine, mais **l'EntityManager** de Doctrine. Vous savez déjà le récupérer depuis le contrôleur via :

``` php
$em = $this->getDoctrine()->getManager();
```

Ou de manière plus générale, avec l'injection de dépendance et l'autowiring :

``` php
use Doctrine\ORM\EntityManagerInterface;
...
private $em;

public function __construct(EntityManagerInterface $em)
{
    $this->em = $em;
}
...
```

C'est avec l'EntityManager que l'on va passer le plus clair de notre temps. C'est lui qui permet de dire à Doctrine « Persiste cet objet », c'est lui qui va exécuter les requêtes SQL (que l'on ne verra jamais car nous utilisons une couche d'abstraction), bref, c'est lui qui fera tout.

La seule chose qu'il ne sait pas faire facilement, c'est récupérer les entités depuis la base de données. Pour faciliter l'accès aux objets, on va utiliser des **Repository**. On accède à ces repositories de la manière suivante :

``` php
$em = $this->getDoctrine()->getManager();
$product = $em->getRepository(Product::class);
```

::: tip
Lorsque vous avez généré votre entité avec la commande, elle a aussi généré le repository pour vous dans le dossier **/src/Repository/**. Si votre repository étend la classe **ServiceEntityRepository**, ce qui devrait être le cas, vous pouvez aussi utiliser l'autowiring avec lui&nbsp;!
:::

## Manipuler ses entités

Nous venons de voir comment accéder au service Doctrine, nous allons maintenant à l'aide de ce dernier manipuler nos entités.

### Insertion

L'enregistrement effectif en base de données se fait en deux étapes très simples depuis un contrôleur :

``` php
// Création de l'entité Product
$product = (new Product)
    ->setName('Le nom')
    ->setDescription('Une super description')
    ->setPrice(129.99);

// On récupère l'EntityManager
$em = $this->getDoctrine()->getManager();

// Etape 1 : On "persiste" l'entité
$em->persist($product);

// Etape 2 : On "flush" tout ce qui a été persisté avant
$em->flush();
```

::: tip
Remarquez la syntaxe utilisée pour créer notre produit. Si on entoure la création d'un objet de parenthèses, on peut appeler directement ses méthodes dessus. De plus, on peut enchaîner les setters car il retourne tous une instance de l'objet sur lequel ils sont appelés.
:::

Ces quelques lignes permettent simplement d'enregistrer un nouveau produit en base de données à l'aide d'une requête INSERT classique que vous n'aurez jamais l'occasion de voir au niveau de votre code.

Il arrive régulièrement que l'on veuille enregistrer également la date de création d'une entité. Dans le cas de notre produit nous pouvons le faire, mais nous souhaiterions que cela soit réalisé de manière automatique à l'enregistrement de notre objet. Pour cela, il suffit d'aller modifier notre entité en y ajoutant une propriété date et un constructeur :

``` php
/**
 * @ORM\Column(type="datetime")
 */
private $createdAt;

public function __construct()
{
    $this->createdAt = new \DateTime();
}
...
public function getCreatedAt(): ?\DateTime()
{
    return $this->createdAt;
}

public function setCreatedAt(\Datetime $createdAt): self
{
    $this->createdAt = $createdAt;

    return $this;
}
```

Bien entendu, après avoir effectué de telles modifications il va falloir, via la console, mettre à jour notre base de données.

### Modification

Après avoir vu comment enregistrer une nouvelle entité, voyons comment en récupérer une et la modifier, toujours grâce à notre EntityManager :

``` php
// On récupère l'EntityManager
$em = $this->getDoctrine()->getManager();

// On récupère le produit grâce au repository avec la méthode find()
// qui prend en paramètre l'id de notre entité (SELECT ... WHERE id = 5)
$product = $em->getRepository(Product::class)->find(5);

$product->setName('Produit 5');

// Pas besoin de persister car l'ORM connaît déjà notre entité
$em->flush();
```

Dans ce cas, la méthode flush() n'effectue plus un INSERT dans notre base de données, mais un UPDATE de notre entité déjà existante (l'EntityManager de Doctrine gère ça tout seul). Vous constaterez dans l'exemple précédent l'utilisation de la méthode find() permettant d'aller récupérer un enregistrement par rapport à son identifiant. Il est également possible d'utiliser la méthode findAll() afin de récupérer l'ensemble des enregistrements.

### Suppression

De la même manière vous avez la possibilité d'exécuter une requête DELETE en utilisant la méthode **remove()** :

``` php
$em = $this->getDoctrine()->getManager();

$product = $em->getRepository(Product::class)->find(5);

$em->remove($product);
$em->flush();
```

## Des données de développement

Les **fixtures** sont utilisées pour charger un ensemble de données dans une base de données. Ces données peuvent être utilisées pour les tests ou peuvent être les données initiales nécessaires au bon fonctionnement de l'application.

La mise en place de fixtures nécessite l'utilisation d'un bundle :

``` sh
composer require --dev doctrine/doctrine-fixtures-bundle
```

ou en version courte grâce à Flex:

``` sh
composer req --dev orm-fixtures
```

Flex a également créé notre premier fichier de fixtures **App\DataFixtures\AppFixtures** que nous allons remplir de la façon suivante :

``` php
<?php

namespace App\DataFixtures;

use App\Entity\Store\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    /**
     * @var ObjectManager
     */
    private $manager;

    public function load(ObjectManager $manager)
    {
        $this->manager = $manager;

        $this->loadProducts();
    }

    private function loadProducts()
    {
        for ($i = 0; $i < 20; $i++) {
            $product = (new Product())
                ->setName('product '.$i)
                ->setDescription('Produit de description '.$i)
                ->setPrice(mt_rand(10, 100));

            $this->manager->persist($product);
        }

        $this->manager->flush();
    }
}

```

::: tip
Vous pouvez écrire n'importe quoi pour générer vos fixtures donc si vous voulez être plus créatif, ne vous gênez pas ! Vous pouvez par exemple prendre exemple sur [les fixtures de l'application de demo de Symfony](https://github.com/symfony/demo/blob/master/src/DataFixtures/AppFixtures.php)
:::

Il ne reste plus qu'à charger les fixtures en exécutant la commande suivante :

``` sh
$ php bin/console doctrine:fixtures:load
```

Les données présentent dans les fixtures devraient à présent avoir été intégrées dans votre base de données.

::: warning
Lorsque vous lancez la commande, elle vous demande de vider votre base de données pour pouvoir s'exécuter, et ce à chaque fois.
:::

## A vous de jouer

Rendons l'affichage de nos produits dynamique en créant une base de données et la table correspondante.

1. Configurez le projet Symfony afin de le lier à une base de données en paramétrant le fichier **/.env.local**.
2. Créez l'entité **App\\Entity\\Store\\Product** et générez la table correspondante dans votre base de données comprenant les champs suivants : *id, name (string 255), description (text), price (decimal, 10,2), created_at (datetime)*.
3. Complétez manuellement l'entité **App\\Entity\\Contact**, ajouté également le createdAt et nommé sa table **app_contact**
4. Enregistrez la demande de contact après validation du formulaire et avant d'envoyer cette dernière par email.
5. Mettre en place une classe gérant les **fixtures** et implémentez-y une boucle chargée de peupler votre table de 20 produits.
6. Affichez sur la page de listing des produits les fiches produits issues de la base de données, en pensant à afficher un message dans le cas où le catalogue ne dispose d'aucuns produits enregistrés.
7. Utilisez un filtre Twig permettant de toujours afficher le nom des produits avec une majuscule sur la première lettre.