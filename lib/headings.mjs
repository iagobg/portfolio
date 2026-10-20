export function headingId(text) {
  return String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
export function projectHeadings(content) {
  return [...content.matchAll(/^##\s+(.+)$/gm)].map((match) => ({
    text: match[1].trim(), id: headingId(match[1].trim())
  }));
}
