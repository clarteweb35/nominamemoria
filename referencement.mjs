// Fichiers pour les moteurs de recherche et les assistants IA : robots.txt et llms.txt (le sitemap est dans construire.mjs).
import { writeFile } from 'node:fs/promises';
import { PROGRAMME, FAQ } from './programme.mjs';
import { DATE_MAJ, texteBrut } from './modeles/commun.mjs';

// Le contenu est fait pour etre partage : les moteurs de recherche ET les assistants IA sont expressement les bienvenus.
// Pour en exclure un, remplacer « Allow: / » par « Disallow: / » sous son nom dans robots.txt.
const ROBOTS_IA = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'DeepSeekBot', 'MistralAI-User', 'Meta-ExternalAgent', 'Amazonbot', 'CCBot'];

export async function ecrireReferencement({ sortie, villages, urlDe }) {
  // robots.txt
  await writeFile(`${sortie}/robots.txt`, [
    'User-agent: *', 'Allow: /', '',
    ...ROBOTS_IA.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${PROGRAMME.adresse}sitemap.xml`, '',
  ].join('\n'));

  // llms.txt : presentation du site pour les assistants IA (format propose par llmstxt.org).
  // Ecrit en anglais, avec le lien vers la version francaise de chaque page.
  const p = PROGRAMME.porteur;
  const pilote = villages.find((v) => v.pilote) ?? villages[0];
  const ligne = (nom, chemin, desc) => `- [${nom}](${urlDe('en', chemin)}) · [FR](${urlDe('fr', chemin)}): ${desc}`;
  const questions = (liste) => liste.flatMap((x) => [`### ${texteBrut(x.q.en)}`, texteBrut(x.r.en), '']);
  const llms = [
    `# ${PROGRAMME.nom}`, '',
    `> ${PROGRAMME.accroche.en} A programme that brings old village registers (baptisms, weddings, burials) back to life: AI deciphers the handwriting, volunteers check it, and everything is published free of charge with the exact source. Launched by ${p.nom} (${p.nomComplet}), a French non-profit in ${p.commune}, France. Pilot village: ${pilote.nom}.`, '',
    'The site exists in English (root) and French (/fr/). Every page has an equivalent in the other language.', '',
    '## Pages', '',
    ligne('Home', '', 'what the programme is, the method, the villages, how to start your village'),
    ...villages.map((v) => ligne(v.nom, `${v.slug}/`, `${texteBrut(v.resume.en)} ${v.periode}.`)),
    ligne('About us', 'a-propos/', 'who runs the programme and where a gift goes'),
    ligne('Legal notice', 'mentions-legales/', 'publisher, hosting, personal data and cookies'),
    '', '## Frequently asked questions', '',
    ...questions(FAQ),
    ...villages.filter((v) => v.faq).flatMap((v) => [`## ${v.nom}: questions and answers`, '', ...questions(v.faq)]),
    '## Organisation', '',
    `- Association: ${p.nomComplet} (${p.nom}), RNA ${p.rna}, ${p.siege}`,
    `- Association website (in French): ${p.site}`,
    `- Last updated: ${DATE_MAJ}`, '',
  ].join('\n');
  await writeFile(`${sortie}/llms.txt`, llms);
}
