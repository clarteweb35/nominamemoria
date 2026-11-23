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
