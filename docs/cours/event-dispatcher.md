# L'event dispatcher

Lorsque nous enregistrons une demande de contact, nous nous attendons à ce qu'un email soit envoyé pour informé l'administrateur de l'application. Que ce passera t'il si nous décidons de changer ce comportement à l'avenir ? Ou alors, si nous voulons le compléter avec l'ajout d'une notification ? Nous serions obliger de modifier notre code existant en prenant le risque d'introduire des bugs dans cette classe. Est-ce vraiment la responsabilité du controleur de gérer l'envoie d'email ?

Dans ce chapitre, nous allons découvrir une alternative afin de résoudre ce problème, ce qui nous permettra de mieux segmenter notre code et de le préparer à d'éventuelles évolutions, grâce à l'**Event dispatcher**

## Le principe

L'[Event dispatcher](https://symfony.com/doc/current/components/event_dispatcher.html) est un composant de Symfony qui implémente deux design patterns : [Observer](https://refactoring.guru/design-patterns/observer) et [Mediator](https://refactoring.guru/design-patterns/mediator).

Il nous permet d'envoyer un **évènement** qui aura la possibilité d'être écouté par aucun, un, ou plusieurs **listeners**. Ainsi, le service qui envoi l'événement ne connaît pas et n'est pas responsable de la façon dont il sera utilisé.

::: tip
Je vous présente ici l'event dispatcher de Symfony, mais sachez qu'il existe des concepts assez similaires dans de nombreux frameworks et écosystème, peu importe le langage de programmation.
:::

Lors de l'exécution d'une requête, le framework émet ses propres événements afin que nous puissions interagir avec lui et étendre son fonctionnement. Vous trouverez une liste complète ici : [Built-in Symfony Events](https://symfony.com/doc/current/reference/events.html). Une commande est également mise à disposition afin de lister tous les listeners actifs de notre application en fonction de l'événement qu'ils écoutent :

``` sh
php bin/console debug:event-dispatcher
```

En l'exécutant, vous pouvez vous rendre compte que c'est ainsi que le routing est appelé par exemple.

## Envoyer des événements

Voyons maintenant comment envoyer nos événements :

``` php
<?php

namespace App\Manager;

use App\Entity\Contact;
use App\Event\ContactCreated;
use Psr\EventDispatcher\EventDispatcherInterface;

final class ContactManager
{
    private EventDispatcherInterface $eventDispatcher;

    public function __construct(EventDispatcherInterface $eventDispatcher)
    {
        // ...
        $this->eventDispatcher = $eventDispatcher;
    }

    public function add(Contact $contact): void
    {
        // ...
        $this->eventDispatcher->dispatch(new ContactCreated($contact));
    }
}
```

Ce code nous montre principalement :
- L'injection de l'**event dispatcher**. On préfère ici l'interface générique fournit par la PSR-14 qui est étendue par le composant de Symfony.
- La façon dont on **dispatch** l'événement. Celui-ci est représenté par un objet de la classe *ContactCreated*.

Comme vous pouvez le voir, on préfère créé une classe pour représenter chaque événement. Généralement, elle contiendra très peu de logique et servira principalement à transmettre des données. De plus, le **FQCN** nous permettra d'identifier le type d'événement envoyer.

``` php
<?php

namespace App\Event;

use App\Entity\Contact;

final class ContactCreated
{
    private Contact $contact;

    public function __construct(Contact $contact)
    {
        $this->contact = $contact;
    }

    public function getContact(): Contact
    {
        return $this->contact;
    }
}
```

## Écouter les événements

Le composant nous propose deux façons différentes d'écouter les événements avec les **EventListeners** ou les **EventSubscribers**.
La logique est plus ou moins la même si ce n'est que les listeners demande un peu plus de configurations. C'est pourquoi nous allons utiliser les **EventSubscribers**. Dans ce but, il nous suffit d'implémenter une interface et Symfony enregistrera automatiquement nos subscribers (grâce à l'autoconfiguration).

``` php
<?php

namespace App\Event\Subscriber;

use App\Event\ContactCreated;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

final class ContactSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            ContactCreated::class => [
                ['sendEmail', 10],
                ['sendNotification', 5],
            ],
        ];
    }

    public function sendEmail(ContactCreated $event): void
    {
        // ...
    }

    public function sendNotification(ContactCreated $event): void
    {
        // ...
    }
}
```

L'interface contient seulement la méthode static *getSubscribedEvents*. Celle-ci retournera une array dont les clés seront les **FQCN** des événements écoutés par ce subscriber. Les valeurs seront aussi une array avec une entrée pour chaque méthode à appeler.

Une priorité peut également être définit pour chacune de ces méthodes grâce à en entier, positif ou négatif, avec 0 comme valeur par défaut. Dans l'exemple, *sendEmail* à une priorité de 10 qui est supérieur la priorité de *sendNotification* de 5 et sera donc appeler en première.

## A vous de jouer

1. Créez une classe pour représenter l'événement **ContactCreated**.
2. Créez un service **\App\Manager\ContactManager** afin d'envoyer cet événement au lieu d'envoyer l'email directement.
3. Écoutez l'événement grâce à un **EventSubscriber** afin d'envoyer l'email.
4. Créez et écouter tous les événements nécessaires afin d'ajouter les messages flashs de l'application dans des EventSubscribers.

## Pour aller plus loin

- [Documentation du composant](https://symfony.com/doc/current/components/event_dispatcher.html)
- [Built-in Symfony Events](https://symfony.com/doc/current/reference/events.html)
- [PSR-14: Event Dispatcher](https://www.php-fig.org/psr/psr-14/)
