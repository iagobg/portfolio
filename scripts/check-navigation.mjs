import assert from "node:assert/strict";
import { searchCommands } from "../lib/command-search.mjs";
import { headingId, projectHeadings } from "../lib/headings.mjs";

const commands = [
  { label: "Filter by Go", detail: "1 project", keywords: "tag" },
  { label: "Futemon", detail: "Narrated matches", keywords: "Go HTMX SQLite" },
  { label: "SugereAI", detail: "Recomendação de notebooks", keywords: "React PostgreSQL" },
  { label: "Go", detail: "Exact match" }
];
assert.deepEqual(searchCommands(commands, "go").map((c) => c.label), ["Go", "Filter by Go", "Futemon"]);
assert.equal(searchCommands(commands, "htmx sqlite")[0].label, "Futemon");
assert.equal(searchCommands(commands, "recomendacao")[0].label, "SugereAI");
assert.equal(searchCommands(commands, "react sqlite").length, 0);
assert.equal(searchCommands(commands, "no-such-command").length, 0);
assert.deepEqual(searchCommands(commands, "  "), commands);
assert.equal(headingId("O que aprendi"), "o-que-aprendi");
assert.equal(headingId("Decisões e evolução"), "decisoes-e-evolucao");
assert.deepEqual(projectHeadings("## Decisões\n\nText\n## Próximo passo"), [
  { text: "Decisões", id: "decisoes" }, { text: "Próximo passo", id: "proximo-passo" }
]);
console.log("Navigation checks passed: ranked matching, multiple tokens, accents, empty results and localized anchors.");
