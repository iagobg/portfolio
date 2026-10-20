import Link from "next/link";
import { notFound } from "next/navigation";
import { evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import * as runtime from "react/jsx-runtime";
import { ProjectBrief } from "./project-brief";
import { ProjectPreview } from "./project-preview";
import { CaseWorkspace } from "./case-workspace";
import { mdxComponents } from "./mdx-components";
import { ProjectTag } from "./tag";
import { ProjectLinks } from "@/components/projects/project-links";
import { ProjectNavigation } from "@/components/projects/project-navigation";
import { ProjectStatus } from "@/components/projects/project-status";
import { getAdjacentProjects, getProjectBySlug } from "@/lib/projects";
import { absoluteUrl } from "@/lib/metadata";
import { dictionary, localizePath } from "@/lib/i18n";
import { projectHeadings } from "@/lib/headings.mjs";

export async function ProjectPage({ slug, locale }) {
  const project = getProjectBySlug(slug, locale);
  if (!project) notFound();
  const t = dictionary(locale);
  const headings = projectHeadings(project.content);
  const { previous, next } = getAdjacentProjects(slug, locale);
  const { default: Content } = await evaluate(project.content, { ...runtime, remarkPlugins: [remarkGfm] });
  const data = { "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.shortDescription,
    url: absoluteUrl(localizePath(`/projects/${slug}`, locale)), dateCreated: String(project.year),
    creator: { "@type": "Person", name: "Iago Bussoletti" } };
  const { content, ...previewProject } = project;
  return (
    <article className="project-page mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8" lang={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
      <Link href={localizePath("/projects", locale)} className="font-mono text-xs text-accent-300 hover:underline">{t.backProjects}</Link>
      <header className="mb-7 mt-6">
        <div className="mb-4 flex flex-wrap items-center gap-3"><span className="font-mono text-xs text-ink-300">{project.fileName}</span><ProjectStatus status={project.status} /></div>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-200">{project.shortDescription}</p>
        <div className="mt-5 flex flex-wrap gap-2">{project.tags.slice(0, 4).map((tag) => <ProjectTag key={tag} tag={tag} locale={locale} />)}</div>
        <ProjectLinks project={project} t={t} />
      </header>
      <CaseWorkspace key={slug} locale={locale} preview={<ProjectPreview project={previewProject} locale={locale} />}>
        <ProjectBrief project={project} t={t} />
        <details className="mb-7 rounded border border-workbench-700 bg-workbench-900 p-4">
          <summary className="cursor-pointer font-mono text-xs text-accent-300">{t.outline} · {headings.length}</summary>
          <nav className="mt-4 grid gap-3" aria-label={t.outline}>{headings.map((h) => <a className="text-sm text-ink-200 hover:text-accent-300" key={h.id} href={`#${h.id}`}>{h.text}</a>)}</nav>
        </details>
        <div className="mdx-content"><Content components={mdxComponents} /></div>
      </CaseWorkspace>
      <ProjectNavigation previous={previous} next={next} locale={locale} t={t} />
    </article>
  );
}
