const statusTone = {
  Live: "border-success/50 bg-success/10 text-success",
  "Finishing touches": "border-warning/50 bg-warning/10 text-warning",
  "Ajustes finais": "border-warning/50 bg-warning/10 text-warning",
  "In development": "border-accent-400/50 bg-accent-500/10 text-accent-300",
  "Em desenvolvimento": "border-accent-400/50 bg-accent-500/10 text-accent-300",
  Archived: "border-ink-500 bg-workbench-850 text-ink-300"
};

export function ProjectStatus({ status }) {
  return (
    <span className={`inline-flex items-center rounded border px-2 py-1 font-mono text-xs ${statusTone[status] || statusTone.Archived}`}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}
