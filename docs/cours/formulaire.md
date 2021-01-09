# Formulaires

Nos templates HTML de base en places, il est désormais temps de créer une des pages fonctionnelles. Nous allons commencer avec **la page de contact**.

Celle-ci existe déjà, car dans le précédent chapitre nous avons mis en place le routing l'action du contrôleur et la vue permettant d'afficher notre page de contact. Néanmoins, pour le moment le formulaire affiché l'est grâce à de simples balises HTML, nous allons voir comment implémenter **le composant Form** de Symfony et établir des règles de validation sur ce dernier.

## Création d'un objet Contact

Dans Symfony, un formulaire se construit le plus souvent sur un objet existant, et son objectif est d'**hydrater** cet objet. Néanmoins, à l'heure actuelle nous ne disposons d'aucun objet au sein de notre projet. Nous allons en créer un permettant de créer une nouvelle demande de contact, celle-ci devrait permettre de récupérer le prénom, le nom, l'adresse email ainsi que le message que l'utilisateur souhaite envoyer.

On va donc créer une classe Contact dans le dossier **/src/Entity/**

Cette classe devra être composée d'un namespace afin de permettre d'identifier son emplacement au sein du projet, de propriétés **privées** composants une demande de contact, mais également des accesseurs liés à ces informations. Ce type de classe est appelé [Plain Old PHP Object](/ressources/glossaire.md#popo), il n'a rien à voir avec Symfony ou une autre librairie.

Pour cette fois, nous la créerons manuellement car nous n'avons pas encore vu le chapitre sur **Doctrine**.

## Création d'une classe de formulaire

Afin de permettre la génération d'un formulaire dans Symfony, il est nécessaire de disposer de deux choses, un objet représentant les données sur lesquels s'appuyer, mais également un moyen permettant de construire le formulaire correspondant à cet objet. Pour cela, nous allons définir une classe qui contiendra la définition de notre formulaire.

Nous allons créer une classe dans le dossier **/src/Form/** en reprenant le nom de notre objet suivi du mot clé **Type**, donc le fichier **ContactType.php**


::: tip
Le suffix **Type** est une convention de Symfony pour la déclaration de nos classes formulaires.
:::

``` php
<?php

namespace App\Form;

use App\Entity\Contact;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstName')
            ->add('lastName')
            ->add('email')
            ->add('message')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Contact::class,
        ]);
    }
}
```

Ce type de classe est votre meilleur atout lorsqu'il est question de créer des formulaires. Elle est capable de simplifier le processus de définition des champs à partir des métadonnées qu'un champ possède. Comme notre objet est très simple et que nous n'avons pas encore défini aucune métadonnée, donc notre classe va créer des champs de texte par défaut. C'est adapté à la plupart des champs, sauf pour le corps du message pour lequel nous souhaitons utiliser une **textarea**, et pour l'adresse email pour laquelle nous allons utiliser l'input de type **email** de HTML5.

Il va donc falloir modifier la méthode buildForm afin qu'elle prenne en compte le type que nous souhaitons attribuer aux différents champs.

``` php
// ...
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
// ...
public function buildForm(FormBuilderInterface $builder, array $options): void
{
    $builder
        ->add('firstName', TextType::class, [
            'label' => 'Prénom'
        ])
        ->add('lastName', TextType::class, [
            'label' => 'Nom'
        ])
        ->add('email', EmailType::class, [
            'label' => 'Email'
        ])
        ->add('message', TextAreaType::class, [
            'label' => 'Message'
        ])
    ;
}
```

La méthode **add** du builder possède les arguments suivants :
- Le premier correspond au nom de la propriété de notre classe
- Le second concerne le type de champ de formulaire qui sera utilisé
- Le troisième contient une array de configuration définit par le type de champ utilisé

::: tip
On peut enchaîner les appels à la méthode **add** car elle retourne l'instance du builder sur laquelle elle a été appelée.
:::

Il ne s'agit que d'un rapide exemple des types de champs disponibles, mais [de nombreux types](https://symfony.com/doc/current/forms.html#built-in-field-types) sont accessibles dans le composant.

## Implementation du formulaire

Nous disposons à présent de toute la matière nécessaire permettant de générer notre formulaire depuis le contrôleur.

Rendons-nous dans notre contrôleur **MainController** et procédons à la construction du formulaire depuis l'action associée à notre page de contact :

``` php
// ...
// Ne pas oublier les use adéquats
use App\Entity\Contact;
use App\Form\ContactType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
// ...

/**
 * @Route("/contact", name="main_contact", methods={"GET", "POST"})
 */
