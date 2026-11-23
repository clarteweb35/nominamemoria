// Fabrique le site dans le dossier dist/ : node construire.mjs
// Lit chaque fichier de villages/, verifie qu'il est complet, puis ecrit l'accueil et une page par village.
import { readdir, mkdir, writeFile, cp, rm, access } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { pageAccueil } from './modeles/accueil.mjs';
import { pageVillage } from './modeles/village.mjs';
import { pageMentions } from './modeles/mentions.mjs';

const SORTIE = 'dist';
const erreurs = [];

// 1. Lire les villages
const fichiers = (await readdir('villages')).filter((f) => f.endsWith('.mjs'));
const villages = [];
for (const fichier of fichiers) {
  const v = (await import(pathToFileURL(`villages/${fichier}`).href)).default;
  villages.push(v);
}
villages.sort((a, b) => (a.ordre ?? 99) - (b.ordre ?? 99));
if (!villages.length) erreurs.push('Aucun village dans le dossier villages/.');

// 2. Verifier chaque village : champs obligatoires, photos presentes, deux langues partout
const OBLIGATOIRES = ['slug', 'nom', 'statut', 'lieu', 'periode', 'resume', 'association', 'images', 'titre', 'accroche', 'chiffres', 'recit', 'frise', 'dons', 'recherche', 'transparence', 'final', 'liens'];
const existe = (chemin) => access(chemin).then(() => true, () => false);

function verifierLangues(objet, chemin, nomVillage) {
  if (Array.isArray(objet)) return objet.forEach((x, i) => verifierLangues(x, `${chemin}[${i}]`, nomVillage));
  if (objet && typeof objet === 'object') {
    if (('fr' in objet) !== ('en' in objet)) erreurs.push(`${nomVillage} : « ${chemin} » n'a pas ses deux langues (fr et en).`);
    for (const [cle, valeur] of Object.entries(objet)) verifierLangues(valeur, `${chemin}.${cle}`, nomVillage);
  }
}

for (const v of villages) {
  const nom = v.nom || v.slug || '(village sans nom)';
  for (const champ of OBLIGATOIRES) if (v[champ] === undefined) erreurs.push(`${nom} : le champ « ${champ} » manque.`);
  if (v.slug && !/^[a-z0-9-]+$/.test(v.slug)) erreurs.push(`${nom} : le slug « ${v.slug} » ne doit contenir que des minuscules sans accent, chiffres et tirets.`);
  const photos = [v.images?.entete, v.images?.final, v.recit?.figure?.src, v.association?.logo].filter(Boolean);
  for (const photo of photos) {
    if (!(await existe(`images/${v.slug}/${photo}`))) erreurs.push(`${nom} : la photo images/${v.slug}/${photo} est introuvable.`);
  }
  verifierLangues(v, 'village', nom);
}

if (erreurs.length) {
  console.error('Le site n’a PAS été construit :\n- ' + erreurs.join('\n- '));
  process.exit(1);
}

// 3. Ecrire le site
await rm(SORTIE, { recursive: true, force: true });
await mkdir(SORTIE, { recursive: true });
await cp('public', SORTIE, { recursive: true });
await cp('images', `${SORTIE}/images`, { recursive: true });
await writeFile(`${SORTIE}/index.html`, pageAccueil(villages));
for (const v of villages) {
  await mkdir(`${SORTIE}/${v.slug}`, { recursive: true });
  await writeFile(`${SORTIE}/${v.slug}/index.html`, pageVillage(v));
}
await mkdir(`${SORTIE}/mentions-legales`, { recursive: true });
await writeFile(`${SORTIE}/mentions-legales/index.html`, pageMentions(villages));
// Le domaine nominamemoria.org est declare dans public/CNAME (copie avec le reste de public/).

console.log(`Site construit dans ${SORTIE}/ : accueil + ${villages.length} village(s) (${villages.map((v) => v.nom).join(', ')}).`);
