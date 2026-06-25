"use client";

import { Github, GitBranch } from "lucide-react";

export function StatusBar({ items, githubUsername }) {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 flex h-[1.625rem] items-center justify-between bg-accent-400 px-2 font-mono text-[11px] text-workbench-950">
      <div className="flex min-w-0 items-center gap-3">
        <span className="inline-flex items-center gap-1">
          <GitBranch size={13} aria-hidden="true" /> main
        </span>
        {items.slice(0, 3).map((item) => (
          <span key={item} className="hidden truncate sm:inline">{item}</span>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="hidden sm:inline">MDX</span>
        <span className="inline-flex items-center gap-1">
          <Github size={13} aria-hidden="true" /> {githubUsername}
        </span>
      </div>
    </footer>
  );
}
