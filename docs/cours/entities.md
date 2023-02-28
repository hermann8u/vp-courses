# Les entités Doctrine

L'objectif d'un **Object-Relation Mapper** (ORM) est le suivant : se charger de l'enregistrement de vos données en vous faisant oublier que vous avez une base de données. Comment ? En s'occupant de tout&nbsp;! Nous n'allons plus écrire de requêtes, ni créer de tables via phpMyAdmin. Dans notre code PHP, nous allons utiliser **Doctrine**, l'ORM par défaut de Symfony.

## Créer une entité

Une entité, ce que l'ORM va manipuler et enregistrer dans la base de données, n'est rien d'autre qu'un **Plain Old PHP Object** représenté par une classe à créer au sein du répertoire **Entity** de notre projet. Cette entité correspondra à une table de notre base de données.

Voici ce à quoi pourrait ressembler l'entité **Product** de notre site :

``` php
namespace App\Entity\Store;

class Product
{
    private ?int $id = null;

    private string $name;

    private string $description;

    private float $price;

    // Getters and Setters ...
}
```

Comme vous pouvez le voir, il n'y a pas grand chose. Un objet, des propriétés, et bien sûr, les getters / setters correspondants.

On pourrait en réalité utiliser notre objet dès maintenant, mais l'ORM ne pourrait pour le moment pas enregistrer notre objet en base de données.

Nous avions déjà créer une entité dans le chapitre sur les formulaires, **App\\Entity\\Contact**, mais elles pour l'instant encore toutes les deux incomplètes. En effet, afin que Doctrine puisse savoir quoi faire de nos entités, il va falloir lui indiquer à l'aide d'**attributes**.

Pour générer nos entités, nous n'allons pas le faire manuellement, mais nous servir de la commande mis à disposition par le **maker-bundle** :

``` bash
php bin/console make:entity Store\\Product
```

::: warning
Vous avez remarqué le double anti-slash. Il est probable qu'avec Windows vous ayez une erreur. Si c'est le cas, essayez alors avec un seul anti-slash.
:::

Lorsqu'on l'exécute, elle nous guide pour générer les différentes propriétés en nous demandant, dans l'ordre et pour chacune :
- **Son nom** : A donner en **camelCase**, bien sûr, et **sans le $**. Dans la base, il est par défaut convertit en *snake_case*
- **Son type Doctrine** : Vous pouvez rentrer "?" pour lister tous les types disponibles
- **Différentes configurations** : Dépend du type choisi
- **Si elle est nullable** : De type booléen pour la configuration de la base de données. Par défaut à *false*

Les **Getters** et **Setters** seront également générés pour nous. L'avantage est que, là encore, le code généré suit des conventions, notamment de typage pour nos Getters et Setters.

::: tip
Pour modifier une entité qui existe déjà, vous pouvez utiliser la même commande, ce qui permettra d'ajouter de nouvelles propriétés.
:::

Voici ce que ça donne pour notre nouvelle entité **App\\Entity\\Store\\Product** :

``` php {9}
<?php

declare(strict_types=1);

namespace App\Entity\Store;

use App\Repository\Store\ProductRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\Table(name: 'sto_product')]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column(type: Types::TEXT)]
    private string $description;

    #[ORM\Column]
    private float $price;

    #[ORM\Column]
    private \DateTimeImmutable $createdAt;

    public function __construct(string $name, string $description, float $price)
    {
        $this->name = $name;
        $this->description = $description;
        $this->price = $price;
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters and Setters ...
}
```

::: tip
J'ai surligné la **ligne 9** qui n'a pas été ajoutée par la commande. Elle permet de définir le nom que nous voulons pour notre table en base de données, ce qui m'a permit d'ajouter le prefix "sto_" pour celle-ci.
:::

Grâce à ces **attributes**, que l'on appelle **metadata**, Doctrine dispose de toutes les informations nécessaires pour utiliser notre objet : 
- Créer la table correspondante
- L'enregistrer
- Définir un identifiant (id) en auto-incrément
- Nommer les colonnes
- etc.

## Gérer l'état de la base de données

Avant de pouvoir utiliser notre entité comme il se doit, on doit d'abord créer la table correspondante dans la base de données. Pour ce faire, il faut commencer par configurer nos accès à la base de données dans le fichier **/.env.local**, en y modifiant la variable **DATABASE_URL**.

Et ensuite, encore des **commandes** ! Cette fois-ci, on ne va pas utiliser une commande du maker-bundle, mais une des commandes de Doctrine, car on ne veut pas générer du code mais une **table dans la base de données**.

D'abord, si vous ne l'avez pas déjà fait, il faut créer la base de données. Pour cela, il suffit d'exécuter la commande (vous n'avez à le faire qu'une seule fois évidemment) :

``` bash
php bin/console doctrine:database:create
```

### Les migrations

