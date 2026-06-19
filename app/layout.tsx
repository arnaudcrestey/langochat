import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://langochat.fr"),

  title: {
    default: "LANGOCHAT",
    template: "%s | LANGOCHAT",
  },

  description:
    "Trouver les mots justes. Comprendre avant de répondre. Un espace pensé pour les adultes qui souhaitent dialoguer, accompagner et mieux comprendre certaines situations.",

  keywords: [
    "dialogue",
    "communication",
    "éducation",
    "accompagnement",
    "parents",
    "adolescents",
    "relations",
    "langochat",
  ],

  applicationName: "LANGOCHAT",

  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "LANGOCHAT",
    title: "LANGOCHAT",
    description:
      "Trouver les mots justes. Comprendre avant de répondre.",
  },

  icons: {
    icon: "/langochat-icon.png",
    shortcut: "/langochat-icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-langochat-bg text-langochat-ink antialiased">
        {children}
      </body>
    </html>
  );
}