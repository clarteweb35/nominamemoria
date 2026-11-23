# Nomina Memoria

**Rendre leur nom aux oubliés, un village après l'autre.**
*Giving forgotten people their names back, one village at a time.*

Programme bilingue (français / anglais) qui fait revivre les registres anciens des villages grâce à l'IA et à des bénévoles, et qui cherche des soutiens : donateurs, mécènes, universités, chercheurs. Lancé par l'A3PC (Chaumeré, France), avec **Chaumeré comme village pilote**. Le site est conçu pour être **dupliqué** : un fichier par village.

- Dépôt du code : https://github.com/clarteweb35/nominamemoria
- Adresse : **https://nominamemoria.org/** : domaine acheté chez OVH (titulaire à vérifier : A3PC), **site affiché par GitHub Pages** (gratuit, HTTPS automatique).
- **Langue : anglais par défaut**, bouton FR pour le français (choix mémorisé). Lien qui ouvre directement le français : ajouter `?lang=fr` à l'adresse (ex. `nominamemoria.org/chaumere/?lang=fr`, utilisé par a3pc.fr).
- Domaine optionnel : `nomina-memoria.eu` (non acheté).

## Hébergement : pourquoi GitHub Pages et pas OVH

Le 23/11/2026, le site a d'abord été hébergé sur l'offre gratuite d'OVH (100 Mo), alimentée par FTP depuis GitHub. **Abandonné le jour même** : le serveur FTP d'OVH refuse le chiffrement (FTPS : « security scheme not implemented ») et le SFTP n'est pas accessible avec l'offre gratuite. Le mot de passe circulait donc en clair, risque inacceptable pour un site de dons (un pirate pourrait changer le lien de paiement). Les secrets FTP ont été supprimés de GitHub.

Fonctionnement actuel : à chaque envoi sur GitHub (`main`), GitHub construit le site et le publie lui-même sur GitHub Pages, sans aucun mot de passe. Le fichier `public/CNAME` déclare le domaine `nominamemoria.org`.

**Zone DNS chez OVH** (Noms de domaine › nominamemoria.org › Zone DNS) :

| Type | Sous-domaine | Cible |
|---|---|---|
| A | (vide) | 185.199.108.153 |
| A | (vide) | 185.199.109.153 |
| A | (vide) | 185.199.110.153 |
| A | (vide) | 185.199.111.153 |
| AAAA | (vide) | 2606:50c0:8000::153 (et 8001, 8002, 8003) |
| CNAME | www | clarteweb35.github.io. |

Aucun autre enregistrement A, AAAA ou CNAME pour `nominamemoria.org` et `www` (supprimer ceux qui pointaient vers l'hébergement OVH). Ne pas toucher aux MX (e-mails), NS et TXT. Ensuite, sur GitHub : Settings › Pages › cocher **Enforce HTTPS** dès que c'est proposé.

## Organisation des fichiers

| Fichier / dossier | Rôle |
|---|---|
| `programme.mjs` | Réglages communs : nom, accroche, adresse du site, porteur du programme, la méthode en 3 étapes. |
| `villages/<nom>.mjs` | **Tout ce qui est propre à un village** : textes FR/EN, chiffres, frise, façons de donner, liens, association locale. |
| `images/<nom>/` | Les photos du village. |
| `modeles/` | La mise en page : `accueil.mjs` (page du programme), `village.mjs` (page d'un village), `commun.mjs` (en-tête, langue, pied de page). |
| `public/` | `style.css` (couleurs et mise en page), `script.js` (bouton de langue, liens e-mail, animations), `CNAME` (le domaine). |
| `construire.mjs` | Fabrique le site dans `dist/` et vérifie les villages. |
| `.github/workflows/deployer.yml` | À chaque envoi sur GitHub (`main`), le site est reconstruit et publié sur GitHub Pages tout seul. |

Pages produites : `/` (accueil du programme) et `/<nom>/` pour chaque village (ex. `/chaumere/`).

## Cookies, Google et mentions légales

- **Google Tag Manager** (`GTM-P55LC6PV`, réglé dans `programme.mjs`) n'est chargé **qu'après « Accepter »** dans le bandeau de cookies (question préalable obligatoire, RGPD/CNIL). Refuser n'en charge rien et efface les cookies Google. Choix gardé dans le navigateur ; lien « Cookies » en bas de page pour en changer. Ne jamais coller la balise Google en dur dans les pages.
- Page **/mentions-legales/** (`modeles/mentions.mjs`) : éditeur (A3PC), directeur de la publication, hébergeur GitHub, domaine OVH, crédits, données personnelles et cookies. À mettre à jour si on ajoute un outil qui collecte des données.
- **Documents en grand** : une image placée dans un lien `data-agrandir` s'ouvre en plein écran au clic (utilisé pour le registre de la page village).
- Section **« Explorer les archives »** de la page village (`explorer` dans le fichier du village, facultative) : liens vers la recherche de noms, les actes transcrits, l'index des noms et les familles sur a3pc.fr.

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
- 23/11/2026 : nom choisi, **Nomina Memoria** ; site réorganisé en programme duplicable (accueil + Chaumeré en village pilote), mis sur GitHub ; domaine nominamemoria.org acheté, hébergement OVH gratuit 100 Mo (seul hébergeur), anglais par défaut ; le soir même, retour à GitHub Pages pour l'affichage (FTP OVH non chiffré).

## Reste à faire / décider

- DNS OVH à basculer vers GitHub (tableau ci-dessus), puis Enforce HTTPS, puis liens d'a3pc.fr en https. Changer le mot de passe FTP OVH (il a circulé en clair) ou résilier l'hébergement gratuit OVH, devenu inutile. Vérifier que le titulaire du domaine est l'A3PC.
- a3pc.fr : les anciennes pages /soutenir-chaumere/ et /support-chaumere/ renvoient vers Nomina Memoria (23/11/2026).
- Pistes : un mot du président (FR/EN), une vraie campagne de dons HelloAsso dédiée, d'autres villages.
