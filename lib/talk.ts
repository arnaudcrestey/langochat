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

const toneLabels: Record<TalkTone, string> = {
  calme: "calme et posé",
  direct: "clair et direct",
  rassurant: "rassurant et doux",
  cadre: "structurant avec un cadre"
};

export function generateTalkOutput(input: TalkInput): TalkOutput {
  const subject = input.subject.trim() || "ce sujet";
  const age = input.age.trim() || "son âge";
  const relation = input.relation.trim() || "votre lien";
  const tone = toneLabels[input.tone];

  return {
    understand: `Avant de chercher la bonne phrase, il peut être utile de regarder ce que ${subject} vient toucher pour cet enfant ou cet adolescent de ${age}. Votre place (${relation}) donne un appui, mais elle demande aussi de ne pas conclure trop vite.`,
    avoid:
      "Evitez les questions en rafale, les phrases qui minimisent, les menaces immédiates ou les comparaisons. L'objectif est d'ouvrir un espace, pas d'obtenir une confession complète.",
    opener: `J'aimerais te parler de ${subject}, tranquillement. Je ne veux pas te coincer ni te faire la leçon, je voudrais surtout comprendre ce que tu vis.`,
    formulations: [
      `Je vois que ${subject} prend de la place, et je préfère qu'on le regarde ensemble plutôt que chacun de notre côté.`,
      "Tu n'as pas besoin de tout expliquer parfaitement. On peut commencer par ce qui est le plus simple à dire.",
      `Mon rôle est de t'écouter et aussi de poser un cadre qui protège, avec un ton ${tone}.`
    ],
    questions: [
      "Qu'est-ce qui est le plus difficile pour toi dans cette situation ?",
      "A quel moment est-ce que cela devient plus lourd ou plus confus ?",
      "De quoi aurais-tu besoin pour te sentir un peu plus en sécurité ?",
      "Y a-t-il une chose que les adultes ne comprennent pas encore ?",
      "Quel premier petit pas te semblerait possible ?"
    ],
    helpWhen:
      "Demandez de l'aide si la situation dure, s'aggrave, empêche le quotidien, implique une menace, une violence, du harcèlement, des propos suicidaires ou si vous ne vous sentez plus en capacité d'accompagner seul.",
    caution:
      "Cette proposition est un repère local, non un diagnostic. En cas de danger immédiat ou de risque pour la sécurité, contactez les services d'urgence ou une ressource spécialisée."
  };
}
