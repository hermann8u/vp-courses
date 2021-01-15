# Les services avec Symfony

Notre application est déjà remplie de services. Par exemple, dans le chapitre sur les formulaires, nous avons utilisé le **FlashBag** afin de gérer les messages flash.

Vous l'aurez compris, les services sont omniprésent à travers le framework. Ils sont chacun responsable de tâches bien spécifiques. Parmi les services que nous avons déjà utilisés sans que vous vous en aperceviez, nous pouvons citer :
- Le Router
- La FormFactory
- Twig
- La Session

Ces services sont un peu particuliers car ils sont mis à disposition de manière transparente à travers des méthodes de l'**AbstractController** que nos contrôleurs étendent.

## Les services

### Créer un service

Le but des services restent de segmenter notre code en briques réutilisables plus petites. Vous l'aurez compris, nous allons utiliser l'autowiring dans notre application. Ainsi, la création de service consiste simplement en la création d'une classe !

Imaginons que nous voudrions afficher un message aléatoire sur plusieurs pages de notre site, nous pourrions le faire à partir d'un service :

``` php
<?php

// Ici le namespace est App\Service mais ça aurait pu être App\NimporteQuoi.
// Nous verrons après pourquoi.
namespace App\Service;

class MessageGenerator
{
    public function getRandomMessage(): string
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

Il ne nous reste plus qu'à l'utiliser

### Utiliser un service

L'utilisation d'un service se réduira à utiliser l'injection de dépendance, encore une fois, sans étape de configuration supplémentaire grâce à l'autowiring :

``` php
// ...
use App\Service\MessageGenerator;
// ...

class ProductController
{
    /** @var MessageGenerator */
    private $messageGenerator;

    public function __construct(MessageGenerator $messageGenerator)
    {
        $this->messageGenerator = $messageGenerator;
    }

    /**
    * @Route("/products")
    */
    public function list(): Response
    {
        $message = $this->messageGenerator->getRandomMessage();
        // ...
    }
}

```

::: tip
Vous l'aurez peut être compris, nos contrôleurs sont eux-meme des services, sinon, l'exemple précédent ne serait pas possible.
:::

### Lister les services grâces à la console

Afin de **lister tous les services** que vous pouvez injecter avec l'**autowiring**, vous pouvez utiliser la commande suivante:

``` bash
php bin/console debug:autowiring
```

Certains services sont également utilisés par Symfony pour réaliser des tâches **internes au framework**. Ils ne sont pas forcement disponible pour l'autowiring car vous n'avez pas besoin de les utiliser. Il existe quand même une commande pour **lister tous les services de l'application**.

``` bash
php bin/console debug:container
```

### Configuration

Nous n'y échapperons pas, il faut quand même jetez un coup d'oeil au fichier de configuration **/config/services.yaml** pour voir comment ça fonctionne :

``` yaml
services:
    # Default configuration for all services in *this* file
    _defaults:
        autowire: true      # Automatically injects dependencies in your services.
        autoconfigure: true # Automatically tags your services

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

Sous la clé services._defaults, on définie une configuration globales pour tous les services que nous allons déclarer. Nous indiquons ensuite à Symfony de considérer tous les fichiers du namespace App comme étant des services, en prenant soit d'exclure quelques exceptions.

::: tip
Dans le cas des **contrôleurs**, on peut injecter les services soit avec le **constructeur**, soit dans nos **actions** directement. Si les deux méthodes fonctionnent, on préférera utiliser uniquement l'injection depuis le constructeur, notamment afin d'éviter de mélanger les paramètres qui proviennent du routing avec les dépendances.
:::

## Les paramètres

Nous allons profiter d'être dans le fichier **/config/services.yaml** pour parler des paramètres de l'application. Ils peuvent d'ailleurs être, à juste titre, utilisés comme des dépendances pour nos services.

### Utilité et définition
 
Nous avons déjà vu que les paramètres sensibles et ceux dépendant de la machine se gèrent dans les fichiers **/.env\***, mais il peut être intéressant de disposer d'autres paramètres en rapport direct avec notre projet. Par exemple, la langue par défaut de notre site, ou l'adresse email de réception pour notre formulaire de contact.

Au lieu de définir en dure et à plusieurs endroits ces paramètres, nous pouvons les définir dans ce fichier sous la clé **parameters** :

``` yaml
parameters:
    app.locale: 'fr'
    app.email_address.contact: 'contact@shoefony.com'
```

### Utilisation dans la configuration

Maintenant qu'ils sont définis, on peut les utiliser dans toutes la configuration. Nous allons modifier la locale par défaut de notre site dans le fichier **/config/packages/framework.yaml** :

``` yaml
framework:
    # ...
    default_locale: '%app.locale%'
    # ...
```

Comme vous pouvez le voir, pour les utiliser dans la configuration, il suffit d'entourer le nom que nous avons utilisé pour définir le paramètre par **deux symboles %**. D'ailleurs, les paramètres se concatènent très bien avec une autre chaîne de caractères. Par exemple dans le fichier de configuration de Twig :

``` yaml
twig:
    default_path: '%kernel.project_dir%/templates'
```

::: tip
Dans cet exemple, nous utilisons un paramètre fournit par Symfony qui contient le chemin complet vers la racine de notre projet. C'est très souvent utilisé pour obtenir le chemin complet vers un fichier, ou ici un dossier, en concaténant.
:::

### Utilisation dans un service

Les paramètres peuvent aussi s'injecter en dépendances de services avec l'autowiring ! Mais pour que ça fonctionne, il faut faire un peu de configuration :

