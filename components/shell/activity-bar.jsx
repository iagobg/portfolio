"use client";

import Link from "next/link";
import { FolderKanban, Github, Home, Search } from "lucide-react";
import { localizePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/metadata";

export function ActivityBar({ activeSection, onCommand, locale, t }) {
  const items = [
    { label: t.home, section: "Home", href: localizePath("/", locale), icon: Home },
    { label: t.projects, section: "Projects", href: localizePath("/projects", locale), icon: FolderKanban },
    { label: t.search, section: "Search", action: "command", icon: Search },
    { label: t.github, section: "GitHub", href: siteConfig.githubUrl, external: true, icon: Github }
  ];

  return (
    <nav className="fixed inset-y-0 left-0 z-50 hidden w-12 flex-col border-r border-workbench-700 bg-workbench-900 pt-2 lg:flex" aria-label="Primary">
      <Link href={localizePath("/", locale)} className="mx-auto mb-4 grid h-8 w-8 place-items-center border border-workbench-600 bg-workbench-800 font-mono text-xs font-bold text-ink-100" title="Iago Bussoletti">
        IB
      </Link>
      <div className="grid gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.section === activeSection;
          const className = [
            "relative flex h-11 w-full items-center justify-center text-ink-400 transition hover:bg-workbench-800 hover:text-ink-100",
            active ? "text-ink-100 before:absolute before:left-0 before:h-7 before:w-0.5 before:bg-accent-400" : ""
          ].join(" ");

          if (item.action === "command") {
            return (
              <button key={item.label} type="button" className={className} onClick={onCommand} aria-label={t.searchProjects} title={item.label}>
                <Icon size={22} aria-hidden="true" />
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className={className}
              aria-label={item.label}
              title={item.label}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={22} aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
