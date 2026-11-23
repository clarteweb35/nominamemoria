// Morceaux communs a toutes les pages : textes bilingues, en-tete HTML, barre du haut, pied de page.
import { PROGRAMME, METHODE } from '../programme.mjs';

// Langue de la page en cours de fabrication : le site est produit une fois par langue
// (anglais a la racine, francais sous /fr/). construire.mjs appelle contexte() avant chaque rendu.
export const LANGUES = ['en', 'fr'];
const ctx = { lang: 'en' };
export const contexte = (lang) => { ctx.lang = lang; };
export const langue = () => ctx.lang;

// Texte d'un objet { fr, en } dans la langue de la page (sans balise).
export const tx = (o) => o[ctx.lang];

// Texte court dans la langue de la page.
export const t = (o) => o[ctx.lang];

// Bloc (titre, paragraphe...) dans la langue de la page.
export const bloc = (balise, o, classe = '') => {
  const c = classe ? ` class="${classe}"` : '';
  return `<${balise}${c}>${o[ctx.lang]}</${balise}>`;
};

// Chemin vers la racine du site depuis une page situee a `profondeur` dossiers de sa version linguistique
// (0 = accueil, 1 = /chaumere/...). Les pages francaises sont un dossier plus bas (/fr/...).
export const racineDe = (profondeur) => '../'.repeat(profondeur + (ctx.lang === 'fr' ? 1 : 0));

// Debut du chemin d'une page interne dans la langue courante : lien(racine) + 'a-propos/'.
export const lien = (racine, chemin = '') => (racine + (ctx.lang === 'fr' ? 'fr/' : '') + chemin) || './';

// Protege un texte place dans un attribut HTML (alt, title...).
export const attr = (texte) => String(texte).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

// Date de fabrication du site (AAAA-MM-JJ) : « derniere mise a jour » affichee en pied de page et declaree aux moteurs.
export const DATE_MAJ = new Date().toISOString().slice(0, 10);

// Texte sans balises HTML (pour les donnees structurees et llms.txt).
export const texteBrut = (html) => String(html).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

