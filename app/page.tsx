import Image from "next/image";
import Link from "next/link";

export default function EntryPage() {
  return (
    <main className="min-h-svh overflow-hidden bg-langochat-bg text-langochat-ink">
      <section className="relative flex min-h-svh items-center justify-center px-4 py-5 sm:px-6 sm:py-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#FFFCF7_0%,#FAF8F5_48%,#F1E8DB_100%)]" />
          <div className="absolute left-[-12rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[#D9A46A]/18 blur-3xl" />
          <div className="absolute right-[-13rem] top-[10%] h-[34rem] w-[34rem] rounded-full bg-[#A8B5A2]/22 blur-3xl" />
          <div className="absolute bottom-[-13rem] left-[38%] h-[32rem] w-[32rem] rounded-full bg-[#D9A46A]/14 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-[68rem]">
          <div className="relative mx-auto flex min-h-[calc(100svh-2rem)] flex-col items-center justify-center overflow-hidden rounded-[1.6rem] border border-white/75 bg-[#FFFCF7]/88 px-5 py-8 text-center shadow-[0_34px_90px_rgba(47,58,55,0.16)] backdrop-blur-2xl sm:min-h-[72svh] sm:rounded-[2rem] sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute left-[-4.5rem] top-[-4.5rem] h-36 w-36 rounded-full border border-[#D9A46A]/35 sm:h-56 sm:w-56" />

            <div className="pointer-events-none absolute right-[-5rem] top-[18%] h-48 w-48 rounded-full bg-[#A8B5A2]/16 blur-2xl sm:h-64 sm:w-64" />

            <div className="pointer-events-none absolute bottom-[-5rem] right-[-3rem] h-48 w-48 rounded-full bg-[#D9A46A]/14 blur-2xl sm:h-64 sm:w-64" />

            <div className="relative mx-auto flex w-full max-w-[52rem] flex-col items-center">
              <Image
                src="/langochat-icon.png"
                alt=""
                width={104}
                height={104}
                priority
                className="mb-5 h-20 w-20 object-contain drop-shadow-[0_18px_36px_rgba(47,58,55,0.13)] sm:mb-6 sm:h-24 sm:w-24"
              />

              <p className="text-[0.58rem] font-bold uppercase leading-5 tracking-[0.28em] text-[#D08F43] sm:text-[0.72rem] sm:tracking-[0.40em]">
                COMPRENDRE · DIALOGUER · ACCOMPAGNER
              </p>

              <h1 className="mt-6 font-signature text-[3.35rem] font-medium leading-none tracking-[0.04em] text-[#2F3A37] sm:text-[6.6rem] md:text-[7.4rem]">
                LANGOCHAT
              </h1>

              <div className="mt-5 h-px w-20 bg-[#D9A46A]/60 sm:w-28" />

              <h2 className="mt-7 max-w-[24rem] font-signature text-[2.2rem] font-medium leading-[1.03] tracking-[-0.02em] text-[#2F3A37] sm:max-w-[42rem] sm:text-[3.8rem] md:text-[4.3rem]">
                Parce qu&apos;un
                <br />
                « c&apos;est comme ça »
                <br />
                ne suffit pas toujours.
              </h2>

              <Link
                href="/accueil"
                className="mt-9 inline-flex min-h-12 min-w-[10rem] items-center justify-center rounded-full bg-[#D9A46A] px-9 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(217,164,106,0.28)] transition hover:-translate-y-0.5 hover:bg-[#C98F4F]"
              >
                Entrer
              </Link>

              <p className="mt-8 max-w-[24rem] text-[0.82rem] leading-6 text-langochat-muted/70 sm:max-w-none sm:text-sm">
                Un espace pour comprendre avant de répondre.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}