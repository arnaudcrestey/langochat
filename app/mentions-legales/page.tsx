import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales provisoires de LANGOCHAT."
};

export default function MentionsLegalesPage() {
  return (
    <AppShell>
      <section className="section-shell">
        <SectionHeader
          eyebrow="Mentions légales"
          title="Informations légales à compléter avant publication."
          text="Cette page pose une base sobre pour la V1. Les informations d'éditeur, d'hébergement et de contact devront être vérifiées avant mise en ligne publique."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <InfoCard
            title="Éditeur"
            text="LANGOCHAT. Responsable de publication : information à compléter."
          />
          <InfoCard
            title="Hébergement"
            text="Hébergeur, adresse et coordonnées à compléter selon le service retenu."
          />
          <InfoCard
            title="Propriété intellectuelle"
            text="Les contenus, textes, interfaces et éléments visuels sont protégés. Toute réutilisation doit être autorisée."
          />
          <InfoCard
            title="Limitation de responsabilité"
            text="LANGOCHAT propose des informations pédagogiques. Le site ne constitue ni un avis médical, ni un diagnostic, ni un service d'urgence."
          />
        </div>
      </section>
    </AppShell>
  );
}
