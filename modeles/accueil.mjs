// Page d'accueil du programme : presentation, methode, liste des villages, lancer son village, soutenir.
import { PROGRAMME, SEO, FAQ } from '../programme.mjs';
import { t, tx, bloc, attr, page, sectionFaq, donneesFaq, sectionMethode, MONOGRAMME, nomOrne, racineDe, lien } from './commun.mjs';

// Ce qu'il faut pour lancer un village, et ce que le programme apporte.
const IL_FAUT = [
  { fr: 'Une association locale (ou quelques habitants prêts à en créer une)', en: 'A local association (or a few residents ready to start one)' },
  { fr: 'Des archives du village consultables en ligne (registres, recensements, cadastre…)', en: 'Village archives available online (registers, censuses, land surveys…)' },
  { fr: 'Quelques bénévoles curieux, même sans connaissance en écriture ancienne', en: 'A few curious volunteers, no knowledge of old handwriting needed' },
  { fr: 'Un ordinateur et un abonnement d’IA', en: 'A computer and an AI subscription' },
];
const ON_APPORTE = (pilote) => [
  { fr: 'La méthode de lecture et de vérification, testée sur le village pilote', en: 'The reading and checking method, tested in the pilot village' },
  { fr: 'Des outils, comme ThotSync pour télécharger les archives en ligne d’Ille-et-Vilaine', en: 'Tools, such as ThotSync to download the online archives of Ille-et-Vilaine' },
  { fr: 'Ce modèle de site bilingue, prêt à remplir pour votre village', en: 'This bilingual website template, ready to fill in for your village' },
  { fr: `Le retour d’expérience de ${pilote.nom} : ce qui marche, ce qui coince`, en: `The ${pilote.nom} experience: what works, what doesn’t` },
];

