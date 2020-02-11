---
sidebarDepth: 0
---

# Partager son projet avec Git et Github

Dans le but de partager votre projet avec moi, vous aurez besoin d'utiliser Git et Github.

::: warning
Ce n'est pas une introduction à Git et à son workflow complet. Je vais seulement vous expliquer comment l'utiliser pour que vous puissiez me partager votre projet. C'est pourquoi nous utiliserons seulement la branche **master** pour travailler.
:::

## Initialisation

Pour commencer vous aurez besoin d'[installer Git](https://git-scm.com/downloads) sur votre PC (si ce n'est pas déjà fait) et de créer votre compte sur [Github](https://github.com).

### Sur Github

On va commencer par initialiser le repository distant sur Github avec les options suivantes, en remplaçant bien sûr fhermann par la première lettre de votre prénom suivi de votre nom :

![Initialisation d'un nouveau repository](/img/git/new-repo.png)

### Sur votre PC

Ouvrez une invite de commande à la racine de votre projet et exécuter les commandes suivantes :

``` bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/hermann8u/symfony_procost_fhermann.git
git push -u origin master
```

Revoyons pas à pas ce qui a été réalisé ici :
- On initialise Git dans le projet.
- On ajoute tous les fichiers et leurs modifications juste avant de commit, à l'exception de ceux exclus par le fichier *.gitignore* que Symfony Flex a généré pour nous. Vous n'avez donc pas besoin de vous en occuper vous-même.
- On *commit* ces changements avec un message expliquant son contenu pour que Git puisse enregistrer notre code dans l'état actuel.
- On ajoute un *remote* qui correspond à notre repository distant sur Github en tant que *origin*. N'oubliez pas de changer le lien pour qu'il corresponde à votre repository.
- On envoie (ou *push*) les changements sur le serveur pour la première fois. L'option --set-upstream (ici raccourcie en *-u*) nous permettra de ne plus avoir à préciser le remote (ici origin) et la branche (ici master) pour les prochains push.

### Autoriser l'accès à une autre personne

Pour que je puisse accéder à votre repository. Il va falloir suivre les étapes suivantes :
- Depuis votre repository sur Github, allez dans l'onglet **Settings**
- Puis dans le sous onglet **Collaborators** ou (Collaborateurs en français)
- Autorisez l'utilisateur **hermann8u**

## Mise à jour du projet sur Github

Pour mettre votre projet à jour sur Github, vous devrez exécuter les commandes suivantes à chaque fois.
``` bash
git add .
git commit -m "Message de commit"
git push
```