// Section « questions frequentes » : chaque question se deplie (details/summary, sans script).
// Le texte de la reponse est dans le HTML, donc lisible par les moteurs de recherche et les IA.
export function sectionFaq(questions, { surtitre, titre }) {
  return `
<!-- ============ QUESTIONS FREQUENTES ============ -->
<section class="faq" id="faq">
  <div class="conteneur etroit">
    <span class="surtitre">${t(surtitre)}</span>
    ${bloc('h2', titre)}
    <div class="faq-liste">
      ${questions.map((x) => `<details class="apparait"><summary>${t(x.q)}</summary><div class="faq-reponse">${bloc('p', x.r)}</div></details>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

// Donnees structurees schema.org « FAQPage » correspondant aux questions affichees.
export const donneesFaq = (questions) => ({
  '@type': 'FAQPage',
  inLanguage: ctx.lang,
  mainEntity: questions.map((x) => ({
    '@type': 'Question',
    name: texteBrut(t(x.q)),
    acceptedAnswer: { '@type': 'Answer', text: texteBrut(t(x.r)) },
  })),
});

// Association qui porte le programme, decrite pour les moteurs de recherche et les IA (schema.org « NGO »).
const noeudPorteur = () => {
  const p = PROGRAMME.porteur;
  return {
    '@type': 'NGO',
    '@id': `${p.site}#association`,
    name: p.nomComplet,
    alternateName: p.nom,
    url: p.site,
    logo: PROGRAMME.adresse + p.logo,
    address: { '@type': 'PostalAddress', streetAddress: p.siege, addressCountry: 'FR' },
    identifier: { '@type': 'PropertyValue', propertyID: 'RNA', value: p.rna },
    sameAs: [p.pageAssociation],
  };
};

// Section « la methode », identique sur toutes les pages.
export function sectionMethode(conclusion) {
  return `
<section class="pari">
  <div class="conteneur">
    <span class="surtitre">${t({ fr: 'La méthode Nomina Memoria', en: 'The Nomina Memoria method' })}</span>
    ${bloc('h2', { fr: 'L’IA au service de la mémoire, avec honnêteté', en: 'AI in the service of memory, honestly' })}
    <div class="etapes">
      ${METHODE.map((etape, i) => `
      <div class="carte apparait"><div class="num">${i + 1}</div><h3>${t(etape.titre)}</h3>${bloc('p', etape.texte)}</div>`).join('')}
    </div>
    <div class="encadre apparait">${bloc('p', conclusion)}</div>
  </div>
</section>`;
}

/**
 * Page complete.
 * racine : chemin vers la racine du site depuis la page ('' pour l'accueil, '../' pour un village).
 * Les liens sont relatifs : le site marche quel que soit l'endroit ou il est ouvert (OVH, ou dist/ sur l'ordinateur).
 */
export function page({ titre, description, chemin, racine, imagePartage, imageAlt, nomFil, aPropos, marque, boutonHaut, contenu, pied, donnees = [] }) {
  const lang = ctx.lang;
  const autre = lang === 'fr' ? 'en' : 'fr';
  const prefixe = (l) => (l === 'fr' ? 'fr/' : '');
  const urlPage = PROGRAMME.adresse + prefixe(lang) + chemin;
  const urlLangue = (l) => PROGRAMME.adresse + prefixe(l) + chemin;
  const hrefLangue = (l) => (racine + prefixe(l) + chemin) || './';
  const urlImage = imagePartage ? PROGRAMME.adresse + imagePartage : '';
  // Donnees structurees : l'association, le site, la page (avec sa date de mise a jour et son fil d'Ariane), puis ce que la page ajoute.
  const urlAccueil = PROGRAMME.adresse + prefixe(lang);
  const graphe = {
    '@context': 'https://schema.org',
    '@graph': [
      noeudPorteur(),
      { '@type': 'WebSite', '@id': `${PROGRAMME.adresse}#site`, name: PROGRAMME.nom, url: PROGRAMME.adresse, inLanguage: ['en', 'fr'], publisher: { '@id': `${PROGRAMME.porteur.site}#association` } },
      {
        '@type': 'WebPage',
        '@id': `${urlPage}#page`,
        url: urlPage,
        name: titre,
        description,
        inLanguage: lang,
        dateModified: DATE_MAJ,
        isPartOf: { '@id': `${PROGRAMME.adresse}#site` },
        ...(urlImage ? { primaryImageOfPage: urlImage } : {}),
        ...(aPropos ? { about: aPropos } : {}),
        ...(chemin ? { breadcrumb: { '@id': `${urlPage}#fil` } } : {}),
      },
      ...(chemin ? [{
        '@type': 'BreadcrumbList',
        '@id': `${urlPage}#fil`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: PROGRAMME.nom, item: urlAccueil },
          { '@type': 'ListItem', position: 2, name: nomFil || titre, item: urlPage },
        ],
      }] : []),
      ...donnees,
    ],
  };
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${titre}</title>
<meta name="description" content="${attr(description)}">
<link rel="canonical" href="${urlPage}">
<link rel="alternate" hreflang="en" href="${urlLangue('en')}">
<link rel="alternate" hreflang="fr" href="${urlLangue('fr')}">
<link rel="alternate" hreflang="x-default" href="${urlLangue('en')}">
<meta property="og:locale" content="${lang === 'fr' ? 'fr_FR' : 'en_GB'}">
<meta property="og:locale:alternate" content="${autre === 'fr' ? 'fr_FR' : 'en_GB'}">
<meta property="og:site_name" content="${PROGRAMME.nom}">
<meta property="og:type" content="website">
<meta property="og:title" content="${attr(titre)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:url" content="${urlPage}">
${urlImage ? `<meta property="og:image" content="${urlImage}">\n<meta property="og:image:alt" content="${attr(imageAlt || titre)}">\n<meta name="twitter:card" content="summary_large_image">` : ''}
<!-- Icone NM en Cinzel Decorative (images faites a partir de la police : une icone ne peut pas charger de police web) -->
<link rel="icon" type="image/png" sizes="32x32" href="${racine}icones/icone-32.png">
<link rel="icon" type="image/png" sizes="512x512" href="${racine}icones/icone-512.png">
<link rel="apple-touch-icon" href="${racine}icones/icone-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<!-- Lettrines N et M du titre (Cinzel Decorative) : seules ces deux lettres sont telechargees -->
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&text=NM&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${racine}style.css">
<script type="application/ld+json">${JSON.stringify(graphe).replace(/</g, '\\u003c')}</script>
</head>
<body data-gtm="${PROGRAMME.idGoogleTagManager}">

