import Link from "next/link";
import { ArrowUpRight, Github, RadioTower } from "lucide-react";

function projectUrl(value) {
  return typeof value === "string" ? value.trim() : "";
}

function linkItems(project, t) {
  const repositoryUrl = projectUrl(project.repositoryUrl);
  const liveUrl = projectUrl(project.liveUrl);

  return [
    repositoryUrl
      ? {
          href: repositoryUrl,
          label: t.source,
          detail: "github",
          Icon: Github
        }
      : null,
    liveUrl
      ? {
          href: liveUrl,
          label: t.liveDeployment,
          detail: "https",
          Icon: RadioTower
        }
      : null
  ].filter(Boolean);
}

export function ProjectLinks({ project, t, variant = "default" }) {
  const items = linkItems(project, t);

  if (items.length === 0) return null;

  if (variant === "compact") {
    return (
      <section className="border-t border-workbench-700 pt-3" aria-label={t.projectLinks}>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-ink-500">{t.projectLinks}</p>
        <div className="flex flex-wrap gap-2">
          {items.map(({ href, label, detail, Icon }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-8 items-center gap-2 rounded border border-workbench-600 bg-workbench-900 px-2.5 py-1.5 font-mono text-xs text-ink-200 hover:border-accent-500 hover:text-accent-300"
            >
              <Icon size={14} className="text-accent-300" aria-hidden="true" />
              <span>{label}</span>
              <span className="text-ink-500">{detail}</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-6 border-t border-workbench-700 pt-5" aria-label={t.projectLinks}>
      <p className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-500">{t.projectLinks}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(({ href, label, detail, Icon }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group flex min-h-16 items-center justify-between gap-3 rounded border border-workbench-700 bg-workbench-850 px-4 py-3 hover:border-accent-500"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded border border-workbench-600 bg-workbench-900 text-accent-300 group-hover:border-accent-500">
                <Icon size={17} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-sm text-ink-100">{label}</span>
                <span className="block truncate font-mono text-xs text-ink-500">{detail}</span>
              </span>
            </span>
            <ArrowUpRight size={16} className="shrink-0 text-ink-400 group-hover:text-accent-300" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
