import { parseFrontmatter, validateProject } from "./project-content.mjs";
import fs from "node:fs";
import path from "node:path";
import { DEFAULT_LOCALE, localizePath } from "@/lib/i18n";
import { slugifyTag } from "@/lib/tags";
export { filterProjects } from "@/lib/project-filtering";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const LOCALE_DIRS = {
  en: PROJECTS_DIR,
  "pt-BR": path.join(PROJECTS_DIR, "pt-BR")
};
const projectCache = new Map();

function projectDir(locale = DEFAULT_LOCALE) {
  return LOCALE_DIRS[locale] || LOCALE_DIRS[DEFAULT_LOCALE];
}

function projectSnapshot(locale = DEFAULT_LOCALE) {
  const dir = projectDir(locale);
  const files = fs
    .readdirSync(dir)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .sort();
  const signature = files
    .map((fileName) => {
      const filePath = path.join(dir, fileName);
      return `${fileName}:${fs.statSync(filePath).mtimeMs}`;
    })
    .join("|");

  return { files, signature };
}

function readProjectFile(fileName, locale = DEFAULT_LOCALE) {
  const filePath = path.join(projectDir(locale), fileName);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseFrontmatter(source, filePath);
  const project = {
    ...data,
    content,
    fileName: data.fileName || fileName,
    locale,
    tagSlugs: (data.tags || []).map(slugifyTag)
  };

  validateProject(project, filePath);
  return project;
}

export function getAllProjects(locale = DEFAULT_LOCALE) {
  const { files, signature } = projectSnapshot(locale);
  const cached = projectCache.get(locale);
  if (cached?.signature === signature) return cached.projects;

  const projects = files
    .map((fileName) => readProjectFile(fileName, locale))
    .sort((a, b) => {
      if ((a.order ?? 999) !== (b.order ?? 999)) return (a.order ?? 999) - (b.order ?? 999);
      if (Number(b.featured) !== Number(a.featured)) return Number(b.featured) - Number(a.featured);
      if (b.year !== a.year) return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

  projectCache.set(locale, { signature, projects });
  return projects;
}

export function getFeaturedProjects(locale = DEFAULT_LOCALE) {
  return getAllProjects(locale).filter((project) => project.featured);
}

export function getProjectBySlug(slug, locale = DEFAULT_LOCALE) {
  return getAllProjects(locale).find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug, locale = DEFAULT_LOCALE) {
  const projects = getAllProjects(locale);
  const index = projects.findIndex((project) => project.slug === slug);

  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : null
  };
}

export function projectHref(project, locale = DEFAULT_LOCALE) {
  return localizePath(`/projects/${project.slug}`, locale);
}
