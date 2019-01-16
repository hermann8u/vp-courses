# Bundles, Flex et auto-configuration

## Qu'est ce qu'un bundle ?
Les bundles sont les blocs de construction élémentaires de n'importe quelle application Symfony, en fait le framework Symfony est lui même un bundle. Les bundles permettent de séparer le code en briques fonctionnelles et réutilisables. Ils encapsulent le fonctionnement des diverses composantes telles que les contrôleurs, le modèle, les templates ainsi que les diverses ressources, aussi bien images que CSS.

Avant la version 4 de Symfony, il était recommandé d'organiser son code en utilisant les bundles. C'est à dire que le code source de l'application (le dossier **/src/**) était divisé en bundle. Ce n'est plus le cas et les bundles doivent être seulement utilisés pour partager du code et des fonctionnalités d'un projet à un autre.

::: tip
Les bundles restent très important dans Symfony. Sur internet, on trouve une multitude de bundles nous permettant d'intégrer des fonctionnalités déjà développer.
:::

### Quelques bundles à connaître/utiliser

- symfony/maker-bundle
- symfony/webpack-encore-bundle
- WhiteOctoberPagerFantaBundle
- StofDoctrineExtensionsBundle
- FosRestBundle
- FosElasticaBundle
- FosJsRoutingBundle
- lexik/jwt-authentication-bundle
- easycorp/easyadmin-bundle
- api-platform/api-pack
- liip/imagine-bundle
- sensio/framework-extra-bundle

## Symfony 4 et Flex

Symfony Flex est une nouveauté de Symfony 4.