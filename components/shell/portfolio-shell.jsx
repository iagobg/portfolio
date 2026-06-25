"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { dictionary, getLocaleFromPath } from "@/lib/i18n";
import { routeInfo } from "@/lib/navigation";
import { ActivityBar } from "@/components/shell/activity-bar";
import { Breadcrumbs } from "@/components/shell/breadcrumbs";
import { CommandPalette } from "@/components/shell/command-palette";
import { EditorTabs } from "@/components/shell/editor-tabs";
import { Explorer } from "@/components/shell/explorer";
import { StatusBar } from "@/components/shell/status-bar";
import { TitleBar } from "@/components/shell/title-bar";

export function PortfolioShell({ projectsByLocale, children }) {
  const pathname = usePathname();
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const locale = getLocaleFromPath(pathname);
  const projects = projectsByLocale[locale] || projectsByLocale.en;
  const tags = projectsByLocale.tagsByLocale[locale] || projectsByLocale.tagsByLocale.en;
  const t = dictionary(locale);
  const info = useMemo(() => routeInfo(pathname, projects, locale), [pathname, projects, locale]);

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-workbench-950 text-ink-100">
      <TitleBar
        title={info.title}
        onCommand={() => setPaletteOpen(true)}
        onExplorer={() => setMobileExplorerOpen(true)}
        explorerOpen={explorerOpen}
        onToggleExplorer={() => setExplorerOpen((value) => !value)}
        locale={locale}
        t={t}
      />
      <div className="flex min-h-[calc(100vh-2.5rem-1.625rem)] pt-10 lg:pl-12">
        <ActivityBar activeSection={info.section} onCommand={() => setPaletteOpen(true)} locale={locale} t={t} />
        <div className={`${explorerOpen ? "lg:block" : "lg:hidden"} hidden w-72 shrink-0 border-r border-workbench-700 bg-workbench-850 lg:block`}>
          <Explorer projects={projects} pathname={pathname} onNavigate={() => setMobileExplorerOpen(false)} locale={locale} t={t} />
        </div>
        <main className="min-w-0 flex-1 bg-workbench-925">
          <EditorTabs projects={projects} pathname={pathname} currentTab={info.tab} locale={locale} />
          <Breadcrumbs items={info.breadcrumbs} />
          <div className="editor-scrollbar min-h-[calc(100vh-2.5rem-1.625rem-5.25rem)] overflow-x-hidden overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
      <StatusBar items={info.status} githubUsername="iagobg" />
      {mobileExplorerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Explorer">
          <button
            className="absolute inset-0 bg-black/60"
            aria-label="Close explorer"
            onClick={() => setMobileExplorerOpen(false)}
          />
          <div className="relative h-full w-[min(22rem,88vw)] border-r border-workbench-700 bg-workbench-850">
            <Explorer projects={projects} pathname={pathname} onNavigate={() => setMobileExplorerOpen(false)} locale={locale} t={t} />
          </div>
        </div>
      ) : null}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        projects={projects}
        tags={tags}
        locale={locale}
        t={t}
      />
    </div>
  );
}