Afin de modifier la structures de notre base de données, nous allons utiliser un autre bundle : **DoctrineMigrationsBundle**.

Premièrement, nous allons **comparer l'état actuel de notre base de données** avec les informations que nous avons fournit à Doctrine à travers **les métadata des entités** :

``` bash
php bin/console doctrine:migrations:diff
```

Pour l'instant, rien n'a modifié notre base de données. Cette commande à générer un fichier pour nous dans le dossier **migrations** (depuis la racine du projet). Dans celle-ci se trouvent deux méthodes intéressantes :
- **up** qui contient tout le SQL à éxécuter pour que notre base de données soit à jour.
- **down** qui contient le SQL pour revenir à l'état précédant.

::: tip
Pensez à toujours vérifier ces requêtes, pour être sûrs de ne pas avoir fait d'erreur dans le mapping des entités. 
:::

Mais maintenant, il est temps de passer aux choses sérieuses, et d'**exécuter concrètement** ce SQL avec la commande suivante :

``` bash
php bin/console doctrine:migrations:migrate
```

Si tout se passe bien, en ouvrant **phpMyAdmin** et en allant dans votre base de données vous devriez pouvoir constater le résultat. Les tables correspondantes aux entités ont été créées et les annotations prises en compte pour tous les champs.

Vous pouvez également **modifier** une entité depuis sa classe (ou avec la commande make:entity) en y ajoutant ou en retirant des champs. Une fois l'opération réalisée et le fichier enregistré, il vous faudra **relancer les commandes précédentes**.

## Interagir avec Doctrine

Doctrine est un projet très complet qui est constitué de plusieurs packages, dont principalement :
- **Le DBAL** (Doctrine Abstraction layer) : C'est la couche **bas niveau** de Doctrine. Elle consiste principalement en une **abstraction de PDO** et permet donc de fournir une interface commune, **peu importe le SGDB utilisé** (MySQL, PostgreSQL, ...).
- **L'ORM** : C'est la couche **haut niveau**, qui nous permet de manipuler nos entités, rendant transparentes la plupart des interactions que l'on pourrait avoir avec la base de données. On utilisera dans ce but principalement l'**EntityManager**.


Voici comment injecter cet **EntityManager**, encore une fois, en typant sur son interface :

``` php
use Doctrine\ORM\EntityManagerInterface;
// ...
public function __construct(
    private EntityManagerInterface $em,
) {
}
// ...
```

C'est avec l'**EntityManager** que l'on va passer le plus clair de notre temps. C'est lui qui permet de dire à Doctrine « Persiste cet objet », c'est lui qui va exécuter les requêtes SQL (que l'on ne verra jamais car nous utilisons une couche d'abstraction), bref, c'est lui qui fera tout.

La seule chose qu'il ne sait pas faire facilement, c'est récupérer les entités depuis la base de données. Pour faciliter l'accès aux objets, on va utiliser des **Repository**.

