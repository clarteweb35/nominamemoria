// Page d'un village (ex. /chaumere/), fabriquee a partir de son fichier villages/<nom>.mjs.
import { PROGRAMME } from '../programme.mjs';
import { t, tx, bloc, attr, page, sectionMethode, MONOGRAMME, nomOrne, racineDe, lien } from './commun.mjs';

export function pageVillage(v) {
  const racine = racineDe(1);
  const img = (fichier) => `${racine}images/${v.slug}/${fichier}`;
  const a = v.association;

  // Bouton d'une carte de don : lien de paiement (nouvel onglet) ou e-mail pre-rempli.
  const boutonDon = (carte) => carte.lien
    ? `<a class="bouton ${carte.vedette ? 'bouton-or' : 'bouton-bleu'}" href="${carte.lien}" target="_blank" rel="noopener">${t(carte.bouton)} ↗</a>`
    : `<a class="bouton bouton-bleu courriel" href="#" data-courriel="${a.courrielInverse}" data-sujet="${attr(carte.sujet)}">${t(carte.bouton)}</a>`;

  const contenu = `
<!-- ============ EN-TETE ============ -->
<section class="heros" style="background-image: linear-gradient(180deg, rgba(15,29,48,.55) 0%, rgba(15,29,48,.75) 55%, rgba(15,29,48,.97) 100%), url('${img(v.images.entete)}')">
  <div class="conteneur">
    <span class="dates">${t(v.lieu)} · ${v.periode}</span>
    ${bloc('h1', v.titre)}
    ${bloc('p', v.accroche, 'accroche')}
    <div class="actions">
      <a href="#donner" class="bouton bouton-or">${t({ fr: 'Soutenir le projet', en: 'Support the project' })} →</a>
      <a href="#histoire" class="bouton bouton-clair">${t({ fr: 'Découvrir l’histoire', en: 'Discover the story' })}</a>
    </div>
    <a class="porte-par" href="${lien(racine)}a-propos/">
      <img src="${img(a.logo)}" alt="" width="34" height="34">
      <span>${t({ fr: `Un projet porté par l’<strong>${a.sigle}</strong>, association de ${v.nom} (France) · Qui sommes-nous ?`, en: `A project run by <strong>${a.sigle}</strong>, a non-profit in ${v.nom}, France · About us` })}</span>
    </a>
  </div>
</section>

<!-- ============ CHIFFRES ============ -->
<div class="chiffres">
  <div class="conteneur grille">
    ${v.chiffres.map((c) => `<div class="chiffre"><b>${c.valeur}</b>${t(c)}</div>`).join('\n    ')}
  </div>
</div>

<!-- ============ RECIT ============ -->
<section class="recit" id="histoire">
  <div class="conteneur grille">
    <div class="apparait">
      <span class="surtitre">${t(v.recit.surtitre)}</span>
      ${bloc('h2', v.recit.titre)}
      ${v.recit.avant.map((p) => bloc('p', p)).join('\n      ')}
      ${bloc('p', v.recit.citation, 'citation')}
      ${v.recit.apres.map((p) => bloc('p', p)).join('\n      ')}
    </div>
    <figure class="apparait">
      <a href="${img(v.recit.figure.src)}" class="agrandir" data-agrandir title="${attr(t({ fr: 'Voir en grand', en: 'View full size' }))}">
        <img src="${img(v.recit.figure.src)}" width="${v.recit.figure.largeur}" height="${v.recit.figure.hauteur}" loading="lazy" alt="${attr(tx(v.recit.figure.alt))}">
        <span class="loupe" aria-hidden="true">⤢ ${t({ fr: 'Voir en grand', en: 'View full size' })}</span>
      </a>
      <figcaption>${t(v.recit.figure.legende)} ${v.recit.figure.source}${v.recit.figure.transcription ? ` <a href="${v.recit.figure.transcription}" target="_blank" rel="noopener">${t({ fr: 'Lire la transcription', en: 'Read the transcription (in French)' })} ↗</a>` : ''}</figcaption>
    </figure>
  </div>
</section>

<!-- ============ FRISE ============ -->
<section class="frise">
  <div class="conteneur etroit">
    <span class="surtitre">${t(v.frise.surtitre)}</span>
    ${bloc('h2', v.frise.titre)}
    <ol>
      ${v.frise.etapes.map((e) => `<li class="apparait"><span class="annee">${e.annee}</span>${bloc('p', e)}</li>`).join('\n      ')}
    </ol>
  </div>
</section>

${v.explorer ? `
<!-- ============ EXPLORER LES ARCHIVES (liens vers le site de l'association) ============ -->
<section class="explorer">
  <div class="conteneur">
    <span class="surtitre">${t(v.explorer.surtitre)}</span>
    ${bloc('h2', v.explorer.titre)}
    ${bloc('p', v.explorer.intro, 'intro')}
    <div class="grille-explorer">
      ${v.explorer.liens.map((l) => `
      <a class="carte-lien apparait" href="${l.href}" target="_blank" rel="noopener">
        <span class="carte-lien-icone" aria-hidden="true">${l.icone}</span>
        <h3>${t(l.titre)}</h3>
        ${bloc('p', l.texte)}
        <span class="lien-fleche">${t({ fr: 'Ouvrir sur ' + a.sigle, en: 'Open on ' + a.sigle + ' (in French)' })} ↗</span>
      </a>`).join('')}
    </div>
  </div>
</section>` : ''}

${sectionMethode({
    fr: `<strong>Ce que nous prouvons à ${v.nom} peut servir partout.</strong> Des milliers de villages ont des archives numérisées que personne ne lit. Si une petite association y arrive avec quelques ordinateurs et un abonnement d’IA, n’importe quel village le peut. <a href="${lien(racine)}#lancer">Lancer votre village</a>.`,
    en: `<strong>What we prove in ${v.nom} can be used anywhere.</strong> Thousands of villages have digitised archives that nobody reads. If a small association can do it with a few computers and an AI subscription, any village can. <a href="${lien(racine)}#lancer">Start your village</a>.`,
  })}

<!-- ============ DONS ============ -->
<section class="dons" id="donner">
  <div class="conteneur">
    <span class="surtitre">${t({ fr: 'Votre soutien, concrètement', en: 'Your support, in practice' })}</span>
    ${bloc('h2', { fr: 'Chaque aide se voit, page après page', en: 'Every contribution shows, page after page' })}
    ${bloc('p', v.dons.intro, 'intro')}
    <!-- Pour que le nom de l'association sur HelloAsso ne surprenne personne -->
    <div class="confiance apparait">
      <img src="${img(a.logo)}" alt="${attr('Logo ' + a.sigle)}" width="56" height="56">
      ${bloc('p', {
        fr: `🛡️ <strong>Votre don va directement à l’${a.sigle}</strong>, l’association locale qui porte le projet de ${v.nom}. Sur HelloAsso, vous verrez son nom complet : <strong>« ${a.nom} »</strong>. C’est bien nous. <a href="${lien(racine)}a-propos/">Qui sommes-nous ?</a>`,
        en: `🛡️ <strong>Your gift goes directly to ${a.sigle}</strong>, the local non-profit behind the ${v.nom} project. On HelloAsso you will see its full name: <strong>“${a.nom}”</strong>. That is us. <a href="${lien(racine)}a-propos/">About us</a>`,
      })}
    </div>
    <div class="grille">
      ${v.dons.cartes.map((c) => `
      <div class="don${c.vedette ? ' vedette' : ''} apparait">
        <div class="montant">${t(c.montant)}</div>
        <h3>${t(c.titre)}</h3>
        ${bloc('p', c.texte)}
        ${boutonDon(c)}
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ============ UNIVERSITES ET MECENES ============ -->
<section class="universites">
  <div class="conteneur grille">
    <div class="apparait">
      <span class="surtitre">${t(v.recherche.surtitre)}</span>
      ${bloc('h2', v.recherche.titre)}
      ${v.recherche.textes.map((p) => bloc('p', p)).join('\n      ')}
      <a class="bouton bouton-or courriel" href="#" data-courriel="${a.courrielInverse}" data-sujet="${attr(v.recherche.sujet)}">${t({ fr: 'Proposer un partenariat', en: 'Propose a partnership' })}</a>
    </div>
    <ul class="apparait">
      ${v.recherche.pistes.map((p) => `<li>${t(p)}</li>`).join('\n      ')}
    </ul>
  </div>
</section>

<!-- ============ TRANSPARENCE ============ -->
<section class="transparence">
  <div class="conteneur etroit">
    <span class="surtitre">${t({ fr: 'En toute transparence', en: 'Full transparency' })}</span>
    ${bloc('h2', { fr: 'Qui sommes-nous ?', en: 'Who are we?' })}
    <div class="carte apparait">
      ${v.transparence.map((p) => bloc('p', p)).join('\n      ')}
    </div>
  </div>
</section>

<!-- ============ APPEL FINAL ============ -->
<section class="final" style="background-image: linear-gradient(180deg, rgba(15,29,48,.88), rgba(15,29,48,.96)), url('${img(v.images.final)}')">
  <div class="conteneur etroit">
    ${bloc('h2', v.final.titre)}
    ${bloc('p', v.final.texte)}
    <div class="actions">
      <a href="#donner" class="bouton bouton-or">${t({ fr: `Je soutiens ${v.nom}`, en: `I support ${v.nom}` })}</a>
      <a href="#" class="bouton bouton-clair courriel" data-courriel="${a.courrielInverse}" data-sujet="${attr(v.final.sujet)}">${t({ fr: 'Nous écrire', en: 'Write to us' })}</a>
    </div>
  </div>
</section>
`;

  const pied = `
    <div class="pied-asso">
      <img src="${img(a.logo)}" alt="${attr('Logo ' + a.sigle)}" width="48" height="48" loading="lazy">
      <div>
      <strong class="clair">${a.sigle}</strong> · ${a.nom}<br>
      ${a.adresse} · ${a.numero}<br>
      ${t({ fr: 'Un village du programme', en: 'A village of the' })} <a href="${lien(racine)}">${PROGRAMME.nom}</a>${t({ fr: '', en: ' programme' })}
      </div>
    </div>
    <div>
      ${t({ fr: 'En voir plus :', en: 'See more (in French):' })}
      ${v.liens.map((l) => `<a href="${l.href}" target="_blank" rel="noopener">${t(l)}</a>`).join(' · ')}
    </div>`;

  return page({
    titre: `${PROGRAMME.nom} · ${v.nom} — ${t({ fr: 'Soutenir', en: 'Support' })}`,
    description: tx(v.accroche),
    donnees: {
      '@context': 'https://schema.org',
      '@type': 'NGO',
      name: a.nom,
      alternateName: a.sigle,
      url: a.site,
      logo: `${PROGRAMME.adresse}images/${v.slug}/${a.logo}`,
      address: { '@type': 'PostalAddress', streetAddress: a.adresse, addressCountry: 'FR' },
      description: tx(v.resume),
    },
    chemin: `${v.slug}/`,
    racine,
    imagePartage: `images/${v.slug}/${v.images.entete}`,
    marque: `<a href="${lien(racine)}" class="marque">${MONOGRAMME}<span>${nomOrne()} <span class="marque-village">· ${v.nom}</span></span></a>`,
    boutonHaut: `<a href="#donner" class="bouton bouton-or bouton-petit">${t({ fr: 'Je soutiens', en: 'Donate' })}</a>`,
    contenu,
    pied,
  });
}
