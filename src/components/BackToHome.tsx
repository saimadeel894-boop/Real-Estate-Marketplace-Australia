import { Link, useRouterState } from "@tanstack/react-router";
import { Home } from "lucide-react";

export function BackToHome() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/") return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
      <Link
        to="/"
        className="inline-flex max-w-full items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-charcoal shadow-soft transition hover:border-primary hover:text-primary sm:gap-2 sm:px-4 sm:py-2 sm:text-eyebrow"
      >
        <Home size={12} aria-hidden="true" className="shrink-0 sm:hidden" />
        <Home size={14} aria-hidden="true" className="hidden shrink-0 sm:block" />
        <span className="truncate">Back to home</span>
      </Link>
    </div>
  );
}
