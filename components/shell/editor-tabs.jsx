"use client";

import Link from "next/link";
import { Circle, FolderKanban, Info } from "lucide-react";
import { localizePath, stripLocale } from "@/lib/i18n";

export function EditorTabs({ projects, pathname, currentTab, locale }) {
  const strippedPath = stripLocale(pathname);
  const project = projects.find((item) => strippedPath === `/projects/${item.slug}`);
  const tabs = [
    { label: "README.md", href: localizePath("/", locale), rawHref: "/", icon: Info },
    { label: "projects", href: localizePath("/projects", locale), rawHref: "/projects", icon: FolderKanban }
  ];

  if (project) {
    tabs.push({ label: project.fileName, href: localizePath(`/projects/${project.slug}`, locale), rawHref: `/projects/${project.slug}`, icon: Circle });
  }

  return (
    <div className="editor-scrollbar flex h-11 overflow-x-auto border-b border-workbench-700 bg-workbench-950" role="tablist" aria-label="Open pages">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = tab.label === currentTab || strippedPath === tab.rawHref;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            role="tab"
            aria-selected={active}
            aria-current={active ? "page" : undefined}
            className={[
              "flex min-w-fit items-center gap-2 border-r border-workbench-700 px-4 font-mono text-sm transition",
              active
                ? "border-t-2 border-t-accent-400 bg-workbench-925 text-ink-100"
                : "text-ink-400 hover:bg-workbench-900 hover:text-ink-200"
            ].join(" ")}
          >
            <Icon size={15} className={active ? "text-accent-300" : "text-ink-500"} aria-hidden="true" />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
