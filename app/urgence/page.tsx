import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { emergencyResources } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Urgence",
  description: "Numéros d'urgence et ressources immédiates."
};

export default function UrgencePage() {
  return (
    <AppShell>
      <section className="section-shell">
        <SectionHeader
          eyebrow="Urgence"
          title="En cas de danger, contactez immédiatement les services compétents."
          text="LangOchat ne remplace pas les services d'urgence, les professionnels de santé, les autorités ou les dispositifs de protection. Cette page rassemble uniquement des repères d'accès rapide."
        />

        <div className="mt-10 rounded-2xl border border-[#9F4444]/25 bg-[#9F4444]/8 p-5 text-sm leading-7 text-langochat-ink">
          <strong className="font-medium text-[#9F4444]">
            Important :
          </strong>{" "}
          si une personne est en danger immédiat, ne restez pas seul avec la
          situation. Appelez les services d'urgence ou rapprochez-vous d'un
          adulte/professionnel compétent sans attendre.
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {emergencyResources.map((resource) => (
            <a
              key={resource.number}
              href={resource.href}
              className="group rounded-2xl border border-langochat-line bg-white/88 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-[#9F4444]/60 hover:shadow-xl"
            >
              <p className="font-display text-5xl font-medium text-[#9F4444]">
                {resource.number}
              </p>

              <h2 className="mt-4 font-display text-xl font-medium text-langochat-ink">
                {resource.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-langochat-muted">
                {resource.detail}
              </p>

              <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-[#9F4444] opacity-0 transition group-hover:opacity-100">
                Appeler ou ouvrir
              </p>
            </a>
          ))}
        </div>
      </section>
    </AppShell>
  );
}