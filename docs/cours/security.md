# Authentification et autorisations

Symfony propose un mécanisme très complet permettant de gérer l'**authentification** et les **autorisations**. Dans ce chapitre, nous allons mettre en place une système d'authentification à l'aide d'un formulaire de connexion et évoquer les bases des autorisations.

Ces deux points cruciaux sont gérées ensemble à travers les packages de **Security**, composées de plusieurs **composants** et d'un **bundle**. Encore une fois, ce bundle permet l'**intégration** des composants dans le framework.

``` bash
# Permet d'installer le bundle grâce à son alias de Symfony Flex
composer require security
```

Flex va également de nouveau nous créer un fichier de configuration pour ce bundle **config/packages/security.yaml**.

## Authentification

### La classe User

Le premier point qu'il nous faut régler afin de mettre en place notre système d'**authentification** est la création d'une classe implémentant l'interface **Symfony/Component/Security/Core/User/UserInterface**. Cette classe sera nécessaire peu importe le type d'authentification qu'utilisera l'application (en base de données, via OAuth avec Facebook, sur un LDAP, ...).

Encore une fois, le **MakerBundle** va nous aider à mettre en place rapidement cette classe avec une commande interactive !

``` bash
php bin/console make:user
```

Voici les réponses que nous allons fournir aux différentes questions de la commande :
``` bash
The name of the security user class (e.g. User) [User]:
> User

Do you want to store user data in the database (via Doctrine)? (yes/no) [yes]:
> yes

Enter a property name that will be the unique "display" name for the user (e.g.
email, username, uuid [email]
> username

Does this app need to hash/check user passwords? (yes/no) [yes]:
> yes
```

Nous avons donc créer une entité Doctrine **App\Entity\User** qui se connectera avec un nom d'utilisateur et l'application sera chargée de gérer le hachage des mots de passe.

La commande a donc :
1. Créée une entité User et son repository.
2. Implémentée l'interface correctement en fonction de nos réponses.
3. Modifiée le fichier de configuration **security.yaml**.

Voici la configuration qui a changé :

``` yaml
security:
    encoders:
        App\Entity\User:
            algorithm: auto

    providers:
        app_user_provider:
            entity:
                class: App\Entity\User
                property: username
```

La clé **encoders** permet de préciser que pour notre classe **App\Entity\User**, les mots de passe seront encodés avec l'algorithme **auto**. Ce dernier correspond en faite à la constante **PASSWORD_DEFAULT** de la méthode PHP [password_hash](https://www.php.net/manual/fr/function.password-hash.php). En ce moment, c'est **bcrypt** qui est considéré comme le meilleur algorithme pour les mots de passe pour **PHP**.

La clé **providers** configure les différents **User Providers**.

### Les User Providers

Pour indiquer à l'application comment trouver nos utilisateurs, elle aura besoin de savoir comment si prendre. C'est le but du **User Provider** qui a été configuré précédemment.

:::tip
Une fois connecté, l'utilisateur est chargé à chaque nouvelle requête.
:::

Puisque notre classe **User** est une entité **Doctrine**, nous allons utiliser l'[Entity User Provider](https://symfony.com/doc/current/security/user_provider.html#entity-user-provider). Ce **provider** utilisera lui-même **Doctrine** pour faire une requête en base de données afin d'y chercher notre utilisateur.

Il existe d'autre **providers** mis à disposition dont nous pouvons citer par exemple :
- Le **MemoryUserProvider** qui sert principalement pour le développement et les tests
- Le **LdapUserProvider** qui permet de se connecter avec un serveur **LDAP**

Vous pouvez également créer vos propres provider en implémentant l'interface **Symfony\Component\Security\Core\User\UserProviderInterface**.

### Les Firewalls

La configuration **la plus importante** de notre système de connexion se trouve sous la clé **firewalls**.

``` yaml
security:
    # ...
    firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false
        main:
            anonymous: lazy
            lazy: true
            provider: app_user_provider
```

