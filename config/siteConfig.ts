/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🦅 EAGLE PRODUCTION - FICHIER DE CONFIGURATION CENTRALISÉ
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Ce fichier permet de modifier rapidement les éléments clés du site :
 * - Vidéo d'accueil (Hero)
 * - Avis clients (Google Reviews)
 * - Questions fréquentes (FAQ)
 * - Tarifs des prestations
 * - Options et suppléments
 * 
 * 📝 INSTRUCTIONS :
 * 1. Modifie les valeurs ci-dessous
 * 2. Sauvegarde le fichier
 * 3. Push le projet → Le site est mis à jour !
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// 🎬 VIDÉO D'ACCUEIL (HERO)
// ═══════════════════════════════════════════════════════════════════════════════

export const HERO_VIDEO = {
  // ID de la vidéo Vimeo (le numéro dans l'URL vimeo.com/video/XXXXXXX)
  vimeoId: "1142391820",
  
  // URL complète générée automatiquement (ne pas modifier)
  get embedUrl() {
    return `https://player.vimeo.com/video/${this.vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&badge=0&autopause=0&portrait=0&quality=auto`;
  },
  
  // Délai avant ouverture automatique en mode immersif (en ms) - 60000 = 1 minute
  autoOpenDelay: 60000,
};

// ═══════════════════════════════════════════════════════════════════════════════
// ⭐ AVIS CLIENTS (GOOGLE REVIEWS)
// ═══════════════════════════════════════════════════════════════════════════════

export const REVIEWS = [
  {
    id: 1,
    name: "Client",
    role: "Projet Immobilier/Architecture",
    content: "Travail de très grande qualité, réalisé avec sérieux et professionnalisme. Les prises de vue par drone sont superbes et mettent parfaitement en valeur le projet. Je recommande vivement EagleProduction !",
    stars: 5
  },
  {
    id: 2,
    name: "Organisateur",
    role: "Mariage & Événement",
    content: "Super travail et de qualité qui plus est je recommande vivement si vous avez un mariage ou autre événement 👍",
    stars: 5
  },
  {
    id: 3,
    name: "Entreprise Frigoriste",
    role: "Communication d'entreprise",
    content: "Paul d'Eagle Production a réalisé un Reel Instagram pour mon entreprise de frigoriste. Très bonne réalisation qui m'a permis de gagner en visibilité. Je recommande",
    stars: 5
  },
  {
    id: 4,
    name: "Paddock Saint-Palais-sur-Mer",
    role: "Événement Automobile",
    content: "Paul est venu filmer notre événement « Paddock Saint-Palaisien » à Saint-Palais-sur-Mer. Très pro, il connaît son métier et sait s'adapter. Nous le recommandons fortement 🏎️",
    stars: 5
  }
];

// Lien pour laisser un avis Google
export const GOOGLE_REVIEW_LINK = "https://g.page/r/Cc7LhwWcIYG9EBM/review";

// ═══════════════════════════════════════════════════════════════════════════════
// ❓ QUESTIONS FRÉQUENTES (FAQ)
// ═══════════════════════════════════════════════════════════════════════════════

