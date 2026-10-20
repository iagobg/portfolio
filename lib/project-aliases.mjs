export const projectAliases = {
  "go-application": "futemon",
  "laptop-recommendation-engine": "sugereai"
};

export function canonicalProjectSlug(slug) {
  return projectAliases[slug] || slug;
}

export function projectRedirects() {
  return Object.entries(projectAliases).flatMap(([oldSlug, slug]) =>
    ["", "/en", "/pt-BR"].map((prefix) => ({
      source: `${prefix}/projects/${oldSlug}`,
      destination: `${prefix || "/pt-BR"}/projects/${slug}`,
      permanent: true
    }))
  );
}
