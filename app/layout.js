import "@/app/globals.css";
import { PortfolioShell } from "@/components/shell/portfolio-shell";
import { getAllProjects } from "@/lib/projects";
import { uniqueTags } from "@/lib/tags";
import { absoluteUrl, siteConfig } from "@/lib/metadata";
import { LOCALES } from "@/lib/i18n";

function shellProject(project) {
  const metadata = { ...project };
  delete metadata.content;
  return metadata;
}

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s"
  },
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/")
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  }
};

export default function RootLayout({ children }) {
  const projectsByLocale = Object.fromEntries(
    LOCALES.map((locale) => [locale, getAllProjects(locale)])
  );
  const shellProjectsByLocale = Object.fromEntries(
    LOCALES.map((locale) => [
      locale,
      projectsByLocale[locale].map(shellProject)
    ])
  );
  shellProjectsByLocale.tagsByLocale = Object.fromEntries(
    LOCALES.map((locale) => [locale, uniqueTags(shellProjectsByLocale[locale])])
  );

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: [siteConfig.githubUrl],
      jobTitle: "Software developer"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.title,
      url: siteConfig.url,
      description: siteConfig.description
    }
  ];

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <PortfolioShell projectsByLocale={shellProjectsByLocale}>
          {children}
        </PortfolioShell>
      </body>
    </html>
  );
}
