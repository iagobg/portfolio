import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter, validateProject } from "../lib/project-content.mjs";
import { canonicalProjectSlug, projectRedirects } from "../lib/project-aliases.mjs";

const root = process.cwd();
const locales = ["en", "pt-BR"];
const all = locales.map((locale) => {
  const dir = path.join(root, "content/projects", locale === "en" ? "" : locale);
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => {
    const { data, content } = parseFrontmatter(fs.readFileSync(path.join(dir, f), "utf8"), f);
    validateProject(data, f);
    assert(content.includes("## "), `${f}: missing development story`);
    assert(Number.isInteger(data.order), `${f}: missing curated order`);
    for (const src of [data.coverImage, ...(data.screenshots || []).map((image) => image.src)].filter(Boolean)) {
      assert(src.startsWith("/projects/"), `${f}: media must be local project assets`);
      assert(fs.existsSync(path.join(root, "public", src)), `${f}: missing ${src}`);
    }
    return data;
  }).sort((a, b) => a.order - b.order);
});
const expected = ["live-trivia", "rts-lab", "sugereai", "futemon", "portfolio-workspace"];
for (const projects of all) {
  assert.deepEqual(projects.map((p) => p.slug), expected);
  assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
}
for (const redirect of projectRedirects()) {
  assert(expected.includes(redirect.destination.split("/").pop()));
  assert(redirect.permanent);
}
assert.equal(canonicalProjectSlug("go-application"), "futemon");
assert.equal(canonicalProjectSlug("laptop-recommendation-engine"), "sugereai");
assert.equal(canonicalProjectSlug("live-trivia"), "live-trivia");
assert.throws(() => parseFrontmatter("No frontmatter", "invalid.mdx"));
assert.throws(() => validateProject({ slug: "incomplete" }, "invalid.mdx"));
console.log("Content checks passed: bilingual parity, curated order, required fields, local media and legacy URLs.");
