export function slugifyTag(tag) {
  return String(tag)
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function uniqueTags(projects) {
  const tagsBySlug = new Map();

  for (const project of projects) {
    for (const tag of project.tags || []) {
      const slug = slugifyTag(tag);
      if (!tagsBySlug.has(slug)) {
        tagsBySlug.set(slug, { slug, label: tag, count: 0 });
      }
      tagsBySlug.get(slug).count += 1;
    }
  }

  return [...tagsBySlug.values()].sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.label.localeCompare(b.label);
  });
}

export function parseTagParam(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}
