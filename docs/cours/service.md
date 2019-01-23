# Les services

## Découverte
Notre application est remplie d'objets utiles. Par exemple, dans le chapitre précédent, nous avons utilisé le FlashBag afin de gérer les messages flash. Ce n'est qu'un exemple de ce que l'on appelle **service** dans Symfony.

Vous l'aurez compris, les services sont omniprésent à travers le framework. Ils sont chacun responsable de tâches bien spécifiques. Parmi les services que nous avons déjà utilisé sans que vous vous en aperceviez, nous pouvons citer :
- Le Router
- La FormFactory
- Twig
- La Session

Ces services sont un peu particulier car ils sont mis à disposition de manière transparente à travers des méthodes de l'AbstractController que nos contrôleurs étendent.

En fait, tous les services "vivent" dans un object particulier appelé **Container**. Il centralise la façon dont les services sont créés, ne gérant qu'une seule instance pour chacun d'entre eux, ce qui limite l'impact sur la mémoire.

### Créer un service

Par définition, un **service** est une classe qui nous rend ... service. La où ils sont intéressants, c'est qu'ils nous permettent de segmenter notre code en briques réutilisables plus petites.

Imaginons que nous voudrions afficher un message aléatoire sur plusieurs pages de notre site, nous pourrions le faire à partir d'un service :

``` php
<?php

// Ici le namespace est App\Service mais ça aurait pu être App\NimporteQuoi.
// Nous verrons après pourquoi.
namespace App\Service;

class MessageGenerator
{
    public function getHappyMessage()
    {
        $messages = [
            'You did it! You updated the system! Amazing!',
            'That was one of the coolest updates I\'ve seen all day!',
            'Great work! Keep going!',
        ];

        $index = array_rand($messages);

        return $messages[$index];
    }
}
```

Finalement, c'est une classe toute simple ! Il ne nous reste plus qu'à l'utiliser.

### Utiliser un service

Pour utiliser un service, il faut utiliser l'**autowiring**. Ce mécanisme permet d'injecter les dépendances simplement en utilisant le type de l'objet le représentant. En exemple vaut mieux que des explications :

``` php {2,7}
...
use App\Service\MessageGenerator;
...
/**
 * @Route("/products")
 */
public function list(MessageGenerator $messageGenerator)
{
    $message = $messageGenerator->getHappyMessage()
}
```

Cette exemple montre une injection de service dans une action d'un contrôleur. Pratique, mais lorsque l'on crée nos propres services, ils peuvent aussi avoir besoin d'autres services ! Voici comment ajouter une dépendance à un service de manière générale :

``` php {13,18,20,22,23}
<?php

namespace App\Service;

// Pas besoin de use car MessageGenerator est dans le même namespace
// Et Swift_Mailer est dans le namespace global

class MessageSender
{
    /**
     * @var Swift_Mailer
     */
    private $mailer;

    /**
     * @var MessageGenerator
     */
    private $messageGenerator;

    public function __construct(Swift_Mailer $mailer, MessageGenerator $messageGenerator)
    {
        $this->mailer = $mailer;
        $this->messageGenerator = $messageGenerator;
    }

    public function send()
    {
        $message = $this->messageGenerator->getHappyMessage();

        $this->mailer->send($message);
    }
}
```

::: tip
Dans le cas d'un contrôleur, les deux méthodes fonctionnent, car ce sont eux-mêmes des services. Cependant, la plupart des développeurs expérimentés conseils d'utiliser la seconde méthode aussi dans les contrôleurs, afin d'éviter de mélanger les paramètres qui proviennent du routing avec les dépendances.
:::

Afin de lister tous les services que vous pouvez injecter avec l'autowiring, vous pouvez utiliser la commande suivante:

``` sh
php bin/console debug:autowiring
```

::: warning
Depuis Symfony 4, les services sont privés par défaut (à part quelques exceptions), ce qui signifie qu'il n'est pas possible de les obtenir directement depuis le **Container**, mais qu'il faut utiliser le système d'**autowiring** pour les utiliser.
:::

### Configuration

Avant l'arrivé de l'autowiring dans Symfony, il fallait également configurer chacun de nos services manuellement. Heureusement ce n'est plus le cas, car un mécanisme d'auto-configuration existe aussi. Pour nous en rendre compte, regardons en détail le fichier **/config/services.yaml** :

