// Village de Chaumere (village pilote). Pour un nouveau village : copier ce fichier sous villages/<nom>.mjs,
// mettre ses photos dans images/<nom>/, puis remplacer chaque texte. Regle : ne publier que des faits sources.
// Faits repris du site de l'A3PC (a3pc.fr : Histoire, Archives, Adhesion, mentions legales).

const HELLOASSO = 'https://www.helloasso.com/associations/association-pour-la-promotion-du-pays-de-chaumere/adhesions/campagne-d-adhesion-a3pc-2026-adhesions-a3pc-lancement-2026';

export default {
  // Nom du dossier de la page (adresse : /chaumere/) et du dossier des photos (images/chaumere/).
  slug: 'chaumere',
  nom: 'Chaumeré',
  ordre: 1,
  // Village pilote du programme : celui dont la photo et l'histoire illustrent l'accueil.
  // (Sans village marque « pilote », c'est le premier de la liste qui est utilise.)
  pilote: true,
  statut: { fr: 'Village pilote', en: 'Pilot village' },
  lieu: { fr: 'Chaumeré, Bretagne', en: 'Chaumeré, Brittany, France' },
  periode: '1602 – 2026',

  // Resume affiche sur la carte du village, page d'accueil du programme.
  resume: {
    fr: 'Ancienne paroisse bretonne, registres depuis 1602. Plus de 150 registres et documents déjà déchiffrés.',
    en: 'A former Breton parish with registers from 1602. Over 150 registers and documents already deciphered.',
  },

  association: {
    sigle: 'A3PC',
    nom: 'Association pour la Promotion du Pays de Chaumeré',
    logo: 'logo-association.jpg',
    site: 'https://a3pc.fr/',
    courrielInverse: 'moc.liamg@cp3a.tcatnoc',
    adresse: 'Chaumeré, 35113 Domagné, France',
    numero: 'RNA W351007269',
  },

  // Photos (dans images/chaumere/).
  images: {
    entete: 'eglise.webp',
    final: 'cadastre-1830.webp',
  },

  titre: {
    fr: 'Rendre leur nom aux oubliés d’un village.',
    en: 'Giving a name back to a village’s forgotten people.',
  },
  accroche: {
    fr: 'Quatre siècles de baptêmes, de mariages et de deuils dorment dans les registres d’un minuscule village breton. Avec l’intelligence artificielle et une poignée de bénévoles, nous les faisons revivre. Pour Chaumeré, et pour montrer que c’est possible dans des milliers d’autres villages.',
    en: 'Four centuries of baptisms, weddings and burials lie dormant in the registers of a tiny village in Brittany, France. With artificial intelligence and a handful of volunteers, we are bringing them back to life. For Chaumeré, and to prove it can be done in thousands of other villages.',
  },

  chiffres: [
    { valeur: '1602', fr: 'premier registre conservé', en: 'oldest surviving register' },
    { valeur: '1 191', fr: 'documents repérés aux Archives', en: 'documents found in the archives' },
    { valeur: '150+', fr: 'registres et documents déjà déchiffrés', en: 'registers and documents already deciphered' },
    { valeur: '4', fr: 'siècles d’histoire à faire revivre', en: 'centuries of history to bring back' },
  ],

  recit: {
    surtitre: { fr: 'Une histoire qui vous concerne', en: 'A story that is also yours' },
    titre: { fr: 'Un village comme des milliers d’autres', en: 'A village like thousands of others' },
    avant: [
      {
        fr: 'Chaumeré n’a rien d’exceptionnel. Une église, quelques hameaux, des vergers. Paroisse, puis commune pendant près de deux siècles, le village s’est vidé au fil du XXᵉ siècle : le curé est parti, l’école à classe unique et le dernier café-épicerie ont fermé. Le 1ᵉʳ janvier 1974, Chaumeré s’est associé à sa voisine Domagné.',
        en: 'There is nothing exceptional about Chaumeré. A church, a few hamlets, apple orchards. A parish, then a municipality for nearly two centuries, the village slowly emptied during the 20th century: the priest left, the one-room school and the last café-grocery closed. On 1 January 1974, Chaumeré merged with its neighbour, Domagné.',
      },
    ],
    citation: {
      fr: 'Si vos ancêtres viennent d’Europe, ils ont vécu dans un village comme celui-ci.',
      en: 'If your ancestors came from Europe, they lived in a village just like this one.',
    },
    apres: [
      {
        fr: 'Leurs noms sont écrits à la plume dans des registres que presque personne ne sait plus lire. C’est cette mémoire-là que nous voulons sauver : pas celle des rois, celle des gens.',
        en: 'Their names are written in quill and ink, in registers almost no one can read anymore. That is the memory we want to save: not the history of kings, but the history of people.',
      },
    ],
    figure: {
      src: 'registre-1609.webp',
      largeur: 1400,
      hauteur: 1050,
      alt: {
        fr: 'Double page du registre paroissial de Chaumeré, année 1609, couverte d’actes de baptême écrits à la plume',
        en: 'Double page of the Chaumeré parish register, 1609, covered with handwritten baptism records',
      },
      legende: {
        fr: 'Registre paroissial de Chaumeré, 1609 : baptêmes et visite de l’évêque.',
        en: 'Chaumeré parish register, 1609: baptisms and the bishop’s visit.',
      },
      // Mention obligatoire pour les documents des Archives departementales d'Ille-et-Vilaine.
      source: 'Archives départementales d’Ille-et-Vilaine, 10 NUM 35074/1.',
      // Page de la transcription de ce registre sur le site de l'association (facultatif).
      transcription: 'https://a3pc.fr/archives/registre-1602/',
    },
  },

  // Liens vers les archives deja transcrites, sur le site de l'association (section facultative).
  explorer: {
    surtitre: { fr: 'À vous de chercher', en: 'Search for yourself' },
    titre: { fr: 'Explorez les archives déjà transcrites', en: 'Explore the records already transcribed' },
    intro: {
      fr: 'Tout le travail déjà fait est en ligne, gratuitement, sur le site de l’A3PC. Un nom de famille vous dit quelque chose ? Cherchez-le.',
      en: 'All the work done so far is online, free of charge, on the A3PC website (in French). Does a family name ring a bell? Look it up.',
    },
    liens: [
      {
        icone: '🔍',
        href: 'https://a3pc.fr/archives/#recherche',
        titre: { fr: 'Rechercher un nom', en: 'Search for a name' },
        texte: { fr: 'Le moteur de recherche dans tous les actes transcrits : baptêmes, mariages, sépultures, recensements, soldats.', en: 'Search engine across all transcribed records: baptisms, marriages, burials, censuses, soldiers.' },
      },
      {
        icone: '📜',
        href: 'https://a3pc.fr/archives/',
        titre: { fr: 'Les actes transcrits', en: 'The transcribed records' },
        texte: { fr: 'Les registres de Chaumeré déchiffrés un par un depuis 1602, avec la cote et le lien vers l’image d’origine.', en: 'Chaumeré registers deciphered one by one since 1602, with the archive reference and a link to the original image.' },
      },
      {
        icone: '🗂️',
        href: 'https://a3pc.fr/archives/inventaire/',
        titre: { fr: 'L’index des noms', en: 'The index of names' },
        texte: { fr: 'Les noms de famille et prénoms relevés dans les archives, et la frise des registres transcrits.', en: 'Family names and first names found in the archives, with a timeline of the transcribed registers.' },
      },
      {
        icone: '🌳',
        href: 'https://a3pc.fr/archives/familles/',
        titre: { fr: 'Les familles de Chaumeré', en: 'The families of Chaumeré' },
        texte: { fr: 'Des noms présents dans les registres de 1602 comme dans le recensement de 1911.', en: 'Names found both in the 1602 registers and in the 1911 census.' },
      },
    ],
  },

  frise: {
    surtitre: { fr: 'Ce que les registres nous ont déjà appris', en: 'What the registers have already told us' },
    titre: { fr: 'Quatre siècles, page après page', en: 'Four centuries, page by page' },
    etapes: [
      { annee: '1602', fr: 'Premier baptême inscrit dans le plus ancien registre conservé du village.', en: 'First baptism recorded in the village’s oldest surviving register.' },
      { annee: '1609', fr: 'L’évêque visite Chaumeré : son passage est noté entre deux baptêmes.', en: 'The bishop visits Chaumeré: his visit is noted between two baptisms.' },
      { annee: '1639', fr: 'Une année noire : les sépultures se multiplient. Elle reviendra en 1662.', en: 'A dark year: burials multiply. Another one will come in 1662.' },
      { annee: '1657', fr: 'Mort du recteur René Morin, le prêtre de la paroisse, notée au registre des sépultures.', en: 'Death of the rector René Morin, the parish priest, recorded in the burial register.' },
      { annee: '1777', fr: 'La grosse cloche porte cette date ; sa bénédiction est inscrite dans les registres.', en: 'The great bell bears this date; its blessing is recorded in the registers.' },
      { annee: '1830', fr: 'Le cadastre dessine chaque parcelle, chaque chemin, chaque maison.', en: 'The land survey maps every field, every path, every house.' },
      { annee: '1974', fr: 'Chaumeré cesse d’être une commune. Son histoire, elle, continue.', en: 'Chaumeré ceases to be a municipality. Its story goes on.' },
    ],
  },

  dons: {
    intro: {
      fr: 'L’A3PC est une toute jeune association de bénévoles. Ce que vous donnez sert directement aux recherches : matériel et outils.',
      en: 'A3PC is a brand-new, volunteer-run association, and what you give goes straight into the research: equipment and tools.',
    },
    // `lien` : page de paiement ; `sujet` : ouvre un e-mail avec ce sujet. `vedette` : carte mise en avant.
    cartes: [
      {
        vedette: true,
        montant: { fr: 'Montant libre', en: 'Any amount' },
        titre: { fr: 'Devenir membre bienfaiteur', en: 'Become a benefactor member' },
        texte: { fr: 'Le plus simple et le plus direct : vous choisissez le montant, payé en ligne en toute sécurité sur HelloAsso, la plateforme des associations françaises.', en: 'The simplest and most direct way: choose your amount and pay securely online on HelloAsso, the French platform for non-profits.' },
        bouton: { fr: 'Donner à l’A3PC sur HelloAsso', en: 'Give to A3PC on HelloAsso' },
        lien: HELLOASSO,
      },
      {
        montant: { fr: 'Dès 20 € / mois', en: 'From €20 / month' },
        titre: { fr: 'Offrir un abonnement d’IA', en: 'Fund an AI subscription' },
        texte: { fr: 'Un abonnement Claude ou ChatGPT, c’est l’outil qui déchiffre des centaines de pages manuscrites. Vous pouvez en prendre un en charge directement pour l’association.', en: 'A Claude or ChatGPT subscription is the tool that deciphers hundreds of handwritten pages. You can cover one directly for the association.' },
        bouton: { fr: 'Proposer', en: 'Offer' },
        sujet: 'Nomina Memoria Chaumeré : abonnement IA',
      },
      {
        montant: { fr: 'Un ordinateur', en: 'A computer' },
        titre: { fr: 'Donner du matériel', en: 'Donate equipment' },
        texte: { fr: 'Un portable reconditionné ou dont vous ne vous servez plus devient un poste de bénévole de plus pour lire et relire les archives.', en: 'A refurbished laptop, or one you no longer use, becomes one more volunteer workstation to read and check the archives.' },
        bouton: { fr: 'Proposer du matériel', en: 'Offer equipment' },
        sujet: 'Nomina Memoria Chaumeré : don de matériel',
      },
      {
        montant: { fr: '10 € / an', en: '€10 / year' },
        titre: { fr: 'Adhérer, où que vous viviez', en: 'Join, wherever you live' },
        texte: { fr: 'Chaque adhérent compte : plus nous sommes nombreux, plus l’association pèse auprès des Archives, des universités et des partenaires.', en: 'Every member counts: the more we are, the more weight the association carries with archives, universities and partners.' },
        bouton: { fr: 'Adhérer à l’A3PC', en: 'Join A3PC' },
        lien: HELLOASSO,
      },
    ],
  },

  recherche: {
    surtitre: { fr: 'Universités, chercheurs, mécènes', en: 'Universities, researchers, patrons' },
    titre: { fr: 'Un terrain d’étude complet, à taille humaine', en: 'A complete, human-scale case study' },
    textes: [
      { fr: 'Quatre siècles de sources sur un seul village : registres paroissiaux, état civil, recensements, cadastre, presse ancienne. Assez pour une vraie recherche, assez petit pour en voir le bout.', en: 'Four centuries of sources on a single village: parish registers, civil records, censuses, land surveys, old newspapers. Enough for real research, small enough to complete.' },
      { fr: 'Ici, le mécène n’est pas seulement un financeur : il suit les recherches et voit ce que son soutien permet de découvrir.', en: 'Here a patron is more than a funder: they follow the research and see what their support helps uncover.' },
    ],
    pistes: [
      { fr: 'Humanités numériques et paléographie assistée par IA', en: 'Digital humanities and AI-assisted palaeography' },
      { fr: 'Démographie historique : familles suivies de 1602 au XXᵉ siècle', en: 'Historical demography: families traced from 1602 to the 20th century' },
      { fr: 'Histoire rurale de la France de l’Ouest', en: 'Rural history of western France' },
      { fr: 'Projets d’étudiants, stages, relecture experte', en: 'Student projects, internships, expert review' },
      { fr: 'Généalogie : retrouver des ancêtres venus de Bretagne', en: 'Genealogy: tracing ancestors from Brittany' },
    ],
    sujet: 'Nomina Memoria Chaumeré : partenariat / partnership',
  },

  // Paragraphes de l'encart « Qui sommes-nous ? » (le HTML simple comme <strong> est autorise).
  transparence: [
    { fr: 'Le projet est porté par l’<strong>A3PC</strong>, Association pour la Promotion du Pays de Chaumeré : association loi 1901, siège à Chaumeré (35113 Domagné), déclarée le 27 septembre 2026 et publiée au Journal officiel des associations sous le numéro RNA W351007269.', en: 'The project is run by <strong>A3PC</strong> (Association pour la Promotion du Pays de Chaumeré), a French non-profit under the 1901 law, based in Chaumeré (35113 Domagné, France), registered on 27 September 2026 and published in the French Official Journal of associations, RNA number W351007269.' },
    { fr: 'Une demande de rescrit mécénat est en préparation. <strong>Aucun reçu fiscal ni avantage fiscal n’est garanti à ce stade</strong>, en France comme à l’étranger.', en: 'A request for a tax-deductibility ruling is being prepared with the French tax authorities. <strong>No tax receipt or tax benefit can be promised at this stage</strong>, in France or abroad. A3PC is not a US 501(c)(3) organisation.' },
    { fr: 'Pour tout savoir sur l’association, ses fêtes de village et son bureau : <a href="https://a3pc.fr/association/" target="_blank" rel="noopener"><strong>en voir plus sur a3pc.fr</strong></a>.', en: 'To learn more about the association, its village events and its board: <a href="https://a3pc.fr/association/" target="_blank" rel="noopener"><strong>see more on a3pc.fr</strong></a> (in French).' },
  ],

  // Referencement : titre et description de la page (description : 160 caracteres au maximum).
  seo: {
    titre: {
      fr: 'Chaumeré (Bretagne) : registres paroissiaux depuis 1602 | Nomina Memoria',
      en: 'Chaumeré, Brittany: parish registers since 1602 | Nomina Memoria',
    },
    description: {
      fr: 'Registres de Chaumeré (Bretagne) depuis 1602 : l’IA et des bénévoles déchiffrent quatre siècles de baptêmes, mariages et sépultures. Soutenez le projet.',
      en: 'Parish registers of Chaumeré, Brittany, since 1602: AI and volunteers decipher four centuries of baptisms, weddings and burials. Support the project.',
    },
  },

  // Questions frequentes du village (affichees sur la page et declarees aux moteurs de recherche et aux IA).
  faq: [
    {
      q: { fr: 'Où se trouve Chaumeré ?', en: 'Where is Chaumeré?' },
      r: {
        fr: 'Chaumeré est une ancienne paroisse bretonne, puis commune pendant près de deux siècles, en Ille-et-Vilaine (35). Depuis le 1ᵉʳ janvier 1974, elle est associée à sa voisine Domagné (code postal 35113).',
        en: 'Chaumeré is a former Breton parish, then a municipality for nearly two centuries, in Ille-et-Vilaine (35), France. Since 1 January 1974 it has been merged with its neighbour Domagné (postcode 35113).',
      },
    },
    {
      q: { fr: 'Depuis quand existent les registres de Chaumeré, et combien sont déchiffrés ?', en: 'How old are the Chaumeré registers, and how many are deciphered?' },
      r: {
        fr: 'Le plus ancien registre conservé date de 1602. 1 191 documents ont été repérés aux Archives départementales d’Ille-et-Vilaine, et plus de 150 registres et documents sont déjà déchiffrés.',
        en: 'The oldest surviving register dates from 1602. 1,191 documents have been found in the Archives départementales d’Ille-et-Vilaine, and over 150 registers and documents are already deciphered.',
      },
    },
    {
      q: { fr: 'Comment chercher un ancêtre de Chaumeré ?', en: 'How do I look for an ancestor from Chaumeré?' },
      r: {
        fr: 'La recherche de noms et les actes déjà transcrits sont en ligne, gratuitement, sur le site de l’A3PC : voir la section « Explorez les archives déjà transcrites » de cette page.',
        en: 'Name search and the records already transcribed are online, free of charge, on the A3PC website: see the “Explore the records already transcribed” section of this page (the records are in French).',
      },
    },
    {
      q: { fr: 'À quoi sert un don pour Chaumeré ?', en: 'What does a gift to the Chaumeré project pay for?' },
      r: {
        fr: 'L’A3PC est une toute jeune association de bénévoles : ce que vous donnez sert directement aux recherches, c’est-à-dire au matériel et aux outils (un abonnement d’IA, un ordinateur). Vous pouvez aussi adhérer pour 10 € par an, où que vous viviez.',
        en: 'A3PC is a brand-new, volunteer-run association: what you give goes straight into the research, meaning equipment and tools (an AI subscription, a computer). You can also join for €10 a year, wherever you live.',
      },
    },
    {
      q: { fr: 'Un don à l’A3PC est-il déductible des impôts ?', en: 'Is a gift to A3PC tax-deductible?' },
      r: {
        fr: 'Pas à ce stade : une demande de rescrit mécénat est en préparation. Aucun reçu fiscal ni avantage fiscal n’est garanti, en France comme à l’étranger.',
        en: 'Not at this stage: a request for a tax-deductibility ruling is being prepared. No tax receipt or tax benefit can be promised, in France or abroad. A3PC is not a US 501(c)(3) organisation.',
      },
    },
  ],

  final: {
    titre: { fr: 'Ils ont vécu, aimé, travaillé ici. Aidez-nous à ne pas les oublier.', en: 'They lived, loved and worked here. Help us remember them.' },
    texte: { fr: 'Un don, un ordinateur, un abonnement, une heure de relecture : tout compte.', en: 'A gift, a computer, a subscription, an hour of proofreading: it all counts. You are welcome to write to us in English.' },
    sujet: 'Nomina Memoria Chaumeré / Support Chaumeré',
  },

  // Liens du pied de page vers le site de l'association.
  liens: [
    { href: 'https://a3pc.fr/', fr: 'a3pc.fr', en: 'a3pc.fr' },
    { href: 'https://a3pc.fr/archives/', fr: 'les archives', en: 'the archives' },
    { href: 'https://a3pc.fr/histoire/', fr: 'l’histoire', en: 'the history' },
  ],
};
