import { redirect } from "next/navigation";

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  redirect(`/pt-BR/projects/${slug}`);
}
