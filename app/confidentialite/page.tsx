import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Informations de confidentialité LANGOCHAT."
};

export default function ConfidentialitePage() {
  return (
    <AppShell>
      <section className="section-shell">
        <SectionHeader
          eyebrow="Confidentialité"
          title="Une V1 locale, sans compte utilisateur."
          text="Les fonctionnalités actuelles ne nécessitent ni authentification, ni base de données, ni API externe. Les informations saisies dans l'outil de conversation servent uniquement à produire une réponse locale dans le navigateur."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <InfoCard
            title="Questionnaire"
            text="Le tirage des questions et les réponses sont conservés dans la session du navigateur afin de garder le parcours stable pendant l'utilisation."
          />
          <InfoCard
            title="Formulaire de dialogue"
            text="La proposition est générée localement. Il est recommandé de ne pas saisir de données inutilement identifiantes ou sensibles."
          />
          <InfoCard
            title="Evolution possible"
            text="Si une API est ajoutée plus tard, les informations de confidentialité devront être complétées avant mise en service."
          />
          <InfoCard
            title="Urgence"
            text="En cas de danger, il faut utiliser les services compétents. LANGOCHAT ne doit jamais retarder une demande d'aide."
          />
        </div>
      </section>
    </AppShell>
  );
}
