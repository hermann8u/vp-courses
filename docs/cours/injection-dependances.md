# L'injection de dépendances

## Définition

L'**injection de dépendances** est un concept clé de l'architecture logicielle. Pour l'exemple, imaginons que nous voulons envoyer un email depuis l'un de nos contrôleur. Dans ce but, il serait intéressant d'avoir un objet à notre disposition capable de remplir cette fonction de manière centralisée. De la même manière, cet objet pourrait avoir besoin de paramètres de configuration pour remplir sa fonction. C'est ici que l'injection de dépendance rentre en jeu.

Avec du code, on peut résumer ce concept de la manière suivante :

``` php
<?php
// namespace ...
// use ...

class ProductController
{
    /** @var Mailer */
    private $mailer;

    public function __construct(Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendEmail(Request $request): Response
    {
        $email = new Email();
        // ... Création de l'email en fonction de la requête

        // On utilise notre dépendance
        $this->mailer->send(email);

        // ...
    }
}

class Mailer
{
    /** @var string */
    private $dsn;

    public function __construct(string $dsn)
    {
        $this->dsn = $dsn;
    }

    public function send(Email $email): void
    {
        // ...
    }
}

```

::: tip
Comme vous pouvez le voir, c'est au niveau du constructeur de nos classes que nous définissons et injectons les dépendances de chacune d'entre elles.
:::

Nous avons donc ici deux classes, dont l'une dépend de l'autre, et l'autre dépend également d'un paramètre de configuration. On peut symboliser ce schéma de dépendances par un graphe :

```
.
├─ ProductController
│  ├─ Mailer
│  │  ├─ dsn
```

> Et si mon contrôleur a plusieurs dépendances ?

On se rend vite compte que créer nos objets à la main va être un véritable problème. Comment le résoudre ? En centralisant la création dans un autre objet.

## Le conteneur d'injection de dépendances

Comme dit précédemment, le **conteneur d'injection de dépendances** (ou *DI container* en anglais) aura pour rôle de créer nos *objets dépendants* (ou desquels l'on dépend). Ce type d'objet aura pour nom **service**.

Le container peut être comparé a un tableau clé/valeur, dont :
- La clé est le [FQCN](/ressources/glossaire.md#fqcn) ou un nom arbitraire
- La valeur est une référence au service demandé, soit créée à la demande, soit restituée depuis la précédente création.

::: tip
Dans 99,9% du temps, les services ne sont **instancier qu'une seule fois**. C'est pourquoi on évite d'avoir un "state" qui évolue lorsqu'on les développe. Gardez ça en tête.
:::

Pour remplir son rôle, le container aura besoin de comprendre votre **graphe de dépendance**. Dans ce but, il y a deux méthodes *classiques* qui s'opposent :

### Les factories
On instancie un objet container et on lui ajoute des clés correspondant à des fonctions anonymes permettant de créer le service. Cette fonction prend en paramètre le container pour pouvoir obtenir les autres dépendances du service que l'on est en train de créer.

::: warning
Il est interdit d'injecter le container directement pour éviter de "leaker" toutes les dépendances de l'application.
:::

Exemple: [Pimple](https://github.com/silexphp/Pimple)

### La configuration
Le container est instancié en se basant sur des fichiers de configuration. C'est le cas du composant [dependency-injection](https://symfony.com/doc/current/components/dependency_injection.html) de Symfony.
On définira chacun de nos services en faisant référence à ses dépendances. Cette méthode est plus complète est général.

Heureusement, il y a une troisième méthode !

## L'Autowiring

L'**autowiring** est juste *magique* (dans le bon sens du terme) ! Il nous permet de combiner la flexibilité des méthodes précédentes avec le confort de n'avoir presque rien à déclarer manuellement.

Le concept est le suivant : se baser sur le type des arguments du constructeur pour extraire tout le graphe de dépendance de l'application. Bien sûr, il y a quelques points faibles :
- Toujours un peu de configuration nécessaire de temps en temps

Et pour les puristes :
- Nécessite une mise en cache préalable pour les performances, donc impossible de déclarer des services dynamiquement (en tout cas dans Symfony)
- Peut être moins explicite qu'une configuration manuelle

Nous verrons dans le prochain chapitre comment l'utiliser.

## Pour aller plus loin

- [Pimple](https://github.com/silexphp/Pimple)
- [PSR-11: Container interface](https://www.php-fig.org/psr/psr-11/)