::: tip
Lorsque vous avez généré votre entité avec la commande, elle a aussi généré le repository pour vous dans le dossier **/src/Repository/**.
:::

### Insertion

L'enregistrement effectif en base de données se fait en deux étapes depuis un service, dans lequel on a injecté au préalable l'**EntityManager** :

``` php
// Création de l'entité Product
$product = (new Product())
    ->setName('Le nom')
    ->setDescription('Une super description')
    ->setPrice(129.99);

// Etape 1 : On "persiste" l'entité
$this->em->persist($product);

// Etape 2 : On "flush" tout ce qui a été persisté avant
$this->em->flush();
```

::: tip
Remarquez la syntaxe utilisée pour créer l'instance de notre entité Product. Si on entoure la création d'un objet de parenthèses, on peut appeler directement ses méthodes dessus. De plus, on peut enchaîner les setters car il retourne tous une instance de l'objet sur lequel ils sont appelés.
:::

Ces quelques lignes permettent simplement d'**enregistrer** un nouveau produit en base de données à l'aide d'une **requête INSERT** classique que vous n'aurez jamais l'occasion de voir au niveau de votre code.

#### Transaction SQL

La création se fait en deux étapes:
- La méthode **persist** indique à Doctrine que **l'entité existe** et qu'il peut **traquer ses modifications**.
- La méthode **flush** exécute toutes les insertions et modifications avec des requêtes SQL.

Doctrine va en fait gérer des **transactions SQL**. C'est à dire que lors de l'ajout de 10 produits, si l'une des insertions provoque une **erreur SQL**, **aucun** des produits ne sera enregistré. La méthode **flush** exécute en fait la transaction.

#### Ajout de la date de création

Il arrive régulièrement que l'on veuille enregistrer également la **date de création** d'une entité. Dans le cas de notre produit nous pouvons le faire, mais nous souhaiterions que cela soit réalisé de manière automatique à l'enregistrement de notre entité. Pour cela, il suffit d'aller modifier notre entité en y ajoutant **une propriété date** et **un constructeur** qui l'initialisera :

``` php
#[ORM\Column(type='datetime')]
private \DateTime $createdAt;

public function __construct()
{
    $this->createdAt = new \DateTime();
}
// ...
public function getCreatedAt(): \DateTime
{
    return $this->createdAt;
}
```

Bien entendu, après avoir effectué de telles modifications il va falloir, via la console, **mettre à jour notre base de données**.

### Modification

Après avoir vu comment enregistrer une nouvelle entité, voyons comment en **récupérer** une et la **modifier**, toujours grâce à notre **EntityManager** :

``` php

// On récupère le produit grâce au repository avec la méthode find()
// qui prend en paramètre l'id de notre entité (SELECT ... WHERE id = 5)
$product = $this->productRepository->find(5);

$product->setName('Produit 5');

// Pas besoin de persister car l'ORM connaît déjà notre entité, c'est lui qui vient de nous la fournir.
$this->em->flush();
```

Dans ce cas, la méthode **flush()** n'effectue plus un INSERT dans notre base de données, mais un **UPDATE** de notre entité déjà existante (l'EntityManager de Doctrine gère ça tout seul). Vous constaterez dans l'exemple précédent l'utilisation de la méthode **find()** permettant d'aller récupérer un enregistrement par rapport à son identifiant. Il est également possible d'utiliser la méthode **findAll()** afin de récupérer l'ensemble des enregistrements.

### Suppression

De la même manière vous avez la possibilité d'exécuter une requête DELETE en utilisant la méthode **remove()** de l'**EntityManager** :

``` php
$product = $this->productRepository->find(5);

$this->em->remove($product);
$this->em->flush();
```

## Des données de développement

Les **fixtures** sont utilisées pour charger un ensemble de données dans une base de données. Ces données peuvent être utilisées pour les tests ou peuvent être les données initiales nécessaires au bon fonctionnement de l'application.

La mise en place de fixtures nécessite l'utilisation d'un bundle :

``` bash
composer require --dev doctrine/doctrine-fixtures-bundle
```

ou en version courte grâce à Flex:

``` bash
composer req --dev orm-fixtures
```

Flex a également créé un fichier de fixtures **App\DataFixtures\AppFixtures** que nous allons remplir de la façon suivante :

``` php
<?php

namespace App\DataFixtures;

use App\Entity\Store\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

final class AppFixtures extends Fixture
{
    /** @var ObjectManager */
    private $manager;

    public function load(ObjectManager $manager): void
    {
        $this->manager = $manager;

        $this->loadProducts();

        $this->manager->flush();
    }

    private function loadProducts(): void
    {
        for ($i = 1; $i < 15; $i++) {
            $product = new Product(
                'product '.$i,
                'Produit de description '.$i,
                mt_rand(10, 100),
            );

            $this->manager->persist($product);
        }
    }
}

```

::: tip
Vous pouvez écrire n'importe quoi pour générer vos fixtures donc si vous voulez être plus créatif, ne vous gênez pas ! Vous pouvez par exemple prendre exemple sur [les fixtures de l'application de demo de Symfony](https://github.com/symfony/demo/blob/master/src/DataFixtures/AppFixtures.php)
:::

Il ne reste plus qu'à charger les fixtures en exécutant la commande suivante :

``` bash
$ php bin/console doctrine:fixtures:load
```

Les données présentent dans les fixtures devraient à présent avoir été intégrées dans votre base de données.

::: warning
Lorsque vous lancez la commande, elle vous demande de vider les données de votre base de données pour pouvoir s'exécuter, et ce à chaque fois.
:::

## A vous de jouer

Rendons l'affichage de nos produits dynamique en créant une base de données et la table correspondante.

1. Configurez le projet Symfony afin de le lier à une base de données en paramétrant le fichier **/.env.local**.
2. Créez l'entité **App\\Entity\\Store\\Product** et générez la table correspondante dans votre base de données comprenant les champs suivants : *id, name (string 255), description (text), price (float), created_at (datetime_immutable)*.
3. Complétez manuellement l'entité **App\\Entity\\Contact**. Ajoutez également le **createdAt** et nommez sa table **app_contact**
4. Enregistrez la demande de contact après validation du formulaire et avant d'envoyer cette dernière par email.
5. Mettre en place une classe gérant les **fixtures** et implémentez-y une boucle chargée de peupler votre table de **14 produits**.
6. Affichez sur la page de **listing des produits** les fiches produits issues de la base de données, en pensant à afficher un message dans le cas où le catalogue ne dispose d'aucuns produits enregistrés.
7. Utilisez un **filtre Twig** permettant de toujours afficher le nom des produits avec une **majuscule sur la première lettre**.

## Pour aller plus loin

- [Documentation de Symfony sur le DoctrineMigrationsBundle](https://symfony.com/doc/current/bundles/DoctrineMigrationsBundle/index.html)