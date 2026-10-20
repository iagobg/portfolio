"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, FileText, Github, Search, Tag, X, Image as ImageIcon, Network, Hash } from "lucide-react";
import { localizePath, stripLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/metadata";
import { searchCommands } from "@/lib/command-search.mjs";

export function CommandPalette({ onClose, projects, tags, locale, t }) {
  const router = useRouter();
  const pathname = usePathname();
  const pt = locale === "pt-BR";
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const previous = document.activeElement;
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    inputRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  }, []);

  const commands = useMemo(() => {
    const current = projects.find((p) => stripLocale(pathname) === `/projects/${p.slug}`);
    const navigation = [
      { id: "home", label: t.commands.goHome, detail: "README.md", href: localizePath("/", locale), icon: FileText },
      { id: "projects", label: t.commands.viewAllProjects, detail: "projects", href: localizePath("/projects", locale), icon: Search },
      { id: "github", label: t.commands.openGithub, detail: siteConfig.githubUrl, href: siteConfig.githubUrl, external: true, icon: Github }
    ].map((item) => ({ ...item, group: pt ? "Navegação" : "Navigation" }));
    const projectCommands = projects.map((project) => ({
      id: project.slug, label: project.title, detail: project.shortDescription,
      keywords: [project.fileName, ...project.tags, ...(project.techStack || [])].join(" "),
      href: localizePath(`/projects/${project.slug}`, locale), icon: FileText,
      group: t.projects, project
    }));
    const sections = current ? [
      { id: "preview", label: pt ? "Ver prévia do projeto" : "Show project preview", detail: current.title, anchor: "project-preview", icon: ImageIcon },
      ...(current.diagram ? [{ id: "architecture", label: pt ? "Explorar arquitetura" : "Explore architecture", detail: current.title, anchor: "architecture", icon: Network }] : []),
      ...(current.headings || []).map((heading) => ({ id: `section-${heading.id}`, label: heading.text, detail: current.title, anchor: heading.id, icon: Hash }))
    ].map((item) => ({ ...item, href: `${pathname}#${item.anchor}`, group: pt ? "Neste projeto" : "In this project" })) : [];
    const filters = tags.map((tag) => ({
      id: `tag-${tag.slug}`, label: t.commands.filterBy(tag.label), detail: t.commands.detail(tag.count),
      href: `${localizePath("/projects", locale)}?tags=${tag.slug}`, icon: Tag,
      group: pt ? "Filtros" : "Filters"
    }));
    return [...navigation, ...projectCommands, ...sections, ...filters];
  }, [projects, tags, locale, t, pathname, pt]);

  const results = searchCommands(commands, query);
  const selectedIndex = Math.min(activeIndex, Math.max(0, results.length - 1));
  const active = results[selectedIndex];
  useEffect(() => {
    document.getElementById(`command-result-${selectedIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex, query]);

  function run(command) {
    if (!command) return;
    closeRef.current();
    if (command.external) {
      window.open(command.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(command.href);
      if (command.anchor) window.dispatchEvent(new CustomEvent("portfolio:reveal", { detail: command.anchor }));
    }
  }

  function handleKey(event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault(); event.stopPropagation(); closeRef.current(); return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(0, Math.min(index + (event.key === "ArrowDown" ? 1 : -1), results.length - 1)));
    } else if (event.key === "Enter" && event.target === inputRef.current) {
      event.preventDefault(); run(active);
    }
  }

  return (
    <dialog ref={dialogRef} className="command-dialog" aria-label={t.openCommandPalette}
      onCancel={() => closeRef.current()} onKeyDown={handleKey}
      onClick={(event) => { if (event.target === dialogRef.current) closeRef.current(); }}>
      <div className="command-panel">
        <div className="flex items-center gap-3 border-b border-workbench-700 p-4">
          <Search size={19} className="shrink-0 text-accent-300" aria-hidden="true" />
          <label className="sr-only" htmlFor="command-query">{t.openCommandPalette}</label>
          <input ref={inputRef} id="command-query" value={query}
            role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="command-results"
            aria-activedescendant={active ? `command-result-${selectedIndex}` : undefined}
            onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }}
            className="min-w-0 flex-1 bg-transparent text-base text-ink-100 placeholder:text-ink-300"
            placeholder={pt ? "Buscar projetos, tecnologias ou ações..." : "Search projects, technologies or actions..."} />
          <button type="button" onClick={() => closeRef.current()} aria-label={pt ? "Fechar busca" : "Close search"} className="grid h-10 w-10 shrink-0 place-items-center rounded hover:bg-workbench-800"><X size={18} /></button>
        </div>
        <div className="grid md:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="max-h-[55dvh] overflow-y-auto p-2" id="command-results" role="listbox" aria-label={pt ? "Resultados" : "Results"}>
            {results.length ? results.map((command, index) => {
              const Icon = command.icon;
              return <button type="button" role="option" aria-selected={index === selectedIndex} tabIndex={-1}
                id={`command-result-${index}`} key={command.id} onMouseEnter={() => setActiveIndex(index)} onClick={() => run(command)}
                className={`flex w-full items-start gap-3 rounded px-3 py-3 text-left ${index === selectedIndex ? "bg-accent-500/15 text-ink-100" : "text-ink-200 hover:bg-workbench-800"}`}>
                <Icon size={17} className="mt-1 shrink-0 text-accent-300" aria-hidden="true" />
                <span className="min-w-0 flex-1"><span className="mb-1 block font-mono text-[10px] uppercase tracking-wide text-ink-300">{command.group}</span><span className="block text-sm">{command.label}</span><span className="mt-1 block truncate text-xs text-ink-300">{command.detail}</span></span>
                {command.external && <ArrowUpRight size={14} aria-hidden="true" />}
              </button>;
            }) : <p className="px-3 py-8 text-center text-sm text-ink-300">{t.commands.noMatch}</p>}
          </div>
          <aside className="hidden border-l border-workbench-700 bg-workbench-950 p-5 md:block" aria-label={pt ? "Detalhes do resultado" : "Result details"}>
            {active?.project ? <>
              {active.project.coverImage && <Image src={active.project.coverImage} alt="" width={400} height={250} sizes="250px" className="mb-4 aspect-video w-full rounded border border-workbench-700 object-cover" />}
              <p className="font-mono text-xs text-accent-300">{active.project.status}</p>
              <h2 className="mt-2 text-xl font-bold">{active.project.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink-200">{active.project.shortDescription}</p>
              <p className="mt-4 font-mono text-xs leading-6 text-ink-300">{active.project.techStack?.join(" · ")}</p>
            </> : <><p className="font-mono text-xs text-accent-300">{active?.group || t.search}</p><p className="mt-3 text-lg text-ink-100">{active?.label || t.commands.noMatch}</p><p className="mt-3 break-words text-sm leading-6 text-ink-300">{active?.detail}</p></>}
          </aside>
        </div>
        <div className="flex justify-between gap-4 border-t border-workbench-700 px-4 py-3 font-mono text-xs text-ink-300">
          <span>↑ ↓ {pt ? "navegar" : "navigate"} · Enter {pt ? "abrir" : "open"} · Esc {pt ? "fechar" : "close"}</span><span aria-live="polite">{results.length}</span>
        </div>
      </div>
    </dialog>
  );
}
