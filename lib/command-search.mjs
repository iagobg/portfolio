export function normalizeSearch(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
export function searchCommands(commands, query) {
  const needle = normalizeSearch(query);
  if (!needle) return commands;
  const tokens = needle.split(/\s+/);
  return commands.map((command, order) => {
    const label = normalizeSearch(command.label);
    const haystack = normalizeSearch([command.label, command.detail, command.keywords].join(" "));
    if (!tokens.every((token) => haystack.includes(token))) return null;
    const rank = label === needle ? 0 : label.startsWith(needle) ? 1 : label.includes(needle) ? 2 : 3;
    return { command, rank, order };
  }).filter(Boolean).sort((a, b) => a.rank - b.rank || a.order - b.order).map(({ command }) => command);
}
