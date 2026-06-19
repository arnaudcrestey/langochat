import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "À propos",
  description: "Pourquoi LANGOCHAT a été créé."
};

export default function AproposPage() {
  return (
    <AppShell>
      <section className="section-shell">
        <SectionHeader
          eyebrow="À propos"
          title="Parler avec un enfant n'est pas toujours simple."
          text="Certaines situations soulèvent des questions auxquelles il est difficile de répondre seul. LangOchat a été imaginé pour aider les adultes à préparer ces échanges avec davantage de repères, de prudence et de confiance."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <InfoCard
            title="Une intention"
            text="Aider les adultes à trouver les mots justes lorsqu'un enfant ou un adolescent traverse une situation qui les interroge, les inquiète ou les dépasse."
          />

          <InfoCard
            title="Pour qui ?"
            text="Parents, enseignants, éducateurs, assistants familiaux, proches ou professionnels confrontés à des questions sensibles du quotidien."
          />

          <InfoCard
            title="Ce que LangOchat n'est pas"
            text="LangOchat ne remplace ni un professionnel, ni un service d'urgence, et ne pose aucun diagnostic. Il propose des repères pour mieux préparer le dialogue."
          />
        </div>
      </section>
    </AppShell>
  );
}