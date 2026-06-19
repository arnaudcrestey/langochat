export type TalkTone = "calme" | "direct" | "rassurant" | "cadre";

export type TalkInput = {
  age: string;
  relation: string;
  subject: string;
  context: string;
  tone: TalkTone;
};

export type TalkOutput = {
  understand: string;
  avoid: string;
  opener: string;
  formulations: string[];
  questions: string[];
  helpWhen: string;
  caution: string;
};

export const initialTalkOutput: TalkOutput = {
  understand:
    "Renseignez les éléments de contexte pour générer une proposition adaptée à la situation.",
  avoid:
    "La proposition évitera les formulations brusques, culpabilisantes ou trop directes.",
  opener: "Une première phrase possible apparaîtra ici après génération.",
  formulations: [
    "Les formulations adaptées apparaîtront ici.",
    "Elles tiendront compte de l'âge, du lien et du ton choisi.",
    "Elles resteront prudentes, simples et humaines."
  ],
  questions: [
    "Les questions ouvertes apparaîtront ici.",
    "Elles aideront à ouvrir un espace de parole.",
    "Elles éviteront de mettre l'enfant ou l'adolescent sous pression.",
    "Elles seront formulées avec prudence.",
    "Elles viseront à mieux comprendre la situation."
  ],
  helpWhen: "Un repère sur le moment où demander de l'aide apparaîtra ici.",
  caution:
    "Cette proposition ne remplace pas l'avis d'un professionnel ou les services d'urgence en cas de danger."
};