import { getAllProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/metadata";
import { LOCALES, localizePath } from "@/lib/i18n";

export default function sitemap() {
  const now = new Date();
  return LOCALES.flatMap((locale) => [
      {
        url: absoluteUrl(localizePath("/", locale)),
        lastModified: now
      },
      {
        url: absoluteUrl(localizePath("/projects", locale)),
        lastModified: now
      },
      ...getAllProjects(locale).map((project) => ({
        url: absoluteUrl(localizePath(`/projects/${project.slug}`, locale)),
        lastModified: now
      }))
    ]);
}
