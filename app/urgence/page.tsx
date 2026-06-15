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
          title="Si une personne est en danger, contactez les services compétents immédiatement."
          text="LANGOCHAT ne remplace pas les services d'urgence, les professionnels de santé, les autorités ou les dispositifs de protection."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {emergencyResources.map((resource) => (
            <a
              key={resource.number}
              href={resource.href}
              className="rounded-lg border border-langochat-line bg-white/86 p-6 shadow-premium transition hover:-translate-y-0.5 hover:border-langochat-green"
            >
              <p className="font-display text-5xl font-medium text-[#9F4444]">
                {resource.number}
              </p>
              <h2 className="mt-4 font-display text-xl font-medium">
                {resource.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-langochat-muted">
                {resource.detail}
              </p>
            </a>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
