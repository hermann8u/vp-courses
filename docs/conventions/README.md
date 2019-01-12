# Conventions de codage

Lorsque l'on travaille en équipe, il est toujours agréable de trouver du code bien formatté dès qu'on ouvre un projet. D'ailleurs, il n'est pas rare que des collègues partagent entre eux des conventions.

Il existe des [conventions de codages](https://symfony.com/doc/current/contributing/code/standards.html) pour les développeurs Symfony. Je ne vous demande pas de toutes les suivre, mais il est important d'en avoir quelques-unes tout de même (d'autant plus quelles compteront dans la note du projet final) !

## Les classes et fonctions
 Les classes et fonctions doivent toutes avoir leur accolade ouvrante à la ligne :

 ``` php {7,8,16,17}
<?php 

namespace Acme;

use Acme\DummyClass;

class FooBar
{
	const SOME_CONST = 42;

	private $fooBar;

	/**
	 * @param string $dummy Some argument description
	 */
	public function __construct(DummyClass $dummy)
	{
		$this->fooBar = $this->transformText($dummy);
	}
}

```

## Les boucles et structures conditionnelles
Les boucles et structures conditionnelles doivent avoir leur accolade ouvrante sur la même ligne précédée d'un espace. Notez également la position des espaces après les mots clés.

 ``` php {3,7,9,11}
<?php

foreach ($items as $key => $item) {
    // Do something ...
}

if ($product) {
    // Do something ...
} elseif ($product === null) {
    // Do something else if ...
} else {
    // Do something else ...
}

```

## Opérateur de comparaison

Il faut utiliser la comparaison stricte afin de comparer aussi le type des variables. J'ai également typé le paramètre de la fonction (depuis la version de PHP 7.1 pour les types scalaires) avec le mot clé **bool** ce qui produira une erreur si ce n'est pas un booléen.

 ``` php {6,10}
<?php

public function dummyFunction(bool $theBoolean)
{

    if ($theBoolean === []) {
        throw new \Exception("This code will not be executed");
    }

    if ($theBoolean == []) {
        throw new \Exception("This code will be executed and shouldn't");
    }
}

dummyFunction(false);
```

## Syntaxe des array

Utilisez la syntaxe courte des array qui est disponible depuis PHP 5.4

 ``` php {4}
<?php

// Do this
$array = [];

// Not this
$array = array();

```