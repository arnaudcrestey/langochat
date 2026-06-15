import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "À propos",
  description: "Présentation de la démarche LANGOCHAT."
};

export default function AproposPage() {
  return (
    <AppShell>
      <section className="section-shell">
        <SectionHeader
          eyebrow="À propos"
          title="Un outil pour les adultes qui veulent comprendre avant de répondre."
          text="LANGOCHAT propose des repères pédagogiques, prudents et accessibles. Il accompagne la réflexion, mais ne remplace pas les professionnels ni les dispositifs d'urgence."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <InfoCard
            title="Une posture"
            text="Ralentir, observer, parler avec justesse et préserver le lien chaque fois que cela est possible."
          />
          <InfoCard
            title="Un public"
            text="Parents, enseignants, éducateurs, assistants familiaux et proches concernés par une situation délicate."
          />
          <InfoCard
            title="Une limite"
            text="LANGOCHAT n'est pas destiné aux enfants et ne pose aucun diagnostic."
          />
        </div>
      </section>
    </AppShell>
  );
}
