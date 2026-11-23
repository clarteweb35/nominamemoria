// Morceaux communs a toutes les pages : textes bilingues, en-tete HTML, barre du haut, pied de page.
import { PROGRAMME, METHODE } from '../programme.mjs';

// Texte court dans les deux langues (le CSS masque la langue non choisie).
export const t = (o) => `<span lang="fr">${o.fr}</span><span lang="en">${o.en}</span>`;

// Bloc (titre, paragraphe...) dans les deux langues.
export const bloc = (balise, o, classe = '') => {
  const c = classe ? ` class="${classe}"` : '';
  return `<${balise}${c} lang="fr">${o.fr}</${balise}><${balise}${c} lang="en">${o.en}</${balise}>`;
};

// Protege un texte place dans un attribut HTML (alt, title...).
export const attr = (texte) => String(texte).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

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
export function page({ titre, description, chemin, racine, imagePartage, marque, boutonHaut, contenu, pied }) {
  const urlPage = PROGRAMME.adresse + chemin;
  const urlImage = imagePartage ? PROGRAMME.adresse + imagePartage : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${titre}</title>
<meta name="description" content="${attr(description)}">
<link rel="canonical" href="${urlPage}">
<meta property="og:type" content="website">
<meta property="og:title" content="${attr(titre)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:url" content="${urlPage}">
${urlImage ? `<meta property="og:image" content="${urlImage}">\n<meta name="twitter:card" content="summary_large_image">` : ''}
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230f1d30'/%3E%3Ctext x='32' y='44' font-family='Georgia,serif' font-size='34' font-weight='700' fill='%23f0d9a8' text-anchor='middle'%3ENM%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${racine}style.css">
</head>
<body data-gtm="${PROGRAMME.idGoogleTagManager}">

<header class="barre" id="barre">
  <div class="conteneur">
    ${marque}
    <div class="barre-droite">
      <div class="choix-langue" role="group" aria-label="Langue / Language">
        <button type="button" data-langue="fr" lang="fr" aria-pressed="false">FR</button>
        <button type="button" data-langue="en" lang="en" aria-pressed="true">EN</button>
      </div>
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
    <a href="${racine}mentions-legales/">${t({ fr: 'Mentions légales et données personnelles', en: 'Legal notice and privacy' })}</a> ·
    <button type="button" class="lien-cookies" data-ouvrir-cookies>${t({ fr: 'Cookies', en: 'Cookie settings' })}</button>
  </div>
</footer>

<!-- Question prealable : rien de Google n'est charge avant un clic sur « Accepter » -->
<div class="bandeau-cookies" id="bandeau-cookies" role="dialog" aria-labelledby="titre-cookies" hidden>
  <div class="conteneur">
    <div>
      <p class="titre-cookies" id="titre-cookies">${t({ fr: 'Acceptez-vous la mesure d’audience ?', en: 'Do you accept audience measurement?' })}</p>
      ${bloc('p', {
        fr: `Avec votre accord, nous utilisons les outils de Google (Google Tag Manager) pour savoir combien de personnes visitent ce site et d’où elles viennent. Ces outils déposent des cookies. Sans accord, rien n’est chargé et le site fonctionne tout aussi bien. <a href="${racine}mentions-legales/#donnees">En savoir plus</a>`,
        en: `With your consent, we use Google tools (Google Tag Manager) to learn how many people visit this site and where they come from. These tools set cookies. Without consent, nothing is loaded and the site works just the same. <a href="${racine}mentions-legales/#donnees">Learn more</a>`,
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
  <button type="button" class="fermer" data-fermer-visionneuse aria-label="Fermer / Close">✕</button>
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
