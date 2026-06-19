import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { QuestionnaireFlow } from "@/components/questionnaire/QuestionnaireFlow";

export const metadata: Metadata = {
  title: "Faire le point",
  description: "Questionnaire local LANGOCHAT pour clarifier des signaux."
};

export default function FaireLePointPage() {
  return (
    <AppShell>
      <section className="border-b border-langochat-line bg-[radial-gradient(circle_at_18%_8%,rgba(217,164,106,0.18),transparent_24rem),radial-gradient(circle_at_86%_18%,rgba(168,181,162,0.22),transparent_28rem)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
          <div className="max-w-4xl">
            <p className="eyebrow text-[#D08F43]">Faire le point</p>

            <h1 className="mt-5 max-w-4xl font-signature text-[3rem] font-medium leading-[0.98] tracking-[-0.03em] text-[#2F3A37] sm:text-[4.7rem] lg:text-[5.8rem]">
              Un temps de réflexion avant d&apos;aller plus loin.
            </h1>

            <div className="mt-7 max-w-2xl space-y-4 text-base leading-8 text-langochat-muted sm:text-lg">
              <p>
                Certaines situations soulèvent des questions sans apporter de
                réponses immédiates.
              </p>

              <p>
                Ce questionnaire propose un temps de réflexion à partir de
                douze questions choisies au hasard.
              </p>

              <p>
                Il ne pose aucun diagnostic et ne remplace pas un professionnel.
                Il aide simplement à prendre du recul sur la situation.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-white/75 bg-[#FFFCF7]/80 px-6 py-6 text-center shadow-premium backdrop-blur-2xl sm:mt-12 sm:px-8 sm:py-7">
            <p className="eyebrow text-[#D08F43]">
              Avant de commencer
            </p>

            <p className="mt-3 font-signature text-[1.8rem] font-medium leading-[1.08] text-[#2F3A37] sm:text-[2.4rem]">
              Quelques minutes suffisent.
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-langochat-muted sm:text-base">
              Douze questions pour vous aider à prendre du
              recul sur ce que vous observez au quotidien.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-3xl">
          <QuestionnaireFlow />
        </div>
      </section>
    </AppShell>
  );
}