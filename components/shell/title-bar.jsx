"use client";

import Link from "next/link";
import { Github, Menu, PanelLeft, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { localeLabels, localizePath, switchLocalePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/metadata";

export function TitleBar({ title, onCommand, onExplorer, onToggleExplorer, explorerOpen, locale, t }) {
  const pathname = usePathname();
  const nextLocale = locale === "pt-BR" ? "en" : "pt-BR";

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-10 items-center justify-between border-b border-workbench-700 bg-workbench-950 px-2 lg:pl-14">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded text-ink-300 hover:bg-workbench-800 hover:text-ink-100 lg:hidden"
          onClick={onExplorer}
          aria-label={t.openExplorer}
        >
          <Menu size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="hidden h-8 w-8 items-center justify-center rounded text-ink-300 hover:bg-workbench-800 hover:text-ink-100 lg:inline-flex"
          onClick={onToggleExplorer}
          aria-label={explorerOpen ? t.hideExplorer : t.showExplorer}
          aria-pressed={explorerOpen}
          title={explorerOpen ? t.hideExplorer : t.showExplorer}
        >
          <PanelLeft size={17} aria-hidden="true" />
        </button>
        <Link href={localizePath("/", locale)} className="hidden shrink-0 font-mono text-sm font-bold text-accent-300 sm:block">
          Iago Bussoletti
        </Link>
        <span className="truncate font-mono text-xs text-ink-300">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="hidden min-w-48 items-center gap-2 rounded border border-workbench-600 bg-workbench-925 px-3 py-1.5 text-left font-mono text-xs text-ink-400 hover:border-accent-500 hover:text-ink-200 md:flex"
          onClick={onCommand}
          aria-label={t.openCommandPalette}
        >
          <Search size={14} aria-hidden="true" />
          {t.searchWorkspace}
          <kbd className="ml-auto text-[10px] text-ink-500">Ctrl K</kbd>
        </button>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded text-ink-300 hover:bg-workbench-800 hover:text-accent-300 md:hidden"
          onClick={onCommand}
          aria-label={t.openCommandPalette}
        >
          <Search size={17} aria-hidden="true" />
        </button>
        <Link
          href={switchLocalePath(pathname, nextLocale)}
          onClick={() => {
            document.cookie = `preferredLocale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
          }}
          className="inline-flex h-8 items-center rounded border border-workbench-600 px-2 font-mono text-xs text-ink-200 hover:border-accent-500 hover:text-accent-300"
          hrefLang={nextLocale}
          aria-label={`Switch language to ${nextLocale}`}
          title={`Switch to ${nextLocale}`}
        >
          {localeLabels[nextLocale]}
        </Link>
        <Link
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-8 w-8 items-center justify-center rounded text-ink-300 hover:bg-workbench-800 hover:text-accent-300"
          aria-label="Open GitHub profile"
          title="GitHub"
        >
          <Github size={17} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
