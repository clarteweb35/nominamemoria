# Spécification fonctionnelle — Nomina Memoria

## 1. Objet

Programme bilingue (FR/EN) qui fait revivre les registres anciens des villages avec l'IA et des bénévoles, et qui cherche des soutiens : donateurs, mécènes, universités, chercheurs. Lancé par l'A3PC (Association pour la Promotion du Pays de Chaumeré), village pilote **Chaumeré** (Ille-et-Vilaine). Le site est conçu pour être **dupliqué** : un fichier par village.

Public visé : descendants et généalogistes (surtout hors de France), donateurs, universités et chercheurs, habitants d'autres villages qui voudraient lancer le programme.

## 2. Pages

| Page | Adresse EN / FR | Contenu |
|---|---|---|
| Accueil du programme | `/` · `/fr/` | Constat, méthode en 3 étapes (déchiffrer, vérifier, partager), liste des villages, « lancer votre village », universités/mécènes, FAQ, appel final. |
| Village | `/<slug>/` · `/fr/<slug>/` | En-tête, chiffres clés, récit + document d'archive (agrandissable), frise, « explorer les archives » (liens a3pc.fr, facultatif), méthode, dons, universités/mécènes, transparence, FAQ du village, appel final. |
| Qui sommes-nous | `/a-propos/` · `/fr/a-propos/` | Pourquoi deux noms (programme / association), où va le don, bureau, RNA. |
| Mentions légales | `/mentions-legales/` · `/fr/mentions-legales/` | Éditeur, hébergeur, données personnelles, cookies, crédits. |

## 3. Fonctionnalités

### 3.1 Bilinguisme
- Une URL par langue : anglais à la racine, français sous `/fr/`. Chaque page a son équivalent dans l'autre langue (`hreflang`, `x-default` = anglais).
- Sélecteur FR/EN = liens. `?lang=fr` (liens existants d'a3pc.fr) redirige vers le français. Le choix du visiteur est mémorisé (localStorage) et ne redirige que depuis la page anglaise.
- Aucun texte visible sans ses deux langues : le build le vérifie.

### 3.2 Pages village générées depuis `villages/<slug>.mjs`
- Champs obligatoires : `slug nom statut lieu periode resume association images titre accroche chiffres recit frise dons recherche transparence final liens` ; facultatifs : `explorer`, `seo`, `faq`, `pilote`, `ordre`.
- Cartes de don : lien de paiement (HelloAsso, nouvel onglet) ou e-mail pré-rempli. Encadré de confiance avant les dons (le nom sur HelloAsso est celui de l'association locale).
- Document d'archive cliquable en plein écran (`data-agrandir`, balise `dialog`), légende avec source et lien vers la transcription.

### 3.3 Dons et confiance
- Le don va à l'association locale du village. Mention « porté par l'A3PC » dans les en-têtes, boutons « Donner à l'A3PC », page Qui sommes-nous.
- Aucune promesse d'avantage fiscal ni de reçu (rescrit mécénat en préparation).
- Contact par e-mail uniquement via adresse inversée déchiffrée par script (anti-robots).

### 3.4 Cookies et mesure d'audience (RGPD)
- Bandeau de consentement ; Google Tag Manager (`GTM-P55LC6PV`) chargé uniquement après « Accepter » ; refus = cookies Google effacés ; choix modifiable via le lien « Cookies » du pied de page.

### 3.5 Référencement et IA
- Balises : title, description (≤ 160 caractères, vérifié au build), canonical, `hreflang`, Open Graph, `og:locale`.
- Données structurées schema.org : `NGO` (accueil et villages), `FAQPage` (FAQ).
- `sitemap.xml` (avec alternates linguistiques, `lastmod`), `robots.txt` (robots de recherche et d'IA expressément autorisés), `llms.txt`.
- Icônes d'onglet « NM » en Cinzel Decorative (images PNG pré-générées dans `public/icones/`).

### 3.6 Interface
- Barre du haut qui devient opaque au défilement ; apparition des blocs au défilement ; lettrines Cinzel Decorative (N et M) dans le titre ; responsive.

## 4. Contrôles du build (`node construire.mjs`)

Refus de construire, avec le détail, si : champ obligatoire manquant ; langue manquante (`fr` sans `en`) ; plusieurs villages pilotes ; slug dupliqué, invalide ou réservé (`fr a-propos mentions-legales images icones`) ; image citée absente ; adresse externe non `https://` ou invalide ; fichier commun absent ; description SEO trop longue. Après écriture : chaque lien interne, ressource et ancre du HTML produit doit exister, sans `id` en double. Les liens externes ne sont pas testés en ligne.

## 5. Contraintes

- Site 100 % statique, Node pur (aucune dépendance), construit par GitHub Actions et servi par GitHub Pages ; domaine `nominamemoria.org` (fichier `public/CNAME`).
- Pas de mot de passe ni de FTP ; liens relatifs (le site marche aussi ouvert depuis `dist/`).
- Polices Google Fonts (Fraunces, Inter, Cinzel Decorative limité aux lettres N et M).
- Ne publier que des faits sourcés ; citer la cote des archives.

## 6. Hors périmètre actuel

Pas de paiement sur le site (HelloAsso), pas de base de données ni de comptes, pas de moteur de recherche de noms (il est sur a3pc.fr), pas d'autre village que Chaumeré.
