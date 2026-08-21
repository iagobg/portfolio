"use client";

import Link from "next/link";
import { Circle, FolderKanban, Info, X } from "lucide-react";
import { localizePath, stripLocale } from "@/lib/i18n";

export function EditorTabs({ openProjects, pathname, currentTab, locale, t, onCloseProject }) {
  const strippedPath = stripLocale(pathname);
  const tabs = [
    { label: "README.md", href: localizePath("/", locale), rawHref: "/", icon: Info },
    { label: "projects", href: localizePath("/projects", locale), rawHref: "/projects", icon: FolderKanban }
  ];
  const projectTabs = openProjects.map((project) => ({
    label: project.fileName,
    href: localizePath(`/projects/${project.slug}`, locale),
    rawHref: `/projects/${project.slug}`,
    slug: project.slug,
    icon: Circle,
    closeable: true
  }));

  return (
    <div className="editor-scrollbar flex h-11 overflow-x-auto border-b border-workbench-700 bg-workbench-950" role="tablist" aria-label="Open pages">
      {[...tabs, ...projectTabs].map((tab) => {
        const Icon = tab.icon;
        const active = tab.label === currentTab || strippedPath === tab.rawHref;
        const tabClassName = [
          "group flex min-w-fit items-center border-r border-workbench-700 font-mono text-sm transition",
          active
            ? "border-t-2 border-t-accent-400 bg-workbench-925 text-ink-100"
            : "text-ink-400 hover:bg-workbench-900 hover:text-ink-200"
        ].join(" ");

        return tab.closeable ? (
          <div key={tab.href} className={tabClassName} role="presentation">
            <Link
              href={tab.href}
              role="tab"
              aria-selected={active}
              aria-current={active ? "page" : undefined}
              className="flex h-full min-w-0 items-center gap-2 py-0 pl-4 pr-2"
            >
              <Icon size={15} className={active ? "text-accent-300" : "text-ink-500"} aria-hidden="true" />
              <span className="max-w-48 truncate">{tab.label}</span>
            </Link>
            <button
              type="button"
              className="pointer-events-none mr-2 grid h-6 w-6 place-items-center rounded text-ink-400 opacity-0 transition hover:bg-workbench-750 hover:text-ink-100 focus:pointer-events-auto focus:opacity-100 focus:outline-none focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-accent-400 group-hover:pointer-events-auto group-hover:opacity-100"
              onClick={() => onCloseProject(tab.slug)}
              aria-label={t.closeTab(tab.label)}
              title={t.closeTab(tab.label)}
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <Link
            key={tab.href}
            href={tab.href}
            role="tab"
            aria-selected={active}
            aria-current={active ? "page" : undefined}
            className={`${tabClassName} gap-2 px-4`}
          >
            <Icon size={15} className={active ? "text-accent-300" : "text-ink-500"} aria-hidden="true" />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
