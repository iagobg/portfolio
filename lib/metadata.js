export const siteConfig = {
  name: "Iago Bussoletti",
  title: "Iago Bussoletti - Web Developer Portfolio",
  description:
    "Software developer building real-time applications, backend systems, and practical AI-assisted products.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  githubUrl: "https://github.com/iagobg",
  githubUsername: "iagobg"
};

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, siteConfig.url).toString();
}

export function projectMetadata(project, pathname = `/en/projects/${project.slug}`) {
  return {
    title: `${project.title} - Iago Bussoletti`,
    description: project.shortDescription,
    alternates: {
      canonical: absoluteUrl(pathname)
    },
    openGraph: {
      title: `${project.title} - Iago Bussoletti`,
      description: project.shortDescription,
      url: absoluteUrl(pathname),
      type: "article",
      images: project.coverImage ? [{ url: project.coverImage, alt: project.title }] : []
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Iago Bussoletti`,
      description: project.shortDescription,
      images: project.coverImage ? [project.coverImage] : []
    }
  };
}
