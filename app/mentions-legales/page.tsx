import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de LANGOCHAT."
};

export default function MentionsLegalesPage() {
  return (
    <AppShell>
      <section className="section-shell">
        <SectionHeader
          eyebrow="Mentions légales"
          title="Informations légales relatives à LangOchat."
          text="LangOchat est un outil numérique destiné aux adultes. Il propose des repères pédagogiques pour préparer une conversation avec un enfant ou un adolescent, sans remplacer un professionnel ni un service d'urgence."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <InfoCard
            title="Éditeur du site"
            text="LangOchat est édité par Arnaud Crestey. Les informations administratives complètes seront précisées selon le cadre juridique retenu pour la publication."
          />

          <InfoCard
            title="Responsable de publication"
            text="Le responsable de publication est Arnaud Crestey. Une adresse de contact dédiée pourra être ajoutée avant la mise en ligne définitive."
          />

          <InfoCard
            title="Hébergement"
            text="Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis."
          />

          <InfoCard
            title="Public concerné"
            text="LangOchat est destiné aux adultes : parents, proches, enseignants, éducateurs, assistants familiaux ou professionnels concernés par une situation impliquant un enfant ou un adolescent."
          />

          <InfoCard
            title="Utilisation de l'intelligence artificielle"
            text="Certaines fonctionnalités peuvent s'appuyer sur l'intelligence artificielle afin de proposer des repères de réflexion. Les contenus générés automatiquement ne constituent pas un avis professionnel."
          />

          <InfoCard
            title="Données personnelles"
            text="La version actuelle ne nécessite pas de compte utilisateur. Aucune donnée n'est vendue ni cédée à des tiers. Les informations saisies doivent rester limitées et non inutilement identifiantes."
          />

          <InfoCard
            title="Cookies et stockage local"
            text="LangOchat n'utilise pas de cookies publicitaires. Certaines informations peuvent être conservées temporairement dans le navigateur afin d'assurer le bon fonctionnement du parcours."
          />

          <InfoCard
            title="Propriété intellectuelle"
            text="Les textes, interfaces, parcours, contenus pédagogiques, éléments graphiques et visuels présents sur LangOchat sont protégés. Toute reproduction ou réutilisation non autorisée est interdite."
          />

          <InfoCard
            title="Limitation de responsabilité"
            text="LangOchat ne remplace ni un accompagnement médical, psychologique, social, juridique ou éducatif, ni l'avis d'un professionnel qualifié."
          />

          <InfoCard
            title="Situation urgente"
            text="LangOchat n'est pas un service d'urgence. En cas de danger immédiat, de violence, de malaise important ou de doute sérieux, les services compétents doivent être contactés sans délai."
          />
        </div>
      </section>
    </AppShell>
  );
}