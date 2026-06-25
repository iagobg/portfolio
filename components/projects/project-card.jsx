import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectTag } from "@/components/content/tag";
import { ProjectStatus } from "@/components/projects/project-status";
import { localizePath } from "@/lib/i18n";

export function ProjectCard({ project, locale = "en", t }) {
  const visibleTags = project.tags.slice(0, 4);
  const hiddenCount = project.tags.length - visibleTags.length;
  const href = localizePath(`/projects/${project.slug}`, locale);

  return (
    <article className="group grid overflow-hidden rounded border border-workbench-700 bg-workbench-850 transition hover:border-accent-500/70 md:grid-cols-[220px_1fr]">
      <Link href={href} className="relative block min-h-44 overflow-hidden bg-workbench-900">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt=""
            width={1200}
            height={720}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="h-full w-full bg-workbench-900" />
        )}
        <span className="absolute left-0 top-0 h-full w-1 bg-accent-500 opacity-0 transition group-hover:opacity-100" />
      </Link>
      <div className="flex min-w-0 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-2 font-mono text-xs text-ink-400">{project.fileName}</p>
            <h2 className="font-sans text-xl font-bold text-ink-100">
              <Link href={href} className="hover:text-accent-300">
                {project.title}
              </Link>
            </h2>
          </div>
          <ProjectStatus status={project.status} />
        </div>
        <p className="max-w-2xl text-sm leading-6 text-ink-200">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <ProjectTag key={tag} tag={tag} locale={locale} />
          ))}
          {hiddenCount > 0 ? (
            <span className="inline-flex min-h-7 items-center rounded border border-workbench-700 px-2.5 py-1 font-mono text-xs text-ink-300">
              +{hiddenCount}
            </span>
          ) : null}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-3 font-mono text-xs text-ink-300">
          <span>{project.year}</span>
          <span aria-hidden="true">/</span>
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-accent-300 hover:text-accent-400"
          >
            {t.openCaseStudy} <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          {project.repositoryUrl ? (
            <Link
              href={project.repositoryUrl}
              className="inline-flex items-center gap-1 hover:text-accent-300"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={14} aria-hidden="true" /> {t.source}
            </Link>
          ) : null}
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              className="inline-flex items-center gap-1 hover:text-accent-300"
              target="_blank"
              rel="noreferrer"
            >
              {t.live} <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          ) : (
            <span className="text-ink-400">{t.deploymentSoon}</span>
          )}
        </div>
      </div>
    </article>
  );
}
