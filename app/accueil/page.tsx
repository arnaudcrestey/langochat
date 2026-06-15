import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const principles = [
  {
    title: "Comprendre avant d'agir",
    text: "Ralentir l'interprétation, observer ce qui se répète et chercher une réponse plus juste."
  },
  {
    title: "Ouvrir le dialogue",
    text: "Préparer des mots qui n'écrasent pas, n'interrogent pas trop vite et gardent le lien vivant."
  },
  {
    title: "Accompagner avec cadre",
    text: "Soutenir l'enfant ou l'adolescent tout en assumant la place protectrice de l'adulte."
  }
];

const pathways = [
  { title: "Comprendre", href: "/comprendre", text: "Explorer les thèmes sensibles." },
  { title: "Faire le point", href: "/faire-le-point", text: "Clarifier des signaux sans diagnostic." },
  { title: "Comment en parler", href: "/comment-en-parler", text: "Préparer une première conversation." }
];

export default function AccueilPage() {
  return (
    <AppShell>
      <section className="relative overflow-hidden border-b border-langochat-line">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(216,195,165,0.42),transparent_26rem),radial-gradient(circle_at_82%_18%,rgba(141,154,132,0.24),transparent_24rem)]" />
        <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">LANGOCHAT</p>
            <h1 className="mt-5 max-w-3xl font-display text-[2.7rem] font-medium leading-[1.03] text-langochat-ink sm:text-[4rem] lg:text-[5.2rem]">
              Comprendre ce qui se joue avant de répondre.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-langochat-muted sm:text-lg">
              Une présence claire pour les adultes qui accompagnent un enfant,
              un adolescent ou une situation familiale sensible, sans réduire la
              complexité à une phrase toute faite.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/comprendre" className="btn-primary">
                Explorer les thèmes
              </Link>
              <Link href="/comment-en-parler" className="btn-secondary">
                Préparer les mots
              </Link>
            </div>
          </div>

          <div className="relative min-h-[24rem] overflow-hidden rounded-lg border border-white/70 bg-white/42 shadow-premium sm:min-h-[31rem]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,252,247,0.96),rgba(246,244,241,0.7)),radial-gradient(circle_at_70%_20%,rgba(216,195,165,0.56),transparent_16rem)]" />
            <div className="relative flex h-full min-h-[24rem] flex-col justify-between p-6 sm:min-h-[31rem] sm:p-9">
              <div className="h-px w-24 bg-langochat-green/45" />
              <div>
                <p className="font-signature text-[4.4rem] leading-none text-langochat-green sm:text-[6rem]">
                  L
                </p>
                <p className="mt-5 max-w-md font-display text-2xl font-medium leading-snug text-langochat-ink sm:text-3xl">
                  Un espace pensé pour les adultes qui veulent répondre avec
                  justesse.
                </p>
              </div>
              <div className="grid gap-3 text-sm leading-6 text-langochat-muted sm:grid-cols-3">
                <span>Ecouter</span>
                <span>Comprendre</span>
                <span>Accompagner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Pourquoi LANGOCHAT"
          title="Parce que les adultes ont parfois besoin d'un lieu intérieur avant de trouver les bons mots."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <InfoCard key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
      </section>

      <section className="section-shell bg-langochat-surface">
        <SectionHeader
          eyebrow="Ce que permet LANGOCHAT"
          title="Passer de l'inquiétude brute à une parole plus claire."
          text="La V1 rassemble une bibliothèque, un questionnaire de repérage et un outil local pour préparer une conversation."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pathways.map((item) => (
            <Link key={item.href} href={item.href} className="premium-card group">
              <p className="eyebrow">{item.title}</p>
              <p className="mt-5 text-sm leading-7 text-langochat-muted">
                {item.text}
              </p>
              <span className="mt-8 inline-flex text-sm font-semibold text-langochat-green transition group-hover:translate-x-1">
                Ouvrir
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <SectionHeader
            eyebrow="Pour qui ?"
            title="Parents, enseignants, éducateurs, assistants familiaux et proches."
            text="LANGOCHAT s'adresse aux adultes. Il ne s'adresse pas aux enfants et ne remplace pas une aide spécialisée."
          />
          <div className="rounded-lg border border-langochat-line bg-white/78 p-6 shadow-premium sm:p-8">
            <p className="font-display text-2xl font-medium leading-snug">
              Une aide à la réflexion, pas une réponse automatique.
            </p>
            <p className="mt-5 text-sm leading-7 text-langochat-muted">
              Le site propose des repères prudents pour mieux comprendre,
              dialoguer et orienter lorsque la situation dépasse le cadre du
              quotidien.
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
