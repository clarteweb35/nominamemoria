// Page « Qui sommes-nous / About us » (/a-propos/) : qui porte le programme, pourquoi deux noms, ou va l'argent.
// But : qu'un donateur ne soit jamais surpris de voir le nom de l'association locale sur HelloAsso.
import { PROGRAMME } from '../programme.mjs';
import { t, bloc, attr, page, MONOGRAMME, nomOrne, racineDe, lien } from './commun.mjs';

export function pageAPropos(villages) {
  const racine = racineDe(1);
  const p = PROGRAMME.porteur;

  const contenu = `
<section class="legal apropos">
  <div class="conteneur etroit">
    <span class="surtitre">${t({ fr: 'Qui sommes-nous ?', en: 'Who are we?' })}</span>
    ${bloc('h1', { fr: `${PROGRAMME.nom} est un programme de l’${p.nom}`, en: `${PROGRAMME.nom} is a programme run by ${p.nom}` })}

    <div class="carte-porteur">
      <img src="${racine}${p.logo}" alt="${attr('Logo ' + p.nom)}" width="88" height="88">
      <div>
        <strong>${p.nom}</strong> — ${p.nomComplet}<br>
        ${t({ fr: 'Association loi 1901 (France)', en: 'French non-profit association (1901 law)' })} · RNA ${p.rna}<br>
        <a href="${p.pageAssociation}" target="_blank" rel="noopener">${t({ fr: 'Voir le site de l’association', en: 'Visit the association’s website (in French)' })} ↗</a>
      </div>
    </div>

    <div class="rubrique">
      ${bloc('h2', { fr: 'Pourquoi deux noms ?', en: 'Why two names?' })}
      ${bloc('p', {
        fr: `L’<strong>${p.nom}</strong> (${p.nomComplet}) est une association de bénévoles de Chaumeré, un village de Bretagne. Elle fait vivre le village et a lancé le déchiffrement de ses archives avec l’aide de l’intelligence artificielle.`,
        en: `<strong>${p.nom}</strong> (${p.nomComplet}, “Association for the Promotion of the Chaumeré area”) is a volunteer-run association in Chaumeré, a village in Brittany, France. It keeps village life going and started deciphering the village archives with the help of artificial intelligence.`,
      })}
      ${bloc('p', {
        fr: `<strong>${PROGRAMME.nom}</strong> (« les noms, la mémoire » en latin) est le nom de ce projet, pensé pour être repris par d’autres villages. Chaumeré en est le village pilote, et l’${p.nom} en est le porteur.`,
        en: `<strong>${PROGRAMME.nom}</strong> (Latin for “names, memory”) is the name of this project, designed to be taken up by other villages. Chaumeré is the pilot village, and ${p.nom} runs the programme.`,
      })}
    </div>

    <div class="rubrique encadre-don">
      ${bloc('h2', { fr: 'Où va votre don ?', en: 'Where does your gift go?' })}
      ${bloc('p', {
        fr: `<strong>Directement à l’association du village.</strong> Pour Chaumeré, c’est l’${p.nom}. Les dons et adhésions passent par <strong>HelloAsso</strong>, la plateforme de paiement des associations françaises : sur sa page, vous verrez le nom complet de l’association, <strong>« ${p.nomComplet} »</strong>. C’est bien nous.`,
        en: `<strong>Directly to the village’s association.</strong> For Chaumeré, that is ${p.nom}. Gifts and memberships go through <strong>HelloAsso</strong>, the French payment platform for non-profits: on its page you will see the association’s full name, <strong>“${p.nomComplet}”</strong>. That is us.`,
      })}
      ${bloc('p', {
        fr: 'Aucun intermédiaire ne prélève de part sur votre don. HelloAsso propose une contribution volontaire à son propre fonctionnement : elle est facultative.',
        en: 'No intermediary takes a share of your gift. HelloAsso suggests a voluntary tip for its own running costs: it is optional.',
      })}
      ${bloc('p', {
        fr: '<strong>Aucun reçu fiscal ni avantage fiscal n’est garanti à ce stade</strong> : une demande de rescrit mécénat est en préparation auprès de l’administration fiscale française.',
        en: '<strong>No tax receipt or tax benefit can be promised at this stage</strong>: a request for a tax-deductibility ruling is being prepared with the French tax authorities. A3PC is not a US 501(c)(3) organisation.',
      })}
    </div>

    <div class="rubrique">
      ${bloc('h2', { fr: 'Les personnes derrière le projet', en: 'The people behind the project' })}
      ${bloc('p', {
        fr: `Le bureau de l’${p.nom}, élu lors de l’assemblée générale constitutive du 27 septembre 2026 :`,
        en: `The ${p.nom} board, elected at the founding general meeting on 27 September 2026:`,
      })}
      <ul class="liste-bureau">
        ${p.bureau.map((m) => `<li><strong>${m.nom}</strong> — ${t(m.role)}</li>`).join('\n        ')}
      </ul>
      ${bloc('p', {
        fr: `L’association est ${p.declaration.fr} et publiée au Journal officiel des associations (JOAFE) sous le numéro RNA ${p.rna}. Siège : ${p.siege}.`,
        en: `The association is ${p.declaration.en} and published in the French Official Journal of associations (JOAFE), RNA number ${p.rna}. Registered office: ${p.siege}.`,
      })}
      <p><a href="#" class="bouton bouton-bleu courriel" data-courriel="${p.courrielInverse}" data-sujet="Nomina Memoria : question / question">${t({ fr: 'Poser une question', en: 'Ask us a question' })}</a></p>
    </div>

    <div class="rubrique">
      ${bloc('h2', { fr: 'Soutenir un village', en: 'Support a village' })}
      <ul class="liste-bureau">
        ${villages.map((v) => `<li><a href="${lien(racine)}${v.slug}/#donner">${v.nom}</a> — ${t({ fr: `association locale : ${v.association.sigle}`, en: `local association: ${v.association.sigle}` })}</li>`).join('\n        ')}
      </ul>
    </div>

    <p class="retour"><a href="${lien(racine)}">← ${t({ fr: 'Retour à l’accueil', en: 'Back to home page' })}</a></p>
  </div>
</section>
`;

  const pied = `
    <div><strong class="clair">${PROGRAMME.nom}</strong> · ${t(PROGRAMME.accroche)}</div>
    <div>${t({ fr: 'Villages :', en: 'Villages:' })} ${villages.map((v) => `<a href="${lien(racine)}${v.slug}/">${v.nom}</a>`).join(' · ')}</div>`;

  return page({
    titre: `${PROGRAMME.nom} — ${t({ fr: 'Qui sommes-nous', en: 'About us' })}`,
    description: t({
      fr: `Nomina Memoria est un programme porté par l’${p.nom}, association de ${p.commune} (Bretagne). Qui nous sommes et où va votre don.`,
      en: `Nomina Memoria is a programme run by ${p.nom}, a French non-profit in ${p.commune} (Brittany). Who we are and where your gift goes.`,
    }),
    chemin: 'a-propos/',
    nomFil: t({ fr: 'Qui sommes-nous', en: 'About us' }),
    racine,
    imagePartage: '',
    marque: `<a href="${lien(racine)}" class="marque">${MONOGRAMME}<span>${nomOrne()}</span></a>`,
    boutonHaut: `<a href="${lien(racine)}#villages" class="bouton bouton-or bouton-petit">${t({ fr: 'Soutenir', en: 'Support' })}</a>`,
    contenu,
    pied,
  });
}
