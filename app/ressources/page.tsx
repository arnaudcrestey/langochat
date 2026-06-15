import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { emergencyResources, resourceBlocks } from "@/lib/resources";

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
          title="Savoir vers qui se tourner quand la situation dépasse le dialogue ordinaire."
          text="Ces repères sont indicatifs et doivent être adaptés au contexte. En cas de danger immédiat, contactez les services d'urgence."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resourceBlocks.map((block) => (
            <InfoCard key={block.title} title={block.title} text={block.text}>
              <ul className="grid gap-2 text-sm leading-7 text-langochat-muted">
                {block.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </InfoCard>
          ))}
        </div>
      </section>

      <section className="section-shell bg-langochat-surface">
        <SectionHeader
          eyebrow="Numéros utiles"
          title="Ressources françaises à connaître."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {emergencyResources.map((resource) => (
            <a
              key={resource.number}
              href={resource.href}
              className="rounded-lg border border-langochat-line bg-white/82 p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-langochat-green"
            >
              <p className="font-display text-4xl font-medium text-langochat-green">
                {resource.number}
              </p>
              <h2 className="mt-4 font-display text-lg font-medium">
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
