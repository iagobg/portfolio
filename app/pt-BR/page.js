import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { ProjectGrid } from "@/components/projects/project-grid";
import { getFeaturedProjects } from "@/lib/projects";
import { siteConfig, absoluteUrl } from "@/lib/metadata";
import { dictionary, localizePath } from "@/lib/i18n";

export const metadata = {
  title: "README.md - Iago Bussoletti",
  description:
    "Desenvolvedor de software criando aplicações em tempo real, sistemas backend e produtos práticos assistidos por IA.",
  alternates: {
    canonical: absoluteUrl("/pt-BR")
  }
};

export default function HomePagePtBr() {
  const locale = "pt-BR";
  const t = dictionary(locale);
  const projects = getFeaturedProjects(locale);

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <header className="border-b border-workbench-700 pb-8">
        <p className="mb-3 font-mono text-sm text-accent-300">README.md</p>
        <h1 className="max-w-4xl font-sans text-4xl font-bold leading-tight text-ink-100 sm:text-5xl">
          Iago Bussoletti
        </h1>
        <p className="mt-4 max-w-3xl text-xl leading-8 text-ink-200">{t.heroCopy}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={localizePath("/projects", locale)}
            className="inline-flex items-center gap-2 rounded bg-accent-400 px-4 py-2 font-mono text-sm font-semibold text-workbench-950 hover:bg-accent-300"
          >
            {t.viewProjects} <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded border border-workbench-600 px-4 py-2 font-mono text-sm text-ink-100 hover:border-accent-500 hover:text-accent-300"
          >
            <Github size={16} aria-hidden="true" /> GitHub
          </Link>
        </div>
      </header>

      <section className="grid gap-4 border-b border-workbench-700 py-8 md:grid-cols-3" aria-labelledby="focus-heading">
        <h2 id="focus-heading" className="sr-only">{t.technicalFocus}</h2>
        {t.focusCards.map(([number, title, copy]) => (
          <div key={title} className="rounded border border-workbench-700 bg-workbench-850 p-4">
            <p className="font-mono text-xs text-accent-300">{number}</p>
            <h3 className="mt-3 font-semibold text-ink-100">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-300">{copy}</p>
          </div>
        ))}
      </section>

      <section className="py-8" aria-labelledby="featured-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-ink-400">workspace/projects</p>
            <h2 id="featured-heading" className="mt-2 text-2xl font-bold text-ink-100">{t.featuredProjects}</h2>
          </div>
          <Link href={localizePath("/projects", locale)} className="font-mono text-sm text-accent-300 hover:text-accent-400">
            {t.openArchive}
          </Link>
        </div>
        <ProjectGrid projects={projects} locale={locale} t={t} />
      </section>

      <section className="rounded border border-workbench-700 bg-workbench-850 p-5">
        <p className="font-mono text-xs uppercase tracking-wide text-accent-300">{t.nextStep}</p>
        <p className="mt-2 max-w-3xl text-ink-200">{t.mdxAddCopy}</p>
      </section>
    </article>
  );
}
