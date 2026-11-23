// Fabrique le site dans le dossier dist/ : node construire.mjs
// Lit chaque fichier de villages/, verifie qu'il est complet, puis ecrit chaque page DANS CHAQUE LANGUE :
// anglais a la racine (/, /chaumere/...) et francais sous /fr/ (/fr/, /fr/chaumere/...).
// Pour finir, il controle le HTML produit (liens internes, ancres) et ecrit sitemap.xml et robots.txt.
import { readdir, readFile, mkdir, writeFile, cp, rm, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { PROGRAMME, SEO } from './programme.mjs';
import { LANGUES, contexte, DATE_MAJ } from './modeles/commun.mjs';
import { pageAccueil } from './modeles/accueil.mjs';
import { pageVillage } from './modeles/village.mjs';
import { pageMentions } from './modeles/mentions.mjs';
import { ecrireReferencement } from './referencement.mjs';
import { pageAPropos } from './modeles/apropos.mjs';

const SORTIE = 'dist';
const erreurs = [];
const existe = (chemin) => access(chemin).then(() => true, () => false);

// 1. Lire les villages
const fichiers = (await readdir('villages')).filter((f) => f.endsWith('.mjs'));
const villages = [];
for (const fichier of fichiers) {
  const v = (await import(pathToFileURL(`villages/${fichier}`).href)).default;
  villages.push(v);
}
villages.sort((a, b) => (a.ordre ?? 99) - (b.ordre ?? 99));
if (!villages.length) erreurs.push('Aucun village dans le dossier villages/.');
if (villages.filter((v) => v.pilote).length > 1) erreurs.push('Plusieurs villages sont marqués « pilote: true » : un seul est permis.');
const slugs = villages.map((v) => v.slug);
for (const s of new Set(slugs)) if (slugs.indexOf(s) !== slugs.lastIndexOf(s)) erreurs.push(`Le slug « ${s} » est utilisé par deux villages.`);
for (const reserve of ['fr', 'a-propos', 'mentions-legales', 'images', 'icones']) {
  if (slugs.includes(reserve)) erreurs.push(`Le slug « ${reserve} » est réservé (dossier ou page du site).`);
}

// 2. Verifier chaque village : champs obligatoires, images presentes, liens externes, deux langues partout
const OBLIGATOIRES = ['slug', 'nom', 'statut', 'lieu', 'periode', 'resume', 'association', 'images', 'titre', 'accroche', 'chiffres', 'recit', 'frise', 'dons', 'recherche', 'transparence', 'final', 'liens'];
const EXTENSION_IMAGE = /\.(webp|jpe?g|png|gif|svg|avif)$/i;

function verifierLangues(objet, chemin, nomVillage) {
  if (Array.isArray(objet)) return objet.forEach((x, i) => verifierLangues(x, `${chemin}[${i}]`, nomVillage));
  if (objet && typeof objet === 'object') {
    if (('fr' in objet) !== ('en' in objet)) erreurs.push(`${nomVillage} : « ${chemin} » n'a pas ses deux langues (fr et en).`);
    for (const [cle, valeur] of Object.entries(objet)) verifierLangues(valeur, `${chemin}.${cle}`, nomVillage);
  }
}

// Parcourt tout le fichier du village : chaque nom d'image et chaque adresse externe cites sont controles.
async function verifierValeurs(objet, chemin, v, nom) {
  if (Array.isArray(objet)) { for (const [i, x] of objet.entries()) await verifierValeurs(x, `${chemin}[${i}]`, v, nom); return; }
  if (objet && typeof objet === 'object') { for (const [k, x] of Object.entries(objet)) await verifierValeurs(x, `${chemin}.${k}`, v, nom); return; }
  if (typeof objet !== 'string') return;
  if (EXTENSION_IMAGE.test(objet) && !/^https?:/.test(objet) && !(await existe(`images/${v.slug}/${objet}`))) {
    erreurs.push(`${nom} : l'image images/${v.slug}/${objet} (« ${chemin} ») est introuvable.`);
  }
  if (/^https?:/.test(objet)) {
    try { if (new URL(objet).protocol !== 'https:') erreurs.push(`${nom} : « ${chemin} » doit commencer par https:// (${objet}).`); }
    catch { erreurs.push(`${nom} : « ${chemin} » n'est pas une adresse valide (${objet}).`); }
  }
}

for (const v of villages) {
  const nom = v.nom || v.slug || '(village sans nom)';
  for (const champ of OBLIGATOIRES) if (v[champ] === undefined) erreurs.push(`${nom} : le champ « ${champ} » manque.`);
  if (v.slug && !/^[a-z0-9-]+$/.test(v.slug)) erreurs.push(`${nom} : le slug « ${v.slug} » ne doit contenir que des minuscules sans accent, chiffres et tirets.`);
  for (const photo of [v.images?.entete, v.images?.final, v.recit?.figure?.src, v.association?.logo].filter(Boolean)) {
    if (!(await existe(`images/${v.slug}/${photo}`))) erreurs.push(`${nom} : la photo images/${v.slug}/${photo} est introuvable.`);
  }
  await verifierValeurs(v, 'village', v, nom);
  verifierLangues(v, 'village', nom);
}
// Referencement : une description de plus de 160 caracteres est tronquee par Google
const LONGUEUR_MAX_DESCRIPTION = 160;
for (const lang of LANGUES) {
  const longueur = (d) => d.replace('{village}', villages[0]?.nom ?? '').length;
  if (longueur(SEO.accueil.description[lang]) > LONGUEUR_MAX_DESCRIPTION) erreurs.push(`programme.mjs : la description de l'accueil (${lang}) dépasse ${LONGUEUR_MAX_DESCRIPTION} caractères.`);
  for (const v of villages) if (v.seo && v.seo.description[lang].length > LONGUEUR_MAX_DESCRIPTION) erreurs.push(`${v.nom} : la description « seo » (${lang}) dépasse ${LONGUEUR_MAX_DESCRIPTION} caractères (${v.seo.description[lang].length}).`);
}
// Fichiers communs que les pages reclament
for (const fichier of [PROGRAMME.porteur.logo, 'public/icones/icone-32.png', 'public/icones/icone-180.png', 'public/icones/icone-512.png', 'public/style.css', 'public/script.js', 'public/CNAME']) {
  if (!(await existe(fichier))) erreurs.push(`Fichier commun introuvable : ${fichier}`);
}
if (!/^https:\/\/.+\/$/.test(PROGRAMME.adresse)) erreurs.push('programme.mjs : « adresse » doit être une adresse https:// terminée par « / ».');

if (erreurs.length) {
  console.error('Le site n’a PAS été construit :\n- ' + erreurs.join('\n- '));
  process.exit(1);
}

// 3. Ecrire le site : chaque page, une fois par langue
const PAGES = [
  { chemin: '', rendu: () => pageAccueil(villages) },
  ...villages.map((v) => ({ chemin: `${v.slug}/`, rendu: () => pageVillage(v) })),
  { chemin: 'a-propos/', rendu: () => pageAPropos(villages) },
  { chemin: 'mentions-legales/', rendu: () => pageMentions(villages) },
];
const dossierPage = (lang, chemin) => join(SORTIE, lang === 'fr' ? 'fr' : '', chemin);

await rm(SORTIE, { recursive: true, force: true });
await mkdir(SORTIE, { recursive: true });
await cp('public', SORTIE, { recursive: true });
await cp('images', `${SORTIE}/images`, { recursive: true });
for (const lang of LANGUES) {
  contexte(lang);
  for (const p of PAGES) {
    const dossier = dossierPage(lang, p.chemin);
    await mkdir(dossier, { recursive: true });
    await writeFile(join(dossier, 'index.html'), p.rendu());
  }
}
// Le domaine nominamemoria.org est declare dans public/CNAME (copie avec le reste de public/).

// 4. Referencement : sitemap.xml (avec les versions linguistiques) et robots.txt
const urlDe = (lang, chemin) => `${PROGRAMME.adresse}${lang === 'fr' ? 'fr/' : ''}${chemin}`;
const entrees = PAGES.flatMap((p) => LANGUES.map((lang) => [
  '  <url>',
  `    <loc>${urlDe(lang, p.chemin)}</loc>`,
  `    <lastmod>${DATE_MAJ}</lastmod>`,
  ...LANGUES.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlDe(l, p.chemin)}"/>`),
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlDe('en', p.chemin)}"/>`,
  '  </url>',
].join('\n')));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entrees.join('\n')}
</urlset>
`;
await writeFile(`${SORTIE}/sitemap.xml`, sitemap);
await ecrireReferencement({ sortie: SORTIE, villages, urlDe });

// 5. Controler le HTML produit : chaque lien interne, chaque ressource et chaque ancre doivent exister
const problemes = [];
const cacheIds = new Map();
const lesIds = (html) => [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
async function idsDe(fichier) {
  if (!cacheIds.has(fichier)) cacheIds.set(fichier, new Set(lesIds(await readFile(fichier, 'utf8'))));
  return cacheIds.get(fichier);
}
async function pagesHtml(dossier) {
  const sortie = [];
  for (const e of await readdir(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, e.name);
    if (e.isDirectory()) { if (e.name !== 'images') sortie.push(...(await pagesHtml(chemin))); }
    else if (e.name.endsWith('.html')) sortie.push(chemin);
  }
  return sortie;
}
for (const fichier of await pagesHtml(SORTIE)) {
  const html = await readFile(fichier, 'utf8');
  const liens = [...html.matchAll(/(?:href|src)="([^"]*)"/g)].map((m) => m[1]);
  liens.push(...[...html.matchAll(/url\('([^']+)'\)/g)].map((m) => m[1]));
  const tous = lesIds(html);
  for (const d of new Set(tous.filter((id, i) => tous.indexOf(id) !== i))) problemes.push(`${fichier} : l'identifiant « ${d} » est utilisé deux fois.`);
  for (const lien of liens) {
    if (!lien || /^(https?:|mailto:|tel:|data:|javascript:)/.test(lien)) continue;
    const [cheminLien, ancre] = lien.split('#');
    let cible = fichier;
    if (cheminLien) {
      cible = join(dirname(fichier), cheminLien);
      if (!/\.[a-z0-9]+$/i.test(cible)) cible = join(cible, 'index.html');
      if (!(await existe(cible))) { problemes.push(`${fichier} : le lien « ${lien} » ne mène à rien.`); continue; }
    }
    if (ancre && cible.endsWith('.html') && !(await idsDe(cible)).has(ancre)) problemes.push(`${fichier} : l'ancre « #${ancre} » du lien « ${lien} » n'existe pas dans la page visée.`);
  }
}
if (problemes.length) {
  console.error('Le site a été écrit mais le contrôle des liens a échoué :\n- ' + problemes.join('\n- '));
  process.exit(1);
}

console.log(`Site construit dans ${SORTIE}/ : ${PAGES.length} pages x ${LANGUES.length} langues (${villages.length} village(s) : ${villages.map((v) => v.nom).join(', ')}). Liens internes vérifiés.`);
