import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InfoCardProps = {
  title: string;
  text?: string;
  children?: ReactNode;
  className?: string;
};

export function InfoCard({ title, text, children, className }: InfoCardProps) {
  return (
    <article className={cn("premium-card", className)}>
      <h2 className="font-display text-xl font-medium leading-snug text-langochat-ink">
        {title}
      </h2>
      {text ? (
        <p className="mt-4 text-sm leading-7 text-langochat-muted">{text}</p>
      ) : null}
      {children ? <div className="mt-5">{children}</div> : null}
    </article>
  );
}
