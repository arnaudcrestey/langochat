import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { TalkForm } from "@/components/talk/TalkForm";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Comment en parler",
  description: "Préparer une conversation avec un enfant ou un adolescent."
};

export default function CommentEnParlerPage() {
  return (
    <AppShell>
      <section className="section-shell">
        <SectionHeader
          eyebrow="Comment en parler"
          title="Préparer les premiers mots sans brusquer."
          text="Un espace pour préparer une conversation avec des mots simples, adaptés à la situation."
        />

        <div className="mt-10">
          <TalkForm />
        </div>
      </section>
    </AppShell>
  );
}