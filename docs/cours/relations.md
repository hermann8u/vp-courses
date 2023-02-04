# Relations entre entités

Le chapitre précédent nous a permis d'introduire l'ensemble des notions de base liées au modèle de données au sein du framework. Nous savons donc à présent créer une entité, l'injecter sous forme de table dans notre base de données, et également interagir avec elle grâce au service Doctrine. Ce nouveau chapitre va vous faire découvrir la notion de relations entre les entités.

## Quelques notions importantes

### Notion de propriétaire et d'inverse

La notion de propriétaire et d'inverse est abstraite mais importante à comprendre. Dans une relation entre deux entités, il y a toujours une entité dite **propriétaire**, et une dite **inverse**. Pour comprendre cette notion, il faut revenir à la vieille époque, lorsque l'on faisait nos bases de données à la main. En générale, **l'entité propriétaire est celle qui contient la référence à l'autre entité**. Ce sera également l'entité qui **recevra le mapping** (attributes), c'est pourquoi il est important de l'identifier.

::: warning
Cette notion, à avoir en tête lors de la création des entités, n'est pas liée à votre logique métier mais est purement technique.
:::

Prenons pour exemple les produits de nos marques : En SQL pur, vous disposeriez de la table **sto_brand** (pour les marques) et de la table **sto_product** (pour les produits). Pour créer une relation entre ces deux tables, vous allez mettre naturellement une colonne brand_id dans la table product. La table **sto_product** est donc propriétaire de la relation, car c'est elle qui contient la colonne de liaison brand_id.

### Notion d'unidirectionnalité et de bidirectionnalité

Une relation peut être à sens unique ou à double sens. Une relation unidirectionnelle signifie que vous pourrez faire **$entiteProprietaire->getEntiteInverse()** (dans notre exemple $product->getBrand()), mais vous ne pourrez pas faire **$entiteInverse->getEntiteProprietaire()** (pour nous, $brand->getProducts()). Cela ne nous empêchera pas de récupérer les produits d'une marque, on utilisera juste une autre méthode, via le repository.

::: warning
Si une relation est toujours au moins unidirectonnelle, on préfère éviter de la rendre bidirectionnelle si ce n'est pas nécessaire, du point de vue de la logique métier.
:::

## Les types de relations

Il y a plusieurs façons de lier des entités entre elles. En effet, il n'est pas pareil de lier une multitude de produits à une seule marque et de lier un membre à un seul avis. Il existe donc plusieurs types de relations, pour répondre à plusieurs besoins concrets. Ce sont les relations **OneToOne**, **ManyToOne** et **ManyToMany**.

### Relation OneToOne

La relation **OneToOne**, ou 1..1, est assez classique. Elle correspond, comme son nom l'indique, à une relation unique entre deux objets. Pour illustrer cette relation dans le cadre de notre projet, nous allons créer une entité **Image**. Imaginons qu'on offre la possibilité de lier une image à un produit. Si à chaque produit on ne peut afficher **qu'une seule image**, et que chaque image ne peut être liée **qu'à un seul produit**, alors on est bien dans le cadre d'une relation **OneToOne**. La figure suivante schématise cela :

![Relation OneToOne](/img/one-to-one.png)

#### Définition

Afin d'établir notre relation nous devons utiliser les *attributes* au niveau de nos entités. La relation **OneToOne** entre les entités **Product** et **Image** correspondrait à la syntaxe suivant. Aucun ajout n'est nécessaire au niveau de l'entité Image, car nous allons faire une **relation unidirectionnelle** :

``` php {4}
// src/Entity/Store/Product.php

#[ORM\OneToOne(targetEntity: Image::class, cascade: ['persist'])]
private ?Image $image = null;

public function getImage(): ?Image
{
    return $this->image;
}

public function setImage(Image $image): self
{
    $this->image = $image

    return $this;
}

```

Cette relation est simple et tout à fait fonctionnelle, néanmoins par défaut cette relation est facultative. C'est à dire que vous pouvez avoir un Produit sans Image. Afin de rendre la relation obligatoire il suffit de rajouter un *attribut* **JoinColumn** :

``` php {5}
// src/Entity/Store/Product.php

#[ORM\OneToOne(targetEntity: Image::class, cascade: ['persist', 'remove'])]
#[ORM\JoinColumn(nullable: false, name: 'sto_image_id')]
private Image $image;
```

::: tip
Vous pouvez remarquer que j'ai ajouté le nom de la colonne de jointure pour qu'il corresponde au nom de notre table, suivit de "_id". Par défaut, Doctrine l'aurait nommé "image_id".
:::

