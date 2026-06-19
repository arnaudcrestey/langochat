import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Informations de confidentialité de LANGOCHAT."
};

export default function ConfidentialitePage() {
  return (
    <AppShell>
      <section className="section-shell">
        <SectionHeader
          eyebrow="Confidentialité"
          title="Un outil pensé pour limiter la collecte de données."
          text="LangOchat a été conçu pour aider les adultes à préparer une conversation avec prudence. Les informations saisies doivent rester utiles, limitées et formulées sans détails inutilement identifiants."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <InfoCard
            title="Aucun compte utilisateur"
            text="La version actuelle ne nécessite pas de création de compte. Elle ne demande ni identifiant, ni mot de passe, ni espace personnel."
          />

          <InfoCard
            title="Utilisation des informations saisies"
            text="Les éléments renseignés servent uniquement à générer une analyse ou une proposition de conversation adaptée à la situation décrite."
          />

          <InfoCard
            title="Données sensibles"
            text="Il est recommandé d'éviter les noms complets, adresses, établissements, numéros de téléphone ou tout détail permettant d'identifier directement un enfant ou une famille."
          />

          <InfoCard
            title="Stockage temporaire"
            text="Certaines informations peuvent être conservées temporairement dans le navigateur afin de faciliter le passage entre le questionnaire et l'outil de préparation à la conversation."
          />

          <InfoCard
            title="Limite de l'outil"
            text="LANGOCHAT ne remplace ni un professionnel, ni un service social, médical, éducatif ou d'urgence. Il ne pose aucun diagnostic."
          />

          <InfoCard
            title="Situation urgente"
            text="En cas de danger, de violence, de malaise important ou de doute sérieux, il faut contacter sans attendre les services compétents."
          />
        </div>
      </section>
    </AppShell>
  );
}