export function pageAccueil(villages) {
  const racine = racineDe(0);
  const p = PROGRAMME.porteur;
  // Le village pilote illustre l'accueil : celui marque « pilote: true », sinon le premier.
  const pilote = villages.find((v) => v.pilote) ?? villages[0];
  const L = lien(racine);

  const contenu = `
<!-- ============ EN-TETE ============ -->
<section class="heros heros-programme" style="background-image: linear-gradient(180deg, rgba(15,29,48,.72) 0%, rgba(15,29,48,.85) 60%, rgba(15,29,48,.98) 100%), url('${racine}images/${pilote.slug}/${pilote.recit.figure.src}')">
  <div class="conteneur">
    <span class="dates">${t({ fr: 'Un programme pour la mémoire des villages', en: 'A programme for village memory' })}</span>
    <h1 class="titre-programme">${nomOrne()}</h1>
    ${bloc('p', PROGRAMME.accroche, 'sous-titre')}
    ${bloc('p', {
      fr: 'Dans des milliers de villages, quatre siècles de vies dorment dans des registres numérisés que presque personne ne sait plus lire. Nomina Memoria associe l’intelligence artificielle et des bénévoles pour les déchiffrer, les vérifier et les partager, village par village.',
      en: 'In thousands of villages, four centuries of lives lie dormant in digitised registers that almost no one can read anymore. Nomina Memoria brings together artificial intelligence and volunteers to decipher, check and share them, village by village.',
    }, 'accroche')}
    <div class="actions">
      <a href="${L}${pilote.slug}/" class="bouton bouton-or">${t({ fr: `Découvrir le village pilote : ${pilote.nom}`, en: `Discover the pilot village: ${pilote.nom}` })} →</a>
      <a href="#lancer" class="bouton bouton-clair">${t({ fr: 'Lancer votre village', en: 'Start your village' })}</a>
    </div>
    <a class="porte-par" href="${L}a-propos/">
      <img src="${racine}${p.logo}" alt="" width="34" height="34">
      <span>${t({ fr: `Un programme lancé par l’<strong>${p.nom}</strong>, association de ${p.commune} (France) · Qui sommes-nous ?`, en: `A programme launched by <strong>${p.nom}</strong>, a non-profit in ${p.commune}, France · About us` })}</span>
    </a>
    <!-- Legende du document en fond, dans l'espace libre a droite (sous les boutons sur petit ecran) -->
    <aside class="credit">
      <span class="credit-titre">📜 ${t({ fr: 'En arrière-plan', en: 'In the background' })}</span>
      ${bloc('p', pilote.recit.figure.legende)}
      <p class="credit-source">${pilote.recit.figure.source}</p>
      ${pilote.recit.figure.transcription ? `<a href="${pilote.recit.figure.transcription}" target="_blank" rel="noopener">${t({ fr: 'Lire la transcription', en: 'Read the transcription (in French)' })} ↗</a>` : ''}
    </aside>
  </div>
</section>

<!-- ============ LE CONSTAT ============ -->
<section class="recit">
  <div class="conteneur etroit">
    <span class="surtitre">${t({ fr: 'Pourquoi', en: 'Why' })}</span>
    ${bloc('h2', { fr: 'La mémoire des gens, pas celle des rois', en: 'The memory of people, not of kings' })}
    ${bloc('p', {
      fr: 'Les grandes villes ont leurs historiens. Les villages, eux, n’ont souvent que leurs registres : baptêmes, mariages, sépultures, tenus à la plume depuis le XVIᵉ ou le XVIIᵉ siècle. Ils sont numérisés et consultables en ligne, mais l’écriture ancienne décourage, et le travail est immense.',
      en: 'Big cities have their historians. Villages often have only their registers: baptisms, weddings and burials, kept in quill and ink since the 16th or 17th century. They have been digitised and are online, but old handwriting is discouraging and the task is huge.',
    })}
    ${bloc('p', { fr: 'Si vos ancêtres viennent d’Europe, leurs noms sont dans un de ces registres.', en: 'If your ancestors came from Europe, their names are in one of these registers.' }, 'citation')}
    ${bloc('p', {
      fr: 'L’intelligence artificielle change la donne : elle rend ce travail possible pour de simples bénévoles, à condition de rester honnête sur ses erreurs.',
      en: 'Artificial intelligence changes everything: it makes this work possible for ordinary volunteers, as long as we stay honest about its mistakes.',
    })}
  </div>
</section>

${sectionMethode({
    fr: '<strong>Un village pilote, puis des milliers.</strong> Tout ce qui est appris dans un village (méthode, outils, erreurs à éviter) est partagé pour que le suivant aille plus vite.',
    en: '<strong>One pilot village, then thousands.</strong> Everything learned in one village (method, tools, mistakes to avoid) is shared so that the next one goes faster.',
  })}

<!-- ============ LES VILLAGES ============ -->
<section class="dons" id="villages">
  <div class="conteneur">
    <span class="surtitre">${t({ fr: 'Les villages', en: 'The villages' })}</span>
    ${bloc('h2', { fr: 'Choisissez un village à soutenir', en: 'Choose a village to support' })}
    ${bloc('p', {
      fr: `Chaque village est porté par une association locale : votre don va directement à elle (pour ${pilote.nom} : l’${pilote.association.sigle}). <a href="${L}a-propos/">Qui sommes-nous ?</a>`,
      en: `Each village is run by a local association: your gift goes directly to it (for ${pilote.nom}: ${pilote.association.sigle}). <a href="${L}a-propos/">About us</a>`,
    }, 'intro')}
    <div class="grille grille-villages">
      ${villages.map((v) => `
      <a class="village apparait" href="${L}${v.slug}/">
        <img src="${racine}images/${v.slug}/${v.images.entete}" alt="${attr(v.nom)}" loading="lazy">
        <div class="village-texte">
          <span class="etiquette">${t(v.statut)}</span>
          <h3>${v.nom}</h3>
          <span class="lieu">${t(v.lieu)} · ${v.periode}</span>
          ${bloc('p', v.resume)}
          <span class="lien-fleche">${t({ fr: `Soutenir ${v.nom}`, en: `Support ${v.nom}` })} →</span>
        </div>
      </a>`).join('')}
      <a class="village village-vide apparait" href="#lancer">
        <div class="village-texte">
          <span class="etiquette">${t({ fr: 'Bientôt', en: 'Coming soon' })}</span>
          <h3>${t({ fr: 'Votre village ?', en: 'Your village?' })}</h3>
          ${bloc('p', { fr: 'Le village de vos ancêtres, de votre enfance ou de vos vacances peut être le prochain.', en: 'The village of your ancestors, your childhood or your holidays could be next.' })}
          <span class="lien-fleche">${t({ fr: 'Lancer votre village', en: 'Start your village' })} →</span>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- ============ LANCER SON VILLAGE ============ -->
<section class="universites" id="lancer">
  <div class="conteneur">
    <span class="surtitre">${t({ fr: 'Lancer votre village', en: 'Start your village' })}</span>
    ${bloc('h2', { fr: 'Le programme est fait pour être copié', en: 'The programme is made to be copied' })}
    <div class="grille deux-colonnes">
      <div class="apparait">
        <h3>${t({ fr: 'Ce qu’il vous faut', en: 'What you need' })}</h3>
        <ul>${IL_FAUT.map((x) => `<li>${t(x)}</li>`).join('')}</ul>
      </div>
      <div class="apparait">
        <h3>${t({ fr: 'Ce que le programme vous apporte', en: 'What the programme gives you' })}</h3>
        <ul>${ON_APPORTE(pilote).map((x) => `<li>${t(x)}</li>`).join('')}</ul>
      </div>
    </div>
    <div class="actions centre">
      <a class="bouton bouton-or courriel" href="#" data-courriel="${p.courrielInverse}" data-sujet="Nomina Memoria : lancer mon village / start my village">${t({ fr: 'Nous parler de votre village', en: 'Tell us about your village' })}</a>
    </div>
  </div>
</section>

<!-- ============ UNIVERSITES ============ -->
<section class="transparence">
  <div class="conteneur etroit">
    <span class="surtitre">${t({ fr: 'Universités, chercheurs, mécènes', en: 'Universities, researchers, patrons' })}</span>
    ${bloc('h2', { fr: 'Un laboratoire ouvert', en: 'An open laboratory' })}
    <div class="carte apparait">
      ${bloc('p', {
        fr: 'Humanités numériques, démographie historique, paléographie assistée par IA, généalogie : chaque village est un terrain d’étude complet et à taille humaine, ouvert aux projets d’étudiants et aux regards experts.',
        en: 'Digital humanities, historical demography, AI-assisted palaeography, genealogy: each village is a complete, human-scale case study, open to student projects and expert review.',
      })}
      ${bloc('p', {
        fr: `Le programme a été lancé par l’<strong>${p.nom}</strong> (${p.nomComplet}), association loi 1901 de ${p.commune}, en France. <a href="${p.site}" target="_blank" rel="noopener">En savoir plus sur l’association</a>.`,
        en: `The programme was launched by <strong>${p.nom}</strong> (${p.nomComplet}), a French non-profit based in ${p.commune}, France. <a href="${p.site}" target="_blank" rel="noopener">Learn more about the association</a> (in French).`,
      })}
      <a class="bouton bouton-bleu courriel" href="#" data-courriel="${p.courrielInverse}" data-sujet="Nomina Memoria : partenariat / partnership">${t({ fr: 'Proposer un partenariat', en: 'Propose a partnership' })}</a>
    </div>
  </div>
</section>

${sectionFaq(FAQ, { surtitre: { fr: 'Questions fréquentes', en: 'Frequently asked questions' }, titre: { fr: 'Tout savoir sur Nomina Memoria', en: 'Everything about Nomina Memoria' } })}

<!-- ============ APPEL FINAL ============ -->
<section class="final" style="background-image: linear-gradient(180deg, rgba(15,29,48,.88), rgba(15,29,48,.96)), url('${racine}images/${pilote.slug}/${pilote.images.final}')">
  <div class="conteneur etroit">
    ${bloc('h2', { fr: 'Ils ont vécu, aimé, travaillé dans nos villages. Aidez-nous à ne pas les oublier.', en: 'They lived, loved and worked in our villages. Help us remember them.' })}
    <div class="actions">
      <a href="#villages" class="bouton bouton-or">${t({ fr: 'Soutenir un village', en: 'Support a village' })}</a>
      <a href="#lancer" class="bouton bouton-clair">${t({ fr: 'Lancer votre village', en: 'Start your village' })}</a>
    </div>
  </div>
</section>
`;

  const pied = `
    <div>
      <strong class="clair">${PROGRAMME.nom}</strong> · ${t(PROGRAMME.accroche)}<br>
      ${t({ fr: 'Programme lancé par l’', en: 'Programme launched by ' })}<a href="${p.site}" target="_blank" rel="noopener">${p.nom}</a> · ${p.commune}, France
    </div>
    <div>
      ${t({ fr: 'Villages :', en: 'Villages:' })}
      ${villages.map((v) => `<a href="${L}${v.slug}/">${v.nom}</a>`).join(' · ')}
    </div>`;

  return page({
    titre: tx(SEO.accueil.titre),
    description: tx(SEO.accueil.description).replace('{village}', pilote.nom),
    chemin: '',
    racine,
    imagePartage: `images/${pilote.slug}/${pilote.recit.figure.src}`,
    imageAlt: tx(pilote.recit.figure.alt),
    donnees: [donneesFaq(FAQ)],
    marque: `<a href="${L}" class="marque">${MONOGRAMME}<span>${nomOrne()}</span></a>`,
    boutonHaut: `<a href="#villages" class="bouton bouton-or bouton-petit">${t({ fr: 'Soutenir', en: 'Support' })}</a>`,
    contenu,
    pied,
  });
}
