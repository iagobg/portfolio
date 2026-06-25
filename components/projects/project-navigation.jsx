import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { localizePath } from "@/lib/i18n";

export function ProjectNavigation({ previous, next, locale = "en", t }) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-12 grid gap-3 border-t border-workbench-700 pt-6 md:grid-cols-2" aria-label="Project navigation">
      {previous ? (
        <Link className="rounded border border-workbench-700 bg-workbench-850 p-4 hover:border-accent-500" href={localizePath(`/projects/${previous.slug}`, locale)}>
          <span className="mb-2 flex items-center gap-2 font-mono text-xs text-ink-400">
            <ArrowLeft size={14} aria-hidden="true" /> {t.previous}
          </span>
          <span className="font-semibold text-ink-100">{previous.title}</span>
        </Link>
      ) : <span />}
      {next ? (
        <Link className="rounded border border-workbench-700 bg-workbench-850 p-4 text-right hover:border-accent-500" href={localizePath(`/projects/${next.slug}`, locale)}>
          <span className="mb-2 flex items-center justify-end gap-2 font-mono text-xs text-ink-400">
            {t.next} <ArrowRight size={14} aria-hidden="true" />
          </span>
          <span className="font-semibold text-ink-100">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
