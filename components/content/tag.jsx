import Link from "next/link";
import { localizePath } from "@/lib/i18n";
import { slugifyTag } from "@/lib/tags";

export function Tag({ children, href, active = false }) {
  const className = [
    "inline-flex min-h-7 items-center rounded border px-2.5 py-1 font-mono text-xs leading-none transition",
    active
      ? "border-accent-400 bg-accent-500/15 text-accent-300"
      : "border-workbench-700 bg-workbench-850 text-ink-200 hover:border-accent-500 hover:text-accent-300"
  ].join(" ");

  if (href) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }

  return <span className={className}>{children}</span>;
}

export function ProjectTag({ tag, active = false, locale = "en" }) {
  return (
    <Tag active={active} href={`${localizePath("/projects", locale)}?tags=${slugifyTag(tag)}`}>
      {tag}
    </Tag>
  );
}
