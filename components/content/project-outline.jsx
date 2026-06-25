"use client";

import { useEffect, useState } from "react";

export function ProjectOutline({ headings, title = "Outline" }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 max-h-[calc(100vh-9rem)] overflow-auto border-l border-workbench-700 pl-4">
        <p className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-400">{title}</p>
        <nav aria-label="Project outline" className="grid gap-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              aria-current={active === heading.id ? "location" : undefined}
              className={[
                "block border-l-2 pl-3 font-mono text-xs leading-5 transition",
                active === heading.id
                  ? "border-accent-400 text-accent-300"
                  : "border-transparent text-ink-400 hover:text-ink-100"
              ].join(" ")}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
