import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-langochat-line bg-[#8D9A84] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-9 sm:px-8 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_auto] lg:px-10">
        <div>
          <Link
            href="/accueil"
            className="font-signature text-[2rem] leading-none tracking-[0.12em] transition hover:text-white/80"
          >
            LANGOCHAT
          </Link>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/84">
            Comprendre avant d&apos;agir, dialoguer sans brusquer, accompagner
            avec intelligence.
          </p>
        </div>

        <nav
          aria-label="Liens secondaires"
          className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/84 lg:justify-end"
        >
          <Link href="/apropos" className="hover:text-white">
            À propos
          </Link>
          <Link href="/confidentialite" className="hover:text-white">
            Confidentialité
          </Link>
          <Link href="/mentions-legales" className="hover:text-white">
            Mentions légales
          </Link>
        </nav>
      </div>
    </footer>
  );
}
