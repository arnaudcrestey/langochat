import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-langochat-line bg-[#2F3A37] text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {/* GAUCHE */}

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Link
              href="/"
              className="group inline-flex items-center gap-2"
            >
              <Image
                src="/langochat-icon.png"
                alt=""
                width={42}
                height={42}
                className="h-10 w-10 object-contain transition duration-300 group-hover:scale-105"
              />

              <span className="font-signature text-[2rem] leading-none tracking-[0.12em] transition group-hover:text-[#D9A46A]">
                LangOchat
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/76">
              Un espace pour comprendre avant de répondre.
            </p>
          </div>

          {/* CENTRE */}

          <div className="flex justify-center">
            <a
              href="https://www.arnaudcrestey.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition duration-300 hover:scale-105"
            >
              <Image
                src="/signature-ac.png"
                alt="Arnaud Crestey"
                width={140}
                height={140}
                className="h-auto w-[160px] opacity-90 transition hover:scale-105 hover:opacity-100"
              />
            </a>
          </div>

          {/* DROITE */}

          <nav
            aria-label="Liens secondaires"
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/72 lg:justify-end"
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
      </div>
    </footer>
  );
}