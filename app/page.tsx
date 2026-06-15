import Link from "next/link";

export default function EntryPage() {
  return (
    <main className="min-h-svh overflow-hidden bg-langochat-bg text-langochat-ink">
      <section className="relative grid min-h-svh place-items-center px-4 py-5 sm:px-6 sm:py-8">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFCF7_0%,#FAF8F5_46%,#F6F4F1_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(141,154,132,0.18),transparent_30rem),radial-gradient(circle_at_50%_86%,rgba(216,195,165,0.28),transparent_28rem)]" />

        <div className="relative z-10 w-full max-w-[48rem]">
          <div className="relative mx-auto flex min-h-[calc(100svh-2.5rem)] flex-col items-center justify-center overflow-hidden rounded-lg border border-white/70 bg-[#FFFCF7]/84 px-5 py-8 text-center shadow-premium backdrop-blur-xl sm:min-h-[76svh] sm:px-10 sm:py-11">
            <div className="absolute left-1/2 top-[-11rem] h-[23rem] w-[23rem] -translate-x-1/2 rounded-full bg-langochat-green/12 blur-3xl" />
            <div className="absolute bottom-[-11rem] right-[-8rem] h-[24rem] w-[24rem] rounded-full bg-langochat-sand/25 blur-3xl" />

            <div className="relative mx-auto flex w-full max-w-[39rem] flex-col items-center">
              <p className="eyebrow text-[0.58rem] tracking-[0.28em] sm:text-[0.7rem] sm:tracking-[0.38em]">
                COMPRENDRE · DIALOGUER · ACCOMPAGNER
              </p>

              <h1 className="mt-7 font-signature text-[3.25rem] font-medium leading-none tracking-[0.04em] text-[#263128] sm:mt-8 sm:text-[5.2rem] md:text-[5.85rem]">
                LANGOCHAT
              </h1>

              <div className="mt-5 h-px w-16 bg-langochat-green/35 sm:mt-6 sm:w-24" />

              <h2 className="mt-6 max-w-[32rem] font-display text-[1.72rem] font-medium leading-[1.15] text-langochat-ink sm:mt-7 sm:text-[2.45rem] md:text-[2.7rem]">
                Parce qu&apos;un &quot;c&apos;est comme ça&quot; ne suffit pas
                toujours.
              </h2>

              <p className="mt-5 max-w-[31rem] text-[0.98rem] leading-7 text-langochat-muted sm:mt-6 sm:text-[1.04rem] sm:leading-8">
                Quand un adulte ne sait plus quoi penser, quoi répondre ou
                comment ouvrir le dialogue, LANGOCHAT aide à comprendre avant
                d&apos;agir.
              </p>

              <Link href="/accueil" className="btn-primary mt-7 sm:mt-8">
                Entrer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
