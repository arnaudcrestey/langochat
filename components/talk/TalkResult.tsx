import type { TalkOutput } from "@/lib/talk";

type TalkResultProps = {
  result: TalkOutput;
  isLoading?: boolean;
  hasGenerated?: boolean;
};

export function TalkResult({
  result,
  isLoading = false,
  hasGenerated = false
}: TalkResultProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (!hasGenerated) {
    return <EmptyState />;
  }

  return (
    <div className="premium-card">
      <p className="eyebrow">Proposition personnalisée</p>

      <div className="mt-6 grid gap-6">
        <ResultSection
          title="Lecture de la situation"
          text={result.understand}
        />

        <ResultSection
          title="À éviter pendant l'échange"
          text={result.avoid}
        />

        <ResultSection
          title="Une première phrase possible"
          text={result.opener}
          variant="conversation"
        />

        <ResultList
          title="Trois façons d'ouvrir le dialogue"
          items={result.formulations}
        />

        <ResultList
          title="Questions ouvertes à poser"
          items={result.questions}
        />

        <ResultSection
          title="Quand demander de l'aide"
          text={result.helpWhen}
        />

        <ResultSection
          title="Message de prudence"
          text={result.caution}
        />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="premium-card flex min-h-[34rem] items-center">
      <div>
        <p className="eyebrow">Avant de générer</p>

        <h2 className="mt-5 font-display text-3xl font-medium leading-tight text-langochat-ink">
          Préparer une parole juste.
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-langochat-muted">
          Renseignez l&apos;âge, le lien, le sujet et le contexte, ou utilisez
          le texte transmis depuis « Faire le point ». LangOchat préparera
          ensuite une proposition prudente, claire et adaptée au ton choisi.
        </p>

        <div className="mt-8 grid gap-3">
          <PreviewLine width="w-full" />
          <PreviewLine width="w-10/12" />
          <PreviewLine width="w-8/12" />
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="premium-card overflow-hidden">
      <p className="eyebrow">Préparation en cours</p>

      <div className="mt-6 rounded-2xl border border-langochat-line bg-white/64 p-6">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full border border-langochat-gold/20" />

            <div className="absolute inset-0 animate-spin">
              <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-langochat-gold shadow-lg" />
            </div>

            <div className="absolute inset-3 rounded-full border border-langochat-gold/15" />

            <div className="absolute inset-[26px] rounded-full bg-langochat-gold/25" />
          </div>

          <h3 className="mt-6 font-display text-2xl font-medium text-langochat-ink">
            Préparation des mots justes
          </h3>

          <p className="mt-3 text-sm leading-7 text-langochat-muted">
            LangOchat relit le contexte, ajuste le ton et prépare une
            proposition prudente, claire et directement utilisable.
          </p>

          <div className="mt-6 grid w-full gap-3">
            <PreviewLine width="w-full" />
            <PreviewLine width="w-10/12" />
            <PreviewLine width="w-8/12" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultSection({
  title,
  text,
  variant = "analysis"
}: {
  title: string;
  text: string;
  variant?: "analysis" | "conversation";
}) {
  return (
    <section>
      <h3 className="font-display text-xl font-medium text-langochat-ink">
        {title}
      </h3>

      <p
        className={`mt-3 text-sm leading-7 ${
          variant === "conversation"
            ? "rounded-lg bg-white/72 p-4 text-langochat-ink"
            : "text-langochat-muted"
        }`}
      >
        {text}
      </p>
    </section>
  );
}

function ResultList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="font-display text-xl font-medium text-langochat-ink">
        {title}
      </h3>

      <ul className="mt-3 grid gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-lg bg-white/72 p-4 text-sm leading-7 text-langochat-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function PreviewLine({ width }: { width: string }) {
  return (
    <div
      className={`h-3 rounded-full bg-langochat-line/70 ${width}`}
      aria-hidden="true"
    />
  );
}