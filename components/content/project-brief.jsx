function SummaryPanel({ label, children }) {
  if (!children) return null;

  return (
    <div className="border border-workbench-700 bg-workbench-850 p-4">
      <p className="font-mono text-xs uppercase tracking-wide text-accent-300">{label}</p>
      <p className="mt-2 text-sm leading-6 text-ink-200">{children}</p>
    </div>
  );
}

const techMarks = {
  "Elixir": { label: "EX", className: "border-purple-300/50 bg-purple-400/10 text-purple-200" },
  "Phoenix LiveView": { label: "PH", className: "border-orange-300/50 bg-orange-400/10 text-orange-200" },
  "Tailwind CSS": { label: "TW", className: "border-cyan-300/50 bg-cyan-400/10 text-cyan-200" },
  "Docker": { label: "DK", className: "border-sky-300/50 bg-sky-400/10 text-sky-200" },
  "Go": { label: "GO", className: "border-cyan-300/50 bg-cyan-400/10 text-cyan-200" },
  "Templ": { label: "TP", className: "border-ink-300/50 bg-ink-300/10 text-ink-100" },
  "HTMX": { label: "HX", className: "border-blue-300/50 bg-blue-400/10 text-blue-200" },
  "LLM": { label: "AI", className: "border-accent-300/50 bg-accent-500/10 text-accent-300" },
  "Next.js": { label: "NX", className: "border-ink-300/50 bg-ink-300/10 text-ink-100" },
  "MDX": { label: "MD", className: "border-yellow-300/50 bg-yellow-400/10 text-yellow-200" }
};

function fallbackMark(name) {
  return String(name)
    .split(/\s|\.|-/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function TechItem({ name }) {
  const mark = techMarks[name] || {
    label: fallbackMark(name),
    className: "border-workbench-600 bg-workbench-900 text-ink-200"
  };

  return (
    <li className="flex min-h-12 items-center gap-3 border border-workbench-700 bg-workbench-900 px-3 py-2">
      <span className={`grid h-8 w-8 shrink-0 place-items-center border font-mono text-[11px] font-bold ${mark.className}`} aria-hidden="true">
        {mark.label}
      </span>
      <span className="font-mono text-sm text-ink-100">{name}</span>
    </li>
  );
}

export function ProjectBrief({ project, t }) {
  const outcomes = Array.isArray(project.outcomes) ? project.outcomes : [];
  const techStack = Array.isArray(project.techStack) ? project.techStack : [];

  return (
    <section className="my-8 border-y border-workbench-700 py-6" aria-labelledby="case-brief-heading">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-ink-400">workspace/case</p>
          <h2 id="case-brief-heading" className="mt-2 text-2xl font-bold text-ink-100">{t.caseBrief}</h2>
        </div>
        <p className="font-mono text-xs text-ink-500">{project.fileName}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <SummaryPanel label={t.problem}>{project.summary?.problem}</SummaryPanel>
        <SummaryPanel label={t.solution}>{project.summary?.solution}</SummaryPanel>
      </div>

      {(outcomes.length > 0 || techStack.length > 0) ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          {outcomes.length > 0 ? (
            <div className="border border-workbench-700 bg-workbench-850 p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-accent-300">{t.outcomes}</p>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink-200">
                {outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" aria-hidden="true" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {techStack.length > 0 ? (
            <div className="border border-workbench-700 bg-workbench-850 p-4">
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-accent-300">{t.stack}</p>
              <ul className="grid gap-2">
                {techStack.map((name) => (
                  <TechItem key={name} name={name} />
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
