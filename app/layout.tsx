import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LANGOCHAT - Comprendre, dialoguer, accompagner",
    template: "%s | LANGOCHAT",
  },
  description:
    "LANGOCHAT aide les adultes à mieux comprendre certaines situations, ouvrir le dialogue et accompagner avec justesse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
