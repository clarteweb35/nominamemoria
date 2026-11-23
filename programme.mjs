// Reglages du programme Nomina Memoria, communs a tous les villages : a modifier ici uniquement.
// Chaque texte existe en francais (fr) et en anglais (en).

export const PROGRAMME = {
  nom: 'Nomina Memoria',
  // Adresse publique du site, utilisee pour les images de partage (reseaux sociaux).
  // Site affiche par GitHub Pages ; domaine achete chez OVH (declare dans public/CNAME).
  adresse: 'https://nominamemoria.org/',
  accroche: {
    fr: 'Rendre leur nom aux oubliés, un village après l’autre.',
    en: 'Giving forgotten people their names back, one village at a time.',
  },
  // Google Tag Manager : charge UNIQUEMENT apres l'accord du visiteur dans le bandeau de cookies (RGPD).
  idGoogleTagManager: 'GTM-P55LC6PV',
  // Qui porte le programme pour l'instant (editeur du site, repris des mentions legales de a3pc.fr).
  porteur: {
    nom: 'A3PC',
    nomComplet: 'Association pour la Promotion du Pays de Chaumeré',
    // Commune du porteur (texte de l'accueil : « association de Chaumeré, France »).
    commune: 'Chaumeré',
    site: 'https://a3pc.fr/',
    siege: "4 allée de l'École, Chaumeré, 35113 Domagné, France",
    rna: 'W351007269',
    declaration: { fr: 'déclarée en préfecture le 27 septembre 2026', en: 'registered with the prefecture on 27 September 2026' },
    directeurPublication: { fr: 'Julien GUILLOIS, président de l’A3PC', en: 'Julien GUILLOIS, president of A3PC' },
    // Logo (copie dans images/programme/) et bureau elu a l'assemblee generale constitutive du 27/09/2026 (publie sur a3pc.fr).
    logo: 'images/programme/logo-a3pc.jpg',
    bureau: [
      { nom: 'Julien GUILLOIS', role: { fr: 'Président', en: 'President' } },
      { nom: 'Laëtitia QUEGUINER', role: { fr: 'Trésorière', en: 'Treasurer' } },
      { nom: 'Margarita GUILLOIS', role: { fr: 'Secrétaire', en: 'Secretary' } },
    ],
    pageAssociation: 'https://a3pc.fr/association/',
    // Adresse e-mail ecrite a l'envers (limite les robots qui collectent les adresses).
    courrielInverse: 'moc.liamg@cp3a.tcatnoc',
  },
};

// La methode, la meme dans tous les villages (affichee sur l'accueil et sur chaque page de village).
export const METHODE = [
  {
    titre: { fr: 'Déchiffrer', en: 'Decipher' },
    texte: {
      fr: 'L’IA lit les écritures anciennes, page après page, et les traduit en français d’aujourd’hui. Un travail de fourmi devient enfin possible pour des bénévoles.',
      en: 'AI reads old handwriting page by page and turns it into modern language. A painstaking task finally becomes possible for volunteers.',
    },
  },
  {
    titre: { fr: 'Vérifier', en: 'Verify' },
    texte: {
      fr: 'L’IA se trompe, surtout sur les noms. Chaque acte porte un niveau de confiance et des bénévoles relisent sur l’image d’origine.',
      en: 'AI makes mistakes, especially with names. Each record carries a confidence level, and volunteers check it against the original image.',
    },
  },
  {
    titre: { fr: 'Partager', en: 'Share' },
    texte: {
      fr: 'Tout est publié gratuitement, avec la source exacte. Les outils et les méthodes aussi : d’autres villages peuvent s’en servir.',
      en: 'Everything is published free of charge, with the exact source. So are the tools and methods, so other villages can use them.',
    },
  },
];

// Referencement : titre et description de l'accueil (la description doit tenir en 160 caracteres).
// {village} est remplace par le nom du village pilote.
export const SEO = {
  accueil: {
    titre: {
      fr: 'Nomina Memoria — Registres anciens de village, généalogie et IA',
      en: 'Nomina Memoria — Old village registers, genealogy and AI',
    },
    description: {
      fr: 'Nomina Memoria fait revivre les registres anciens de village : l’IA déchiffre, des bénévoles vérifient, tout est gratuit. Village pilote : {village}.',
      en: 'Nomina Memoria brings old village registers back to life: AI deciphers the handwriting, volunteers check it, all free. Pilot village: {village}.',
    },
  },
};

