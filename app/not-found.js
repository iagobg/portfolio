import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-3 font-mono text-sm text-rose">unresolved-file</p>
      <h1 className="text-3xl font-bold text-ink-100">Project not found</h1>
      <p className="mt-3 text-ink-300">
        This route does not match a project MDX file or portfolio page.
      </p>
      <Link href="/pt-BR/projects" className="mt-6 inline-flex rounded bg-accent-400 px-4 py-2 font-mono text-sm font-semibold text-workbench-950 hover:bg-accent-300">
        Back to projects
      </Link>
    </main>
  );
}
