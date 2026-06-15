"use client";

import { useEffect, useMemo, useState } from "react";
import {
  answerOptions,
  questions,
  type AnswerId,
  type Question,
  type StoredAnswer
} from "@/lib/questionnaire";
import { ResultCard } from "@/components/questionnaire/ResultCard";
import { shuffle } from "@/lib/utils";

const QUESTION_COUNT = 12;

export function QuestionnaireFlow() {
  const [orderedQuestions, setOrderedQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, StoredAnswer>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.sessionStorage.getItem("langochat-questionnaire");

      if (stored) {
        try {
          const parsed = JSON.parse(stored) as {
            orderedQuestions: Question[];
            answers: Record<string, StoredAnswer>;
            index: number;
          };
          setOrderedQuestions(parsed.orderedQuestions);
          setAnswers(parsed.answers);
          setIndex(parsed.index);
          return;
        } catch {
          window.sessionStorage.removeItem("langochat-questionnaire");
        }
      }

      setOrderedQuestions(shuffle(questions).slice(0, QUESTION_COUNT));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (orderedQuestions.length === 0) return;

    window.sessionStorage.setItem(
      "langochat-questionnaire",
      JSON.stringify({ orderedQuestions, answers, index })
    );
  }, [orderedQuestions, answers, index]);

  const currentQuestion = orderedQuestions[index];
  const answeredCount = Object.keys(answers).length;
  const complete =
    orderedQuestions.length > 0 &&
    orderedQuestions.every((question) => answers[question.id]);
  const progress = orderedQuestions.length
    ? Math.round((answeredCount / orderedQuestions.length) * 100)
    : 0;

  const resultAnswers = useMemo(
    () =>
      orderedQuestions
        .map((question) => answers[question.id])
        .filter((answer): answer is StoredAnswer => Boolean(answer)),
    [answers, orderedQuestions]
  );

  function chooseAnswer(answerId: AnswerId, score: number) {
    if (!currentQuestion) return;

    setAnswers((value) => ({
      ...value,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        answerId,
        score
      }
    }));
  }

  function reset() {
    const nextQuestions = shuffle(questions).slice(0, QUESTION_COUNT);
    setOrderedQuestions(nextQuestions);
    setAnswers({});
    setIndex(0);
    window.sessionStorage.removeItem("langochat-questionnaire");
  }

  if (!currentQuestion) {
    return <div className="premium-card min-h-72 animate-pulse" />;
  }

  if (complete) {
    return <ResultCard answers={resultAnswers} onReset={reset} />;
  }

  const selected = answers[currentQuestion.id]?.answerId;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="premium-card">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">
            Question {index + 1} / {orderedQuestions.length}
          </p>
          <p className="text-sm font-medium text-langochat-muted">
            {progress}%
          </p>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-langochat-surface">
          <div
            className="h-full rounded-full bg-langochat-green transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="mt-8 font-display text-2xl font-medium leading-tight sm:text-3xl">
          {currentQuestion.text}
        </h2>

        <div className="mt-8 grid gap-3">
          {answerOptions.map((answer) => (
            <button
              key={answer.id}
              type="button"
              onClick={() => chooseAnswer(answer.id, answer.score)}
              className={`rounded-lg border px-5 py-4 text-left text-sm font-medium leading-6 transition ${
                selected === answer.id
                  ? "border-langochat-green bg-[#EEF2EB] text-langochat-ink"
                  : "border-langochat-line bg-white/70 text-langochat-muted hover:border-langochat-green"
              }`}
            >
              {answer.label}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={() => setIndex((value) => Math.max(0, value - 1))}
            disabled={index === 0}
            className="btn-secondary disabled:pointer-events-none disabled:opacity-45"
          >
            Précédent
          </button>
          <button
            type="button"
            onClick={() =>
              setIndex((value) =>
                Math.min(orderedQuestions.length - 1, value + 1)
              )
            }
            disabled={!selected}
            className="btn-primary disabled:pointer-events-none disabled:opacity-45"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