public function contact(Request $request): Response
{
    // Création de notre entité et du formulaire basé dessus
    $contact = new Contact();
    $form = $this->createForm(ContactType::class, $contact);
    
    // Demande au formulaire d'interpréter la Request
    $form->handleRequest($request);
    
    // Dans le cas de la soumission d'un formulaire valide
    if ($form->isSubmitted() && $form->isValid()) {
        // Actions à effectuer après envoi du formulaire
        
        return $this->redirectToRoute('main_contact');
    }
    
    return $this->render('main/contact.html.twig', [
        'form' => $form->createView()
    ]);
}
```

Nous commençons par créer une instance de l'entité **Contact**. Cette entité représente les données d'un message sur la page de contact. Nous créons ensuite le formulaire correspondant en spécifiant le type **ContactType** créé précédemment, et passons en paramètres notre objet entité **$contact**. La méthode createForm va créer notre instance de formulaire en se basant sur ces deux paramètres.

Comme cette action du contrôleur va maintenant s'occuper d'afficher et traiter le formulaire qui lui est soumis, nous devons faire attention à la méthode HTTP utilisée. Les formulaires soumis sont généralement envoyés via la méthode POST, et notre formulaire n'y fera pas exception. Si la requête est de type POST, un appel à la méthode **handleRequest** va transformer les données soumises pour les associer à notre objet **$contact**. A ce moment-là, l'objet **$contact** contiendra une représentation de ce que l'utilisateur aura envoyé.

Nous vérifions ensuite que le formulaire est valide. Comme nous n'avons pas précisé de validateurs pour le moment, le formulaire sera toujours valide.

Enfin, nous précisons le template à utiliser pour l'affichage. Notez que nous passons également à la vue une représentation du formulaire à afficher, ce qui nous permet d'effectuer l'affichage adéquat dans la vue.

## Affichage du formulaire

Grâce à Twig, l'affichage de formulaire est très simple. Le composant, en combinaison avec Twig, propose en effet un système par couches pour l'affichage de formulaire qui permet soit d'afficher un formulaire comme une unique entité, soit comme des éléments individuels, selon le besoin de personnalisation nécessaire.

Afin de démontrer la puissance des méthodes intégrer à Twig, nous allons utiliser le bout de code suivant pour afficher le formulaire entier :

``` twig
{{ form_start(form) }}
    {{ form_widget(form) }}
    <button type="submit" class="btn btn-info">Envoyer mon message</button>
{{ form_end(form) }}
```

Bien que cette méthode soit utile et très simple durant la phase de prototypage, cela s'avère limité lorsque le besoin de personnalisation est important, ce qui est souvent le cas avec les formulaires.

Voici une solution pour améliorer le rendu :

``` twig
{{ form_start(form) }}

    <div class="form-group">
        {{ form_errors(form.firstName) }}
        {{ form_label(form.firstName) }}
        {{ form_widget(form.firstName, {'attr': {'class': 'form-control', 'placeholder': form.firstName.vars.label} }) }}
    </div>
    <div class="form-group">
        {{ form_errors(form.lastName) }}
        {{ form_label(form.lastName) }}
        {{ form_widget(form.lastName, {'attr': {'class': 'form-control', 'placeholder': form.lastName.vars.label} }) }}
    </div>
    <div class="form-group">
        {{ form_errors(form.email) }}
        {{ form_label(form.email) }}
        {{ form_widget(form.email, {'attr': {'class': 'form-control', 'placeholder': form.email.vars.label} }) }}
    </div>
    <div class="form-group">
        {{ form_errors(form.message) }}
        {{ form_label(form.message) }}
        {{ form_widget(form.message, {'attr': {'class': 'form-control', 'placeholder': form.message.vars.label, 'rows': 6} }) }}
    </div>

    <button type="submit" class="btn btn-info">Envoyer mon message</button>

