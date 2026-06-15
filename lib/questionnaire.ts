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

export const answerOptions: AnswerOption[] = [
  { id: "no", label: "Non, pas vraiment", score: 0 },
  { id: "sometimes", label: "Cela arrive parfois", score: 1 },
  { id: "often", label: "Cela revient souvent", score: 2 },
  { id: "unclear", label: "Je n'arrive pas encore à savoir", score: 1 }
];

export const questions: Question[] = [
  { id: "q1", axis: "dialogue", text: "Le dialogue semble-t-il plus difficile qu'avant ?" },
  { id: "q2", axis: "emotion", text: "Les émotions paraissent-elles plus intenses ou imprévisibles ?" },
  { id: "q3", axis: "relation", text: "L'enfant ou l'adolescent semble-t-il s'isoler davantage ?" },
  { id: "q4", axis: "school", text: "L'école ou le lieu d'apprentissage devient-il une source de tension ?" },
  { id: "q5", axis: "daily", text: "Le sommeil, l'appétit ou l'énergie semblent-ils perturbés ?" },
  { id: "q6", axis: "safety", text: "Avez-vous entendu des propos qui vous inquiètent pour sa sécurité ?" },
  { id: "q7", axis: "dialogue", text: "Vos tentatives de discussion se terminent-elles souvent en conflit ?" },
  { id: "q8", axis: "emotion", text: "La colère, la peur ou la tristesse prennent-elles beaucoup de place ?" },
  { id: "q9", axis: "relation", text: "Certaines amitiés ou relations semblent-elles le fragiliser ?" },
  { id: "q10", axis: "school", text: "Y a-t-il des refus, retards ou évitements autour de l'école ?" },
  { id: "q11", axis: "daily", text: "Les écrans prennent-ils une place qui désorganise le quotidien ?" },
  { id: "q12", axis: "safety", text: "Avez-vous repéré des humiliations, menaces ou pressions répétées ?" },
  { id: "q13", axis: "dialogue", text: "Avez-vous peur de mal dire les choses ou d'aggraver la situation ?" },
  { id: "q14", axis: "emotion", text: "L'enfant semble-t-il avoir du mal à revenir au calme ?" },
  { id: "q15", axis: "relation", text: "Le lien avec les adultes de confiance semble-t-il plus fragile ?" },
  { id: "q16", axis: "school", text: "Les résultats, devoirs ou remarques scolaires déclenchent-ils une détresse forte ?" },
  { id: "q17", axis: "daily", text: "Les routines ordinaires deviennent-elles plus difficiles à maintenir ?" },
  { id: "q18", axis: "safety", text: "Y a-t-il des signes de harcèlement, cyberharcèlement ou mise à l'écart ?" },
  { id: "q19", axis: "dialogue", text: "Avez-vous l'impression de ne plus comprendre ce qui se joue ?" },
  { id: "q20", axis: "emotion", text: "Les inquiétudes semblent-elles empêcher certaines activités habituelles ?" },
  { id: "q21", axis: "relation", text: "L'enfant cherche-t-il à éviter certains lieux, groupes ou personnes ?" },
  { id: "q22", axis: "school", text: "Les adultes autour de lui partagent-ils aussi une inquiétude ?" },
  { id: "q23", axis: "daily", text: "La situation pèse-t-elle sur l'équilibre familial ou professionnel ?" },
  { id: "q24", axis: "safety", text: "Vous demandez-vous s'il faut mobiliser une aide extérieure ?" }
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
    emotion: "Emotions intenses",
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
    if (question) totals[question.axis] += answer.score;
  });

  return Object.entries(totals)
    .filter(([, value]) => value >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([axis]) => labels[axis as Question["axis"]])
    .slice(0, 4);
}