``` yaml
services:
    _defaults:
        autowire: true      # Automatically injects dependencies in your services.
        autoconfigure: true # Automatically registers your services as commands, event subscribers, etc.

    # makes classes in src/ available to be used as services
    # this creates a service per class whose id is the fully-qualified class name
    App\:
        resource: '../src/*'
        exclude: '../src/{DependencyInjection,Entity,Migrations,Tests,Kernel.php}'

    # controllers are imported separately to make sure services can be injected
    # as action arguments even if you don't extend any base controller class
    App\Controller\:
        resource: '../src/Controller'
        tags: ['controller.service_arguments']
```

Comme vous pouvez le voir sous la clé **services => _defaults**, on active l'autowire et l'auto-confirugation pour tous les services. On peut également noter que toutes les classes présentent dans le namespace **App\\** seront déclarées en tant que services ! Ce qui signifie aussi que vous pourrez injecter n'importe laquelle d'entre elles ou y injecter n'importe quel service.

::: warning
Comme le commentaire en fin de fichier le précise, il peut arriver que vous deviez configurer quelques services manuellement. Nous ne rentrerons pas dans les détails dans ce cours, mais sachez que c'est ici que ça doit se faire.
:::

## Cas concret : Envoie de mail

Dans une application aussi simple, la création de service n'est pas vraiment nécessaire car il a peu de code, et donc peu qui peut être utilisé à plusieurs endroits. Nous allons devoir nous contenter d'utiliser des services qui existe déjà dans nos dépendances, notamment Swift_Mailer que nous avons vu plus haut.

### Swiftmailer et son bundle

Swiftmailer est donc une librairie d'envoie d'email pour PHP développer par Fabien Potencier (encore lui). Elle est intégré à Symfony à travers un bundle que nous avons déjà d'installé : symfony/swiftmailer-bundle

Afin de l'utiliser, il faut commencer par le configurer, mais Symfony Flex a déjà fait une bonne partie du travail pour nous. Voici les étapes étapes qu'il nous reste à faire :
1. Comme nous ne l'avons pas encore fait, il faut dupliquer le fichier **/.env** en **/.env.local** afin d'y ajouter vos données sensibles.
2. Dans le fichier **/.env.local**, modifier le paramètre **MAILER_URL** en *gmail://youraddressemail@gmail.com:yourSuperPwd@localhost* (Si vous avez une adresse Gmail).

::: warning
L'envoie de mail en locale est toujours quelque chose qui reste bancale. C'est possible que, même si votre configuration est bonne, rien ne se passe.
:::

### Envoie de mail

La bibliothèque Swiftmailer fonctionne grâce à la création, la configuration et enfin à l’envoi d’objets Swift_Message. Le service **mailer** est responsable de l'envoi réel du message à travers sa méthode **send**.

Voici comment générer un message : 

``` php
$message = (new \Swift_Message('Un message de contact sur Shoefony'))
    ->setFrom('sender@test.com')
    ->setTo('contact@shoefony.com')
    ->setBody(
        $this->renderView('email/contact.html.twig', ['contact' => $contact]),
        'text/html'
    );
```

Pour garder les choses découplées, le corps de l'email a été stocké dans un template et est rendu grâce à la méthode renderView().

L'objet $message supporte beaucoup plus d'options, comme inclure des pièces jointes, et bien plus encore.

A noter qu'en plus d'indiquer des adresses "to" via "setTo", vous pouvez ajouter des destinataires en copie ou copie cachée via "cc".

### Travailler les emails en développement

### Analyser ses envoies

## A vous de jouer

1. Configurez Swiftmailer afin de pouvoir envoyer des emails depuis votre projet.
2. Intégrez un envoi d’email simple (sans utiliser de template et en indiquant dans l’email "Bonjour, ceci est mon premier email !") au niveau de la validation du formulaire de contact et testez le résultat depuis la barre de débogage. Vous aurez donc besoin d'injecter le service de mailer.
3. Améliorez le rendu de votre email en utilisant un template HTML de mail.
4. Intégrez les informations récupérées par le formulaire de contact dans l’email envoyé à l’administrateur.

## Pour aller plus loin

- [Symfony best practices : Organizing Your Business Logic](https://symfony.com/doc/current/best_practices/business-logic.html)
- [Documentation de Symfony sur l'envoie d'email](https://symfony.com/doc/current/email.html)