{{ form_end(form) }}
```

Comme vous pouvez le voir, nous utilisons 5 nouvelles fonctions Twig pour afficher notre formulaire.
- La fonction **form_start** permet de la générer la balise ouvrante de notre formulaire avec tout ce dont elle a besoin (name, method, enctype si besoin, ...)
- La fonction **form_errors** affichera les erreurs de validation du champ en question.
- La fonction **form_label** affichera le label du champ.
- La fonction **form_widget** affichera l'input correspondant.
- La fonction **form_end** fermera le formulaire en ajoutant les champs oubliés.

## Protection CSRF

Symfony gère un système de protection contre les attaques de type CSRF sur nos formulaires. Ce qu'il faut retenir, c'est qu'un token dans un input de type hidden est généré en plus dans le formulaire pour valider le fait que le formulaire n'a pas été modifié entre son affichage et sa soumission. Nous allons l'activer avec les étapes suivantes :

Rendez-vous dans le fichier **/config/packages/framework.yaml** et décommenter la ligne **csrf_protection** :

``` yaml {4}
framework:
    secret: '%env(APP_SECRET)%'
    default_locale: en
    csrf_protection: true
    #http_method_override: true
```

Si vous rechargez votre page de contact, vous aurez maintenant l'erreur suivante :

![Erreur CSRF](/img/need-csrf.png)

Comme vous le voyez, il nous manque une dépendance !

Rappelez-vous, nous avons désinstallé le package **security-bundle** dans le chapitre sur [Flex](/cours/bundle.html#suppression-des-packages). En fait, nous n'avons pas besoin de tout le bundle, mais juste de **symfony/security-csrf**. Lancez donc la commande :

``` bash
composer req security-csrf
```

Rechargez votre page, et voilà ! En un clin d'oeil, nous sommes protégés contre ces attaques. Vous pouvez remarquer que le champ de type hidden a été ajouter à la fin de notre formulaire par la fonction Twig **form_end**. Symfony, le gère très bien tout seul, vous pouvez continuer à l'ignorer !

## Validation du formulaire

Le composant [Validator](https://symfony.com/doc/current/components/validator.html) de Symfony permet de valider les données. La validation est une tâche courante lorsqu'il est question de valider les données de formulaire. Cette tâche doit être réalisée avant que les données ne soient envoyées vers une base de données. Les validateurs du framework nous permettent de séparer notre logique de validation des composants qui pourraient s'en servir, tels que les composants de formulaire ou de base de données. Cette approche signifie que nous allons avoir un jeu de règles de validation par objet.

Commençons avant tout par mettre à jour notre objet **Contact** dans **src/Entity/Contact.php** pour spécifier quelques validateurs.

``` php
use Symfony\Component\Validator\Constraints as Assert;

class Contact
{
    /**
     * @var string
     *
     * @Assert\NotBlank(message="Ce champ ne peut pas être vide.")
     */
    private $firstName;

    /**
     * @var string
     *
     * @Assert\NotBlank(message="Ce champ ne peut pas être vide.")
     */
    private $lastName;

    /**
     * @var string
     *
     * @Assert\NotBlank(message="Ce champ ne peut pas être vide.")
     * @Assert\Email(message="L'email {{ value }} n'est pas valide.")
     */
    private $email;

