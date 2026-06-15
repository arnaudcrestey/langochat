import Link from "next/link";

const links = [
  { href: "/comprendre", label: "Comprendre" },
  { href: "/faire-le-point", label: "Faire le point" },
  { href: "/comment-en-parler", label: "En parler" },
  { href: "/ressources", label: "Ressources" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-langochat-line bg-langochat-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8 lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-0">
        <Link
          href="/accueil"
          className="font-signature text-[1.9rem] font-medium leading-none tracking-[0.1em] text-langochat-ink transition hover:text-langochat-green"
          aria-label="Accueil LANGOCHAT"
        >
          LANGOCHAT
        </Link>

        <nav
          aria-label="Navigation principale"
          className="flex gap-2 overflow-x-auto pb-1 text-sm font-medium text-langochat-muted lg:gap-7 lg:overflow-visible lg:pb-0"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full border border-transparent px-3 py-2 transition hover:border-langochat-line hover:bg-white/64 hover:text-langochat-ink lg:px-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/urgence"
            className="shrink-0 rounded-full border border-[#B35050]/20 px-3 py-2 text-[#9F4444] transition hover:bg-[#B35050] hover:text-white"
          >
            Urgence
          </Link>
        </nav>
      </div>
    </header>
  );
}
