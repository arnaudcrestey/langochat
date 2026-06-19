import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

type AiAnalysis = {
  title: string;
  summary: string;
  dominantSignals: string[];
  perspective: string;
  contextDraft: string;
  nextStep: string;
};

const fallbackAnalysis: AiAnalysis = {
  title: "Une situation à relire avec attention",
  summary:
    "Certains éléments méritent d’être repris avec calme. Ils ne permettent pas de conclure à une situation précise, mais ils peuvent aider à mieux repérer ce qui revient, ce qui pèse ou ce qui reste difficile à comprendre.",
  dominantSignals: [
    "Points à clarifier",
    "Éléments qui reviennent",
    "Besoin de recul"
  ],
  perspective:
    "Observer ce qui se répète dans le temps peut aider à mieux comprendre ce qui mérite réellement de l’attention, sans conclure trop vite.",
  contextDraft:
    "Depuis quelque temps, je remarque que certains éléments reviennent et me questionnent davantage. Je ne cherche pas à tirer de conclusion trop vite, mais j’ai besoin de mieux comprendre ce qui pèse, ce qui se répète et ce qui devient plus difficile à apaiser. J’aimerais pouvoir mettre des mots simples sur ce que je ressens afin d’en parler calmement, sans accuser ni créer de tension inutile.",
  nextStep:
    "Prendre un moment pour poser les choses avec calme peut aider à préparer une conversation plus claire."
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

function isValidAnalysis(value: unknown): value is AiAnalysis {
  if (!value || typeof value !== "object") return false;

  const data = value as AiAnalysis;

  return (
    typeof data.title === "string" &&
    typeof data.summary === "string" &&
    Array.isArray(data.dominantSignals) &&
    data.dominantSignals.every((signal) => typeof signal === "string") &&
    typeof data.perspective === "string" &&
    typeof data.contextDraft === "string" &&
    typeof data.nextStep === "string"
  );
}

function normalizeAnalysis(value: AiAnalysis): AiAnalysis {
  const signals = value.dominantSignals
    .map((signal) => normalizeText(signal))
    .filter(Boolean)
    .slice(0, 3);

  return {
    title: normalizeText(value.title) || fallbackAnalysis.title,
    summary: normalizeText(value.summary) || fallbackAnalysis.summary,
    dominantSignals:
      signals.length === 3 ? signals : fallbackAnalysis.dominantSignals,
    perspective: normalizeText(value.perspective) || fallbackAnalysis.perspective,
    contextDraft:
      normalizeText(value.contextDraft) || fallbackAnalysis.contextDraft,
    nextStep: normalizeText(value.nextStep) || fallbackAnalysis.nextStep
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      temperature: 0.35,
      input: [
        {
          role: "system",
          content: `
Tu es l’assistant d’analyse pédagogique de LANGOCHAT.

LANGOCHAT est un outil de recul, de compréhension et de prévention destiné aux parents, proches, enseignants, éducateurs, assistants familiaux et adultes de confiance.

Tu ne poses jamais de diagnostic.
Tu n’accuses personne.
Tu ne qualifies jamais une situation avec certitude.
Tu ne dramatises pas.
Tu ne banalises pas.
Tu ne donnes jamais d’ordre.
Tu ne fais jamais peur.
Tu ne remplaces jamais un professionnel.
Tu ne prétends jamais savoir ce que vit réellement l’enfant, l’adolescent ou l’adulte.

Ta mission :
produire une lecture humaine, prudente, empathique et utile de ce qui semble se dessiner à travers les réponses.

Tu dois aider la personne à :
- mieux comprendre ce qui mérite son attention ;
- repérer ce qui revient ;
- prendre du recul sans se juger ;
- formuler le contexte avec des mots simples ;
- préparer une conversation sans brusquer ;
- sentir qu’elle cherche à bien faire.

Ne commente jamais le score.
Ne liste jamais les catégories.
Ne répète jamais les réponses.
Ne résume jamais question par question.

Observe l’ensemble.
Relie les éléments.
Formule une dynamique possible.
Reste toujours prudent.

Empathie :
- adopter une voix chaleureuse, douce et contenante ;
- reconnaître que chercher à comprendre une situation peut être délicat pour l’adulte ;
- valoriser la prudence de la personne qui prend le temps de relire ce qui se passe ;
- montrer que vouloir préparer ses mots est déjà une démarche attentive ;
- éviter les formulations froides, techniques ou trop institutionnelles ;
- privilégier des phrases qui apaisent, soutiennent et donnent du recul ;
- ne jamais surjouer l’émotion ;
- ne jamais dramatiser ;
- rester simple, humain et respectueux.

Style :
- humain ;
- sobre ;
- clair ;
- accessible ;
- premium ;
- chaleureux ;
- prudent ;
- phrases courtes ou moyennes ;
- aucune formule robotique ;
- aucune conclusion définitive.

Interdictions absolues :
- ne jamais écrire "vous êtes victime" ;
- ne jamais écrire "il s’agit de violence" ;
- ne jamais écrire "cette personne est toxique" ;
- ne jamais écrire "vous devez partir" ;
- ne jamais écrire "quittez cette personne" ;
- ne jamais écrire "diagnostic" sauf dans une phrase de prudence générale ;
- ne jamais écrire "symptôme" ;
- ne jamais faire peur ;
- ne jamais donner d’ordre ;
- ne jamais culpabiliser ;
- ne jamais accuser l’enfant ;
- ne jamais accuser un tiers ;
- ne jamais mentionner l’IA, OpenAI, le modèle ou le JSON.

Tu dois retourner uniquement un JSON strictement valide.
Aucun texte avant.
Aucun texte après.
Aucun markdown.
          `.trim()
        },
        {
          role: "user",
          content: `
Voici les réponses enrichies au questionnaire LANGOCHAT.

Données disponibles :
${JSON.stringify(body.answers, null, 2)}

Score global :
${JSON.stringify(body.score ?? null)}

Produis une analyse au format JSON strict.

Le champ "title" doit :
- contenir entre 3 et 8 mots ;
- être humain ;
- être clair ;
- être sobre ;
- être non alarmiste ;
- éviter les titres froids ou techniques.

Le champ "summary" doit :
- contenir 4 à 6 phrases ;
- produire une lecture globale ;
- relier les éléments entre eux ;
- rester prudent ;
- être légèrement empathique ;
- reconnaître la délicatesse possible de la situation ;
- ne jamais diagnostiquer ;
- ne jamais simplement résumer les réponses ;
- ne jamais être générique.

Le champ "dominantSignals" doit contenir exactement 3 signaux :
- courts ;
- concrets ;
- naturels ;
- sans jugement ;
- moins de 9 mots chacun.

Le champ "perspective" doit :
- donner une grille de lecture utile ;
- aider à comprendre ce qu’il peut être pertinent d’observer ;
- apporter du recul ;
- soutenir sans décider à la place de la personne ;
- ne pas donner d’ordre ;
- tenir en 1 ou 2 phrases.

Le champ "contextDraft" est essentiel.

Il doit produire un texte prêt à coller dans le champ "Contexte" de l’outil "Préparer une conversation".

Ce texte doit :
- être écrit à la première personne ;
- commencer par "Depuis quelque temps" ou "Je remarque depuis quelque temps" ;
- faire 3 à 5 phrases ;
- reprendre les éléments précis ressortis dans l’analyse ;
- utiliser les réponses les plus significatives ;
- formuler une situation reconnaissable ;
- mentionner naturellement les préoccupations principales ;
- faire sentir que la personne cherche à bien faire, sans se juger ;
- rester doux, naturel et directement utilisable par un adulte qui veut préparer ses mots ;
- ne pas être générique ;
- ne pas dire seulement "plusieurs éléments me préoccupent" ;
- rester prudent ;
- ne pas accuser ;
- ne pas diagnostiquer ;
- ne pas mentionner LANGOCHAT ;
- ne pas dire "le questionnaire indique".

Le texte doit suivre cette logique :
1. Ce que je remarque concrètement.
2. Ce que cela provoque ou questionne.
3. Ce que j’aimerais pouvoir clarifier.
4. L’intention de la conversation.

Le champ "contextDraft" doit être le texte le plus humain, le plus doux et le plus personnalisé de toute la réponse.

À éviter absolument :
- "plusieurs éléments me préoccupent" seul ;
- "la situation semble complexe" ;
- "certains signaux ressortent" ;
- "il serait important de" ;
- "vous devriez" ;
- toute phrase vague ou automatique.

Mauvais exemple :
"Depuis quelque temps, plusieurs éléments me préoccupent. J’aimerais comprendre ce qui se passe."

Bon exemple :
"Depuis quelque temps, je remarque que certains échanges deviennent plus difficiles à vivre et que je garde parfois des choses pour moi pour éviter une tension. J’ai l’impression que des malentendus ou des réactions reviennent, même lorsque j’essaie de rester calme. Je ne cherche pas à accuser, mais j’aimerais pouvoir expliquer ce que je ressens et comprendre ce qui se joue. J’aimerais en parler de manière posée, sans que la conversation devienne un conflit."

Le champ "nextStep" doit :
- contenir une seule phrase ;
- être simple ;
- être humain ;
- être doux ;
- rester prudent ;
- ouvrir vers une action calme, sans injonction.

Format exact attendu :
{
  "title": "Titre court et humain",
  "summary": "Lecture globale en 4 à 6 phrases.",
  "dominantSignals": [
    "Signal concret 1",
    "Signal concret 2",
    "Signal concret 3"
  ],
  "perspective": "Grille de lecture utile.",
  "contextDraft": "Texte prêt à copier-coller.",
  "nextStep": "Prochaine étape simple et prudente."
}
          `.trim()
        }
      ]
    });

    const jsonText = extractJson(response.output_text);
    const parsed: unknown = JSON.parse(jsonText);

    if (!isValidAnalysis(parsed)) {
      return NextResponse.json(fallbackAnalysis, { status: 200 });
    }

    return NextResponse.json(normalizeAnalysis(parsed), { status: 200 });
  } catch (error) {
    console.error("Erreur analyse LANGOCHAT:", error);
    return NextResponse.json(fallbackAnalysis, { status: 200 });
  }
}