Il y a actuellement **deux firewalls** définis par défaut :
- Le firewall **dev** est seulement ici pour empêcher de bloquer accidentellement les outils de debug de Symfony.
- Le firewall **main**, qui correspond actuellement à toutes les URLs de notre application (car il n'y pas de clé *pattern* définie).

En effet, comme pour les routes, le **premier firewall** qui correspond à l'URL de la requête courante sera utilisé.

::: tip
La plupart du temps, la définition d'**un seul firewall** est nécessaire pour gérer tout le système d'authentification de notre application. C'est considéré comme une bonne pratique dans limiter le nombre.
:::

Le fait que le **firewall main** englobe toutes nos URLs ne veut pas dire pour autant qu'il faut absolument être connecté pour pouvoir accéder à notre contenu. La clé de configuration **anonymous** signifie que ce firewall accepte également les **utilisateurs anonymes**. D'ailleurs, si vous jetez un coup d'oeil à la **debug bar**, vous pourrez voir que actuellement nous utilisons un utilisateur anonyme :

![Debug bar anonymous user](/img/anonymous.png)

La **debug bar** nous définie comme authentifier car notre firewall **main** correspond à l'URL de notre requête. Authentifié, certes, mais avec un utilisateur **anonyme** !

### Authentication Providers

Afin que nous puissions nous connecter, il va falloir configurer notre firewall **main** avec un **Authentication Provider**.

::: tip
Notez qu'il est tout à fait possible d'avoir plusieurs **Authentication Providers** pour un seul firewall.
:::

Encore une fois, Symfony nous en fournit déjà quelqu'uns pour nous faciliter la tâche, dont les suivants :
- form_login
- json_login
- http_basics

Ceci sont très pratiques pour configurer rapidement un système de connexion mais ils ont l'inconvenient d'être plus dûrs à personnaliser. C'est pourquoi, il est conseillé d'utiliser un système plus complet, à savoir **Guard**.

### Guard authenticator

L'avantage de **Guard** est qu'il nous donne **plus de contrôle** sur tout le processus de connexion. Le **MakerBundle** va nous permettre de rapidement générer les bases de notre système de connexion basé sur **Guard**.

``` bash
php bin/console make:auth
```

``` bash
What style of authentication do you want? [Empty authenticator]:
 [0] Empty authenticator
 [1] Login form authenticator
> 1

The class name of the authenticator to create (e.g. AppCustomAuthenticator):
> LoginFormAuthenticator

Choose a name for the controller class (e.g. SecurityController) [SecurityController]:
> SecurityController

Do you want to generate a '/logout' URL? (yes/no) [yes]:
> yes
```

Cette commande a fait beaucoup pour nous :
1. Créée notre classe **Guard** **App\Security\LoginFormAuthenticator** qui contient tout le processus de connexion
2. Générée un **SecurityController** avec une action de **login** et une de **logout**
3. Créée un template par défaut de login dans **security/login.html.twig**
4. Complétée la configuration de notre firewall pour utiliser notre classe **Guard** et setup l'action de déconnexion

N'hésitez pas à modifier le code ainsi généré afin de vous l'approprier. C'est votre code à présent !

## Autorisation

Il y a des actions que seuls les utilisateurs connectés peuvent réaliser. Cependant, tous nos utilisateurs ne sont pas forcement égaux en droits (dans notre application, bien sûr).

Pour gérer ces différences d'autorisations, Symfony nous proposent plusieurs mécanismes, dont le premier est l'introduction de rôles pour les utilisateurs.

### Les roles

Si vous regardez votre classe User, vous voyez qu'elle dispose déjà d'une méthode **getRoles()** qui lui vient de l'interface **UserInterface**.

``` php
// App\Entity\User

public function getRoles(): array
{
    $roles = $this->roles;
    // guarantee every user at least has ROLE_USER
    $roles[] = 'ROLE_USER';

    return array_unique($roles);
}
```

Comme vous le voyez, tous nos **User** dispose du rôle **ROLE_USER** par défaut.

::: warning
Les rôles doivent toujours commencer par la chaîne de caractères **"ROLE_"** mais vous pouvez **n'importe quel rôle** qui a un sens dans votre application.
:::

::: tip
Il est également possible de définir une **hiérarchie de rôles**. Par exemple, pour que tous les utilisateurs ayant le ROLE_ADMIN possède également le ROLE_MODERATOR.
:::

Ces rôles nous seront utiles afin de limiter les différentes actions des utilisateurs.

#### Les rôles spéciaux

Il existe trois rôles un peu particuliers car ils ne correspondent pas directement à des rôles d'utilisateurs :
- Le rôle **IS_AUTHENTICATED_ANONYMOUSLY** est attribué à **tous les utilisateurs**, qu'ils soient connectés ou non.
- Le rôle **IS_AUTHENTICATED_REMEMBERED** est attribué à **tous les utilisateurs connectés**, qu'ils utilisent la fonctionnalité de [remember_me](https://symfony.com/doc/current/security/remember_me.html) ou non.
- Le rôle **IS_AUTHENTICATED_FULLY** est attribué à **tous les utilisateurs connectés** qui ne se sont pas connectés automatiquement avec la fonctionnalité de *remember_me*.

### Récupérer l'utilisateur connecté

Maintenant que nos utilisateurs sont capables de se connecter, on va avoir besoin de les récupérer pour interagir avec eux. Pour cela nous disposons de plusieurs méthodes en fonction du contexte :

#### Depuis un contrôleur

Si notre contrôleur étant l'**AbstractController**, nous pouvons par exemple faire ceci :

``` php
// ...
public function index()
{
    $currentUser = $this->getUser();
    if (!$user instanceof User) {
        throw $this->createAccessDeniedException();
    }

    // ...
}
```

La méthode **getUser()** nous retourne l'utilisateur courant. Si ce n'est pas une instance de **User**, nous pouvons envoyer une exception qui limitera l'accès.

#### Depuis un service

La méthode précédente utilise en fait un service pour récupérer l'utilisateur que Symfony à pris soin d'injecter pour nous. Mais dans un de nos service, nous avons besoin de l'injecter nous même.

``` php
use Symfony\Component\Security\Core\Security;

class MonService
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function someMethod()
    {
        $user = $this->security->getUser();
    }
}
```

#### Depuis un template Twig

Si vous vous rappelez le chapitre sur **Twig**, nous avions vu qu'il existait un objet à disposition un peu particulier dans nos templates : la variable **app**. En effet, cette variable nous permet de récupérer directement notre utilisateur dans nos templates Twig :

``` twig
{# null ou une instance de notre classe User #}
{{ dump(app.user) }}
```

### Limiter l'accès à une partie de notre application

Il reste une dernière clé dont nous n'avons parlée dans notre ficher de configuration **security.yaml**. Il s'agit de la clé **access_control**.

Cette configuration permet de limiter l'accès à toute une partie de notre application.

Comme pour le firewall :
- Une règle **access_control** regarde si le pattern de l'URL de la requête correspond
- La premiere règle d'**access_control** qui correspond sera utilisé

Par exemple :

``` yaml
security:
    # ...
    access_control:
        # On prend soin d'autoriser l'accès au login
        - { path: ^/admin/login, roles: IS_AUTHENTICATED_ANONYMOUSLY }
        # Tous les URLs commençant par /admin seront bloquées pour les utilisateurs n'ayant pas le rôle ROLE_ADMIN
        - { path: ^/admin, roles: ROLE_ADMIN }
```

::: warning
Une erreur courante consiste à autoriser l'accès à la connexion seulement aux utilisateurs connectés. Les utilisateurs anonymes ne peuvent donc plus se connecter. Garder ça à l'esprit !
:::

### Vérifiez les droits

Bien que nous savons maintenant comment empêcher un simple utilisateur d'accèder à notre back-office, nous pourrions avoir besoin d'avoir plus de contrôle sur ce qu'un modérateur pourrait y faire, par exemple.

Le service **Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface** va nous aider dans ce but.

``` php
namespace Symfony\Component\Security\Core\Authorization;

interface AuthorizationCheckerInterface
{
    public function isGranted($attribute, $subject = null): bool;
}
```

Cette interface contient seulement une méthode **isGranted()** qui prend principalement un paramètre **attribut**. Bien que cette **attribut** puisse être de n'importe quel type, nous allons nous contenter dans ce cours d'y insérer **les rôles** que nous voulons vérifier pour l'**utilisateur courant**. Ainsi, nous pourrions faire dans un contrôleur :

``` php
public function index()
{
    // Cette méthode est un raccourci fournit par l'AbstractController
    // qui utilise en fait le service d'AuthorizationChecker
    if ($this->isGranted('ROLE_ADMIN') === false) {
        throw $this->createAccessDeniedException();
    }

    // Ou alors plus court avec un autre helper de contrôleur
    // qui enverra l'exception dans le cas échéant
    $this->denyAccessUnlessGranted('ROLE_ADMIN');
}
```

De la même façon, dans nos templates **Twig** afin d'afficher conditionnellement du HTML à nos utilisateurs :
``` twig
{% if is_granted('IS_AUTHENTICATED_REMEMBERED') %}
    <li>
        <a href="#">Se déconnecter</a>
    </li>
{% endif %}
```

## A vous de jouer

1. Créez votre entité User grâce à la commande **make:user** et liez y vos **Comment**.
2. Complétez vos **fixtures** pour y charger quelques utilisateurs. Prenez soit d'encoder le mot de passe grâce à l'injection du service **Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface**.
3. Modifiez la **page de détail d'un produit** pour que le nom de l'utilisateur ayant commenté l'article y apparaisse.
4. Mettez en place le **système de connexion**.
5. Intégrez les [templates fournis](/projects/shoefony-template-login.zip) dans votre système de connexion.
6. Autorisez l'ajout de commentaires seulement pour les **utilisateurs connectés** (dans le template et le contrôleur).
7. Créez un nouveau contrôleur **AccountController** dont toutes les URLs commenceront par **/mon-compte** et créez y deux actions basiques.
8. Limitez l'accès à toutes les URLS commençant par **/mon-compte** pour que seuls les utilisateurs connectés puissent y avoir accès.
