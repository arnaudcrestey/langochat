import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
  children
}: SectionHeaderProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl"
      }
    >
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="section-title mt-4">{title}</h1>
      {text ? (
        <p className="mt-6 text-base leading-8 text-langochat-muted sm:text-lg">
          {text}
        </p>
      ) : null}
      {children}
    </div>
  );
}
