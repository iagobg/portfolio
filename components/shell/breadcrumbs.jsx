"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }) {
  return (
    <nav className="flex h-9 items-center gap-1 overflow-x-auto border-b border-workbench-700 bg-workbench-925 px-4 font-mono text-xs text-ink-400" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const current = index === items.length - 1;
        return (
          <span key={`${item.href}-${item.label}`} className="flex shrink-0 items-center gap-1">
            {index > 0 ? <ChevronRight size={14} aria-hidden="true" /> : null}
            {current ? (
              <span className="text-ink-100" aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-accent-300">{item.label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
