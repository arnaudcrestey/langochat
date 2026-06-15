export type Topic = {
  slug: string;
  title: string;
  intro: string;
  audienceNote: string;
  understand: string[];
  signals: string[];
  helps: string[];
  avoid: string[];
  talk: string[];
  helpWhen: string[];
};

export const topics: Topic[] = [
  {
    slug: "colere",
    title: "Colère",
    intro:
      "Comprendre ce que la colère peut dire d'une limite, d'une fatigue ou d'un besoin qui ne trouve pas encore ses mots.",
    audienceNote: "Pour répondre sans humilier, punir trop vite ou alimenter l'escalade.",
    understand: [
      "La colère peut être une émotion de protection, pas seulement une opposition.",
      "Elle apparaît parfois quand l'enfant ou l'adolescent ne sait plus comment demander, refuser ou expliquer.",
      "Le calme de l'adulte aide souvent davantage qu'une recherche immédiate de coupable."
    ],
    signals: [
      "Explosions disproportionnées ou répétées.",
      "Difficulté à revenir au calme après le conflit.",
      "Mots blessants, gestes brusques ou retrait après coup."
    ],
    helps: [
      "Nommer l'émotion sans valider les gestes blessants.",
      "Attendre le retour au calme avant de chercher à comprendre.",
      "Proposer un cadre stable et quelques choix simples."
    ],
    avoid: [
      "Ridiculiser la colère ou la qualifier de caprice.",
      "Multiplier les questions au moment de l'explosion.",
      "Répondre par une colère plus forte."
    ],
    talk: [
      "J'ai vu que quelque chose était très fort pour toi.",
      "On peut en reparler quand ce sera plus calme.",
      "Je veux comprendre sans te laisser faire n'importe quoi."
    ],
    helpWhen: [
      "La colère met quelqu'un en danger.",
      "Les crises deviennent très fréquentes ou impossibles à apaiser.",
      "L'adulte se sent dépassé ou craint ses propres réactions."
    ]
  },
  {
    slug: "anxiete",
    title: "Anxiété",
    intro:
      "Repérer une inquiétude qui prend trop de place sans réduire l'enfant à sa peur.",
    audienceNote: "Pour rassurer sans minimiser et soutenir sans tout faire à sa place.",
    understand: [
      "L'anxiété peut chercher à anticiper un danger, même lorsque le danger n'est pas visible.",
      "Elle se manifeste souvent dans le corps avant d'être expliquée avec des mots.",
      "La sécurité relationnelle compte autant que les solutions concrètes."
    ],
    signals: [
      "Maux de ventre, troubles du sommeil ou pleurs avant certains moments.",
      "Besoin répété d'être rassuré.",
      "Evitement de situations ordinaires."
    ],
    helps: [
      "Créer une routine prévisible.",
      "Avancer par petites étapes observables.",
      "Valoriser les essais plutôt que la réussite complète."
    ],
    avoid: [
      "Dire simplement qu'il n'y a aucune raison d'avoir peur.",
      "Forcer trop vite l'exposition à ce qui inquiète.",
      "Confondre anxiété et mauvaise volonté."
    ],
    talk: [
      "Je vois que cette situation te coûte beaucoup.",
      "On peut chercher ensemble ce qui rendrait le premier pas possible.",
      "Tu n'as pas besoin d'être parfaitement rassuré pour essayer doucement."
    ],
    helpWhen: [
      "L'anxiété empêche de dormir, manger, aller en classe ou voir des proches.",
      "Les symptômes corporels se répètent.",
      "La souffrance semble s'installer."
    ]
  },
  {
    slug: "isolement",
    title: "Isolement",
    intro:
      "Comprendre un retrait durable sans confondre besoin de solitude et souffrance silencieuse.",
    audienceNote: "Pour rester présent sans envahir.",
    understand: [
      "L'isolement peut protéger d'une surcharge, d'une honte ou d'une peur d'être jugé.",
      "Certains enfants parlent peu mais observent beaucoup.",
      "La qualité du lien compte plus que la quantité de questions posées."
    ],
    signals: [
      "Rupture avec les amis ou activités appréciées.",
      "Retrait marqué dans la chambre ou derrière les écrans.",
      "Réponses très courtes et évitement du regard."
    ],
    helps: [
      "Maintenir des invitations simples et régulières.",
      "Proposer une présence côte à côte plutôt qu'un face-à-face intense.",
      "Remarquer les petites ouvertures."
    ],
    avoid: [
      "Interpréter tout silence comme une provocation.",
      "Exiger une confidence immédiate.",
      "Multiplier les reproches sur le retrait."
    ],
    talk: [
      "Je ne veux pas te forcer à parler, mais je reste là.",
      "On peut juste faire quelque chose ensemble, sans tout expliquer.",
      "Si quelque chose pèse, tu peux me le dire petit à petit."
    ],
    helpWhen: [
      "Le retrait dure et s'aggrave.",
      "Il s'accompagne de tristesse, d'angoisse ou de propos inquiétants.",
      "L'enfant semble coupé de presque tous ses appuis."
    ]
  },
  {
    slug: "harcelement",
    title: "Harcèlement",
    intro:
      "Identifier des répétitions humiliantes, excluantes ou menaçantes et agir avec prudence.",
    audienceNote: "Pour croire, protéger et documenter sans exposer davantage.",
    understand: [
      "Le harcèlement repose souvent sur la répétition et l'asymétrie.",
      "La honte peut empêcher l'enfant d'en parler tôt.",
      "L'adulte doit sécuriser avant de chercher une confrontation."
    ],
    signals: [
      "Refus d'aller à l'école ou changement brutal d'humeur.",
      "Objets abîmés, messages humiliants, peur du téléphone.",
      "Isolement ou perte d'estime de soi."
    ],
    helps: [
      "Noter les faits datés et conserver les messages.",
      "Prévenir les adultes responsables du cadre scolaire ou éducatif.",
      "Rappeler que l'enfant n'est pas responsable des violences subies."
    ],
    avoid: [
      "Conseiller de simplement ignorer si la situation dure.",
      "Organiser seul une confrontation directe.",
      "Publier ou partager les preuves largement."
    ],
    talk: [
      "Je te crois et on va regarder ça avec sérieux.",
      "Tu n'as pas à régler cela seul.",
      "On va chercher les adultes qui doivent protéger dans ce cadre."
    ],
    helpWhen: [
      "Il y a menaces, violences ou cyberharcèlement.",
      "L'enfant parle de ne plus supporter la situation.",
      "L'établissement ou le cadre concerné ne répond pas suffisamment."
    ]
  },
  {
    slug: "refus-scolaire",
    title: "Refus scolaire",
    intro:
      "Approcher le refus d'aller en classe comme un signal à comprendre, pas comme une simple opposition.",
    audienceNote: "Pour chercher les causes sans perdre le cadre.",
    understand: [
      "Le refus scolaire peut mêler anxiété, fatigue, conflits, honte ou difficultés d'apprentissage.",
      "La pression matinale augmente souvent la panique.",
      "Une reprise progressive se prépare mieux avec plusieurs adultes."
    ],
    signals: [
      "Pleurs, douleurs ou blocage au moment de partir.",
      "Soulagement net quand l'école est évitée.",
      "Accumulation d'absences ou retards."
    ],
    helps: [
      "Identifier les moments précis qui déclenchent le blocage.",
      "Contacter l'école pour chercher un aménagement temporaire.",
      "Garder des horaires stables même les jours sans classe."
    ],
    avoid: [
      "Réduire la situation à de la paresse.",
      "Laisser le sujet devenir uniquement un bras de fer.",
      "Attendre trop longtemps avant de mobiliser l'école ou un professionnel."
    ],
    talk: [
      "Je vois que partir à l'école est devenu très difficile.",
      "On va essayer de comprendre ce qui bloque exactement.",
      "L'objectif est de retrouver un chemin possible, étape par étape."
    ],
    helpWhen: [
      "Les absences se répètent.",
      "La détresse est forte ou corporelle.",
      "La famille ne parvient plus à maintenir un rythme."
    ]
  },
  {
    slug: "ecrans",
    title: "Écrans",
    intro:
      "Trouver un cadre numérique qui protège le sommeil, le lien et l'attention sans dramatiser chaque usage.",
    audienceNote: "Pour poser des limites sans entrer dans une guerre permanente.",
    understand: [
      "Les écrans peuvent être un loisir, un refuge, un lien social ou une fuite.",
      "Le problème se lit surtout dans les effets sur le quotidien.",
      "Un cadre clair est plus utile qu'une interdiction improvisée."
    ],
    signals: [
      "Sommeil réduit ou irritabilité à l'arrêt.",
      "Abandon d'activités importantes.",
      "Mensonges répétés ou conflits très intenses autour des usages."
    ],
    helps: [
      "Définir des règles visibles et prévisibles.",
      "Protéger les moments de sommeil et de repas.",
      "S'intéresser aux contenus plutôt qu'au temps seulement."
    ],
    avoid: [
      "Confisquer sans expliquer ni prévoir la suite.",
      "Diaboliser tous les espaces numériques.",
      "Poser des règles que l'adulte ne pourra pas tenir."
    ],
    talk: [
      "Je veux comprendre ce que cet écran t'apporte.",
      "On doit aussi protéger ton sommeil et notre lien.",
      "Cherchons une règle qui soit claire et tenable."
    ],
    helpWhen: [
      "Les usages semblent incontrôlables.",
      "Il existe cyberharcèlement, chantage ou contenus dangereux.",
      "Le sommeil, l'école ou la santé sont fortement touchés."
    ]
  },
  {
    slug: "conflits-familiaux",
    title: "Conflits familiaux",
    intro:
      "Apaiser les tensions répétées en distinguant désaccord, loyauté, fatigue et besoin de cadre.",
    audienceNote: "Pour ne pas faire porter aux enfants le poids des conflits d'adultes.",
    understand: [
      "Un conflit familial répété peut rendre l'enfant vigilant et épuisé.",
      "Les enfants peuvent se sentir responsables de tensions qui ne leur appartiennent pas.",
      "Le cadre adulte doit rester protecteur même en cas de désaccord."
    ],
    signals: [
      "Peur de rentrer, de parler ou de choisir un camp.",
      "Somatisations, colère ou retrait après les disputes.",
      "Confidences où l'enfant se sent responsable."
    ],
    helps: [
      "Rappeler à l'enfant que les conflits d'adultes ne sont pas sa faute.",
      "Créer des moments de calme hors conflit.",
      "Clarifier les règles de respect dans la maison."
    ],
    avoid: [
      "Demander à l'enfant d'arbitrer.",
      "Utiliser l'enfant comme messager.",
      "Dévaloriser l'autre adulte devant lui."
    ],
    talk: [
      "Tu n'es pas responsable de cette tension.",
      "Les adultes doivent trouver une manière plus calme de gérer cela.",
      "Tu peux dire ce que tu ressens sans devoir choisir un camp."
    ],
    helpWhen: [
      "Les disputes deviennent menaçantes ou violentes.",
      "L'enfant montre une souffrance durable.",
      "Les adultes n'arrivent plus à protéger un cadre calme."
    ]
  },
  {
    slug: "separation",
    title: "Séparation",
    intro:
      "Accompagner les changements familiaux avec des mots simples, stables et non accusateurs.",
    audienceNote: "Pour sécuriser l'enfant sans lui demander de comprendre tout le conflit.",
    understand: [
      "Une séparation peut bouleverser les repères même lorsqu'elle est nécessaire.",
      "L'enfant a besoin de continuité, de vérité adaptée et de permissions émotionnelles.",
      "Il n'a pas à devenir le confident des adultes."
    ],
    signals: [
      "Questions répétées sur l'avenir.",
      "Tristesse, colère, régression ou besoin de contrôle.",
      "Inquiétude concernant l'amour des adultes."
    ],
    helps: [
      "Dire ce qui change et ce qui reste stable.",
      "Autoriser plusieurs émotions à la fois.",
      "Limiter les détails du conflit d'adultes."
    ],
    avoid: [
      "Faire porter une responsabilité à l'enfant.",
      "Promettre ce qui n'est pas certain.",
      "Transformer chaque échange en justification."
    ],
    talk: [
      "Ce changement concerne les adultes, tu n'en es pas responsable.",
      "Tu peux être triste, fâché ou soulagé, parfois tout en même temps.",
      "On va te dire clairement ce qui change pour toi."
    ],
    helpWhen: [
      "La séparation s'accompagne de violences ou de menaces.",
      "L'enfant semble durablement perdu ou anxieux.",
      "Les échanges parentaux empêchent la protection de l'enfant."
    ]
  },
  {
    slug: "estime-de-soi",
    title: "Estime de soi",
    intro:
      "Soutenir un enfant qui se dévalorise sans le noyer sous des compliments qui ne le rejoignent pas.",
    audienceNote: "Pour restaurer de la confiance par des expériences réelles.",
    understand: [
      "L'estime de soi se construit dans le regard, les réussites modestes et la sécurité relationnelle.",
      "Un enfant qui se critique peut chercher à se protéger d'un échec attendu.",
      "Les comparaisons fragilisent souvent davantage."
    ],
    signals: [
      "Phrases comme je suis nul ou je n'y arriverai jamais.",
      "Evitement des essais.",
      "Sensibilité forte aux remarques."
    ],
    helps: [
      "Valoriser l'effort précis plutôt que la personne en général.",
      "Proposer des défis accessibles.",
      "Distinguer erreur, valeur personnelle et apprentissage."
    ],
    avoid: [
      "Dire mais non sans écouter ce qui fait mal.",
      "Comparer avec un frère, une soeur ou un camarade.",
      "Se moquer des doutes."
    ],
    talk: [
      "Je comprends que tu te sentes comme ça aujourd'hui.",
      "Une difficulté ne dit pas toute ta valeur.",
      "Regardons ce qui peut être essayé en plus petit."
    ],
    helpWhen: [
      "Les propos de dévalorisation deviennent fréquents.",
      "L'enfant renonce à beaucoup d'activités.",
      "Des propos de disparition ou d'automutilation apparaissent."
    ]
  },
  {
    slug: "adolescence",
    title: "Adolescence",
    intro:
      "Traverser les changements d'autonomie, de corps, d'identité et de distance sans rompre le lien.",
    audienceNote: "Pour tenir un cadre sans confondre distance et rejet.",
    understand: [
      "L'adolescence cherche de l'autonomie tout en ayant encore besoin d'adultes fiables.",
      "Le ton peut masquer une grande vulnérabilité.",
      "La négociation du cadre fait partie du développement."
    ],
    signals: [
      "Changements rapides d'humeur ou d'apparence.",
      "Besoin accru d'intimité.",
      "Oppositions autour des règles."
    ],
    helps: [
      "Distinguer les règles non négociables des espaces négociables.",
      "Respecter une part d'intimité.",
      "Créer des moments de lien qui ne sont pas des interrogatoires."
    ],
    avoid: [
      "Tout contrôler au nom de l'inquiétude.",
      "Ironiser sur le corps, les goûts ou les amitiés.",
      "Prendre chaque distance comme une attaque personnelle."
    ],
    talk: [
      "Je sais que tu as besoin de plus d'espace.",
      "Mon rôle reste aussi de poser un cadre qui protège.",
      "On peut chercher un accord clair plutôt qu'un bras de fer."
    ],
    helpWhen: [
      "Les ruptures de comportement sont brutales.",
      "Il y a consommation, violence, fugue ou mise en danger.",
      "Le dialogue est totalement rompu et la souffrance semble forte."
    ]
  },
  {
    slug: "amities",
    title: "Amitiés",
    intro:
      "Accompagner les liens amicaux, les exclusions et les influences sans juger trop vite.",
    audienceNote: "Pour aider l'enfant à penser ses relations.",
    understand: [
      "Les amitiés sont un espace majeur d'appartenance et d'apprentissage.",
      "Une relation peut compter beaucoup même lorsqu'elle inquiète l'adulte.",
      "Questionner le ressenti ouvre plus que critiquer directement l'ami."
    ],
    signals: [
      "Peur d'être exclu ou besoin de plaire à tout prix.",
      "Changements de comportement liés à un groupe.",
      "Tristesse après certains échanges."
    ],
    helps: [
      "Parler de ce que l'enfant ressent dans la relation.",
      "Nommer respect, réciprocité et liberté.",
      "Encourager plusieurs appuis relationnels."
    ],
    avoid: [
      "Interdire une amitié sans explication sauf danger immédiat.",
      "Se moquer du groupe ou de l'ami.",
      "Transformer chaque récit en leçon."
    ],
    talk: [
      "Comment tu te sens après avoir passé du temps avec cette personne ?",
      "Une amitié peut compter et quand même poser question.",
      "Tu as le droit d'être respecté dans tes liens."
    ],
    helpWhen: [
      "Il y a pression, menace, humiliation ou isolement.",
      "La relation entraîne des conduites dangereuses.",
      "L'enfant semble sous emprise d'un groupe ou d'une personne."
    ]
  },
  {
    slug: "deuil",
    title: "Deuil",
    intro:
      "Parler de la perte avec délicatesse, sans cacher toute vérité ni forcer l'expression.",
    audienceNote: "Pour accompagner un chagrin qui peut prendre plusieurs formes.",
    understand: [
      "Le deuil d'un enfant ou d'un adolescent ne ressemble pas toujours à celui d'un adulte.",
      "Il peut apparaître par vagues, dans le jeu, le silence, la colère ou les questions concrètes.",
      "La vérité adaptée protège davantage que les formules floues."
    ],
    signals: [
      "Questions répétées ou absence apparente de réaction.",
      "Troubles du sommeil, colère ou peur de nouvelles pertes.",
      "Baisse d'attention ou besoin d'objets souvenirs."
    ],
    helps: [
      "Utiliser des mots simples et vrais.",
      "Accepter les allers-retours entre tristesse et moments ordinaires.",
      "Maintenir des repères concrets."
    ],
    avoid: [
      "Dire qu'il faut être fort.",
      "Cacher durablement une information importante.",
      "Interdire les émotions ou les questions."
    ],
    talk: [
      "Tu peux poser tes questions, même plusieurs fois.",
      "On peut être triste et avoir aussi des moments où l'on pense à autre chose.",
      "Je vais te dire la vérité avec des mots que tu peux entendre."
    ],
    helpWhen: [
      "La souffrance bloque durablement le quotidien.",
      "L'enfant exprime une culpabilité intense.",
      "Des propos de mort, de disparition ou de mise en danger apparaissent."
    ]
  }
];

export function getTopic(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}
