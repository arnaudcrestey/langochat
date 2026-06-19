import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { emergencyResources, resourceBlocks } from "@/lib/resources";

const resourceIcons: Record<string, string> = {
  Parents: "👨‍👩‍👧",
  "Enseignants / AESH": "🏫",
  "Educateurs / travailleurs sociaux": "🤝",
  "Éducateurs / travailleurs sociaux": "🤝",
  "Familles d'accueil": "🏠",
  Associations: "💬",
  "Quand demander de l'aide": "⚠️"
};

export const metadata: Metadata = {
  title: "Ressources",
  description: "Ressources françaises utiles pour les adultes accompagnants."
};

export default function RessourcesPage() {
  return (
    <AppShell>
      <section className="section-shell">
        <SectionHeader
          eyebrow="Ressources"
          title="Vers qui se tourner ?"
          text="LangOchat ne remplace pas les professionnels. Lorsque la situation l'exige, il est important de pouvoir s'appuyer sur des services compétents, des structures spécialisées ou des numéros d'aide adaptés."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resourceBlocks.map((block) => (
            <article
              key={block.title}
              className="group relative overflow-hidden rounded-2xl border border-langochat-line bg-white/88 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-langochat-green/70 hover:shadow-xl"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-langochat-green/70" />

              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-langochat-surface text-xl shadow-sm">
                  {resourceIcons[block.title] ?? "•"}
                </div>

                <div>
                  <h2 className="font-display text-xl font-medium text-langochat-ink">
                    {block.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-langochat-muted">
                    {block.text}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {block.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex rounded-full border border-langochat-line bg-langochat-surface/70 px-3 py-1 text-xs leading-6 text-langochat-muted transition group-hover:border-langochat-green/40"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell bg-langochat-surface">
        <SectionHeader
          eyebrow="Numéros utiles"
          title="Numéros et services utiles."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {emergencyResources.map((resource) => (
            <a
              key={resource.number}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-langochat-line bg-white/88 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-langochat-green/70 hover:shadow-xl"
            >
              <p className="font-display text-4xl font-medium text-langochat-green">
                {resource.number}
              </p>

              <h2 className="mt-4 font-display text-lg font-medium text-langochat-ink">
                {resource.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-langochat-muted">
                {resource.detail}
              </p>

              <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-langochat-green opacity-0 transition group-hover:opacity-100">
                Ouvrir la ressource
              </p>
            </a>
          ))}
        </div>
      </section>
    </AppShell>
  );
}