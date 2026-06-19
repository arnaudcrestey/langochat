import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const principles = [
  {
    title: "Comprendre avant de répondre",
    text: "Prendre le temps de lire une situation avant de poser des mots, une règle ou une réaction."
  },
  {
    title: "Garder le dialogue ouvert",
    text: "Trouver une parole adulte qui explique, rassure et cadre sans fermer la relation."
  },
  {
    title: "Accompagner avec justesse",
    text: "Aider un enfant ou un adolescent à avancer, sans tout simplifier ni tout dramatiser."
  }
];

const pathways = [
  {
    title: "Comprendre",
    href: "/comprendre",
    text: "Explorer des situations éducatives sensibles avec des repères clairs."
  },
  {
    title: "Faire le point",
    href: "/faire-le-point",
    text: "Clarifier ce qui interroge, sans poser de diagnostic automatique."
  },
  {
    title: "Comment en parler",
    href: "/comment-en-parler",
    text: "Préparer une conversation plus calme, plus juste et plus constructive."
  }
];

export default function AccueilPage() {
  return (
    <AppShell>
      <section className="relative overflow-hidden border-b border-langochat-line">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(217,164,106,0.24),transparent_28rem),radial-gradient(circle_at_85%_18%,rgba(168,181,162,0.24),transparent_30rem)]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.95fr] lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow text-[#D08F43]">LANGOCHAT</p>

            <h1 className="mt-5 max-w-4xl font-signature text-[3.15rem] font-medium leading-[0.98] tracking-[-0.03em] text-[#2F3A37] sm:text-[5rem] lg:text-[6.2rem]">
              Comprendre avant de répondre.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-langochat-muted sm:text-lg">
              LANGOCHAT aide les adultes qui accompagnent à mettre des mots sur
              les situations éducatives, relationnelles ou familiales qui demandent
              parfois plus qu'un simple « c&apos;est comme ça ».
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

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/75 bg-[#FFFCF7]/84 p-6 shadow-premium backdrop-blur-2xl sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute right-[-5rem] top-[-5rem] h-56 w-56 rounded-full bg-[#A8B5A2]/18 blur-2xl" />
            <div className="pointer-events-none absolute bottom-[-5rem] left-[-4rem] h-56 w-56 rounded-full bg-[#D9A46A]/14 blur-2xl" />

            <div className="relative flex min-h-[260px] flex-col items-center justify-center text-center">
  <div className="h-px w-20 bg-[#D9A46A]/65" />

  <p className="mt-7 text-[0.66rem] font-bold uppercase leading-5 tracking-[0.32em] text-[#D08F43] sm:text-[0.72rem]">
    Comprendre · Dialoguer · Accompagner
  </p>

  <p className="mt-8 font-signature text-[2.2rem] font-medium leading-[1.06] tracking-[-0.02em] text-[#2F3A37] sm:text-[2.8rem]">
    Parce qu&apos;un
    <br />
    « c&apos;est comme ça »
    <br />
    ne suffit pas toujours.
  </p>

              
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Pourquoi LANGOCHAT"
          title="Parce qu'un adulte peut avoir besoin de recul avant de trouver les bons mots."
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
          title="Transformer une inquiétude diffuse en première lecture plus claire."
          text="Des repères pédagogiques, un outil pour faire le point et une aide pour préparer une conversation."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pathways.map((item) => (
            <Link key={item.href} href={item.href} className="premium-card group">
              <p className="eyebrow text-[#D08F43]">{item.title}</p>
              <p className="mt-5 text-sm leading-7 text-langochat-muted">
                {item.text}
              </p>
              <span className="mt-8 inline-flex text-sm font-semibold text-[#2F3A37] transition group-hover:translate-x-1">
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
            title="Parents, enseignants, éducateurs, assistants familiaux et adultes de confiance."
            text="LANGOCHAT s'adresse aux adultes qui accompagnent. Il ne remplace ni une aide spécialisée, ni une décision professionnelle lorsqu'une situation l'exige."
          />

          <div className="rounded-[1.5rem] border border-langochat-line bg-white/78 p-6 shadow-premium sm:p-8">
            <p className="font-signature text-[2.4rem] font-medium leading-[1.05] text-[#2F3A37]">
              Une aide à la réflexion, pas une réponse automatique.
            </p>
            <p className="mt-5 text-sm leading-7 text-langochat-muted">
              LANGOCHAT propose des repères pour mieux comprendre,
              mieux dialoguer et mieux accompagner lorsque les réponses
              ne sont pas toujours évidentes.
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}