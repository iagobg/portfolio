"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ProjectFilters } from "@/components/projects/project-filters";
import { ProjectGrid } from "@/components/projects/project-grid";
import { dictionary } from "@/lib/i18n";
import { filterProjects } from "@/lib/project-filtering";
import { parseTagParam } from "@/lib/tags";

function filtersFromValues(tagsParam = "", queryParam = "") {
  return {
    selectedTags: parseTagParam(tagsParam),
    query: queryParam
  };
}

function setFilterParams(pathname, filters) {
  const params = new URLSearchParams(window.location.search);

  if (filters.query) {
    params.set("query", filters.query);
  } else {
    params.delete("query");
  }

  if (filters.selectedTags.length > 0) {
    params.set("tags", filters.selectedTags.join(","));
  } else {
    params.delete("tags");
  }

  const queryString = params.toString();
  window.history.pushState(null, "", `${pathname}${queryString ? `?${queryString}` : ""}`);
}

export function ProjectArchive({ projects, tags, locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tagsParam = searchParams.get("tags") || "";
  const queryParam = searchParams.get("query") || "";
  const t = dictionary(locale);
  const [filters, setFilters] = useState(() => filtersFromValues(tagsParam, queryParam));
  const { query, selectedTags } = filters;

  useEffect(() => {
    setFilters(filtersFromValues(tagsParam, queryParam));
  }, [queryParam, tagsParam]);

  const filteredProjects = useMemo(
    () => filterProjects(projects, { query, tags: selectedTags }),
    [projects, query, selectedTags]
  );

  function updateFilters(updates) {
    setFilters((current) => {
      const next = {
        query: updates.query ?? current.query,
        selectedTags: updates.tags ?? current.selectedTags
      };

      setFilterParams(pathname, next);
      return next;
    });
  }

  return (
    <div className="grid gap-5">
      <ProjectFilters
        tags={tags}
        selectedTags={selectedTags}
        query={query}
        onChange={updateFilters}
        labels={{
          filters: t.filters,
          filterSummary: t.filterSummary(filteredProjects.length),
          reset: t.reset,
          searchProjects: t.searchProjects,
          searchPlaceholder: t.searchPlaceholder
        }}
      />
      <ProjectGrid projects={filteredProjects} locale={locale} t={t} />
    </div>
  );
}
