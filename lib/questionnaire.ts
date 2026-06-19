export type AnswerId = "no" | "sometimes" | "often" | "unclear";

export type AnswerOption = {
  id: AnswerId;
  label: string;
  score: number;
};

export type Question = {
  id: string;
  axis: "dialogue" | "emotion" | "relation" | "school" | "safety" | "daily";
  text: string;
};

export type StoredAnswer = {
  questionId: string;
  answerId: AnswerId;
  score: number;
};

export type EnrichedAnswer = {
  questionId: string;
  question: string;
  axis: Question["axis"];
  axisLabel: string;
  answerId: AnswerId;
  answer: string;
  score: number;
};

export const answerOptions: AnswerOption[] = [
  { id: "no", label: "Non, pas vraiment", score: 0 },
  { id: "sometimes", label: "Parfois", score: 1 },
  { id: "often", label: "Oui, clairement", score: 2 },
  { id: "unclear", label: "Je n'arrive pas encore à savoir", score: 1 }
];

export const questions: Question[] = [
  { id: "q1", axis: "dialogue", text: "Le dialogue est-il devenu plus difficile qu'avant ?" },
  { id: "q2", axis: "emotion", text: "Les émotions prennent-elles plus de place que d'habitude ?" },
  { id: "q3", axis: "relation", text: "L'enfant ou l'adolescent s'isole-t-il davantage ?" },
  { id: "q4", axis: "school", text: "L'école ou l'apprentissage provoque-t-il plus de tensions ?" },
  { id: "q5", axis: "daily", text: "Le sommeil, l'appétit ou l'énergie semblent-ils changés ?" },
  { id: "q6", axis: "safety", text: "Certains propos vous inquiètent-ils pour sa sécurité ?" },
  { id: "q7", axis: "dialogue", text: "Les discussions finissent-elles plus souvent en conflit ?" },
  { id: "q8", axis: "emotion", text: "La colère, la peur ou la tristesse reviennent-elles souvent ?" },
  { id: "q9", axis: "relation", text: "Certaines relations semblent-elles le fragiliser ?" },
  { id: "q10", axis: "school", text: "Y a-t-il plus d'évitement autour de l'école ?" },
  { id: "q11", axis: "daily", text: "Les écrans prennent-ils une place difficile à réguler ?" },
  { id: "q12", axis: "safety", text: "Avez-vous repéré des moqueries, pressions ou menaces répétées ?" },
  { id: "q13", axis: "dialogue", text: "Avez-vous peur de mal dire les choses ?" },
  { id: "q14", axis: "emotion", text: "Le retour au calme semble-t-il plus difficile ?" },
  { id: "q15", axis: "relation", text: "Le lien avec les adultes de confiance semble-t-il moins simple ?" },
  { id: "q16", axis: "school", text: "Les devoirs, notes ou remarques scolaires déclenchent-ils plus de détresse ?" },
  { id: "q17", axis: "daily", text: "Les routines du quotidien sont-elles plus difficiles à tenir ?" },
  { id: "q18", axis: "safety", text: "Y a-t-il des signes de harcèlement ou de mise à l'écart ?" },
  { id: "q19", axis: "dialogue", text: "Avez-vous l'impression de moins comprendre ce qui se passe ?" },
  { id: "q20", axis: "emotion", text: "Les inquiétudes empêchent-elles certaines activités habituelles ?" },
  { id: "q21", axis: "relation", text: "L'enfant évite-t-il certains lieux, groupes ou personnes ?" },
  { id: "q22", axis: "school", text: "D'autres adultes partagent-ils aussi une inquiétude ?" },
  { id: "q23", axis: "daily", text: "La situation pèse-t-elle sur l'équilibre de la famille ?" },
  { id: "q24", axis: "safety", text: "Vous demandez-vous s'il faudrait demander de l'aide ?" }
];

export function getResultLevel(score: number) {
  if (score <= 8) {
    return {
      title: "Une situation à clarifier",
      text: "Vos réponses font apparaître des éléments à observer avec calme. Il peut être utile de mettre des mots sur ce qui se répète, sans conclure trop vite."
    };
  }

  if (score <= 16) {
    return {
      title: "Une situation à suivre avec attention",
      text: "Plusieurs signaux méritent d'être regardés avec sérieux. Un échange avec un autre adulte de confiance peut aider à ne pas rester seul dans l'analyse."
    };
  }

  return {
    title: "Une situation qui mérite un appui extérieur",
    text: "Les réponses indiquent un niveau de préoccupation plus marqué. Il peut être important de chercher un appui professionnel ou une ressource spécialisée."
  };
}

export function getDominantSignals(answers: StoredAnswer[]) {
  const labels: Record<Question["axis"], string> = {
    dialogue: "Dialogue difficile",
    emotion: "Émotions intenses",
    relation: "Lien ou relations fragilisés",
    school: "Scolarité ou cadre d'apprentissage sous tension",
    safety: "Sécurité ou protection à examiner",
    daily: "Quotidien perturbé"
  };

  const totals = questions.reduce<Record<Question["axis"], number>>(
    (acc, question) => ({ ...acc, [question.axis]: 0 }),
    {
      dialogue: 0,
      emotion: 0,
      relation: 0,
      school: 0,
      safety: 0,
      daily: 0
    }
  );

  answers.forEach((answer) => {
    const question = questions.find((item) => item.id === answer.questionId);

    if (question) {
      totals[question.axis] += answer.score;
    }
  });

  return Object.entries(totals)
    .filter(([, value]) => value >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([axis]) => labels[axis as Question["axis"]])
    .slice(0, 4);
}

export function enrichAnswers(answers: StoredAnswer[]): EnrichedAnswer[] {
  const axisLabels: Record<Question["axis"], string> = {
    dialogue: "Dialogue",
    emotion: "Émotions",
    relation: "Relations",
    school: "École ou apprentissage",
    safety: "Sécurité ou protection",
    daily: "Quotidien"
  };

  return answers
    .map((answer) => {
      const question = questions.find((item) => item.id === answer.questionId);
      const option = answerOptions.find((item) => item.id === answer.answerId);

      if (!question || !option) {
        return null;
      }

      return {
        questionId: answer.questionId,
        question: question.text,
        axis: question.axis,
        axisLabel: axisLabels[question.axis],
        answerId: answer.answerId,
        answer: option.label,
        score: answer.score
      };
    })
    .filter((answer): answer is EnrichedAnswer => Boolean(answer));
}