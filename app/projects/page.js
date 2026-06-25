import { Suspense } from "react";
import { ProjectArchive } from "@/components/projects/project-archive";
import { getAllProjects } from "@/lib/projects";
import { uniqueTags } from "@/lib/tags";
import { absoluteUrl } from "@/lib/metadata";
import { dictionary } from "@/lib/i18n";

export const metadata = {
  title: "projects - Iago Bussoletti",
  description: "Browse Iago Bussoletti's web-development projects by search query and free-form technology tags.",
  alternates: {
    canonical: absoluteUrl("/projects")
  }
};

function projectListItem(project) {
  const metadata = { ...project };
  delete metadata.content;
  return metadata;
}

export default function ProjectsPage() {
  const locale = "en";
  const t = dictionary(locale);
  const projects = getAllProjects(locale).map(projectListItem);
  const tags = uniqueTags(projects);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <p className="mb-2 font-mono text-sm text-accent-300">projects</p>
        <h1 className="text-3xl font-bold text-ink-100">{t.projectArchive}</h1>
        <p className="mt-3 max-w-3xl text-ink-300">
          {t.projectArchiveIntro}
        </p>
      </header>
      <Suspense fallback={<div className="rounded border border-workbench-700 bg-workbench-850 p-8" />}>
        <ProjectArchive projects={projects} tags={tags} locale={locale} />
      </Suspense>
    </div>
  );
}