``` yaml {10,11,12}
parameters:
    app.locale: 'fr'
    app.email_address.contact: 'contact@shoefony.com'

services:
    _defaults:
        autowire: true
        autoconfigure: true

        bind:
            string $projectDir: '%kernel.project_dir%'
            string $contactEmailAddress: '%app.email_address.contact%'
```

Voilà qui permet d'obtenir ces deux paramètres de manière global pour l'injection de dépendances. Pour que ça fonctionne, il faut que le type et le nom de l'argument du constructeur du service correspondent avec ceux définis sous la clé **bind** :

``` php {8}
class AnotherService
{
    /** @var string */
    private $projectDir;

    public function __construct(string $projectDir)
    {
        $this->projectDir = $projectDir;
    }
}
```

## Exemple : Utilisation du Mailer

[Le composant Mailer](https://symfony.com/doc/current/components/mailer.html) est sorti avec la version 4.2 de Symfony. 

::: tip Information
Ce composant vient remplacer **SwiftMailer** qui était auparavant le solution pour envoyer des emails dans Symfony. Cette librairie, elle aussi développée par **Fabien Potencier**, commençait a se faire vieille et il était difficile de la faire évoluer. C'est pourquoi elle a été remplacée par ce nouveau composant.
:::

Ce composant est, comme beaucoup, intégré à Symfony à travers le **FrameworkBundle**.

Afin de l'utiliser, il faut commencer par le configurer, mais Symfony Flex a déjà fait une bonne partie du travail pour nous. Voici les étapes étapes qu'il nous reste à faire :

1. Installer un [provider](https://symfony.com/doc/current/mailer.html#using-a-3rd-party-transport) pour l'envoi d'email en fonction de vos besoin ou utiliser le **SMTP** (par défaut)
2. Comme nous ne l'avons pas encore fait, il faut dupliquer le fichier **/.env** en **/.env.local** afin d'y ajouter vos données sensibles.
2. Dans le fichier **/.env.local**, modifier le paramètre **MAILER_DSN** en [fonction du provider choisit](https://symfony.com/doc/current/components/mailer.html#mailer-dsn)

::: warning
L'envoi de mail en locale est toujours quelque chose qui reste bancale. C'est possible que, même si votre configuration est bonne, rien ne se passe.
:::

### L'envoi d'un email

Le composant fonctionne grâce à la création, la configuration et enfin à l'envoi d'objets **Symfony\Component\Mime\Email**. Le service **Mailer** est responsable de l'envoi réel du message à travers sa méthode **send**.

Voici comment générer un message : 

``` php
// ...
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
// ...

$email = (new Email())
    ->from('hello@example.com')
    ->to('contact@shoefony.com')
    //->cc('cc@example.com')
    //->bcc('bcc@example.com')
    //->replyTo('hello@example.com')
    //->priority(Email::PRIORITY_HIGH)
    ->subject('Un message de contact sur Shoefony')
    ->html($twig->render('email/contact.html.twig', ['contact' => $contact]));

$mailer->send($email);
```

Pour garder les choses découplées, le corps de l'email a été stocké dans un template et est rendu grâce à la méthode **render()** de la classe **Twig\Environment**.

L'objet **Symfony\Component\Mime\Email** supporte beaucoup plus d'options, comme inclure des pièces jointes, et bien plus encore.

A noter qu'en plus d'indiquer des adresses "to", vous pouvez ajouter des destinataires en copie ou copie cachée via "cc", etc...

### Analyser ses envois

Vous pouvez voir tous les emails envoyés durant une unique réponse lorsque vous êtes dans l'environnement dev via **la barre de debug**. L'icône d'email dans la barre d'outils montrera combien d'emails ont été envoyés. Si vous cliquez dessus, un rapport s'ouvrira montrant les détails des emails envoyés.

Si vous envoyez un email et puis redirigez immédiatement vers une autre page, la barre d'outils de debug n'affichera pas d'icône d'email ni de rapport sur la page d'après.

Il est possible d'**intercepter cette redirection** grâce à une configuration du **WebProfilerBundle**. Nous allons activer cette option uniquement pour le développement, dans le fichier **/config/dev/web_profiler.yaml**.

``` yaml {3}
web_profiler:
    toolbar: true
    intercept_redirects: true
```

## A vous de jouer

Améliorons à présent notre formulaire de contact afin d'alerter l'administrateur lorsqu'une nouvelle demande est envoyée.

1. Ajoutez les paramètres **app.locale** et **app.email_address.contact** dans le bon fichier et configurez la locale par défaut de votre application avec le premier.
2. Ajoutez le **bind** pour le paramètre **app.email_address.contact**.
3. Configurez le composant **Mailer** afin de pouvoir envoyer des emails depuis votre projet.
4. Créez un service **App\Mailer\ContactMailer** et injectez-y le service **Mailer**, le service de **Twig** et le paramètre **app.email_address.contact**. Vérifiez ensuite que ça fonctionne avec la fonction de debug **dd()**.
5. Ajoutez une méthode **send** qui prendra en paramètre notre entité de contact et qui utilisera les dépendances de notre service pour procéder à l'envoi. Le contenu de l'email devra être généré grâce à Twig.
6. Injectez notre service dans le MainController et utilisez sa méthode après la validation des données.
7. Testez le résultat grâce à la barre de debug.

## Pour aller plus loin

- [Symfony best practices : Organizing Your Business Logic](https://symfony.com/doc/current/best_practices.html#business-logic)
- [Symfony best practices : Configuration](https://symfony.com/doc/current/best_practices.html#configuration)
- [Documentation de Symfony sur l'envoi d'email](https://symfony.com/doc/current/mailer.html)
