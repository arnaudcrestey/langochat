export type ResourceBlock = {
  title: string;
  text: string;
  items: string[];
};

export type EmergencyResource = {
  number: string;
  title: string;
  detail: string;
  href: string;
};

export const resourceBlocks: ResourceBlock[] = [
  {
    title: "Parents",
    text: "Chercher un appui ne signifie pas échouer. Cela permet souvent de retrouver du recul et de protéger le lien.",
    items: ["Médecin traitant ou pédiatre", "Psychologue ou CMP selon les situations", "Etablissement scolaire", "Ligne 119 si une protection est en jeu"]
  },
  {
    title: "Enseignants / AESH",
    text: "Observer, transmettre et documenter avec prudence aide à construire une réponse collective.",
    items: ["Equipe éducative", "Infirmier ou psychologue scolaire", "Référent harcèlement", "3020 ou 3018 selon la situation"]
  },
  {
    title: "Educateurs / travailleurs sociaux",
    text: "La continuité entre les adultes évite que l'enfant porte seul la complexité de la situation.",
    items: ["Equipe pluridisciplinaire", "Protection de l'enfance", "Dispositifs locaux", "Urgences si danger immédiat"]
  },
  {
    title: "Familles d'accueil",
    text: "Le cadre d'accueil peut réactiver des inquiétudes anciennes. Les observations fines sont précieuses.",
    items: ["Référent ASE", "Equipe de placement", "Professionnels de santé", "119 si besoin de conseil ou signalement"]
  },
  {
    title: "Associations",
    text: "Les associations spécialisées peuvent offrir écoute, orientation et relais selon les territoires.",
    items: ["Associations de soutien parental", "Associations anti-harcèlement", "Associations de protection de l'enfance", "Structures locales d'écoute"]
  },
  {
    title: "Quand demander de l'aide",
    text: "Il est préférable de demander un avis lorsque la situation dure, s'aggrave ou met la sécurité en question.",
    items: ["Danger actuel", "Propos suicidaires", "Violence ou harcèlement", "Epuisement de l'adulte accompagnant"]
  }
];

export const emergencyResources: EmergencyResource[] = [
  {
    number: "17",
    title: "Police / Gendarmerie",
    detail: "Danger immédiat, violence, menace ou besoin d'intervention urgente.",
    href: "tel:17"
  },
  {
    number: "112",
    title: "Urgence européenne",
    detail: "Numéro d'urgence accessible dans l'Union européenne.",
    href: "tel:112"
  },
  {
    number: "15",
    title: "SAMU",
    detail: "Urgence médicale, détresse physique ou risque vital.",
    href: "tel:15"
  },
  {
    number: "119",
    title: "Enfance en danger",
    detail: "Conseil, écoute et alerte lorsqu'un enfant peut être en danger.",
    href: "tel:119"
  },
  {
    number: "3020",
    title: "Harcèlement scolaire",
    detail: "Ecoute et orientation face au harcèlement à l'école.",
    href: "tel:3020"
  },
  {
    number: "3018",
    title: "Cyberharcèlement",
    detail: "Aide pour cyberviolences, comptes, contenus et situations en ligne.",
    href: "tel:3018"
  },
  {
    number: "3114",
    title: "Prévention suicide",
    detail: "Ecoute professionnelle en cas d'idées suicidaires ou d'inquiétude forte.",
    href: "tel:3114"
  }
];
