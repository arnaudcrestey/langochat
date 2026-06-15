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
          text="Cette V1 génère une proposition locale, structurée et prudente. Elle est prête à être connectée à une API plus tard, sans l'utiliser aujourd'hui."
        />
        <div className="mt-10">
          <TalkForm />
        </div>
      </section>
    </AppShell>
  );
}
