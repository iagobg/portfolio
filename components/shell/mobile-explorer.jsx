"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Explorer } from "./explorer";

export function MobileExplorer({ onClose, locale, ...props }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    const wide = window.matchMedia("(min-width: 1024px)");
    function resize() { if (wide.matches) closeRef.current(); }
    wide.addEventListener("change", resize);
    return () => {
      wide.removeEventListener("change", resize);
      dialog.close();
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  }, []);
  return <dialog ref={dialogRef} className="explorer-dialog" aria-label={props.t.explorer}
    onCancel={() => closeRef.current()}
    onClick={(event) => { if (event.target === dialogRef.current) closeRef.current(); }}>
    <div className="flex h-full flex-col">
      <button type="button" onClick={() => closeRef.current()} className="flex min-h-11 items-center justify-end gap-2 border-b border-workbench-700 px-4 text-sm">
        <X size={17} aria-hidden="true" />{locale === "pt-BR" ? "Fechar explorador" : "Close explorer"}
      </button>
      <div className="min-h-0 flex-1"><Explorer {...props} locale={locale} onNavigate={() => closeRef.current()} /></div>
    </div>
  </dialog>;
}
