import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/comprendre", label: "Comprendre" },
  { href: "/faire-le-point", label: "Faire le point" },
  { href: "/comment-en-parler", label: "En parler" },
  { href: "/ressources", label: "Ressources" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-langochat-bg/82 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-18 w-full max-w-7xl flex-col items-center gap-3 px-5 py-4 sm:px-8 lg:h-18 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-0">
        <Link
          href="/accueil"
          className="group flex items-center justify-center gap-2.5"
          aria-label="Accueil LANGOCHAT"
        >
          <Image
            src="/langochat-icon.png"
            alt=""
            width={44}
            height={44}
            priority
            className="h-11 w-11 object-contain transition duration-300 group-hover:scale-105"
          />

          <span className="font-signature text-[1.8rem] font-medium leading-none tracking-[0.12em] text-langochat-ink transition group-hover:text-langochat-ochre">
            LangOchat
          </span>
        </Link>

        <nav
  aria-label="Navigation principale"
  className="flex w-full max-w-full gap-2 overflow-x-auto px-1 pb-2 text-sm font-medium text-langochat-muted lg:w-auto lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
>
  {links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className="shrink-0 rounded-full border border-transparent px-3 py-2 text-[0.88rem] transition hover:border-langochat-line hover:bg-white/60 hover:text-langochat-ink lg:px-0 lg:text-sm lg:hover:border-transparent lg:hover:bg-transparent lg:hover:text-langochat-ochre"
    >
      {link.label}
    </Link>
  ))}

  <Link
    href="/urgence"
    className="shrink-0 rounded-full border border-[#B35050]/20 px-3 py-2 text-[0.88rem] text-[#9F4444] transition hover:bg-[#B35050] hover:text-white lg:text-sm"
  >
    Urgence
  </Link>
</nav>
      </div>

      <div className="h-[2px] w-full bg-[#D9A46A]/45" />
    </header>
  );
}