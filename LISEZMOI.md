# Nomina Memoria

**Rendre leur nom aux oubliés, un village après l'autre.**
*Giving forgotten people their names back, one village at a time.*

Programme bilingue (français / anglais) qui fait revivre les registres anciens des villages grâce à l'IA et à des bénévoles, et qui cherche des soutiens : donateurs, mécènes, universités, chercheurs. Lancé par l'A3PC (Chaumeré, France), avec **Chaumeré comme village pilote**. Le site est conçu pour être **dupliqué** : un fichier par village.

- Dépôt du code : https://github.com/clarteweb35/nominamemoria (le code seulement : le site n'y est pas hébergé)
- Adresse principale : **https://nominamemoria.org/** (domaine acheté chez OVH le 23/11/2026), **hébergement OVH gratuit 100 Mo**, en ligne depuis le 23/11/2026 (cluster129, login FTP `nominae`). HTTPS : certificat SSL demandé, à vérifier ; une fois actif, ajouter `public/.htaccess` pour rediriger http vers https.
- **Hébergé uniquement chez OVH** (la copie GitHub Pages a été supprimée le 23/11/2026).
- **Langue : anglais par défaut**, bouton FR pour le français (choix mémorisé). Lien qui ouvre directement le français : ajouter `?lang=fr` à l'adresse (ex. `nominamemoria.org/chaumere/?lang=fr`, utilisé par a3pc.fr).
- Domaine optionnel : `nomina-memoria.eu` (non acheté).

## Hébergement OVH : comment ça marche

À chaque envoi sur GitHub (`main`), GitHub construit le site et le copie par FTP dans le dossier `www` de l'hébergement OVH (GitHub sert d'outil de livraison, pas d'hébergeur). Il faut que les 3 identifiants FTP soient rangés dans GitHub (c'est fait) : **Settings › Secrets and variables › Actions › New repository secret** :

| Nom du secret | Valeur (dans l'e-mail d'OVH « hébergement installé ») |
|---|---|
| `FTP_SERVEUR` | le serveur FTP, du type `ftp.clusterXXX.hosting.ovh.net` |
| `FTP_IDENTIFIANT` | l'identifiant FTP |
| `FTP_MOT_DE_PASSE` | le mot de passe FTP |

Le mot de passe n'est écrit nulle part ailleurs (ni dans le code, ni dans les notes). Côté OVH : la zone DNS est réglée automatiquement par OVH vers l'hébergement ; activer le certificat SSL gratuit (Let's Encrypt) dans Hébergements › Multisite pour avoir le cadenas (https).

Changer de mot de passe FTP chez OVH : penser à remplacer aussi le secret `FTP_MOT_DE_PASSE` dans GitHub, sinon la mise en ligne échoue.

## Organisation des fichiers

| Fichier / dossier | Rôle |
|---|---|
| `programme.mjs` | Réglages communs : nom, accroche, adresse du site, porteur du programme, la méthode en 3 étapes. |
| `villages/<nom>.mjs` | **Tout ce qui est propre à un village** : textes FR/EN, chiffres, frise, façons de donner, liens, association locale. |
| `images/<nom>/` | Les photos du village. |
| `modeles/` | La mise en page : `accueil.mjs` (page du programme), `village.mjs` (page d'un village), `commun.mjs` (en-tête, langue, pied de page). |
| `public/` | `style.css` (couleurs et mise en page) et `script.js` (bouton de langue, liens e-mail, animations). |
| `construire.mjs` | Fabrique le site dans `dist/` et vérifie les villages. |
| `.github/workflows/deployer.yml` | À chaque envoi sur GitHub (`main`), le site est reconstruit et envoyé chez OVH tout seul. |

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

## Historique

- 20/11/2026 : première page « Soutenir Chaumeré » (FR/EN), d'abord pensée pour a3pc.fr, puis en site autonome.
- 23/11/2026 : nom choisi, **Nomina Memoria** ; site réorganisé en programme duplicable (accueil + Chaumeré en village pilote), mis sur GitHub ; domaine nominamemoria.org acheté, hébergement OVH gratuit 100 Mo (seul hébergeur), anglais par défaut.

## Reste à faire / décider

- HTTPS : vérifier que le certificat SSL OVH est actif, puis ajouter `public/.htaccess` (redirection http → https). Vérifier que le titulaire du domaine est l’A3PC et le renouvellement automatique.
- a3pc.fr : les anciennes pages /soutenir-chaumere/ et /support-chaumere/ renvoient vers Nomina Memoria (23/11/2026).
- Pistes : un mot du président (FR/EN), une vraie campagne de dons HelloAsso dédiée, d'autres villages.
