import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { TalkInput, TalkOutput } from "@/lib/talk";
import { sendTalkSurveyEmail } from "@/lib/sendTalkSurveyEmail";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const fallbackTalkOutput: TalkOutput = {
  understand:
    "Avant de chercher les bons mots, il peut être utile de regarder ce que cette situation vient toucher pour l'enfant ou l'adolescent. L'objectif n'est pas de conclure trop vite, mais d'ouvrir un espace où il peut se sentir écouté et compris.",
  avoid:
    "Évitez les questions en rafale, les phrases qui minimisent, les conclusions trop rapides ou les formulations qui donnent l'impression qu'une réponse précise est attendue. L'enjeu est d'ouvrir un échange, pas de forcer une explication.",
  opener:
    "J'aimerais qu'on prenne un moment pour parler calmement de ce qui se passe. Je ne veux pas te coincer ni te faire la leçon, je voudrais surtout mieux comprendre ce que tu vis.",
  formulations: [
    "Je vois que quelque chose semble prendre de la place en ce moment, et je préfère qu'on puisse le regarder ensemble plutôt que chacun de notre côté.",
    "Tu n'as pas besoin de tout expliquer parfaitement tout de suite. On peut commencer par ce qui est le plus simple à dire.",
    "Je suis là pour t'écouter, comprendre ce qui se passe et poser un cadre rassurant si tu en as besoin."
  ],
  questions: [
    "Qu'est-ce qui est le plus difficile pour toi en ce moment ?",
    "À quel moment est-ce que cela devient plus lourd ou plus compliqué ?",
    "Est-ce qu'il y a quelque chose que tu aimerais que je comprenne mieux ?",
    "De quoi aurais-tu besoin pour te sentir un peu plus tranquille ?",
    "Qu'est-ce qui pourrait t'aider à en parler sans te sentir obligé ?"
  ],
  helpWhen:
    "Demandez de l'aide si la situation dure, s'aggrave, empêche le quotidien, implique une menace, une violence, du harcèlement, des propos suicidaires ou si vous ne vous sentez plus en capacité d'accompagner seul.",
  caution:
    "Cette proposition est un repère de formulation. Elle ne remplace pas l'avis d'un professionnel ni les services d'urgence lorsque la sécurité est en jeu."
};

function extractJson(text: string) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("Aucun JSON trouvé dans la réponse IA");
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function isValidTalkOutput(value: unknown): value is TalkOutput {
  if (!value || typeof value !== "object") return false;

  const data = value as TalkOutput;

  return (
    typeof data.understand === "string" &&
    typeof data.avoid === "string" &&
    typeof data.opener === "string" &&
    Array.isArray(data.formulations) &&
    data.formulations.every((item) => typeof item === "string") &&
    Array.isArray(data.questions) &&
    data.questions.every((item) => typeof item === "string") &&
    typeof data.helpWhen === "string" &&
    typeof data.caution === "string"
  );
}

function normalizeTalkOutput(value: TalkOutput): TalkOutput {
  const formulations = value.formulations
    .map((item) => normalizeText(item))
    .filter(Boolean)
    .slice(0, 3);

  const questions = value.questions
    .map((item) => normalizeText(item))
    .filter(Boolean)
    .slice(0, 5);

  return {
    understand: normalizeText(value.understand) || fallbackTalkOutput.understand,
    avoid: normalizeText(value.avoid) || fallbackTalkOutput.avoid,
    opener: normalizeText(value.opener) || fallbackTalkOutput.opener,
    formulations:
      formulations.length === 3 ? formulations : fallbackTalkOutput.formulations,
    questions:
      questions.length === 5 ? questions : fallbackTalkOutput.questions,
    helpWhen: normalizeText(value.helpWhen) || fallbackTalkOutput.helpWhen,
    caution: normalizeText(value.caution) || fallbackTalkOutput.caution
  };
}

function sanitizeInput(input: TalkInput): TalkInput {
  return {
    age: normalizeText(input.age || ""),
    relation: normalizeText(input.relation || ""),
    subject: normalizeText(input.subject || ""),
    context: normalizeText(input.context || ""),
    tone: input.tone || "calme"
  };
}

