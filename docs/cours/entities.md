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

    private $title;

    private $description;

    private $price

    // Getters and Setters ...
}
```

Comme vous pouvez le voir, c'est très simple. Un objet, des propriétés, et bien sûr, les getters / setters correspondants. On pourrait en réalité utiliser notre objet dès maintenant ! Mais l’ORM ne pourrait pour le moment pas enregistrer notre objet en base de données. 

Nous avions déjà créer une entité dans le chapitre sur les formulaires, **App\\Entity\\Contact**, mais elles pour l'instant encore toutes les deux incomplètes. En effet, afin que Doctrine puisse savoir quoi faire de nos entités, il va falloir lui indiquer à l’aide d'annotations.

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
    private $title;

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

Grâce à ces annotations, Doctrine dispose de toutes les informations nécessaires pour utiliser notre objet, créer la table correspondante, l'enregistrer, définir un identifiant (id) en auto-incrément, nommer les colonnes, etc. Ces informations se nomment les **metadata** de notre entité. Nous n’allons pas nous attarder sur le détail de ces annotations, elles sont suffisamment claires pour être comprises par tous. Ce qu'on vient de faire, à savoir rajouter les metadata à notre objet Product, s'appelle mapper l'objet Product, c'est-à-dire faire le lien entre notre table de la base de données et la représentation physique qu'utilise l'application.

## Gérer l'état de la base de données

Avant de pouvoir utiliser notre entité comme il se doit, on doit d'abord créer la table correspondante dans la base de données. Pour ce faire, il faut commencer par configurer nos accès à la base de données dans le fichier **/.env.local**, en y modifiant la variable **DATABASE_URL**.

Et ensuite, encore des commandes ! Cette fois-ci, on ne va pas utiliser une commande du maker-bundle, mais une des commandes de Doctrine, car on ne veut pas générer du code mais une table dans la base de données.

D'abord, si vous ne l'avez pas déjà fait, il faut créer la base de données. Pour cela, il suffit d’exécuter la commande (vous n'avez à le faire qu'une seule fois évidemment) :

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

Vous pouvez également modifier une entité depuis sa classe (ou avec la commande make:entity) en y ajoutant ou en retirant des champs. Une fois l’opération réalisée et le fichier enregistré, il vous faudra relancer les commandes précédentes.
 
::: tip
Pour gérer l'état de la base de données, on peut aussi utiliser le bundle **doctrine/doctrine-migrations-bundle** que nous avons supprimé dans le chapitre sur Flex. Je suis habitué à cette méthode et elle me convient, mais si vous voulez l'essayer plus tard, n'hésitez pas !
:::

## Le service Doctrine

## Manipuler ses entités

## Des données de développement

## A vous de jouer

Rendons l’affichage de nos produits dynamique en créant une base de données et la table correspondante.

1. Configurer le projet Symfony afin de le lier à une base de données en paramétrant le fichier **/.env.local**.
2. Créer l’entité **App\\Entity\\Store\\Product** et générer la table correspondante dans votre base de données comprenant les champs suivants : id, title (string 255), description (text), price (decimal, 10,2)
3. Complétez manuellement l'entité **App\\Entity\\Contact** et nommé sa table **app_contact**
3. Améliorer l’entité “Contact” afin qu’elle dispose d’une date et heure de création et que celle-ci soit compatible avec l’ORM Doctrine et qu’elle puisse intégrer elle aussi votre base de données.
4. Enregistrer la demande de contact après validation du formulaire et avant d’envoyer cette dernière par email.
5. Mettre en place une classe gérant les fixtures et implémentez-y une boucle chargée de peupler votre table de 15 produits.
6. Afficher sur la page de listing des produits les fiches produits issues de la base de données, en pensant à afficher un message dans le cas où le catalogue ne dispose d’aucuns produits enregistrés.
7. Utiliser un filtre Twig permettant de toujours afficher le nom des produits avec une majuscule sur la première lettre.