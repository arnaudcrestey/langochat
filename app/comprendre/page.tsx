import Link from "next/link";
import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { topics } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Comprendre",
  description: "Bibliothèque pédagogique LANGOCHAT pour les adultes."
};

export default function ComprendrePage() {
  return (
    <AppShell>
      <section className="section-shell">
        <SectionHeader
          eyebrow="Comprendre"
          title="Une bibliothèque pour mettre de la nuance dans les situations sensibles."
          text="Chaque thème propose des repères prudents pour observer, parler et savoir quand chercher un appui."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/comprendre/${topic.slug}`}
              className="premium-card group"
            >
              <p className="eyebrow">{topic.title}</p>
              <h2 className="mt-5 font-display text-2xl font-medium leading-tight">
                {topic.intro}
              </h2>
              <p className="mt-5 text-sm leading-7 text-langochat-muted">
                {topic.audienceNote}
              </p>
              <span className="mt-8 inline-flex text-sm font-semibold text-langochat-green transition group-hover:translate-x-1">
                Lire le thème
              </span>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
