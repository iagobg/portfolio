"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, FileText, Github, Search, Tag } from "lucide-react";
import { localizePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/metadata";

export function CommandPalette({ open, onClose, projects, tags, locale, t }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function onKeyDown(event) {
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && key === "k") {
        event.preventDefault();
        if (open) onClose();
      }
      if (open && event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const commands = useMemo(() => {
    const base = [
      { label: t.commands.goHome, detail: "README.md", href: localizePath("/", locale), icon: FileText },
      { label: t.commands.viewAllProjects, detail: "projects", href: localizePath("/projects", locale), icon: Search },
      { label: t.commands.openGithub, detail: siteConfig.githubUrl, href: siteConfig.githubUrl, external: true, icon: Github }
    ];
    const projectCommands = projects.map((project) => ({
      label: t.commands.openProject(project.title),
      detail: project.fileName,
      href: localizePath(`/projects/${project.slug}`, locale),
      icon: FileText
    }));
    const tagCommands = tags.map((tag) => ({
      label: t.commands.filterBy(tag.label),
      detail: `${tag.count} project${tag.count === 1 ? "" : "s"}`,
      href: `${localizePath("/projects", locale)}?tags=${tag.slug}`,
      icon: Tag
    }));

    return [...base, ...projectCommands, ...tagCommands];
  }, [projects, tags, locale, t]);

  const results = commands.filter((command) => {
    const text = `${command.label} ${command.detail}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  function run(command) {
    if (!command) return;
    onClose();
    if (command.external) {
      window.open(command.href, "_blank", "noreferrer");
    } else {
      router.push(command.href);
    }
  }

  function onInputKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      run(results[activeIndex]);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/65 p-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      <button className="absolute inset-0 cursor-default" aria-label="Close command palette" onClick={onClose} />
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded border border-workbench-600 bg-workbench-900 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-workbench-700 px-4 py-3">
          <Search size={18} className="text-ink-400" aria-hidden="true" />
          <label className="sr-only" htmlFor="command-query">{t.openCommandPalette}</label>
          <input
            ref={inputRef}
            id="command-query"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
            className="w-full bg-transparent text-base text-ink-100 placeholder:text-ink-500 focus:outline-none"
            placeholder={t.commands.placeholder}
          />
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {results.length ? (
            results.map((command, index) => {
              const Icon = command.icon;
              const active = index === activeIndex;
              return (
                <button
                  key={`${command.label}-${command.href}`}
                  type="button"
                  className={[
                    "flex w-full items-center gap-3 rounded px-3 py-2 text-left",
                    active ? "bg-accent-500/15 text-ink-100" : "text-ink-300 hover:bg-workbench-800 hover:text-ink-100"
                  ].join(" ")}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => run(command)}
                >
                  <Icon size={16} className="text-accent-300" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm">{command.label}</span>
                    <span className="block truncate font-mono text-xs text-ink-500">{command.detail}</span>
                  </span>
                  {command.external ? <ExternalLink size={14} aria-hidden="true" /> : null}
                </button>
              );
            })
          ) : (
            <p className="px-3 py-8 text-center font-mono text-sm text-ink-400">{t.commands.noMatch}</p>
          )}
        </div>
      </div>
    </div>
  );
}
