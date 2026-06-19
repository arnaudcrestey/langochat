"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  initialTalkOutput,
  type TalkInput,
  type TalkOutput,
  type TalkTone
} from "@/lib/talk";
import { TalkResult } from "@/components/talk/TalkResult";

const CONTEXT_STORAGE_KEY = "langochat_context_draft";

const initialInput: TalkInput = {
  age: "",
  relation: "",
  subject: "",
  context: "",
  tone: "calme"
};

const toneOptions: { value: TalkTone; label: string }[] = [
  { value: "calme", label: "Calme" },
  { value: "direct", label: "Clair et direct" },
  { value: "rassurant", label: "Rassurant" },
  { value: "cadre", label: "Avec un cadre" }
];

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function TalkForm() {
  const [input, setInput] = useState<TalkInput>(initialInput);
  const [result, setResult] = useState<TalkOutput>(initialTalkOutput);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [formError, setFormError] = useState("");

  const canSubmit = useMemo(() => {
    return Boolean(
      input.age.trim() &&
        input.relation.trim() &&
        input.subject.trim() &&
        input.context.trim()
    );
  }, [input]);

  useEffect(() => {
    const savedContext = window.localStorage.getItem(CONTEXT_STORAGE_KEY);

    if (!savedContext) return;

    setInput((current) => ({
      ...current,
      context: savedContext
    }));

    window.localStorage.removeItem(CONTEXT_STORAGE_KEY);
  }, []);

  function update<K extends keyof TalkInput>(key: K, value: TalkInput[K]) {
    setFormError("");
    setInput((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) return;

    if (!canSubmit) {
      setFormError(
        "Merci de renseigner l’âge, le lien avec l’enfant, le sujet et le contexte pour générer une proposition adaptée."
      );
      return;
    }

    setIsLoading(true);
    setFormError("");

    try {
      const startedAt = Date.now();

      const response = await fetch("/api/talk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      });

      if (!response.ok) {
        throw new Error("La génération n'a pas pu aboutir.");
      }

      const data = (await response.json()) as TalkOutput;

      const elapsed = Date.now() - startedAt;
      const remainingDelay = Math.max(0, 8000 - elapsed);

      await wait(remainingDelay);

      setResult(data);
      setHasGenerated(true);
    } catch (error) {
      console.error("Erreur génération proposition:", error);

      await wait(8000);

      setResult(initialTalkOutput);
      setHasGenerated(false);
      setFormError(
        "La proposition n'a pas pu être générée. Vous pouvez réessayer dans quelques instants."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <form onSubmit={submit} className="premium-card">
        <div className="grid gap-4">
          <Field label="L'enfant ou l'adolescent concerné" required>
            <input
              required
              value={input.age}
              onChange={(event) => update("age", event.target.value)}
              placeholder="Exemple : ma fille à 9 ans et est en CM1, mon élève à 14 ans,..."
              className="form-field"
            />
          </Field>

          <Field label="Votre lien avec l'enfant" required>
            <input
              required
              value={input.relation}
              onChange={(event) => update("relation", event.target.value)}
              placeholder="Parent, enseignant, éducateur..."
              className="form-field"
            />
          </Field>

          <Field label="Ce qui me préoccupe aujourd'hui" required>
            <input
              required
              value={input.subject}
              onChange={(event) => update("subject", event.target.value)}
              placeholder="Colères fréquentes, difficultés à l'école, écrans, amitiés..."
              className="form-field"
            />
          </Field>

          <Field label="Contexte" required>
            <textarea
              required
              value={input.context}
              onChange={(event) => update("context", event.target.value)}
              placeholder="Décrivez brièvement ce qui se passe, sans donnée sensible inutile."
              className="form-field min-h-32 resize-y"
            />
          </Field>

          <Field label="Quel ton souhaitez-vous adopter ?">
            <select
              value={input.tone}
              onChange={(event) =>
                update("tone", event.target.value as TalkTone)
              }
              className="form-field"
            >
              {toneOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          {formError ? (
            <p className="rounded-2xl border border-[#D9A46A]/30 bg-[#FFF9F0] px-4 py-3 text-sm leading-6 text-langochat-muted">
              {formError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 rounded-full bg-[#D8942F] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(216,148,47,0.28)] transition hover:-translate-y-0.5 hover:bg-[#C98225] disabled:cursor-not-allowed disabled:bg-[#D8942F]/70 disabled:text-white disabled:opacity-100 disabled:hover:translate-y-0"
          >
            {isLoading ? "Préparation en cours..." : "Générer une proposition"}
          </button>
        </div>
      </form>

      <TalkResult
        result={result}
        isLoading={isLoading}
        hasGenerated={hasGenerated}
      />
    </div>
  );
}

function Field({
  label,
  required = false,
  children
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-langochat-ink">
      <span>
        {label}
        {required ? <span className="text-[#D08F43]"> *</span> : null}
      </span>
      {children}
    </label>
  );
}