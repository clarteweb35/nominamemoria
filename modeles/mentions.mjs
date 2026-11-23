// Page « Mentions legales et donnees personnelles » (/mentions-legales/), obligatoire pour un site edite en France.
import { PROGRAMME } from '../programme.mjs';
import { t, bloc, page, MONOGRAMME, nomOrne, racineDe, lien } from './commun.mjs';

export function pageMentions(villages) {
  const racine = racineDe(1);
  const p = PROGRAMME.porteur;

  // Chaque rubrique : un titre et des paragraphes, dans les deux langues (le HTML simple est autorise).
  const RUBRIQUES = [
    {
      titre: { fr: 'Éditeur du site', en: 'Publisher' },
      textes: [
        {
          fr: `<strong>${p.nom}</strong> – ${p.nomComplet}, association loi 1901, ${p.declaration.fr}. Siège : ${p.siege}. Numéro RNA : ${p.rna}. Site : <a href="${p.site}" target="_blank" rel="noopener">a3pc.fr</a>.`,
          en: `<strong>${p.nom}</strong> – ${p.nomComplet}, a French non-profit association under the 1901 law, ${p.declaration.en}. Registered office: ${p.siege}. RNA number: ${p.rna}. Website: <a href="${p.site}" target="_blank" rel="noopener">a3pc.fr</a>.`,
        },
        { fr: `Directeur de la publication : ${p.directeurPublication.fr}.`, en: `Publication director: ${p.directeurPublication.en}.` },
        {
          fr: `Contact : <a href="#" class="courriel" data-courriel="${p.courrielInverse}" data-sujet="Nomina Memoria : contact">écrire à l’association</a>.`,
          en: `Contact: <a href="#" class="courriel" data-courriel="${p.courrielInverse}" data-sujet="Nomina Memoria: contact">write to the association</a>.`,
        },
      ],
    },
    {
      titre: { fr: 'Hébergement et nom de domaine', en: 'Hosting and domain name' },
      textes: [
        {
          fr: 'Site hébergé par GitHub, Inc. (service GitHub Pages), 88 Colin P. Kelly Jr. St., San Francisco, CA 94107, États-Unis – pages.github.com.',
          en: 'Website hosted by GitHub, Inc. (GitHub Pages), 88 Colin P. Kelly Jr. St., San Francisco, CA 94107, USA – pages.github.com.',
        },
        {
          fr: 'Nom de domaine enregistré auprès d’OVH SAS, 2 rue Kellermann, 59100 Roubaix, France.',
          en: 'Domain name registered with OVH SAS, 2 rue Kellermann, 59100 Roubaix, France.',
        },
      ],
    },
    {
      titre: { fr: 'Textes, images et crédits', en: 'Texts, images and credits' },
      textes: [
        {
          fr: `Les textes sont la propriété de l’${p.nom}, sauf mention contraire. Les faits historiques sont repris du site <a href="${p.site}" target="_blank" rel="noopener">a3pc.fr</a>, qui cite ses sources.`,
          en: `Texts are the property of ${p.nom} unless stated otherwise. Historical facts come from the <a href="${p.site}" target="_blank" rel="noopener">a3pc.fr</a> website, which cites its sources.`,
        },
        {
          fr: 'Documents des Archives départementales d’Ille-et-Vilaine (registre paroissial de 1609, cote 10 NUM 35074/1 ; cadastre de 1830, cote 3 P 74) : réutilisation libre à condition de citer la source et la cote. Photographie de l’église Saint-Médard de Chaumeré : reprise du site de l’A3PC.',
          en: 'Documents from the Archives départementales d’Ille-et-Vilaine (1609 parish register, reference 10 NUM 35074/1; 1830 land survey, reference 3 P 74): free reuse provided the source and reference are cited. Photograph of the Saint-Médard church in Chaumeré: taken from the A3PC website.',
        },
      ],
    },
    {
      id: 'donnees',
      titre: { fr: 'Données personnelles et cookies', en: 'Personal data and cookies' },
      textes: [
        {
          fr: 'Ce site ne comporte ni formulaire ni compte utilisateur. Les dons et adhésions se font sur HelloAsso, site extérieur qui applique sa propre politique de confidentialité. Les boutons « Nous écrire » ouvrent simplement votre messagerie.',
          en: 'This website has no form and no user account. Donations and memberships are made on HelloAsso, an external website with its own privacy policy. The “Write to us” buttons simply open your email app.',
        },
        {
          fr: '<strong>Mesure d’audience (Google Tag Manager)</strong> : uniquement si vous l’acceptez dans le bandeau affiché à votre première visite. Elle utilise des outils de Google (Google Tag Manager, et les outils de mesure qu’il active, comme Google Analytics) qui déposent des cookies et reçoivent des informations de navigation (pages vues, provenance, type d’appareil, adresse IP). Finalité : savoir combien de personnes visitent le site et d’où elles viennent. Base légale : votre consentement. Google peut traiter ces données hors de l’Union européenne. <strong>Sans votre accord, aucun outil Google n’est chargé et aucun cookie n’est déposé.</strong>',
          en: '<strong>Audience measurement (Google Tag Manager)</strong>: only if you accept it in the banner shown on your first visit. It uses Google tools (Google Tag Manager and the measurement tools it activates, such as Google Analytics), which set cookies and receive browsing information (pages viewed, origin, device type, IP address). Purpose: to know how many people visit the site and where they come from. Legal basis: your consent. Google may process this data outside the European Union. <strong>Without your consent, no Google tool is loaded and no cookie is set.</strong>',
        },
        {
          fr: 'Votre choix est mémorisé dans votre navigateur (sans cookie). Vous pouvez le changer à tout moment avec le lien « Cookies » en bas de chaque page : un refus efface les cookies de mesure déjà déposés. Pour s’afficher, le site charge aussi des polices de caractères depuis Google Fonts, qui reçoit votre adresse IP. L’hébergeur GitHub conserve des journaux de connexion.',
          en: 'Your choice is stored in your browser (without a cookie). You can change it at any time with the “Cookie settings” link at the bottom of every page: declining deletes any measurement cookies already set. To display properly, the site also loads fonts from Google Fonts, which receives your IP address. The host, GitHub, keeps connection logs.',
        },
        {
          fr: `Conformément au RGPD, vous pouvez demander l’accès, la rectification ou la suppression des données vous concernant en écrivant à l’association, et adresser une réclamation à la CNIL (cnil.fr).`,
          en: `Under the GDPR, you may request access to, correction or deletion of your data by writing to the association, and lodge a complaint with the French data protection authority, the CNIL (cnil.fr).`,
        },
      ],
    },
  ];

  const contenu = `
<section class="legal">
  <div class="conteneur etroit">
    <span class="surtitre">${PROGRAMME.nom}</span>
    ${bloc('h1', { fr: 'Mentions légales et données personnelles', en: 'Legal notice and privacy' })}
    ${RUBRIQUES.map((r) => `
    <div class="rubrique"${r.id ? ` id="${r.id}"` : ''}>
      ${bloc('h2', r.titre)}
      ${r.textes.map((x) => bloc('p', x)).join('\n      ')}
    </div>`).join('')}
    <p class="retour"><a href="${lien(racine)}">← ${t({ fr: 'Retour à l’accueil', en: 'Back to home page' })}</a></p>
  </div>
</section>
`;

  const pied = `
    <div><strong class="clair">${PROGRAMME.nom}</strong> · ${t(PROGRAMME.accroche)}</div>
    <div>${t({ fr: 'Villages :', en: 'Villages:' })} ${villages.map((v) => `<a href="${lien(racine)}${v.slug}/">${v.nom}</a>`).join(' · ')}</div>`;

  return page({
    titre: `${PROGRAMME.nom} — ${t({ fr: 'Mentions légales', en: 'Legal notice' })}`,
    description: t({ fr: 'Mentions légales, données personnelles et cookies du site Nomina Memoria.', en: 'Legal notice, privacy and cookies of the Nomina Memoria website.' }),
    nomFil: t({ fr: 'Mentions légales', en: 'Legal notice' }),
    chemin: 'mentions-legales/',
    racine,
    imagePartage: '',
    marque: `<a href="${lien(racine)}" class="marque">${MONOGRAMME}<span>${nomOrne()}</span></a>`,
    boutonHaut: `<a href="${lien(racine)}#villages" class="bouton bouton-or bouton-petit">${t({ fr: 'Soutenir', en: 'Support' })}</a>`,
    contenu,
    pied,
  });
}
