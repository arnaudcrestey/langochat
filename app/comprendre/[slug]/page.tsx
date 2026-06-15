import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getTopic, topics } from "@/lib/topics";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);

  return {
    title: topic ? topic.title : "Thème",
    description: topic?.intro
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopic(slug);

  if (!topic) notFound();

  const sections = [
    ["Comprendre la situation", topic.understand],
    ["Signaux possibles", topic.signals],
    ["Ce qui peut aider", topic.helps],
    ["Ce qu'il vaut mieux éviter", topic.avoid],
    ["Comment en parler", topic.talk],
    ["Quand demander de l'aide", topic.helpWhen]
  ] as const;

  return (
    <AppShell>
      <section className="section-shell">
        <SectionHeader
          eyebrow="Comprendre"
          title={topic.title}
          text={topic.intro}
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {sections.map(([title, items]) => (
            <InfoCard key={title} title={title}>
              <ul className="grid gap-3">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg bg-white/72 p-4 text-sm leading-7 text-langochat-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </InfoCard>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/comment-en-parler" className="btn-primary">
            Préparer une conversation
          </Link>
          <Link href="/comprendre" className="btn-secondary">
            Tous les thèmes
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
