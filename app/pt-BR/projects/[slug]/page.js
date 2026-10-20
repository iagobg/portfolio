import { ProjectPage } from "@/components/content/project-page";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { projectMetadata } from "@/lib/metadata";
export function generateStaticParams() { return getAllProjects("pt-BR").map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "pt-BR");
  return project ? projectMetadata(project, `/pt-BR/projects/${slug}`) : {};
}
export default async function Page({ params }) {
  const { slug } = await params;
  return <ProjectPage slug={slug} locale="pt-BR" />;
}
