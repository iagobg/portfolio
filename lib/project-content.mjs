const REQUIRED_FIELDS = [
  "slug",
  "fileName",
  "title",
  "shortDescription",
  "year",
  "status",
  "tags",
  "summary"
];

function scalar(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "\"\"" || trimmed === "''") return "";
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed);
  return trimmed.replace(/^["']|["']$/g, "");
}

function setNested(target, pathParts, value) {
  let cursor = target;
  pathParts.forEach((part, index) => {
    if (index === pathParts.length - 1) {
      cursor[part] = value;
    } else {
      cursor[part] = cursor[part] || {};
      cursor = cursor[part];
    }
  });
}

export function parseFrontmatter(source, filePath) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`${filePath} must begin with YAML-style frontmatter`);
  }

  const data = {};
  const lines = match[1].split("\n");
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const keyMatch = line.match(/^([A-Za-z0-9_]+):(?:\s*(.*))?$/);
    if (!keyMatch) {
      throw new Error(`${filePath} has unsupported frontmatter line: ${line}`);
    }

    const [, key, rawValue = ""] = keyMatch;
    if (rawValue.trim()) {
      data[key] = scalar(rawValue);
      index += 1;
      continue;
    }

    const next = lines[index + 1] || "";
    if (next.startsWith("  - ")) {
      const items = [];
      index += 1;
      while (index < lines.length && lines[index].startsWith("  - ")) {
        const first = lines[index].slice(4);
        if (first.includes(":")) {
          const item = {};
          const [itemKey, itemValue] = first.split(/:\s*/, 2);
          item[itemKey] = scalar(itemValue || "");
          index += 1;
          while (index < lines.length && lines[index].startsWith("    ")) {
            const nested = lines[index].trim();
            const [nestedKey, nestedValue] = nested.split(/:\s*/, 2);
            item[nestedKey] = scalar(nestedValue || "");
            index += 1;
          }
          items.push(item);
        } else {
          items.push(scalar(first));
          index += 1;
        }
      }
      data[key] = items;
      continue;
    }

    if (next.startsWith("  ")) {
      data[key] = {};
      index += 1;
      while (index < lines.length && lines[index].startsWith("  ")) {
        const nested = lines[index].trim();
        const nestedMatch = nested.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
        if (!nestedMatch) {
          throw new Error(`${filePath} has unsupported nested frontmatter line: ${nested}`);
        }
        setNested(data[key], [nestedMatch[1]], scalar(nestedMatch[2]));
        index += 1;
      }
      continue;
    }

    data[key] = "";
    index += 1;
  }

  return { data, content: match[2] };
}

export function validateProject(project, filePath) {
  const missing = REQUIRED_FIELDS.filter((field) => project[field] === undefined);

  if (missing.length > 0) {
    throw new Error(`${filePath} is missing required frontmatter: ${missing.join(", ")}`);
  }

  if (!Array.isArray(project.tags)) {
    throw new Error(`${filePath} frontmatter field "tags" must be an array`);
  }
}