// Questions frequentes de l'accueil (balises HTML simples permises dans les reponses).
// Elles sont affichees sur la page ET declarees aux moteurs de recherche et aux IA (schema.org FAQPage).
export const FAQ = [
  {
    q: { fr: 'Qu’est-ce que Nomina Memoria ?', en: 'What is Nomina Memoria?' },
    r: {
      fr: 'Nomina Memoria (« les noms, la mémoire », en latin) est un programme qui fait revivre les registres anciens des villages : baptêmes, mariages et sépultures tenus à la plume depuis le XVIᵉ ou le XVIIᵉ siècle. L’intelligence artificielle les déchiffre, des bénévoles les vérifient, et tout est publié gratuitement avec la source exacte.',
      en: 'Nomina Memoria (Latin for “names, memory”) is a programme that brings old village registers back to life: baptisms, weddings and burials kept in quill and ink since the 16th or 17th century. Artificial intelligence deciphers them, volunteers check them, and everything is published free of charge with the exact source.',
    },
  },
  {
    q: { fr: 'Comment l’IA lit-elle l’écriture ancienne, et peut-on lui faire confiance ?', en: 'How does AI read old handwriting, and can it be trusted?' },
    r: {
      fr: 'L’IA lit les pages numérisées une à une et les transcrit en français d’aujourd’hui. Elle se trompe, surtout sur les noms propres : c’est pourquoi chaque acte porte un niveau de confiance et des bénévoles relisent sur l’image d’origine. Nous disons toujours ce qui est certain et ce qui ne l’est pas.',
      en: 'AI reads the digitised pages one by one and transcribes them into modern language. It makes mistakes, especially with proper names: that is why each record carries a confidence level and volunteers check it against the original image. We always say what is certain and what is not.',
    },
  },
  {
    q: { fr: 'Où trouver les registres paroissiaux de mon village ?', en: 'Where can I find the parish registers of my village?' },
    r: {
      fr: 'En France, les registres paroissiaux et d’état civil anciens sont conservés par les services d’archives départementales, et beaucoup sont numérisés et consultables en ligne gratuitement. Pour Chaumeré, ce sont les Archives départementales d’Ille-et-Vilaine. Notre outil ThotSync permet de télécharger les archives en ligne d’Ille-et-Vilaine.',
      en: 'In France, old parish and civil registers are kept by the departmental archives, and many are digitised and free to browse online. For Chaumeré, that is the Archives départementales d’Ille-et-Vilaine. Our tool ThotSync downloads the online archives of Ille-et-Vilaine.',
    },
  },
  {
    q: { fr: 'Puis-je retrouver mes ancêtres dans ces archives ?', en: 'Can I find my ancestors in these archives?' },
    r: {
      fr: 'Si vos ancêtres viennent d’un village dont nous avons transcrit les registres, oui : pour Chaumeré, la recherche de noms est gratuite en ligne sur le site de l’A3PC. Sinon, vous pouvez lancer le programme dans le village de vos ancêtres : il est fait pour être copié.',
      en: 'If your ancestors came from a village whose registers we have transcribed, yes: for Chaumeré, name search is free online on the A3PC website. Otherwise you can start the programme in your ancestors’ village: it is made to be copied.',
    },
  },
  {
    q: { fr: 'Comment lancer le programme dans mon village ?', en: 'How can I start the programme in my village?' },
    r: {
      fr: 'Il faut une association locale (ou quelques habitants prêts à en créer une), des archives consultables en ligne, quelques bénévoles curieux, un ordinateur et un abonnement d’IA. Nous apportons la méthode de lecture et de vérification, les outils, le modèle de site bilingue et le retour d’expérience de Chaumeré. Écrivez-nous depuis la section « Lancer votre village ».',
      en: 'You need a local association (or a few residents ready to start one), archives available online, a few curious volunteers, a computer and an AI subscription. We provide the reading and checking method, the tools, the bilingual website template and the experience of Chaumeré. Write to us from the “Start your village” section.',
    },
  },
  {
    q: { fr: 'Tout est-il gratuit ?', en: 'Is everything free?' },
    r: {
      fr: 'Oui : les transcriptions, les outils et les méthodes sont publiés gratuitement, avec la source exacte de chaque document. Les dons financent le matériel et les abonnements d’IA des bénévoles.',
      en: 'Yes: transcriptions, tools and methods are published free of charge, with the exact source of each document. Donations pay for the volunteers’ equipment and AI subscriptions.',
    },
  },
  {
    q: { fr: 'Qui est derrière le programme, et où va mon don ?', en: 'Who is behind the programme, and where does my gift go?' },
    r: {
      fr: 'Le programme est lancé par l’<strong>A3PC</strong> (Association pour la Promotion du Pays de Chaumeré), association loi 1901 de Chaumeré, en France (RNA W351007269). Votre don va directement à l’association locale du village que vous choisissez ; sur HelloAsso, vous verrez son nom complet.',
      en: 'The programme was launched by <strong>A3PC</strong> (Association pour la Promotion du Pays de Chaumeré), a French non-profit under the 1901 law based in Chaumeré, France (RNA W351007269). Your gift goes directly to the local association of the village you choose; on HelloAsso you will see its full name.',
    },
  },
  {
    q: { fr: 'Mon don donne-t-il droit à un reçu fiscal ?', en: 'Does my gift entitle me to a tax receipt?' },
    r: {
      fr: 'Pas à ce stade. Une demande de rescrit mécénat est en préparation : aucun reçu fiscal ni avantage fiscal n’est garanti, en France comme à l’étranger.',
      en: 'Not at this stage. A request for a tax-deductibility ruling is being prepared: no tax receipt or tax benefit can be promised, in France or abroad.',
    },
  },
];
