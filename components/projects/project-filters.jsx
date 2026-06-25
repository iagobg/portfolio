"use client";

import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { slugifyTag } from "@/lib/tags";

export function ProjectFilters({ tags, selectedTags, query, labels, onChange }) {
  const [input, setInput] = useState(query);

  const selected = useMemo(() => new Set(selectedTags.map(slugifyTag)), [selectedTags]);

  useEffect(() => {
    setInput(query);
  }, [query]);

  function update(updates) {
    onChange(updates);
  }

  function toggleTag(tagSlug) {
    const next = new Set(selected);
    if (next.has(tagSlug)) next.delete(tagSlug);
    else next.add(tagSlug);
    update({ tags: [...next] });
  }

  function submit(event) {
    event.preventDefault();
    update({ query: input.trim() });
  }

  return (
    <section className="rounded border border-workbench-700 bg-workbench-850 p-4" aria-labelledby="filters-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="filters-heading" className="font-mono text-xs uppercase tracking-wide text-ink-300">
            {labels.filters}
          </h2>
          <p className="mt-1 text-sm text-ink-400">
            {labels.filterSummary}
          </p>
        </div>
        {(selected.size > 0 || query) ? (
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded border border-workbench-600 px-2.5 py-1.5 font-mono text-xs text-ink-200 hover:border-accent-500 hover:text-accent-300"
            onClick={() => {
              setInput("");
              update({ query: "", tags: [] });
            }}
          >
            <X size={14} aria-hidden="true" /> {labels.reset}
          </button>
        ) : null}
      </div>
      <form onSubmit={submit} className="relative mb-4">
        <label className="sr-only" htmlFor="project-query">
          {labels.searchProjects}
        </label>
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={16} aria-hidden="true" />
        <input
          id="project-query"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="w-full rounded border border-workbench-600 bg-workbench-925 py-2 pl-9 pr-3 text-sm text-ink-100 placeholder:text-ink-500 focus:border-accent-400 focus:outline-none"
          placeholder={labels.searchPlaceholder}
        />
      </form>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const active = selected.has(tag.slug);
          return (
            <button
              type="button"
              key={tag.slug}
              aria-pressed={active}
              onClick={() => toggleTag(tag.slug)}
              className={[
                "rounded border px-2.5 py-1.5 font-mono text-xs transition",
                active
                  ? "border-accent-400 bg-accent-500/15 text-accent-300"
                  : "border-workbench-700 bg-workbench-900 text-ink-300 hover:border-accent-500 hover:text-accent-300"
              ].join(" ")}
            >
              {tag.label} <span className="text-ink-500">{tag.count}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
