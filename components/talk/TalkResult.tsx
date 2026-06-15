import type { TalkOutput } from "@/lib/talk";

export function TalkResult({ result }: { result: TalkOutput }) {
  return (
    <div className="premium-card">
      <p className="eyebrow">Proposition locale</p>
      <div className="mt-6 grid gap-5">
        <ResultSection title="Ce qu'il faut comprendre" text={result.understand} />
        <ResultSection title="Ce qu'il vaut mieux éviter" text={result.avoid} />
        <ResultSection title="Une première phrase possible" text={result.opener} />

        <div>
          <h3 className="font-display text-xl font-medium">
            3 formulations adaptées
          </h3>
          <ul className="mt-3 grid gap-3">
            {result.formulations.map((item) => (
              <li
                key={item}
                className="rounded-lg bg-white/72 p-4 text-sm leading-7 text-langochat-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xl font-medium">
            5 questions ouvertes
          </h3>
          <ul className="mt-3 grid gap-3">
            {result.questions.map((item) => (
              <li
                key={item}
                className="rounded-lg bg-white/72 p-4 text-sm leading-7 text-langochat-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ResultSection title="Quand demander de l'aide" text={result.helpWhen} />
        <ResultSection title="Message de prudence" text={result.caution} />
      </div>
    </div>
  );
}

function ResultSection({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="font-display text-xl font-medium">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-langochat-muted">{text}</p>
    </div>
  );
}
