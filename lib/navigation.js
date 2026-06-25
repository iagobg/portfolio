import { dictionary, localizePath, stripLocale } from "@/lib/i18n";

export function routeInfo(pathname, projects, locale = "en") {
  const strippedPath = stripLocale(pathname);
  const project = projects.find((item) => strippedPath === `/projects/${item.slug}`);

  if (project) {
    return {
      section: "Project",
      title: `${project.fileName} - Iago Bussoletti`,
      tab: project.fileName,
      breadcrumbs: [
        { label: "portfolio", href: localizePath("/", locale) },
        { label: "projects", href: localizePath("/projects", locale) },
        { label: project.fileName, href: localizePath(`/projects/${project.slug}`, locale) }
      ],
      status: [project.title, project.status, String(project.year), project.tags[0]].filter(Boolean)
    };
  }

  if (strippedPath.startsWith("/projects")) {
    return {
      section: "Projects",
      title: "projects - Iago Bussoletti",
      tab: "projects",
      breadcrumbs: [
        { label: "portfolio", href: localizePath("/", locale) },
        { label: "projects", href: localizePath("/projects", locale) }
      ],
      status: ["projects", `${projects.length} projects`, "MDX", "filters"]
    };
  }

  return {
    section: "Home",
    title: "README.md - Iago Bussoletti",
    tab: "README.md",
      breadcrumbs: [
      { label: "portfolio", href: localizePath("/", locale) },
      { label: "README.md", href: localizePath("/", locale) }
    ],
    status: ["main", `${projects.length} projects`, "Next.js", "MDX"]
  };
}
