"use client";

import { useMemo, useState } from "react";
import {
  answerOptions,
  enrichAnswers,
  questions,
  type AnswerId,
  type StoredAnswer
} from "@/lib/questionnaire";
import { ResultCard, type AiAnalysis } from "@/components/questionnaire/ResultCard";
import { shuffle } from "@/lib/utils";

const QUESTION_COUNT = 12;
const MIN_ANALYSIS_DELAY = 8000;

type Step = "questions" | "analyzing" | "result";

function createQuestionSet() {
  return shuffle([...questions]).slice(0, QUESTION_COUNT);
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function formatQuestionText(text: string) {
  return text.replace(/\s+([?!:;])/g, "\u00A0$1");
}

function isValidAiAnalysis(value: unknown): value is AiAnalysis {
  if (!value || typeof value !== "object") return false;

  const data = value as AiAnalysis;

  return (
    typeof data.title === "string" &&
    typeof data.summary === "string" &&
    Array.isArray(data.dominantSignals) &&
    data.dominantSignals.every((signal) => typeof signal === "string") &&
    typeof data.nextStep === "string"
  );
}

export function QuestionnaireFlow() {
  const [orderedQuestions, setOrderedQuestions] = useState(() =>
    questions.slice(0, QUESTION_COUNT)
  );
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, StoredAnswer>>({});
  const [step, setStep] = useState<Step>("questions");
  const [aiAnalysis, setAiAnalysis] = useState<AiAnalysis | null>(null);

  const currentQuestion = orderedQuestions[index];

  const selected = currentQuestion
    ? answers[currentQuestion.id]?.answerId
    : undefined;

  const resultAnswers = useMemo(
    () =>
      orderedQuestions
        .map((question) => answers[question.id])
        .filter((answer): answer is StoredAnswer => Boolean(answer)),
    [answers, orderedQuestions]
  );

  const progress = Math.round(
    (resultAnswers.length / orderedQuestions.length) * 100
  );

  function chooseAnswer(answerId: AnswerId, score: number) {
    if (!currentQuestion) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        answerId,
        score
      }
    }));
  }

  async function prepareResult(finalAnswers: StoredAnswer[]) {
    setStep("analyzing");

    const finalScore = finalAnswers.reduce(
      (total, answer) => total + answer.score,
      0
    );

    const enrichedAnswers = enrichAnswers(finalAnswers);

    const apiCall = fetch("/api/questionnaire/analyse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        score: finalScore,
        answers: enrichedAnswers
      })
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Erreur API questionnaire");
        }

        const data: unknown = await response.json();

        if (!isValidAiAnalysis(data)) {
          throw new Error("Format IA invalide");
        }

        return data;
      })
      .catch(() => null);

    const [analysis] = await Promise.all([
      apiCall,
      wait(MIN_ANALYSIS_DELAY)
    ]);

    setAiAnalysis(analysis);
    setStep("result");
  }

  function goNext() {
    if (!currentQuestion || !selected) return;

    if (index === orderedQuestions.length - 1) {
      prepareResult(resultAnswers);
      return;
    }

    setIndex((value) => value + 1);
  }

  function goPrevious() {
    setIndex((value) => Math.max(value - 1, 0));
  }

  function reset() {
    setOrderedQuestions(createQuestionSet());
    setAnswers({});
    setIndex(0);
    setAiAnalysis(null);
    setStep("questions");
  }

  if (step === "analyzing") {
    return (
      <div className="premium-card mx-auto max-w-4xl overflow-hidden text-center">
        <p className="eyebrow text-[#D08F43]">Lecture des réponses</p>

        <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#D9A46A]/25 bg-white/60 shadow-soft">
          <div className="h-9 w-9 animate-spin rounded-full border border-[#D9A46A]/25 border-t-[#D9A46A]" />
        </div>

        <h2 className="mx-auto mt-8 max-w-xl font-signature text-[2.35rem] font-medium leading-[1.05] text-[#2F3A37] sm:text-[3.4rem]">
          Nous relisons vos réponses.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-langochat-muted sm:text-base">
          LangOchat prépare votre synthèse, pour vous aider à prendre du recul.
        </p>

        <div className="mx-auto mt-8 h-px w-20 bg-[#D9A46A]/50" />

        <p className="mx-auto mt-5 max-w-md text-xs leading-6 text-langochat-muted/80">
          Cette restitution ne pose pas de diagnostic et ne remplace pas l’avis
          d’un professionnel.
        </p>
      </div>
    );
  }

  if (step === "result") {
    return (
      <ResultCard
        answers={resultAnswers}
        onReset={reset}
        initialAnalysis={aiAnalysis}
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="premium-card mx-auto max-w-4xl">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-[#D08F43]">
          Question {index + 1} / {orderedQuestions.length}
        </p>

        <p className="text-sm font-medium text-langochat-muted">{progress}%</p>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-langochat-surface">
        <div
          className="h-full rounded-full bg-langochat-green transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h2 className="mt-8 max-w-3xl text-balance font-display text-[1.35rem] font-medium leading-[1.18] text-[#2F3A37] sm:text-3xl sm:leading-tight">
        {formatQuestionText(currentQuestion.text)}
      </h2>

      <fieldset className="mt-8 grid gap-3">
        <legend className="sr-only">Choisissez une réponse</legend>

        {answerOptions.map((answer) => {
          const inputId = `${currentQuestion.id}-${answer.id}`;
          const isSelected = selected === answer.id;

          return (
            <label
              key={answer.id}
              htmlFor={inputId}
              className={`block min-h-[60px] w-full cursor-pointer select-none rounded-2xl border px-4 py-4 text-left text-sm font-medium leading-6 transition sm:px-5 sm:py-5 sm:text-base ${
                isSelected
                  ? "border-langochat-green bg-[#EEF2EB] text-langochat-ink shadow-sm"
                  : "border-langochat-line bg-white text-langochat-muted"
              }`}
            >
              <input
                id={inputId}
                name={currentQuestion.id}
                type="radio"
                checked={isSelected}
                onChange={() => chooseAnswer(answer.id, answer.score)}
                className="sr-only"
              />

              {answer.label}
            </label>
          );
        })}
      </fieldset>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={goPrevious}
          disabled={index === 0}
          className="btn-secondary w-full disabled:pointer-events-none disabled:opacity-45 sm:w-auto"
        >
          Précédent
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!selected}
          className="btn-primary w-full disabled:pointer-events-none disabled:opacity-45 sm:w-auto"
        >
          {index === orderedQuestions.length - 1
            ? "Voir la synthèse"
            : "Suivant"}
        </button>
      </div>
    </div>
  );
}