# Nomina Memoria

**Rendre leur nom aux oubliés, un village après l'autre.**
*Giving forgotten people their names back, one village at a time.*

Programme bilingue (français / anglais) qui fait revivre les registres anciens des villages grâce à l'IA et à des bénévoles, et qui cherche des soutiens : donateurs, mécènes, universités, chercheurs. Lancé par l'A3PC (Chaumeré, France), avec **Chaumeré comme village pilote**. Le site est conçu pour être **dupliqué** : un fichier par village.

- Dépôt : https://github.com/clarteweb35/nominamemoria
- Adresse principale : **https://nominamemoria.org/** (domaine acheté chez OVH le 23/11/2026), **hébergement OVH gratuit 100 Mo**, en ligne depuis le 23/11/2026 (cluster129, login FTP `nominae`). HTTPS : certificat SSL demandé, à vérifier ; une fois actif, ajouter `public/.htaccess` pour rediriger http vers https.
- Copie de secours : https://clarteweb35.github.io/nominamemoria/ (GitHub Pages, toujours à jour).
- Domaine optionnel : `nomina-memoria.eu` (non acheté).

## Hébergement OVH : comment ça marche

À chaque envoi sur GitHub (`main`), le déploiement automatique construit le site, le met sur GitHub Pages **et** le copie par FTP dans le dossier `www` de l'hébergement OVH. La copie OVH ne se fait que si les 3 identifiants FTP sont rangés dans GitHub : **Settings › Secrets and variables › Actions › New repository secret** :

| Nom du secret | Valeur (dans l'e-mail d'OVH « hébergement installé ») |
|---|---|
| `FTP_SERVEUR` | le serveur FTP, du type `ftp.clusterXXX.hosting.ovh.net` |
| `FTP_IDENTIFIANT` | l'identifiant FTP |
| `FTP_MOT_DE_PASSE` | le mot de passe FTP |

Le mot de passe n'est écrit nulle part ailleurs (ni dans le code, ni dans les notes). Côté OVH : la zone DNS est réglée automatiquement par OVH vers l'hébergement ; activer le certificat SSL gratuit (Let's Encrypt) dans Hébergements › Multisite pour avoir le cadenas (https).

Revenir à GitHub Pages plutôt qu'OVH : suivre la section « Relier le domaine » plus bas.

## Organisation des fichiers

| Fichier / dossier | Rôle |
|---|---|
| `programme.mjs` | Réglages communs : nom, accroche, adresse du site, porteur du programme, la méthode en 3 étapes. |
| `villages/<nom>.mjs` | **Tout ce qui est propre à un village** : textes FR/EN, chiffres, frise, façons de donner, liens, association locale. |
| `images/<nom>/` | Les photos du village. |
| `modeles/` | La mise en page : `accueil.mjs` (page du programme), `village.mjs` (page d'un village), `commun.mjs` (en-tête, langue, pied de page). |
| `public/` | `style.css` (couleurs et mise en page) et `script.js` (bouton de langue, liens e-mail, animations). |
| `construire.mjs` | Fabrique le site dans `dist/` et vérifie les villages. |
| `.github/workflows/deployer.yml` | À chaque envoi sur GitHub (`main`), le site est reconstruit et mis en ligne tout seul. |

Pages produites : `/` (accueil du programme) et `/<nom>/` pour chaque village (ex. `/chaumere/`).

## Voir le site sur son ordinateur

```
node construire.mjs
```
puis ouvrir `dist/index.html` par double-clic.

## Ajouter un village

1. Copier `villages/chaumere.mjs` en `villages/<nom>.mjs` (minuscules, sans accent, ex. `pire.mjs`).
2. Dans ce fichier : changer `slug` (le même nom, ex. `'pire'`), `ordre` (2, 3…), puis **chaque texte, en français ET en anglais**.
3. Mettre les photos dans `images/<nom>/` avec les noms indiqués dans le fichier (`images.entete`, `images.final`, `recit.figure.src`, `association.logo`).
4. Lancer `node construire.mjs` : il refuse de construire si un champ, une photo ou une traduction manque, et dit lequel.
5. Envoyer sur GitHub : le site se met à jour en quelques minutes.

**Règles** : ne publier que des faits sourcés (comme sur a3pc.fr) ; citer la source des documents d'archives dans la légende (pour l'Ille-et-Vilaine : « Archives départementales d'Ille-et-Vilaine, cote … ») ; ne jamais promettre d'avantage fiscal sans rescrit ; l'argent va à l'association locale du village, pas au programme.

## Relier le domaine à GitHub Pages au lieu d’OVH (solution de repli)

1. Créer le fichier `public/CNAME` contenant uniquement : `nominamemoria.org`
2. Dans `programme.mjs`, remplacer `adresse` par `'https://nominamemoria.org/'`.
3. Chez OVH, zone DNS du domaine : 4 enregistrements **A** pour `nominamemoria.org` vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, et un **CNAME** `www` vers `clarteweb35.github.io.`
4. Sur GitHub : Settings > Pages > Custom domain = `nominamemoria.org`, puis cocher « Enforce HTTPS » quand c'est proposé.

## Historique

- 20/11/2026 : première page « Soutenir Chaumeré » (FR/EN), d'abord pensée pour a3pc.fr, puis en site autonome.
- 23/11/2026 : nom choisi, **Nomina Memoria** ; site réorganisé en programme duplicable (accueil + Chaumeré en village pilote), mis sur GitHub.

## Reste à faire / décider

- Tester l’hébergement OVH (secrets FTP à ranger dans GitHub, SSL à activer), vérifier que le titulaire du domaine est l’A3PC et le renouvellement automatique.
- Pages `/soutenir-chaumere/` et `/support-chaumere/` déjà en ligne sur a3pc.fr : garder, retirer, ou remplacer par un encart renvoyant vers Nomina Memoria (recommandé).
- Pistes : un mot du président (FR/EN), une vraie campagne de dons HelloAsso dédiée, d'autres villages.
