"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getDominantSignals,
  getResultLevel,
  type StoredAnswer
} from "@/lib/questionnaire";

export type AiAnalysis = {
  title: string;
  summary: string;
  dominantSignals: string[];
  perspective?: string;
  contextDraft?: string;
  nextStep?: string;
};

type ResultCardProps = {
  answers: StoredAnswer[];
  onReset: () => void;
  initialAnalysis?: AiAnalysis | null;
};

const CONTEXT_STORAGE_KEY = "langochat_context_draft";

export function ResultCard({
  answers,
  onReset,
  initialAnalysis
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const score = useMemo(
    () => answers.reduce((total, answer) => total + answer.score, 0),
    [answers]
  );

  const localResult = useMemo(() => getResultLevel(score), [score]);
  const localSignals = useMemo(() => getDominantSignals(answers), [answers]);

  const title = initialAnalysis?.title?.trim() || localResult.title;
  const summary = initialAnalysis?.summary?.trim() || localResult.text;

  const signals =
    initialAnalysis?.dominantSignals &&
    initialAnalysis.dominantSignals.length > 0
      ? initialAnalysis.dominantSignals
      : localSignals;

  const contextDraft = initialAnalysis?.contextDraft?.trim();

  async function copyContext() {
    if (!contextDraft) return;

    try {
      await navigator.clipboard.writeText(contextDraft);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch {
      setCopied(false);
    }
  }

  function saveContextForConversation() {
    if (!contextDraft) return;

    try {
      window.localStorage.setItem(CONTEXT_STORAGE_KEY, contextDraft);
    } catch {
      // Le lien reste utilisable même si le stockage local échoue.
    }
  }

  return (
    <div className="premium-card mx-auto max-w-4xl">
      <p className="eyebrow text-[#D08F43]">Résultat</p>

      <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-[#2F3A37] sm:text-4xl">
        {title}
      </h2>

      <p className="mt-5 text-base leading-8 text-langochat-muted">
        {summary}
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
        <h3 className="font-display text-xl font-medium text-[#2F3A37]">
          Signaux dominants
        </h3>

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

      {contextDraft ? (
        <div className="mt-7 rounded-lg border border-[#D9A46A]/35 bg-[#FFF9F0] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#D08F43]">
                Contexte prêt à copier
              </p>

              <p className="mt-2 text-sm leading-7 text-langochat-muted">
                Vous pouvez copier ce texte puis le coller dans le champ
                « Contexte » de l’outil « Préparer une conversation ».
              </p>
            </div>

            <button
              type="button"
              onClick={copyContext}
              className="btn-secondary shrink-0"
            >
              {copied ? "Copié" : "Copier"}
            </button>
          </div>

          <div className="mt-4 rounded-lg border border-langochat-line bg-white/75 p-4">
            <p className="text-sm leading-7 text-[#2F3A37]">{contextDraft}</p>
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/comment-en-parler"
          onClick={saveContextForConversation}
          className="btn-primary"
        >
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