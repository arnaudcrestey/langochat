import Link from "next/link";
import {
  getDominantSignals,
  getResultLevel,
  type StoredAnswer
} from "@/lib/questionnaire";

type ResultCardProps = {
  answers: StoredAnswer[];
  onReset: () => void;
};

export function ResultCard({ answers, onReset }: ResultCardProps) {
  const score = answers.reduce((total, answer) => total + answer.score, 0);
  const result = getResultLevel(score);
  const signals = getDominantSignals(answers);

  return (
    <div className="premium-card mx-auto max-w-4xl">
      <p className="eyebrow">Résultat</p>
      <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl">
        {result.title}
      </h2>
      <p className="mt-5 text-base leading-8 text-langochat-muted">
        {result.text}
      </p>

      <div className="mt-7 rounded-lg border border-langochat-line bg-langochat-surface/70 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-langochat-green">
          Ce n&apos;est pas un diagnostic
        </p>
        <p className="mt-3 text-sm leading-7 text-langochat-muted">
          Cette restitution sert à ouvrir une réflexion. Elle ne remplace pas
          l&apos;avis d&apos;un professionnel, ni les services d&apos;urgence
          lorsque la sécurité est en jeu.
        </p>
      </div>

      <div className="mt-7">
        <h3 className="font-display text-xl font-medium">Signaux dominants</h3>
        {signals.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {signals.map((signal) => (
              <span key={signal} className="audience-pill">
                {signal}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm leading-7 text-langochat-muted">
            Aucun signal dominant ne ressort fortement parmi les questions
            affichées.
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/comment-en-parler" className="btn-primary">
          Préparer une conversation
        </Link>
        <Link href="/ressources" className="btn-secondary">
          Voir les ressources
        </Link>
        <button type="button" onClick={onReset} className="btn-secondary">
          Recommencer
        </button>
      </div>
    </div>
  );
}
