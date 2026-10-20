"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Expand, X, ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";

const ArchitectureDiagram = dynamic(() => import("./architecture-diagram").then((module) => module.ArchitectureDiagram));

export function ProjectPreview({ project, locale }) {
  const pt = locale === "pt-BR";
  const [selected, setSelected] = useState(0);
  const [mode, setMode] = useState("captures");
  useEffect(() => {
    function reveal(event) {
      const anchor = event?.detail || window.location.hash.slice(1);
      if (anchor === "architecture") setMode("architecture");
    }
    reveal();
    window.addEventListener("portfolio:reveal", reveal);
    window.addEventListener("hashchange", reveal);
    return () => {
      window.removeEventListener("portfolio:reveal", reveal);
      window.removeEventListener("hashchange", reveal);
    };
  }, []);
  const dialog = useRef(null);
  const screenshots = project.screenshots || [];
  const current = screenshots[selected];
  return (
    <div className="preview-surface">
      {project.diagram === "live-trivia" && <div className="flex gap-2 border-b border-workbench-700 p-3" role="group" aria-label={pt ? "Conteúdo da prévia" : "Preview content"}>
        {[["captures", pt ? "Capturas" : "Captures"], ["architecture", pt ? "Arquitetura" : "Architecture"]].map(([id, label]) => (
          <button key={id} type="button" aria-pressed={mode === id} onClick={() => setMode(id)} className={`min-h-10 rounded px-3 text-sm ${mode === id ? "bg-accent-500/15 text-accent-300" : "text-ink-200 hover:bg-workbench-800"}`}>{label}</button>
        ))}
      </div>}
      {mode === "architecture" && project.diagram === "live-trivia" ? <ArchitectureDiagram locale={locale} /> : <>
      <div className="flex items-center justify-between gap-3 border-b border-workbench-700 px-4 py-3">
        <span className="font-mono text-xs text-accent-300">{current ? (pt ? "Capturas do projeto" : "Project captures") : (pt ? "Fluxo explicado" : "Workflow explained")}</span>
        {current && <button type="button" onClick={() => dialog.current?.showModal()} className="inline-flex min-h-10 items-center gap-2 text-xs text-ink-200 hover:text-accent-300"><Expand size={15} />{pt ? "Ampliar" : "Expand"}</button>}
      </div>
      {current ? (
        <>
          <figure className="p-3">
            <div className="grid min-h-40 place-items-center overflow-hidden rounded bg-workbench-950">
              <Image src={current.src} alt={current.alt} width={1280} height={800} sizes="(min-width: 1280px) 40vw, 90vw" className="max-h-[60vh] w-full object-contain" />
            </div>
            <figcaption className="px-1 pt-3 text-sm leading-6 text-ink-300">{current.caption}</figcaption>
          </figure>
          {screenshots.length > 1 && <div className="flex flex-wrap gap-2 px-4 pb-4" role="group" aria-label={pt ? "Selecionar captura" : "Select capture"}>
            {screenshots.map((shot, index) => <button type="button" key={shot.src} aria-pressed={selected === index} onClick={() => setSelected(index)} aria-label={shot.alt}
              className={`min-h-10 min-w-10 rounded border px-3 font-mono text-xs ${selected === index ? "border-accent-400 bg-accent-500/10 text-accent-300" : "border-workbench-600 text-ink-300"}`}>{String(index + 1).padStart(2, "0")}</button>)}
          </div>}
          <dialog ref={dialog} className="media-dialog" aria-label={current.alt}>
            <form method="dialog" className="flex justify-end pb-3"><button className="inline-flex min-h-10 items-center gap-2 rounded px-3 text-sm"><X size={18} />{pt ? "Fechar" : "Close"}</button></form>
            <Image src={current.src} alt={current.alt} width={1600} height={1000} sizes="95vw" className="max-h-[75vh] w-full object-contain" />
            <p className="pt-3 text-sm text-ink-200">{current.caption}</p>
          </dialog>
        </>
      ) : (
        <div className="p-5">
          <p className="mb-5 text-sm leading-6 text-ink-300">{pt ? "Modelo explicativo da implementação. Não é uma captura da aplicação." : "An explanatory model of the implementation, not an application screenshot."}</p>
          <ol className="grid gap-2">
            {(project.flow || []).map((step, index, steps) => <li key={step}>
              <div className="flex items-center gap-3 rounded border border-workbench-600 bg-workbench-900 p-4">
                <span className="font-mono text-xs text-accent-300">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm leading-6">{step}</span>
              </div>
              {index < steps.length - 1 && <ArrowDown className="mx-auto my-2 text-accent-400" size={18} aria-hidden="true" />}
            </li>)}
          </ol>
          {!project.flow?.length && <p className="text-sm leading-6 text-ink-200">{project.shortDescription}</p>}
        </div>
      )}
      </>}
    </div>
  );
}