#### Utilisation

Grâce à cette relation il est maintenant possible depuis notre objet Product d'accéder à notre image et à l'ensemble de ses propriétés, nous pouvons par exemple faire :

``` php
$image = $product->getImage();
$url = $image->getUrl();

// Ou en une ligne
$url = $product->getImage()->getUrl();
```

### Relation ManyToOne

La relation **ManyToOne**, ou n..1, est assez classique également. Elle correspond, comme son nom l'indique, à une relation qui permet à une entité A d'avoir une relation avec plusieurs entités B.

Pour illustrer cette relation dans le cadre de notre projet, nous allons créer une entité **Brand** qui représente les marques associées aux produits. L'idée est de pouvoir ajouter plusieurs produits à une marque, et que chaque produit ne soit liée qu'à une seule marque. Nous avons ainsi plusieurs produits (Many) à lier à (To) une seule marque (One). La figure suivante schématise cela :

![Relation ManyToOne](/img/many-to-one.png)

#### Définition

Comme précédemment nous allons intervenir au niveau des *attributes* de nos entités pour établir une relation **ManyToOne** (de nouveau, aucun ajout n'est nécessaire au niveau de l'entité Brand) :

``` php {4}
// src/Entity/Store/Product.php

#[ORM\ManyToOne(targetEntity: Brand::class)]
#[JoinColumn(nullable: false, name: 'sto_brand_id')]
private Brand $brand;

// Getters and Setters

```

#### Utilisation

De la même manière que pour la relation **OneToOne**, il vous faut définir le **getter** et le **setter** en pensant à bien forcer le type à l'aide de l'entité à laquelle nous faisons référence. Puis nous pourrions ensuite les utiliser de la façon suivante :

``` php
$brand = (new Brand())->setName('Adidas');

$product = $this->productRepository->find(1);

$product->setBrand($brand);

$this->em->persist($brand);
$this->em->flush();
```

#### Définition bidirectionnelle

En ayant mis en place la relation **ManyToOne** ainsi, nous avons établi une règle d'unidirectionnalité. L'inconvénient est que nous pouvons bien accéder à notre marque depuis notre objet produit, **mais pas l'inverse**. C'est à dire qu'il ne nous est pas possible via une méthode depuis la marque de récupérer les listes de produits correspondants. Pour l'instant, vous pouvez le faire uniquement en utilisant les repositories.

Voici les modifications à apporter pour mettre en place une notion de bidirectionnalité entre nos deux entités :

``` php {4}
// src/Entity/Store/Product.php

#[ORM\ManyToOne(targetEntity: Brand::class, inversedBy: 'products')]
#[ORM\JoinColumn(nullable: false, name: 'sto_brand_id')]
private Brand $brand;

```

``` php {4}
// src/Entity/Store/Brand.php

#[ORM\OneToMany(targetEntity: Product::class, mappedBy: 'brand')]
private Collection $products;

```

Les **getters et setters** pour la propriété **$products** sont un peu particulier puisqu'il s'agit d'une array, et plus précisément une **ArrayCollection**. C'est un objet utilisé par Doctrine pour gérer les relations entre entités lorsque le contenu est une array. Ce qui va nous donner les méthodes suivantes :

``` php
// src/Entity/Store/Brand.php

use Doctrine\Common\Collections\ArrayCollection;

// ...
public function __construct()
{
    $this->products = new ArrayCollection();
}

/**
 * @return Collection<int, Product>
 */
public function getProducts(): Collection
{
    return $this->products;
}

public function addProduct(Product $product): self
{
    if (!$this->products->contains($product)) {
        $this->products[] = $product;
        $product->setBrand($this);
    }

    return $this;
}

public function removeProduct(Product $product): self
{
    if ($this->products->contains($product)) {
        $this->products->removeElement($product);
        // set the owning side to null (unless already changed)
        if ($product->getBrand() === $this) {
            $product->setBrand(null);
        }
    }

    return $this;
}
```

On peut maintenant ajouter un produit à une marque en utilisant la méthode suivante :

``` php
$brand->addProduct($product);
```

### Relation ManyToMany

La relation **ManyToMany**, ou n..n, correspond à une relation qui permet à plein d'objets d'être en relation avec plein d'autres !

Prenons l'exemple cette fois-ci de nos produits, ayant des couleurs différentes. Un produit peut avoir plusieurs couleurs. À l'inverse, une couleur peut $etre utilisé sur plusieurs produits. On a donc une relation **ManyToMany** entre Product et Color. La figure suivante schématise tout cela.

