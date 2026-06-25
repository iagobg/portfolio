import { slugifyTag } from "@/lib/tags";

export function filterProjects(projects, { query = "", tags = [] } = {}) {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedTags = tags.map(slugifyTag);

  return projects.filter((project) => {
    const haystack = [
      project.title,
      project.shortDescription,
      project.summary?.problem,
      project.summary?.solution,
      project.summary?.role,
      ...(project.tags || [])
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
    const matchesTags =
      normalizedTags.length === 0 ||
      normalizedTags.every((tag) => project.tagSlugs.includes(tag));

    return matchesQuery && matchesTags;
  });
}
