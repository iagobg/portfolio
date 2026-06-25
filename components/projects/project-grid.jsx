import { ProjectCard } from "@/components/projects/project-card";

export function ProjectGrid({ projects, locale = "en", t }) {
  if (!projects.length) {
    return (
      <div className="rounded border border-workbench-700 bg-workbench-850 p-8">
        <p className="font-mono text-sm text-ink-300">{t.noProjects}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} locale={locale} t={t} />
      ))}
    </div>
  );
}