    /**
     * @var string
     *
     * @Assert\NotBlank(message="Ce champ ne peut pas être vide.")
     * @Assert\Length(min="25", minMessage="Votre message doit contenir au minimum {{ limit }} caractères.")
     */
    private $message;
```

Afin de définir les validateurs, nous devons mettre en place des annotations sur les propriétés de notre classe. Nous pouvons utiliser ces dernières pour définir des contraintes par l'intermédiaire de ce qu'on appelle des **Asserts**.

:::tip
Par convention, nous avons donné un alias de **Assert** au dossier **Symfony\Component\Validator\Constraints** lors de l'import grâce au mot-clés PHP **as**. Cette astuce permet de faciliter l'utilisation des différentes classes de **Constraints**.
:::

La première ligne applique la contrainte **NotBlank** à la propriété **name**. Les validateurs sont aussi simples qu'ils y paraissent, celui-ci se contente de renvoyer vrai si la valeur à valider n'est pas vide. Nous mettons ensuite en place la validation pour le champ email. Le système de validation nous fournit en effet une règle de validation pour ce type de champ. Pour l'attribut message, nous voulons à la fois nous assurer que le champ n'est pas vide et qu'il soit composé au minimum de 25 caractères, ce qui est fait avec les contraintes **NotBlank** et **Length**.

Une liste complète des contraintes de validation est disponible dans la [documentation du composant](https://symfony.com/doc/current/validation.html#constraints).

Il est également possible de créer des **règles de validation personnalisées**.

Vous pouvez maintenant soumettre le formulaire de contact, et les données soumises passent dans les contraintes de validation. Essayez de mettre une adresse email invalide. Vous devriez voir un message d'erreur qui vous informe que l'adresse n'est pas valide. Chaque validateur propose un message par défaut qui peut être remplacé si nécessaire.

::: tip
Si nous n'avions pas supprimé le composant **translation**, nous n'aurions pas été obligé de préciser les messages d'erreurs. Ils auraient été donnés en fonction de la locale configurée dans la bonne langue. Dommage !
:::

::: danger
Il est nécessaire de toujours mettre en place cette validation ! En effet, vous l'aurez peut-être constaté, sans celle-ci une validation est proposée en HTML5, celle-ci est très pratique mais n'est appliquée que côté client. Donc si votre visiteur arrive à contourner ces règles il pourra sans problème soumettre les valeurs qu'il souhaite, sauf si vous avez mis en place une validation effectuant un contrôle côté serveur également.
:::

## Les messages flash

Nous disposons d'un formulaire qui, certes ne fait pas grand chose pour l'instant, mais une fois ce dernier validé il n'y a aucun message de confirmation indiquant au visiteur que ce dernier a bien été envoyé. Nous allons donc voir comment créer des **messages flash** permettant l'affichage de petits messages de confirmation. Ces messages passent par la **session**.

Ajoutons dans le contrôleur, à l'endroit où le formulaire est considéré comme valide, un nouveau message flash :

``` php
if ($form->isSubmitted() && $form->isValid()) {
    $this->addFlash('success', 'Merci, votre message a été pris en compte !');

    return $this->redirectToRoute('main_contact');
}
```

Puis dans notre template, juste au dessus du formulaire :

``` twig
{% for message in app.flashes('success') %}
    <div class="alert alert-success" role="alert">
        {{ message }}
    </div>
{% endfor %}
```

Ou encore, si comme moi, vous voulez utiliser les noms de classes Bootstrap comme clés pour vos messages flash (info, success, warning, danger) :

``` twig
{# Affichera tout type de message avec le design approprié en utilisant Bootstrap et les bonnes clés #}

{% for flash_type, messages in app.flashes %}
    {% for message in messages %}
        <div class="alert alert-{{ flash_type }}" role="alert">
            {{ message }}
        </div>
    {% endfor %}
{% endfor %}
```

Le message flash ne s'affichera donc que lorsque ce dernier aura été inscrit en session par vos soins depuis le contrôleur. Cette session ne sera néanmoins valable que pour le **premier** affichage de vos messages. Si vous actualisez, ils disparaîtront.

## A vous de jouer

1. Créer la classe **App\Entity\Contact** représentant une demande de contact. Vous nommerez les informations liées à une demande de contact de la manière suivante : firstName, lastName, email, message.
2. Créer la classe **App\Form\ContactType** lié à votre nouvelle classe.
3. Modifier la afin de typer les champs du formulaire en fonction des besoins.
4. Compléter l'action liée à la page de contact au sein du contrôleur approprié afin d'y construire votre formulaire.
5. Afficher le formulaire dans le template associé à la page de contact.
6. Mettre à jour votre classe Contact en y intégrant une validation à l'aide des annotations.
7. Mettre en place un message de confirmation s'affichant une fois le formulaire validé.
