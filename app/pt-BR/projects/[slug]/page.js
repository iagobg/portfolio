import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import * as runtime from "react/jsx-runtime";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectOutline } from "@/components/content/project-outline";
import { ProjectTag } from "@/components/content/tag";
import { mdxComponents } from "@/components/content/mdx-components";
import { ScreenshotGallery } from "@/components/content/screenshot-gallery";
import { ProjectNavigation } from "@/components/projects/project-navigation";
import { ProjectStatus } from "@/components/projects/project-status";
import { getAdjacentProjects, getAllProjects, getProjectBySlug } from "@/lib/projects";
import { absoluteUrl, projectMetadata } from "@/lib/metadata";
import { dictionary, localizePath } from "@/lib/i18n";

function getHeadings(content) {
  return [...content.matchAll(/^##\s+(.+)$/gm)].map((match) => ({
    text: match[1].trim(),
    id: match[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  }));
}

async function MdxContent({ source }) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm]
  });

  return <Content components={mdxComponents} />;
}

export function generateStaticParams() {
  return getAllProjects("pt-BR").map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "pt-BR");
  if (!project) return {};
  return projectMetadata(project, `/pt-BR/projects/${project.slug}`);
}

export default async function ProjectPagePtBr({ params }) {
  const { slug } = await params;
  const locale = "pt-BR";
  const t = dictionary(locale);
  const project = getProjectBySlug(slug, locale);
  if (!project) notFound();

  const headings = getHeadings(project.content);
  const { previous, next } = getAdjacentProjects(project.slug, locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    url: absoluteUrl(`/pt-BR/projects/${project.slug}`),
    dateCreated: String(project.year),
    keywords: project.tags.join(", "),
    creator: {
      "@type": "Person",
      name: "Iago Bussoletti"
    }
  };

  return (
    <article className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-w-0">
        <Link href={localizePath("/projects", locale)} className="font-mono text-sm text-accent-300 hover:text-accent-400">
          {t.backProjects}
        </Link>
        <header className="mt-4 border-b border-workbench-700 pb-7">
          <p className="mb-3 font-mono text-sm text-accent-300">{project.fileName}</p>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-ink-100">{project.title}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-200">{project.shortDescription}</p>
            </div>
            <ProjectStatus status={project.status} />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <ProjectTag key={tag} tag={tag} locale={locale} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-sm text-ink-300">
            <span>{project.year}</span>
            <span aria-hidden="true">/</span>
            <span>{project.summary.role}</span>
            {project.repositoryUrl ? (
              <Link href={project.repositoryUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent-300 hover:text-accent-400">
                <Github size={15} aria-hidden="true" /> {t.source}
              </Link>
            ) : null}
            {project.liveUrl ? (
              <Link href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent-300 hover:text-accent-400">
                {t.live} <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            ) : (
              <span className="text-ink-400">{t.deploymentSoon}</span>
            )}
          </div>
        </header>

        {project.coverImage ? (
          <div className="my-8 overflow-hidden rounded border border-workbench-700 bg-workbench-900">
            <Image src={project.coverImage} alt="" width={1200} height={720} priority className="h-auto w-full" />
          </div>
        ) : null}

        <div className="mdx-content">
          <MdxContent source={project.content} />
        </div>

        <ScreenshotGallery screenshots={project.screenshots} title={t.screenshots} />
        <ProjectNavigation previous={previous} next={next} locale={locale} t={t} />
      </div>
      <ProjectOutline headings={headings} title={t.outline} />
    </article>
  );
}
