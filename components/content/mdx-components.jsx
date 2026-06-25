function idFromChildren(children) {
  return String(children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function Callout({ title = "Note", children }) {
  return (
    <aside className="my-6 max-w-3xl border-l-4 border-accent-400 bg-workbench-850 p-4">
      <p className="mb-2 font-mono text-xs uppercase tracking-wide text-accent-300">{title}</p>
      <div className="text-ink-200">{children}</div>
    </aside>
  );
}

export function Decision({ title = "Decision", children }) {
  return (
    <aside className="my-6 max-w-3xl border border-accent-500/40 bg-accent-500/10 p-4">
      <p className="mb-2 font-mono text-xs uppercase tracking-wide text-accent-300">{title}</p>
      <div className="text-ink-200">{children}</div>
    </aside>
  );
}

export function Limitation({ title = "Limitation", children }) {
  return (
    <aside className="my-6 max-w-3xl border border-warning/45 bg-warning/10 p-4">
      <p className="mb-2 font-mono text-xs uppercase tracking-wide text-warning">{title}</p>
      <div className="text-ink-200">{children}</div>
    </aside>
  );
}

export const mdxComponents = {
  h2: ({ children }) => <h2 id={idFromChildren(children)}>{children}</h2>,
  h3: ({ children }) => <h3 id={idFromChildren(children)}>{children}</h3>,
  Callout,
  Decision,
  Limitation
};