![Relation ManyToMany](/img/many-to-many.png)

#### Définition

Comme pour toutes relations, il suffit d'intervenir sur les *attributes* de nos entités :

``` php
// src/Entity/Store/Product.php

use Doctrine\Common\Collections\ArrayCollection;

// ...

#[ORM\ManyToMany(targetEntity: Color::class)]
#[@ORM\JoinTable(name: 'sto_product_color')]
private Collection $colors;

public function __construct()
{
    // ...
    $this->colors = new ArrayCollection();
}

/**
 * @return Collection<int, Color>
 */
public function getColors(): Collection
{
    return $this->colors;
}

public function addColor(Color $color): self
{
    if (!$this->colors->contains($color)) {
        $this->colors[] = $color;
    }

    return $this;
}

public function removeColor(Color $color): self
{
    if ($this->colors->contains($color)) {
        $this->colors->removeElement($color);
    }

    return $this;
}
```

Les relations **ManyToMany** passe par une **table intermédiaire**. Sa clé primaire est une **clé composée** avec une référence sur l'id des deux entités qu'elle lie. Ca signifie aussi qu'il n'est pas possible d'avoir une entrée avec les deux même id (un produit ne peut avoir qu'une seule fois la couleur jaune).

Vous pouvez remarquez à la **ligne 5** que j'ai utilisé l'attribut **ORM\JoinTable** pour redéfinir le nom de cette table de liaison afin qu'elle respecte le préfixe "sto_".

::: tip
Si vous voulez ajouter d'autres champs à cette table intermédiaire, vous ne pouvez pas utiliser la relation **ManyToMany**. Il faudra créer une entité **ProductColor** avec une relation **ManyToOne** sur Product et Color (et rendre ces relations bidirectionnelles).
:::

#### Utilisation

Voyons à présent un exemple concret de l'utilisation de ces deux entités.

Le code suivant représente une action d'association des couleurs récupérées en base de données à un produit :

``` php
$product = $this->productRepository->find($id);

if (!$product) {
    throw new NotFoundHttpException('Le produit d\'id '.$id.'n\'existe pas.');
}

// On récupère toutes les couleurs de la base de données
$colors = $this->colorRepository->findAll();

// Ici, on ajoute toutes les couleurs au produit.
foreach ($colors in $color) {
    $product->addColor($color);
}

$this->em->flush();
```

Nous pouvons également afficher les couleurs de notre produit dans un template Twig :

``` twig
{% if product.colors|length %}
    <p>
        Le produit est composé des couleurs suivantes :
        {% for color in product.colors %}
            {{ color.name ~ (not loop.last ? ', ') }}
        {% endfor %}
    </p>
{% endif %}
```

## A vous de jouer

Maintenant que nous avons vu comment mettre en place des relations entre nos entités, nous allons pouvoir compléter notre projet.

::: tip
N'oubliez pas de vous servir de la la commande **make:entity** pour générer vos entités, mais aussi pour les compléter ! En effet, si vous utilisez le type **relation**, la commande va vous aider à générer tout ce qu'il faut de la bonne manière.
:::

::: warning
N'oubliez pas de faire attention aux noms des tables et des colonnes de jointures (préfixe **sto_**).
:::

1. Créer une nouvelle entité **Image** composée des propriétés suivantes : id, url (string 255), alt (string 255). Puis établissez une **relation OneToOne** avec l'entité Product.
2. Compléter vos **fixtures** et afficher les images des produits dans votre template représentant la liste des produits (utiliser les images produits présentes dans votre répertoire img).
3. Maintenant que votre liste de produit est dynamique et que vous pouvez afficher l'image de ces derniers, ajouter une **description longue** et un **slug** à votre entité **Product** (et à vos fixtures).
4. Rendre dynamique l'affichage des fiches détaillées de vos produits en vérifiant bien que l'identifiant du produit que vous cherchez à afficher existe. Si ce n'est pas le cas, redirigez le visiteur vers une **page 404** (les espaces dédiés aux commentaires et celui des marques resteront statiques).
5. Créer une nouvelle entité **Brand** composée des propriétés suivantes : id, name (string 255). Puis établir une relation **ManyToOne** de type **bidirectionnelle** avec l'entité Product et compléter vos fixtures.
6. Afficher la liste des marques de produits de manière dynamique dans vos templates.
7. Créer une entité **Color** composée des propriétés suivantes : id, name (string 255). Puis établir une relation **ManyToMany** de type **unidirectionnelle** avec l'entité Product et compléter vos fixtures.