export function ProjectBrief({ project, t }) {
  return (
    <section className="mb-9 border-b border-workbench-700 pb-8" aria-labelledby="case-brief-heading">
      <h2 id="case-brief-heading" className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-300">{t.caseBrief}</h2>
      <dl className="grid gap-5">
        {[[t.problem, project.summary?.problem], [t.solution, project.summary?.solution], [t.role, project.summary?.role]].filter(([, value]) => value).map(([label, value]) => (
          <div key={label}><dt className="mb-1 text-sm font-semibold text-ink-100">{label}</dt><dd className="text-sm leading-7 text-ink-200">{value}</dd></div>
        ))}
      </dl>
      {!!project.outcomes?.length && <div className="mt-6 border-l-2 border-accent-400 pl-4">
        <p className="mb-3 font-mono text-xs uppercase tracking-wide text-accent-300">{t.outcomes}</p>
        <ul className="grid list-disc gap-2 pl-4 text-sm leading-6 text-ink-200">{project.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>}
      <div className="mt-6 flex flex-wrap gap-2" aria-label={t.stack}>
        {(project.techStack || []).map((name) => <span key={name} className="rounded bg-workbench-800 px-2 py-1 font-mono text-xs text-ink-200">{name}</span>)}
      </div>
    </section>
  );
}
