# Nomina Memoria — consignes pour Claude

Site statique bilingue (anglais à la racine, français sous `/fr/`) du programme **Nomina Memoria**, porté par l'A3PC (Chaumeré, France). Village pilote : Chaumeré. Site publié par GitHub Pages sur https://nominamemoria.org/ (domaine OVH). Dépôt : https://github.com/clarteweb35/nominamemoria

## À lire avant de travailler

- `.ai/SYSTEM_PROMPT.md` : **le prompt système du projet** (objectif, principes SSOT / DRY / KISS / fail fast, règles de contenu, méthode, dettes connues). À suivre à la lettre.
- `.ai/SPEC_FONCTIONNALITES.md` : ce que le site doit faire (fonctionnalités, règles, contraintes).
- `.ai/AVANCEMENT.md` : ce qui est fait, en cours, à faire. **À mettre à jour à la fin de chaque session de travail.**
- `LISEZMOI.md` : organisation des fichiers, hébergement/DNS, procédure « ajouter un village », historique.

## Commandes

- `node construire.mjs` : fabrique `dist/` (les deux langues), vérifie les villages et contrôle les liens internes. Aucune dépendance, pas de `npm install`.
- Voir le site : ouvrir `dist/index.html` (les liens sont relatifs, ça marche sans serveur).
- Déploiement : un envoi sur `main` lance `.github/workflows/deployer.yml` (build puis GitHub Pages). Ne pas commiter ni pousser sans demande de l'utilisateur.

## Architecture

- `programme.mjs` : réglages communs (nom, adresse, porteur, méthode, SEO de l'accueil, FAQ).
- `villages/<slug>.mjs` : **tout** ce qui est propre à un village. Un fichier par village, un seul `pilote: true`.
- `modeles/` : mise en page (`commun.mjs` = en-tête, pied, langue, `t()`/`bloc()`/`lien()`/`racineDe()` ; `accueil`, `village`, `apropos`, `mentions`).
- `construire.mjs` : lit les villages, les vérifie, rend chaque page **une fois par langue** (`contexte(lang)` avant chaque rendu), écrit sitemap, robots, llms.txt (`referencement.mjs`), puis contrôle le HTML produit.
- `public/` : `style.css`, `script.js`, `CNAME`, `icones/` (copiés tels quels dans `dist/`). `images/<slug>/` : photos.

## Règles à respecter

- **Langue** : tout texte visible existe en `{ fr, en }`. Dans les modèles, passer par `t()`, `bloc()` ou `tx()` ; jamais de texte d'une seule langue en dur (sauf noms propres). Les liens entre pages internes passent par `lien(racine)` (préfixe `/fr/` automatique) ; les ressources (images, CSS) par `racine`.
- **Pas de texte propre à un village dans `accueil.mjs`** ni dans `programme.mjs` : il vient du fichier du village (pilote) ou de `PROGRAMME.porteur`.
- **Faits sourcés uniquement** ; citer la source des archives (Archives départementales d'Ille-et-Vilaine, cote…). Ne jamais promettre d'avantage fiscal (rescrit mécénat en préparation). L'argent va à l'association locale du village, pas au programme.
- **RGPD** : Google Tag Manager n'est chargé qu'après « Accepter » dans le bandeau de cookies. Ne jamais coller la balise Google en dur. Mettre à jour les mentions légales si un outil collectant des données est ajouté.
- **Sécurité** : pas de mot de passe ni de FTP (l'hébergement OVH a été abandonné pour cette raison). Les adresses e-mail sont écrites à l'envers dans le HTML (`courrielInverse`).
- **Pas de dépendance** (npm, bibliothèques JS) sans raison solide : le projet reste en Node pur.
- Après toute modification des modèles ou des villages : lancer `node construire.mjs` et corriger jusqu'à son succès. Il refuse de construire si un champ, une image, une traduction ou un lien interne manque.

## Style

- Code et commentaires en français (sans accents dans les commentaires et identifiants, comme l'existant) ; textes du site avec accents corrects.
- Nouveaux fichiers : même ton que l'existant (court, commenté en français simple). Fins de ligne : Git convertit LF/CRLF, ne pas s'en soucier.
- Attention aux apostrophes typographiques (’) dans les textes du site : les conserver.
