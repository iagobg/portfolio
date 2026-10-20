"use client";

import { useState } from "react";
import { Columns2, BookOpen, Image as ImageIcon } from "lucide-react";

export function CaseWorkspace({ children, preview, locale }) {
  const [view, setView] = useState("split");
  const pt = locale === "pt-BR";
  const modes = [
    ["split", Columns2, pt ? "Dividir editor" : "Split editor"],
    ["story", BookOpen, pt ? "Leitura" : "Read"],
    ["preview", ImageIcon, pt ? "Prévia" : "Preview"]
  ];
  return (
    <section className="case-workspace" aria-label={pt ? "Estudo de caso e prévia" : "Case study and preview"}>
      <div className="case-toolbar">
        <span className="font-mono text-xs text-ink-300">{pt ? "Estudo de caso / Prévia" : "Case study / Preview"}</span>
        <div className="flex gap-1" role="group" aria-label={pt ? "Layout do editor" : "Editor layout"}>
          {modes.map(([id, Icon, label]) => (
            <button key={id} type="button" onClick={() => setView(id)} aria-pressed={view === id}
              className={`inline-flex min-h-10 items-center gap-2 rounded px-3 text-xs ${view === id ? "bg-accent-500/15 text-accent-300" : "text-ink-300 hover:bg-workbench-800"}`}>
              <Icon size={15} aria-hidden="true" /><span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className={`case-layout case-layout--${view}`}>
        <div className="case-story" hidden={view === "preview"}>{children}</div>
        <aside className="case-preview" id="project-preview" hidden={view === "story"} aria-label={pt ? "Prévia do projeto" : "Project preview"}>{preview}</aside>
      </div>
    </section>
  );
}
