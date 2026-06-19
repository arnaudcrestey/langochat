import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-langochat-bg text-langochat-ink">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-langochat-ochre/15 blur-3xl" />
        <div className="absolute right-[-8rem] top-[6rem] h-[32rem] w-[32rem] rounded-full bg-langochat-sage/20 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[45%] h-[34rem] w-[34rem] rounded-full bg-langochat-ochre/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}