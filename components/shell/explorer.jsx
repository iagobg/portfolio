"use client";

import Link from "next/link";
import { ChevronDown, ExternalLink, FileText, Folder, Github } from "lucide-react";
import { useState } from "react";
import { localizePath, stripLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/metadata";

function ExplorerLink({ href, active, children, external, onNavigate }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={[
        "flex min-h-8 items-center gap-2 rounded px-2 py-1 font-mono text-sm transition",
        active
          ? "bg-accent-500/15 text-ink-100 ring-1 ring-inset ring-accent-500/30"
          : "text-ink-300 hover:bg-workbench-800 hover:text-ink-100"
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function FolderGroup({ label, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        className="flex min-h-8 w-full items-center gap-1 rounded px-1 py-1 text-left font-mono text-sm text-ink-200 hover:bg-workbench-800"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <ChevronDown size={15} className={`transition ${open ? "" : "-rotate-90"}`} aria-hidden="true" />
        <Folder size={15} className="text-ink-400" aria-hidden="true" />
        {label}
      </button>
      {open ? <div className="ml-4 border-l border-workbench-700 pl-2">{children}</div> : null}
    </div>
  );
}

export function Explorer({ projects, pathname, onNavigate, locale, t }) {
  const strippedPath = stripLocale(pathname);

  return (
    <aside className="flex h-full flex-col" aria-label="Explorer">
      <div className="flex h-10 items-center justify-between border-b border-workbench-700 px-4">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink-400">{t.explorer}</h2>
      </div>
      <div className="editor-scrollbar flex-1 overflow-y-auto p-3">
        <button
          type="button"
          className="mb-2 flex min-h-8 w-full items-center gap-1 rounded px-1 py-1 text-left font-mono text-sm font-bold text-ink-100"
          aria-expanded="true"
        >
          <ChevronDown size={15} aria-hidden="true" />
          IAGO-BUSSOLETTI
        </button>
        <div className="grid gap-1 pl-4">
          <ExplorerLink href={localizePath("/", locale)} active={strippedPath === "/"} onNavigate={onNavigate}>
            <FileText size={15} className="text-accent-300" aria-hidden="true" />
            README.md
          </ExplorerLink>
          <FolderGroup label="projects">
            <div className="grid gap-1 py-1">
              {projects.map((project) => (
                <ExplorerLink
                  key={project.slug}
                  href={localizePath(`/projects/${project.slug}`, locale)}
                  active={strippedPath === `/projects/${project.slug}`}
                  onNavigate={onNavigate}
                >
                  <FileText size={15} className="text-ink-400" aria-hidden="true" />
                  <span className="truncate">{project.fileName}</span>
                </ExplorerLink>
              ))}
            </div>
          </FolderGroup>
          <ExplorerLink href={localizePath("/projects", locale)} active={strippedPath === "/projects"} onNavigate={onNavigate}>
            <Folder size={15} className="text-ink-400" aria-hidden="true" />
            {t.allProjects}
          </ExplorerLink>
          <ExplorerLink href={siteConfig.githubUrl} external onNavigate={onNavigate}>
            <Github size={15} className="text-ink-400" aria-hidden="true" />
            github
            <ExternalLink size={12} className="ml-auto" aria-hidden="true" />
          </ExplorerLink>
        </div>
      </div>
    </aside>
  );
}