export const FAQ_ITEMS = [
  {
    question: "Vos pilotes de drone sont-ils certifiés DGAC et couverts par une assurance ?",
    answer: "Oui, absolument. Chez Eagle Production à Angoulême, nos télépilotes sont certifiés DGAC et habilités à opérer en scénarios STS01 et STS02 — les plus exigeants pour les missions commerciales en zone urbaine et péri-urbaine en Charente et Nouvelle-Aquitaine. Avant chaque mission, nous gérons l'intégralité des démarches : analyse des espaces aériens, déclarations de vol sur la plateforme officielle DGAC, autorisations préfectorales si nécessaire (notamment à proximité de l'aéroport Angoulême-Cognac). Nous disposons également d'une assurance responsabilité civile professionnelle drone, obligatoire pour toute opération commerciale. Sur demande, une attestation d'assurance peut être fournie avant intervention — document souvent requis par les maîtres d'ouvrage et promoteurs immobiliers en Charente."
  },
  {
    question: "Quelle qualité d'images livrez-vous et dans quels délais ?",
    answer: "Nos drones professionnels capturent en 4K Ultra HD avec des capteurs stabilisés 3 axes, offrant un rendu cinématographique adapté à tous vos supports : site web, réseaux sociaux, dossiers de chantier, présentations investisseurs. Pour la photographie aérienne immobilière en Charente, nous livrons des fichiers haute définition exploitables pour les portails comme SeLoger ou Leboncoin. Les livrables sont organisés par date et zone, et déposés via lien de téléchargement sécurisé dans les 48 heures suivant la mission. Pour les suivis de chantier drone à Angoulême, nous ajoutons des comparatifs côte-à-côte et un rapport PDF illustré. Pour les montages vidéo : 2 à 3 jours pour une vidéo courte, 5 à 7 jours pour un film d'entreprise avec étalonnage et sound design."
  },
  {
    question: "Dans quels secteurs et sur quelle zone géographique intervenez-vous ?",
    answer: "Eagle Production intervient dans toute la Nouvelle-Aquitaine avec une base à Angoulême, Charente. Nos secteurs principaux : immobilier (photos et vidéos aériennes de biens, lotissements, résidences neuves pour agences et promoteurs en Charente), BTP et construction (suivi de chantier drone avec orthophoto, comparatifs et rapport PDF pour conducteurs de travaux et maîtres d'ouvrage), inspection technique (toitures, façades, charpentes, infrastructures sans échafaudage), événementiel (mariages, festivals, événements sportifs, cérémonies en Angoulême et région), et communication d'entreprise (films institutionnels, vidéos de présentation, Reels Instagram pour PME et collectivités). Nous intervenons à Angoulême, Cognac, Saintes, Périgueux, Bordeaux, La Rochelle, Poitiers, Niort et dans toutes les communes de Charente."
  },
  {
    question: "Combien coûte une prestation drone ou montage vidéo à Angoulême ?",
    answer: "Nos tarifs sont transparents et accessibles pour les professionnels et particuliers en Charente et Nouvelle-Aquitaine. Captation drone : formule Essentiel (images brutes, idéale pour vos équipes de post-production) à partir de 50 € HT pour 1h de vol. Formule Altitude (vidéo montée, étalonnée, prête à publier) à partir de 150 € HT pour 0-3 minutes — notre formule la plus populaire pour l'immobilier et l'événementiel. Formule Horizon (réalisation complète avec scénarisation, montage, sound design) à partir de 500 € HT. Pour le suivi de chantier drone en Charente, les forfaits sont établis sur devis selon la superficie et la fréquence. Les déplacements en Charente (16) sont inclus dans nos tarifs. Chaque devis est gratuit et envoyé sous 24 heures."
  },
  {
    question: "Proposez-vous aussi du montage vidéo et de la présence digitale sans drone ?",
    answer: "Oui, Eagle Production à Angoulême est un studio de production complet. En plus de la captation drone, nous proposons : le montage vidéo professionnel de vos rushs existants (étalonnage couleur, sound design, sous-titres, déclinaisons multi-formats pour YouTube, Instagram Reels, TikTok, LinkedIn), la création d'identité visuelle (logo, charte graphique, supports de communication pour entreprises en Charente), la création de sites web professionnels (vitrines, portfolios, e-commerce, optimisés SEO local), et l'accompagnement en stratégie de présence digitale locale pour améliorer votre référencement sur Google à Angoulême et en Nouvelle-Aquitaine. Ces services peuvent être combinés pour des packages complets communication visuelle + digital."
  },
  {
    question: "Comment se déroule une mission et quelles sont les étapes jusqu'à la livraison ?",
    answer: "Chez Eagle Production à Angoulême, notre process est rodé et transparent. Étape 1 : demande de devis gratuit (formulaire en ligne ou appel) avec description de votre projet en Charente ou Nouvelle-Aquitaine — réponse sous 24h. Étape 2 : brief créatif et planification (validation du cahier des charges, choix du créneau météo optimal, vérifications réglementaires DGAC). Étape 3 : mission terrain (captation drone, tournage, respect des périmètres de sécurité). Étape 4 : post-production (montage, étalonnage, sound design, sous-titres selon la formule choisie). Étape 5 : livraison d'un premier montage pour validation, puis 2 tours de révisions inclus. Étape 6 : livraison des fichiers finaux via lien sécurisé dans les formats convenus. De la demande de devis à la livraison finale, comptez entre 3 et 15 jours selon la complexité du projet."
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// 💰 TARIFS - FORMULES DRONE
// ═══════════════════════════════════════════════════════════════════════════════

export const PRICING = {
  // ─────────────────────────────────────────────────────────────────────────────
  // FORMULE ESSENTIEL (Images brutes)
  // ─────────────────────────────────────────────────────────────────────────────
  essentiel: {
    name: "Essentiel",
    description: "Images drone brutes de haute qualité, prêtes pour votre post‑production.",
    prices: [
      { label: "1h de prise de vue", price: 50 },
      { label: "2h de prise de vue", price: 100 },
    ],
    features: [
      "Images brutes non retouchées",
      "Liberté totale de montage",
      "Livraison rapide des fichiers",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FORMULE ALTITUDE (Vidéo montée)
  // ─────────────────────────────────────────────────────────────────────────────
  altitude: {
    name: "Altitude",
    description: "Vidéo montée sur-mesure, immersive et prête à publier sur vos canaux.",
    isPopular: true, // Affiche le badge "Populaire"
    prices: [
      { label: "Classique", sublabel: "0 à 3 minutes", price: 150 },
      { label: "Altitude +", sublabel: "3 à 5 minutes", price: 250 },
    ],
    features: [
      "Montage dynamique et rythmé",
      "Musique libre de droits incluse",
      "Étalonnage pro, prêt à diffuser",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FORMULE HORIZON (Réalisation complète)
  // ─────────────────────────────────────────────────────────────────────────────
  horizon: {
    name: "Horizon",
    description: "Réalisation complète : écriture, tournage et montage pour un rendu cinéma.",
    prices: [
      { label: "Classique", sublabel: "5 à 10 minutes", price: 500 },
      { label: "Horizon +", sublabel: "10 à 20 minutes", price: 1000 },
    ],
    features: [
      "Scénarisation et storytelling",
      "Montage dynamique inclus",
      "Musique libre de droits",
      "Étalonnage couleur professionnel",
      "Sound Design immersif",
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 OPTIONS & SUPPLÉMENTS
// ═══════════════════════════════════════════════════════════════════════════════

export const OPTIONS = {
  deplacement: { price: 0.50, unit: "/km", label: "Déplacement" },
  photoDrone: { price: 2, unit: "/unité", label: "Photo drone" },
  supportUsb: { price: 12, unit: "/clé", label: "Support USB" },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 TARIFS - SERVICES COMPLÉMENTAIRES
// ═══════════════════════════════════════════════════════════════════════════════

export const SERVICES_COMPLEMENTAIRES = {
  // ─────────────────────────────────────────────────────────────────────────────
  // MONTAGE VIDÉO
  // ─────────────────────────────────────────────────────────────────────────────
  montageVideo: {
    name: "Montage vidéo",
    description: "Montage intégral pour une vidéo 100% sur-mesure :",
    pricePerHour: 50,
    features: [
      "Montage dynamique",
      "Étalonnage professionnel",
      "Sound Design et mixage immersif",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // IDENTITÉ VISUELLE
  // ─────────────────────────────────────────────────────────────────────────────
  identiteVisuelle: {
    name: "Identité visuelle",
    items: [
      { label: "Création de Logo sur-mesure", price: 600 },
      { label: "Charte graphique complète", price: 400 },
      { label: "Templates réseaux sociaux prêts à publier", price: 110 },
      { label: "Design de supports de communication", sublabel: "Cartes, flyers, affiches, kakémonos, brochures", price: 90 },
      { label: "Signature mail professionnelle", price: 100, extra: "+15€ par collaborateur" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PRÉSENCE DIGITAL
  // ─────────────────────────────────────────────────────────────────────────────
  presenceDigital: {
    name: "Présence digital",
    items: [
      { label: "Création de site internet vitrine clé en main", price: 500 },
      { label: "Fiche Google et pack visibilité locale", sublabel: "Fiche Google Business Profile, Solocal", price: 250 },
      { label: "Référencement SEO", price: 250 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // RÉSEAUX SOCIAUX
  // ─────────────────────────────────────────────────────────────────────────────
  reseauxSociaux: {
    name: "Réseaux sociaux",
    items: [
      { label: "Mise en place Instagram / Facebook / TikTok", price: 250 },
      { label: "Stratégie de contenu et templates", price: 170 },
      { label: "Shooting photo et tournage vidéo", sublabel: "Drone + au sol", price: "Sur demande" },
      { label: "Montage courts formats, Reels, TikTok et films d'entreprise", price: "50€/h" },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 📞 INFORMATIONS DE CONTACT
// ═══════════════════════════════════════════════════════════════════════════════

export const CONTACT = {
  email: "contact@eagle-prod.com",
  phone: "+33 6 99 36 17 15", // À mettre à jour
  location: "Angoulême, Nouvelle-Aquitaine",
  socialLinks: {
    instagram: "https://www.instagram.com/eagleproduction",
    facebook: "https://www.facebook.com/eagleproduction",
    linkedin: "https://www.linkedin.com/company/eagleproduction",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 👤 À PROPOS
// ═══════════════════════════════════════════════════════════════════════════════

export const ABOUT = {
  // ─────────────────────────────────────────────────────────────────────────────
  // TITRE & SOUS-TITRE
  // ─────────────────────────────────────────────────────────────────────────────
  sectionLabel: "À Propos",
  title: "Paul Bardin :",
  subtitle: "La vidéo vue d'en haut.",
  
  // ─────────────────────────────────────────────────────────────────────────────
  // PHOTO
  // ─────────────────────────────────────────────────────────────────────────────
  photo: {
    src: "/Photo_de_paul_bardin.webp",
    alt: "Paul Bardin Pilote Drone",
  },
  
  // ─────────────────────────────────────────────────────────────────────────────
  // BADGE SUR LA PHOTO
  // ─────────────────────────────────────────────────────────────────────────────
  badge: {
    title: "Basé à Angoulême",
    subtitle: "Intervention Nouvelle-Aquitaine",
  },
  
  // ─────────────────────────────────────────────────────────────────────────────
  // PARAGRAPHES (chaque élément = un paragraphe)
  // Utilise <strong> pour mettre en gras (sera affiché en blanc)
  // ─────────────────────────────────────────────────────────────────────────────
  paragraphs: [
    "J'ai fondé <strong>Eagle Production</strong> à 23 ans, poussé par une passion profonde pour le pilotage et la <strong>création de vidéos</strong>. Cette passion m'a naturellement conduit à devenir <strong>télépilote certifié et diplômé</strong>, et à transformer ce savoir-faire en un véritable projet professionnel.",
    "Eagle Production est né de cette envie : capturer le monde sous un autre angle, raconter des histoires, et offrir des images uniques.",
    "Notre objectif chez Eagle Production est clair : intervenir dans un maximum de domaines.<br/>Qu'il s'agisse <strong>d'événements</strong>, de <strong>sport</strong>, de <strong>construction</strong>, de <strong>tourisme</strong>, de projets artistiques, et bien d'autres domaines encore, nous voulons toucher un maximum de métiers et d'univers différents.",
    "Parce que la créativité n'a pas de limites, et parce que le <strong>drone</strong> (tout comme la vidéo) permet d'explorer des perspectives nouvelles, Eagle Production a été pensé pour <strong>s'adapter à tous les besoins</strong> et intervenir partout où une vision aérienne ou créative peut faire la différence.",
  ],
  
  // ─────────────────────────────────────────────────────────────────────────────
  // CITATION
  // ─────────────────────────────────────────────────────────────────────────────
  quote: {
    text: "Comme un aigle, nous visons la précision pour ne jamais manquer l'instant décisif.",
    author: "PAUL BARDIN",
    role: "FONDATEUR",
  },
};
