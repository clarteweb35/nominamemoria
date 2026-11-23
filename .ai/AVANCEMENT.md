# Avancement — Nomina Memoria

Dernière mise à jour : 23/11/2026. À tenir à jour à la fin de chaque session.

## Fait (commité et en ligne)

- Site programme + village pilote Chaumeré, FR/EN, hébergé sur GitHub Pages, domaine nominamemoria.org (DNS OVH basculé).
- Page Qui sommes-nous, mentions légales, bandeau de cookies et GTM après consentement.
- Confiance des donateurs : mention « porté par l'A3PC », encadré avant les dons, boutons « Donner à l'A3PC ».
- Identité : lettrines Cinzel Decorative, icône d'onglet NM, pied de page et bandeau compacts, légende du document en fond.
- **Architecture (commit 9ae8eca)** : une URL par langue (EN racine, FR sous `/fr/`) avec `hreflang` ; accueil découplé de Chaumeré (village `pilote: true`, `porteur.commune`) ; `sitemap.xml`, `robots.txt`, données structurées `NGO` ; contrôles de build étendus (images, https, liens internes, ancres, ids).
- Sitemap soumis dans Google Search Console (fait par l'utilisateur).

## En cours (modifié dans l'arbre de travail, NON commité)

- Référencement et IA : `referencement.mjs` (robots.txt avec robots d'IA, `llms.txt`), `SEO` et `FAQ` dans `programme.mjs`, `seo` et `faq` dans `villages/chaumere.mjs`, `FAQPage` et `DATE_MAJ`/`lastmod` dans `modeles/commun.mjs`, contrôle des descriptions ≤ 160 caractères dans `construire.mjs`.
- État : `node construire.mjs` réussit. À relire, commiter et pousser quand l'utilisateur le décide.

## À faire / à décider

- Remplacer les liens `?lang=fr` d'a3pc.fr par des liens directs `/fr/...` (facultatif, l'ancien format marche).
- Activer « Enforce HTTPS » dans GitHub Pages si ce n'est pas fait ; passer les liens d'a3pc.fr en https.
- Changer le mot de passe FTP OVH (il a circulé en clair) ou résilier l'hébergement OVH gratuit devenu inutile ; vérifier que le titulaire du domaine est l'A3PC.
- Rescrit mécénat (don déductible) : en préparation côté association ; le site ne promet rien tant qu'il n'est pas obtenu.
- Pistes : mot du président (FR/EN), vraie campagne de dons HelloAsso dédiée, d'autres villages, dictionnaire central des textes d'interface (aujourd'hui écrits dans les modèles), test de liens externes en ligne, tests du HTML produit (validité).

## Décisions importantes

- 23/11/2026 : abandon de l'hébergement OVH (FTP non chiffré) pour GitHub Pages ; aucun secret dans GitHub.
- 23/11/2026 : anglais par défaut ; une URL par langue plutôt qu'un masquage CSS (meilleur référencement, page deux fois moins lourde).
- Node pur sans dépendance : rien à mettre à jour, aucune faille de bibliothèque.
