import fs from "node:fs";
import path from "node:path";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { slugifyTag } from "@/lib/tags";
export { filterProjects } from "@/lib/project-filtering";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const LOCALE_DIRS = {
  en: PROJECTS_DIR,
  "pt-BR": path.join(PROJECTS_DIR, "pt-BR")
};
const projectCache = new Map();

const REQUIRED_FIELDS = [
  "slug",
  "fileName",
  "title",
  "shortDescription",
  "year",
  "status",
  "tags",
  "summary"
];

function scalar(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "\"\"" || trimmed === "''") return "";
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed);
  return trimmed.replace(/^["']|["']$/g, "");
}

function setNested(target, pathParts, value) {
  let cursor = target;
  pathParts.forEach((part, index) => {
    if (index === pathParts.length - 1) {
      cursor[part] = value;
    } else {
      cursor[part] = cursor[part] || {};
      cursor = cursor[part];
    }
  });
}

function parseFrontmatter(source, filePath) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`${filePath} must begin with YAML-style frontmatter`);
  }

  const data = {};
  const lines = match[1].split("\n");
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const keyMatch = line.match(/^([A-Za-z0-9_]+):(?:\s*(.*))?$/);
    if (!keyMatch) {
      throw new Error(`${filePath} has unsupported frontmatter line: ${line}`);
    }

    const [, key, rawValue = ""] = keyMatch;
    if (rawValue.trim()) {
      data[key] = scalar(rawValue);
      index += 1;
      continue;
    }

    const next = lines[index + 1] || "";
    if (next.startsWith("  - ")) {
      const items = [];
      index += 1;
      while (index < lines.length && lines[index].startsWith("  - ")) {
        const first = lines[index].slice(4);
        if (first.includes(":")) {
          const item = {};
          const [itemKey, itemValue] = first.split(/:\s*/, 2);
          item[itemKey] = scalar(itemValue || "");
          index += 1;
          while (index < lines.length && lines[index].startsWith("    ")) {
            const nested = lines[index].trim();
            const [nestedKey, nestedValue] = nested.split(/:\s*/, 2);
            item[nestedKey] = scalar(nestedValue || "");
            index += 1;
          }
          items.push(item);
        } else {
          items.push(scalar(first));
          index += 1;
        }
      }
      data[key] = items;
      continue;
    }

    if (next.startsWith("  ")) {
      data[key] = {};
      index += 1;
      while (index < lines.length && lines[index].startsWith("  ")) {
        const nested = lines[index].trim();
        const nestedMatch = nested.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
        if (!nestedMatch) {
          throw new Error(`${filePath} has unsupported nested frontmatter line: ${nested}`);
        }
        setNested(data[key], [nestedMatch[1]], scalar(nestedMatch[2]));
        index += 1;
      }
      continue;
    }

    data[key] = "";
    index += 1;
  }

  return { data, content: match[2] };
}

function validateProject(project, filePath) {
  const missing = REQUIRED_FIELDS.filter((field) => project[field] === undefined);

  if (missing.length > 0) {
    throw new Error(`${filePath} is missing required frontmatter: ${missing.join(", ")}`);
  }

  if (!Array.isArray(project.tags)) {
    throw new Error(`${filePath} frontmatter field "tags" must be an array`);
  }
}

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
  return `${locale === DEFAULT_LOCALE ? "" : `/${locale}`}/projects/${project.slug}`;
}
