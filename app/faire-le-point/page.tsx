import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { QuestionnaireFlow } from "@/components/questionnaire/QuestionnaireFlow";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Faire le point",
  description: "Questionnaire local LANGOCHAT pour clarifier des signaux."
};

export default function FaireLePointPage() {
  return (
    <AppShell>
      <section className="section-shell">
        <SectionHeader
          eyebrow="Faire le point"
          title="Clarifier ce qui se répète, sans poser de diagnostic."
          text="Douze questions sont tirées au hasard pendant votre session. Elles aident à repérer des signaux, pas à conclure à la place d'un professionnel."
        />
        <div className="mt-10">
          <QuestionnaireFlow />
        </div>
      </section>
    </AppShell>
  );
}