<header class="barre" id="barre">
  <div class="conteneur">
    ${marque}
    <div class="barre-droite">
      <nav class="choix-langue" aria-label="Langue / Language">
        <a href="${hrefLangue('fr')}" hreflang="fr" lang="fr" data-langue="fr"${lang === 'fr' ? ' aria-current="true"' : ''}>FR</a>
        <a href="${hrefLangue('en')}" hreflang="en" lang="en" data-langue="en"${lang === 'en' ? ' aria-current="true"' : ''}>EN</a>
      </nav>
      ${boutonHaut}
    </div>
  </div>
</header>
${contenu}
<footer>
  <div class="conteneur grille">
    ${pied}
  </div>
  <div class="conteneur pied-legal">
    <a href="${lien(racine)}a-propos/">${t({ fr: 'Qui sommes-nous ?', en: 'About us' })}</a> ·
    <a href="${lien(racine)}mentions-legales/">${t({ fr: 'Mentions légales et données personnelles', en: 'Legal notice and privacy' })}</a> ·
    <button type="button" class="lien-cookies" data-ouvrir-cookies>${t({ fr: 'Cookies', en: 'Cookie settings' })}</button> ·
    <span>${t({ fr: 'Mis à jour le', en: 'Last updated' })} <time datetime="${DATE_MAJ}">${new Date(DATE_MAJ).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time></span>
  </div>
</footer>

<!-- Question prealable : rien de Google n'est charge avant un clic sur « Accepter » -->
<div class="bandeau-cookies" id="bandeau-cookies" role="dialog" aria-labelledby="titre-cookies" hidden>
  <div class="conteneur">
    <div>
      <p class="titre-cookies" id="titre-cookies">${t({ fr: 'Acceptez-vous la mesure d’audience ?', en: 'Do you accept audience measurement?' })}</p>
      ${bloc('p', {
        fr: `Avec votre accord, nous utilisons les outils de Google (Google Tag Manager) pour savoir combien de personnes visitent ce site et d’où elles viennent. Ces outils déposent des cookies. Sans accord, rien n’est chargé et le site fonctionne tout aussi bien. <a href="${lien(racine)}mentions-legales/#donnees">En savoir plus</a>`,
        en: `With your consent, we use Google tools (Google Tag Manager) to learn how many people visit this site and where they come from. These tools set cookies. Without consent, nothing is loaded and the site works just the same. <a href="${lien(racine)}mentions-legales/#donnees">Learn more</a>`,
      })}
    </div>
    <div class="choix-cookies">
      <button type="button" class="bouton bouton-contour" data-choix-cookies="refuse">${t({ fr: 'Refuser', en: 'Decline' })}</button>
      <button type="button" class="bouton bouton-contour" data-choix-cookies="accepte">${t({ fr: 'Accepter', en: 'Accept' })}</button>
    </div>
  </div>
</div>

<!-- Affichage en grand des documents d'archives (images marquees data-agrandir) -->
<dialog class="visionneuse" id="visionneuse">
  <button type="button" class="fermer" data-fermer-visionneuse aria-label="${t({ fr: 'Fermer', en: 'Close' })}">✕</button>
  <img src="" alt="" id="visionneuse-image">
  <p class="visionneuse-aide">${t({ fr: 'Faites défiler pour explorer le document · Échap ou ✕ pour fermer', en: 'Scroll to explore the document · Esc or ✕ to close' })}</p>
</dialog>
<script src="${racine}script.js"></script>
</body>
</html>
`;
}

// Logo texte du programme (pas d'image : rien a heberger).
export const MONOGRAMME = '<span class="monogramme" aria-hidden="true">NM</span>';

// Nom du programme avec la premiere lettre de chaque mot en lettrine (grand titre et barre du haut).
export const nomOrne = () => PROGRAMME.nom.split(' ').map((mot) => `<span class="lettrine">${mot[0]}</span>${mot.slice(1)}`).join(' ');