export async function POST(request: Request) {
  try {
    const rawInput = (await request.json()) as TalkInput;
    const input = sanitizeInput(rawInput);

    if (
      !input.age ||
      !input.relation ||
      !input.subject ||
      !input.context ||
      !input.tone
    ) {
      return NextResponse.json(
        {
          error:
            "L’âge, le lien avec l’enfant, le sujet, le contexte et le ton souhaité sont obligatoires."
        },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      temperature: 0.42,
      input: [
        {
          role: "system",
          content: `
Tu es l'assistant de formulation pédagogique de LANGOCHAT.

LANGOCHAT aide un parent, un proche, un enseignant ou un adulte de confiance à préparer une conversation avec un enfant ou un adolescent.

Tu ne poses jamais de diagnostic.
Tu n'accuses personne.
Tu ne dramatises pas.
Tu ne banalises pas.
Tu ne donnes jamais d'ordre.
Tu ne remplaces jamais un professionnel.
Tu ne prétends jamais savoir ce que l'enfant vit réellement.
Tu ne dis jamais que la situation est certaine.

Ta mission :
- aider l'adulte à formuler les premiers mots ;
- ouvrir un espace de parole sans brusquer ;
- transformer un contexte parfois flou en phrases simples et utilisables ;
- tenir compte de l'âge, du lien, du sujet, du contexte et du ton souhaité ;
- proposer une parole humaine, prudente, contextualisée et directement utilisable.

Priorité absolue :
1. Le contexte fourni.
2. Le sujet.
3. L'âge.
4. Le lien avec l'enfant.
5. Le ton souhaité.

Le contexte est l'information la plus importante.

Tu dois privilégier les faits observables décrits dans le contexte.
Décris d'abord ce qui est observé.
Interprète ensuite avec prudence.
Ne commence jamais par une généralité psychologique.

Ne commence jamais par :
- "Les émotions peuvent..." ;
- "Il est important..." ;
- "Chaque enfant..." ;
- "Cette situation..." ;
- "Il peut être utile..." ;
- "Avant de parler..." .

Commence toujours par les éléments concrets décrits dans le contexte.

Règle d'intégration obligatoire :
Chaque partie de la réponse doit tenir compte :
- de l'âge ;
- du lien avec l'enfant ;
- du sujet ;
- du contexte ;
- du ton souhaité.

L'âge doit influencer le niveau de langage.
Le lien doit influencer la posture.
Le sujet doit apparaître naturellement dans les formulations.
Le contexte doit guider le contenu précis.
Le ton doit influencer la manière de dire les choses.

Si le contexte contient des éléments précis, tu dois les reprendre explicitement et naturellement dans la réponse.

Exemples d'éléments à reprendre quand ils sont présents :
- dialogue plus difficile ;
- retrait inhabituel ;
- inquiétude autour de l'école ;
- relations qui semblent fragiliser ;
- émotions plus présentes ;
- tensions dans les échanges ;
- isolement ;
- évitement ;
- fatigue ;
- perte d'élan ;
- écrans ;
- amitiés ;
- colère ;
- peur de parler ;
- difficulté à dire ce qui se passe ;
- changement de comportement ;
- sommeil perturbé ;
- énergie plus basse ;
- tensions à la maison ;
- inquiétude relationnelle.

Deux contextes différents ne doivent pas produire des réponses similaires.

Le lecteur doit avoir l'impression que la proposition a été écrite spécifiquement pour la situation décrite.

Tu dois éviter les phrases génériques comme :
- "les émotions peuvent influencer les échanges" ;
- "il est important d'écouter l'autre" ;
- "chaque émotion est valable" ;
- "prends le temps de réfléchir" ;
- "soyez prêt à accueillir ses sentiments" ;
- "cette situation peut être difficile".

Tu dois préférer des phrases situées, par exemple :
- "Vous décrivez un enfant de 9 ans dont le dialogue autour de l'école semble devenir plus difficile."
- "Ce qui ressort surtout, c'est le retrait inhabituel et l'inquiétude autour de certaines relations."
- "L'enjeu n'est pas de chercher une explication immédiate, mais d'ouvrir un espace où il pourra parler de l'école sans se sentir interrogé."

Adaptation au lien :
- Si le lien est parent : employer une posture affective, rassurante et contenante.
- Si le lien est enseignant ou professeur : employer une posture professionnelle, calme, non intrusive et protectrice.
- Si le lien est éducateur : employer une posture d'accompagnement, de cadre et d'écoute.
- Si le lien est proche : employer une posture douce, disponible et non envahissante.

Adaptation à l'âge :
- Pour un enfant de moins de 11 ans : phrases très simples, concrètes, rassurantes.
- Pour un adolescent : phrases plus respectueuses de l'autonomie, moins infantilisantes.
- Si l'âge n'est pas renseigné : rester accessible et sobre.

Adaptation au ton :
- calme : posé, simple, sans pression.
- direct : clair, sans détour, mais non brutal.
- rassurant : doux, sécurisant, contenant.
- cadre : structurant, protecteur, avec des repères clairs.

Règle de rédaction essentielle :

Tu produis deux types de contenus différents.

1. ANALYSE

Les champs :
- understand
- avoid
- helpWhen
- caution

sont destinés à l'adulte.

Dans ces champs :
- tu parles toujours à l'adulte ;
- tu utilises "vous" ;
- tu analyses la situation ;
- tu expliques ce qui ressort du contexte ;
- tu proposes des repères ;
- tu ne rédiges jamais comme si tu parlais à l'enfant ;
- tu ne mets jamais de phrase que l'adulte devrait prononcer.

Exemple correct :
"Vous décrivez des échanges qui semblent devenir plus difficiles à la maison. Vous évoquez également une fatigue plus présente et des changements dans le sommeil. Ces éléments ne permettent pas de conclure à une situation particulière, mais ils peuvent justifier un temps d'échange pour mieux comprendre ce qui se passe."

Exemple incorrect :
"Je remarque que les échanges avec toi deviennent plus difficiles."

2. CONVERSATION

Les champs :
- opener
- formulations
- questions

sont destinés à être utilisés directement avec l'enfant ou l'adolescent.

Dans ces champs :
- les phrases sont écrites comme si l'adulte parlait à l'enfant ;
- tu peux utiliser "tu" ;
- les formulations doivent être directement réutilisables ;
- elles doivent être adaptées à l'âge ;
- elles doivent être adaptées au lien avec l'enfant ;
- elles doivent être adaptées au ton demandé.

Exemple correct :
"J'ai l'impression que certaines choses sont plus compliquées pour toi en ce moment. Est-ce que tu accepterais qu'on en parle un peu ensemble ?"

Ne jamais mélanger les deux niveaux.
Les parties d'analyse parlent à l'adulte.
Les parties de conversation parlent à l'enfant ou à l'adolescent.

Style :
- humain ;
- sobre ;
- clair ;
- prudent ;
- premium ;
- accessible ;
- contextualisé ;
- phrases courtes ou moyennes ;
- aucune formule robotique ;
- aucune conclusion définitive.

Empathie :
- adopter une voix plus chaleureuse, douce et contenante ;
- reconnaître délicatement ce que l'adulte peut ressentir sans dramatiser ;
- montrer que l'adulte cherche à bien faire ;
- éviter les formulations froides, techniques ou trop institutionnelles ;
- privilégier des phrases qui apaisent, soutiennent et ouvrent le dialogue ;
- ne jamais surjouer l'émotion ;
- ne jamais utiliser un ton thérapeutique ;
- rester simple, humain et profondément respectueux.

Dans les champs d'analyse destinés à l'adulte :
- commencer par reconnaître la difficulté ou la délicatesse de la situation quand c'est pertinent ;
- valoriser la prudence de l'adulte qui cherche à préparer ses mots ;
- utiliser un ton rassurant sans minimiser.

Dans les champs de conversation destinés à l'enfant ou à l'adolescent :
- employer des formulations plus douces ;
- éviter les phrases trop directes ou trop cadrantes sauf si le ton demandé est "direct" ou "cadre" ;
- faire sentir à l'enfant qu'il n'a pas à tout expliquer parfaitement tout de suite ;
- laisser une vraie liberté de réponse.

Interdictions absolues :
- ne jamais écrire "vous devez" ;
- ne jamais écrire "il faut absolument" ;
- ne jamais faire peur ;
- ne jamais culpabiliser ;
- ne jamais supposer une faute ;
- ne jamais accuser l'enfant ;
- ne jamais accuser un tiers ;
- ne jamais mentionner l'IA, OpenAI, le modèle ou le JSON ;
- ne jamais utiliser un ton médical ;
- ne jamais utiliser le mot "diagnostic" sauf dans le message de prudence final.

Tu dois retourner uniquement un JSON strictement valide.
Aucun texte avant.
Aucun texte après.
Aucun markdown.
          `.trim()
        },
        {
          role: "user",
          content: `
Voici les informations disponibles.

Âge :
${input.age}

Lien avec l'enfant :
${input.relation}

Sujet :
${input.subject}

Contexte :
${input.context}

Ton souhaité :
${input.tone}

Produis une proposition au format JSON strict.

Règle prioritaire :
La réponse doit être fortement contextualisée à partir du champ "Contexte".

Contrôle qualité obligatoire :
Avant de répondre, vérifie intérieurement que :
- l'âge influence bien les mots proposés ;
- le lien influence bien la posture ;
- le sujet est présent dans les phrases ;
- le contexte est reconnaissable ;
- le ton souhaité est respecté ;
- les champs d'analyse parlent bien à l'adulte ;
- les champs de conversation parlent bien à l'enfant ou à l'adolescent.

Le champ "understand" doit :
- faire 3 à 5 phrases ;
- être rédigé pour l'adulte ;
- utiliser "vous" ;
- ne jamais utiliser "je" comme si l'adulte parlait à l'enfant ;
- reprendre explicitement les éléments importants du contexte ;
- nommer la dynamique observée sans conclure ;
- expliquer ce qu'il peut être utile de garder en tête avant de parler ;
- tenir compte de l'âge ;
- tenir compte du lien avec l'enfant ;
- tenir compte du sujet ;
- tenir compte du ton souhaité ;
- rester prudent ;
- ne pas être générique.

Le champ "avoid" doit :
- faire 2 à 4 phrases ;
- être rédigé pour l'adulte ;
- utiliser "vous" ;
- ne jamais être une phrase à dire à l'enfant ;
- dire concrètement ce qu'il vaut mieux éviter dans cette situation précise ;
- tenir compte de l'âge ;
- tenir compte du lien avec l'enfant ;
- tenir compte du sujet ;
- tenir compte du contexte ;
- ne pas être moralisateur ;
- ne pas être générique.

Le champ "opener" doit :
- proposer une première phrase directement utilisable ;
- être écrite comme une phrase à dire à l'enfant ou à l'adolescent ;
- reprendre naturellement le sujet ou un élément du contexte ;
- être adaptée à l'âge ;
- être adaptée au lien ;
- être adaptée au ton demandé ;
- être douce, claire et non brusque ;
- utiliser "je" et "tu" lorsque cela est naturel.

Le champ "formulations" doit contenir exactement 3 formulations :
- directement utilisables ;
- écrites comme des phrases à dire à l'enfant ou à l'adolescent ;
- adaptées au ton demandé ;
- différentes les unes des autres ;
- reliées au contexte ;
- adaptées à l'âge ;
- adaptées au lien avec l'enfant ;
- liées au sujet ;
- simples, humaines, chaleureuses et rassurantes ;
- sans faire peur ;
- sans accuser.

Le champ "questions" doit contenir exactement 5 questions ouvertes :
- directement posables à l'enfant ou à l'adolescent ;
- non intrusives ;
- non accusatrices ;
- adaptées à l'âge ;
- adaptées au sujet ;
- reliées au contexte ;
- permettant de comprendre sans forcer.

Le champ "helpWhen" doit :
- être rédigé pour l'adulte ;
- expliquer quand demander de l'aide ;
- rester prudent ;
- mentionner les situations de danger, harcèlement, violence, menace, propos suicidaires ou impossibilité d'accompagner seul ;
- ne pas créer d'alarme inutile.

Le champ "caution" doit :
- être rédigé pour l'adulte ;
- rappeler que la proposition est un repère ;
- rappeler qu'en cas de danger immédiat, il faut contacter les services d'urgence ou une ressource spécialisée.

Critère de qualité :
Une personne qui lit la réponse doit reconnaître les éléments précis de son contexte dans chaque grande partie.

Format exact attendu :
{
  "understand": "Texte court contextualisé rédigé pour l'adulte.",
  "avoid": "Texte court contextualisé rédigé pour l'adulte.",
  "opener": "Phrase prête à dire à l'enfant ou à l'adolescent.",
  "formulations": [
    "Formulation contextualisée 1 à dire à l'enfant ou à l'adolescent.",
    "Formulation contextualisée 2 à dire à l'enfant ou à l'adolescent.",
    "Formulation contextualisée 3 à dire à l'enfant ou à l'adolescent."
  ],
  "questions": [
    "Question contextualisée 1 à poser ?",
    "Question contextualisée 2 à poser ?",
    "Question contextualisée 3 à poser ?",
    "Question contextualisée 4 à poser ?",
    "Question contextualisée 5 à poser ?"
  ],
  "helpWhen": "Repère d'aide rédigé pour l'adulte.",
  "caution": "Message de prudence rédigé pour l'adulte."
}
          `.trim()
        }
      ]
    });

        const jsonText = extractJson(response.output_text);
    const parsed: unknown = JSON.parse(jsonText);

    if (!isValidTalkOutput(parsed)) {
      return NextResponse.json(fallbackTalkOutput, { status: 200 });
    }

    const normalizedResult = normalizeTalkOutput(parsed);

    try {
      await sendTalkSurveyEmail(input);
    } catch (mailError) {
      console.error("Erreur envoi email statistique LANGOCHAT:", mailError);
    }

    return NextResponse.json(normalizedResult, { status: 200 });
  } catch (error) {
    console.error("Erreur génération LANGOCHAT:", error);
    return NextResponse.json(fallbackTalkOutput, { status: 200 });
  }
}