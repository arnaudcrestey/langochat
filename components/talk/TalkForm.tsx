"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { generateTalkOutput, type TalkInput, type TalkTone } from "@/lib/talk";
import { TalkResult } from "@/components/talk/TalkResult";

const initialInput: TalkInput = {
  age: "",
  relation: "",
  subject: "",
  context: "",
  tone: "calme"
};

export function TalkForm() {
  const [input, setInput] = useState<TalkInput>(initialInput);
  const [result, setResult] = useState(() => generateTalkOutput(initialInput));

  function update<K extends keyof TalkInput>(key: K, value: TalkInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(generateTalkOutput(input));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <form onSubmit={submit} className="premium-card h-fit">
        <div className="grid gap-4">
          <Field label="Âge">
            <input
              value={input.age}
              onChange={(event) => update("age", event.target.value)}
              placeholder="Exemple : 9 ans, 14 ans..."
              className="field"
            />
          </Field>

          <Field label="Lien avec l'enfant">
            <input
              value={input.relation}
              onChange={(event) => update("relation", event.target.value)}
              placeholder="Parent, enseignant, éducateur..."
              className="field"
            />
          </Field>

          <Field label="Sujet">
            <input
              value={input.subject}
              onChange={(event) => update("subject", event.target.value)}
              placeholder="Colère, école, écrans, amitiés..."
              className="field"
            />
          </Field>

          <Field label="Contexte">
            <textarea
              value={input.context}
              onChange={(event) => update("context", event.target.value)}
              placeholder="Décrivez brièvement ce qui se passe, sans donnée sensible inutile."
              className="field min-h-32 resize-y"
            />
          </Field>

          <Field label="Ton souhaité">
            <select
              value={input.tone}
              onChange={(event) =>
                update("tone", event.target.value as TalkTone)
              }
              className="field"
            >
              <option value="calme">Calme</option>
              <option value="direct">Direct</option>
              <option value="rassurant">Rassurant</option>
              <option value="cadre">Avec cadre</option>
            </select>
          </Field>
        </div>

        <button type="submit" className="btn-primary mt-6 w-full">
          Générer une proposition
        </button>
      </form>

      <TalkResult result={result} />
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-langochat-ink">
      <span>{label}</span>
      {children}
    </label>
  );
}
