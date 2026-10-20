# Portfolio upgrade plan

Date: 2026-10-20
Status: implementation in progress on `codex/portfolio-upgrade`; local commits only, no push.

## Objective

Make the portfolio a compelling demonstration of Iago's engineering work while preserving its VS Code-inspired identity. Start with accurate, evidence-backed development stories, then improve their presentation and navigation through a cohesive set of shared components.

The requested feature scope includes:

- Split “Case study / Preview” editor.
- Interactive architecture diagram, starting with Live Trivia.
- Enhanced command palette.

Tests, captures, and graphical representations may be created where they substantiate the stories or validate the experience. This plan does not require completing the underlying prototypes.

## 1. Establish the evidence and execution baseline

- [ ] Inspect repository instructions and existing changes before editing.
- [ ] Confirm the current source checkout and runtime for each project. Use WSL for the portfolio, Live Trivia, Futemon, and RTS Lab according to the user's runtime clarification; SugereAI runs on Windows.
- [ ] Resolve RTS Lab's actual WSL location before running it. The earlier review inspected a Windows copy at `F:\Users\Iago\Documents\workspace\rts-lab`; do not assume that copy is current or executable in the intended environment.
- [ ] Confirm Live Trivia's authoritative checkout; multiple local copies were visible during discovery.
- [ ] Record current build/lint results for the portfolio and inspect its desktop/mobile presentation.
- [ ] Assemble a small evidence ledger for each case study: claim, source/code location, supporting test or capture, date, and verification status.

Previously inspected locations:

| Project | Source location |
| --- | --- |
| Portfolio | `/home/iago/workspace/portfolio` |
| Futemon | `/home/iago/workspace/futemon` |
| Live Trivia | `/home/iago/workspace/live_trivia` (confirm authoritative copy) |
| RTS Lab | Windows copy inspected; current WSL path must be located |
| SugereAI | `F:\Users\Iago\Documents\Senac\SugereAI\sugereai` |

The earlier reviews were primarily source/documentation inspections. RTS screenshots were inspected, but project tests and recorded benchmarks were not rerun. Keep historical results distinct from fresh verification.

## 2. Review Live Trivia's representation first

Positioning: a deployed multiplayer application whose main engineering challenge is keeping authoritative game state consistent while delivering expressive, frequent visual updates.

- [ ] Compare the existing English and Portuguese case studies with current source, deployment behavior, and supporting evidence.
- [ ] Lead with what a host and player can do, Iago's contribution, and a strong product screenshot.
- [ ] Structure the development story around the problem, initial approach, observed pressure point, architecture change, verification, and remaining constraints.
- [ ] Explain the distinction between authoritative game flow, presence, and high-frequency typing traffic.
- [ ] Verify claims about room lifecycle, reconnects, timers, scoring, mobile keyboard behavior, and deployment.
- [ ] Review the existing 16-player / approximately 0.7% CPU claim. Retain it only with identifiable measurement context; otherwise qualify it as historical or remove the number.
- [ ] Reduce the initial tag wall to a few primary technologies. Move detailed stack information deeper into the page.
- [ ] Move screenshots beside the relevant narrative rather than leaving all evidence after a long article.
- [ ] Capture host and player views using a local/demo room, plus a phone-sized view and a short representative interaction if useful.

Deliverable: a revised bilingual Live Trivia case study with a concise opening, verified engineering story, contextual visuals, and explicit limitations.

## 3. Replace the generic Go entry with Futemon

The user confirmed that the former Go/HTMX/Templ project became Futemon. It is one evolving project, not two portfolio entries.

Positioning: a Go prototype that turns structured AI-generated futsal match events into a persistent, synchronized, replayable experience.

- [ ] Replace generic content and branding with Futemon in both languages.
- [ ] Correct the stack to the implementation found in source: Go HTML templates, HTMX, SQLite, and OpenRouter integration. Remove unsupported Templ, embeddings, and semantic-search claims.
- [ ] Tell the core user journey: create a team, generate a duel, watch the narration, inspect history, replay.
- [ ] Explain team validation, transfer windows, historical snapshots, and persistence through concrete examples.
- [ ] Explain generation, validation/normalization, event-derived scores, timed presentation, and clock synchronization.
- [ ] Distinguish generated events from application-enforced rules. Do not portray the app as a deterministic sports simulator with commentary added afterward.
- [ ] Cover failure handling and generation limits where relevant; avoid presenting unreviewed security mechanisms as proof of production readiness.
- [ ] Use sample/local generation for repeatable captures and tests where possible, labeling sample output appropriately.
- [ ] Present its unfinished state plainly. Prioritize a clear demonstration of the working journey over redesigning the whole application.

Deliverable: a bilingual Futemon case study replacing the generic Go entry, with authentic visuals and an accurate prototype status.

## 4. Add RTS Lab as one substantial project

Positioning: a Zig simulation laboratory exploring deterministic movement, combat, terrain behavior, and performance.

- [ ] Verify current source and runtime before choosing examples or quoting measurements.
- [ ] Group movement, combat, terrain, and profiling into one case study with focused chapters.
- [ ] Explain fixed ticks, integer state, command ordering, replay hashes, and separation of rendering from simulation in readable language.
- [ ] Show one meaningful design detail, such as simultaneous damage resolution or movement governed by force and terrain.
- [ ] Tell the performance investigation: symptom, measurement, identified cost, cached terrain meshes, and correctness checks.
- [ ] Present historical performance figures with build mode, scene, hardware, sampling method, and date. Rerun only if needed to support a current claim.
- [ ] Include the movement/avoidance experiments as evidence of evaluating tradeoffs, including failed or stalled variants.
- [ ] Make limitations explicit: prototype scope, crowd jostling/stalling, quadratic collision work, and absence of networking/opponent AI where still true.
- [ ] Create a short close-camera capture of movement/combat/terrain. Avoid using a distant diagnostic screenshot as the sole project preview.
- [ ] Produce a readable benchmark chart from verified recorded data, clearly separated from gameplay footage.

Deliverable: one bilingual RTS Lab case study with a visual demonstration and a measured engineering narrative.

## 5. Rewrite the laptop-recommendation entry as SugereAI

Positioning: a recommendation prototype combining editable AI-extracted requirements, local ranking, and normalized marketplace data.

- [ ] Update the existing laptop-recommendation entry rather than creating a duplicate.
- [ ] Correct the stack to React, Vite, TypeScript, Express, PostgreSQL, and Gemini; remove unsupported Next.js and semantic-search claims.
- [ ] Demonstrate the three stages: describe needs, refine interpreted criteria, compare ranked products.
- [ ] Explain which decisions the LLM makes, which the ranking engine makes, and how generated explanations are attached to selected product records.
- [ ] Include a concrete ingestion problem: distinguishing installed RAM from upgrade capacity or SSD capacity in marketplace data.
- [ ] Describe heuristic fit scores as estimates, not validated probabilities or recommendation accuracy.
- [ ] Acknowledge relaxed budget constraints, approximate OS matching, missing specifications, and dependence on catalog freshness.
- [ ] Review the test scripts accurately: recommendation scenarios currently print results; mapping tests contain assertions. Add targeted ranking/constraint assertions if needed to support claims.
- [ ] Capture the Windows application with a reproducible dataset. Clearly identify seeded or stale catalog snapshots; do not present captured prices as current offers.
- [ ] Treat visible error handling, preserved criteria when adjusting a search, and explicit relaxed-constraint labels as small demo-readiness fixes if needed. Broader product development remains separate.

Deliverable: a bilingual SugereAI case study emphasizing decision support and data quality, distinct from Futemon's generation and playback story.

## 6. Keep the portfolio architecture cohesive

- [ ] Retain Next.js App Router, MDX project content, real project routes, and the existing shell.
- [ ] Keep project facts in MDX frontmatter/content; do not introduce parallel hardcoded project registries for the explorer, palette, archive, or previews.
- [ ] Extend the project loader with optional, validated fields only where required, such as curated order and media descriptors.
- [ ] Account for the current custom frontmatter parser's limited syntax. Add focused parser tests for any schema extensions; avoid silently introducing unsupported nested data.
- [ ] Use a small shared case-study layout with a consistent opening: product purpose, contribution, state, key evidence, preview, and deeper development story.
- [ ] Render the existing role information in the shared brief instead of leaving it unused.
- [ ] Extract duplicated locale page structure into shared presentation components where practical, while retaining locale-specific content and metadata.
- [ ] Keep interactive components small and isolated. Server-render the article and basic preview; load optional diagrams/video controls on demand.
- [ ] Make diagrams optional MDX components backed by explicit project-specific data, not project-name conditionals spread through the shell.
- [ ] Preserve old links when renaming slugs through redirects in both languages. Update canonical URLs, sitemap, navigation, and persisted tab handling.
- [ ] Use verified repository/demo URLs only. Missing links should remain absent.

## 7. Build the split “Case study / Preview” editor

- [ ] Introduce a reusable desktop layout pairing the narrative with a preview pane.
- [ ] Support screenshots with captions, short click-to-play recordings, and optional diagrams through consistent media descriptors.
- [ ] Give the reader explicit preview selection; avoid scroll-driven changes that steal focus or restart playback.
- [ ] Offer a clear way to expand a preview or prioritize reading space.
- [ ] Stack the preview and article on narrow screens without duplicating content or shrinking text excessively.
- [ ] Maintain useful content when a project has no preview assets.
- [ ] Use bounded media dimensions, lazy loading, and no autoplay audio. Prefer curated media over embedding a live application by default.
- [ ] Verify keyboard operation, responsive widths, zoom, captions, and reduced-motion behavior.

## 8. Add the Live Trivia interactive architecture diagram

- [ ] Verify the actual message paths in code before drawing the diagram.
- [ ] Show the host/player browser, LiveView, authoritative room processes, PubSub/Presence, and typing Channels at a level useful to a portfolio reader.
- [ ] Let visitors select a scenario such as “Submit an answer,” “Player joins,” or “Typing update.”
- [ ] Highlight the verified path and explain the responsibility of each participating component.
- [ ] Keep typing traffic visually distinct from authoritative game decisions.
- [ ] Label the diagram as an explanatory model, not live telemetry; do not invent latency or traffic measurements.
- [ ] Provide keyboard-accessible controls, text descriptions, and a static/reduced-motion presentation.
- [ ] Implement it within the shared preview/MDX architecture using lightweight SVG/HTML where sufficient. Avoid adding a large graph framework for one small diagram.

Deliverable: a useful interactive explanation that demonstrates the architectural decision behind the product.

## 9. Enhance the command palette

- [ ] Reuse the project loader and navigation data for localized commands.
- [ ] Add richer project results with title, short description, status, and an optional small preview.
- [ ] Improve matching across project names, filenames, technologies, and tags; keep ranking predictable.
- [ ] Group navigation, projects, and actions without overwhelming the initial view.
- [ ] Add context-relevant actions for case-study sections and available previews. Add contact/résumé commands only when real destinations exist.
- [ ] Implement focus containment/restoration, clear keyboard selection, Escape dismissal, and scrolling the selected result into view.
- [ ] Resolve overlapping shortcut handlers and verify empty-result behavior.
- [ ] Preserve click/touch discoverability; shortcuts must remain optional.

## 10. Finish the homepage and visual hierarchy

- [ ] Curate order explicitly: Live Trivia, RTS Lab, SugereAI, Futemon; present Portfolio Workspace as supporting work.
- [ ] Bring strong project evidence closer to the introduction and compress the technical-focus cards.
- [ ] Establish consistent media frames, typography, spacing, and restrained accent colors.
- [ ] Make the IDE chrome quieter than the featured content while retaining recognizable tabs, explorer, breadcrumbs, and status bar.
- [ ] Add a genuine contact route once the user supplies or confirms the intended public destination. Do not invent contact details or availability claims.
- [ ] Fix inert-looking controls, sidebar collapse behavior, mobile drawer dismissal/focus, and tab overflow.
- [ ] Use subtle transitions with reduced-motion support.

Deferred extras: theme picker, simulated terminal, boot animation, particle backgrounds, and broader underlying-project redesigns. Zen mode can be reconsidered after the split editor works well.

## 11. Verification and delivery

- [ ] Run portfolio lint and production build.
- [ ] Test shared content/schema logic, curated ordering, redirects, and navigation where behavior changes.
- [ ] Check both English and Brazilian Portuguese content and routes.
- [ ] Verify desktop, tablet, and phone layouts, keyboard-only use, zoom, focus visibility, and reduced motion.
- [ ] Check direct project URLs, refresh, back/forward navigation, persisted tabs, filters, and command palette actions.
- [ ] Verify captures, captions, alt text, image sizing, and video loading behavior.
- [ ] Review every quantitative claim against its evidence ledger.
- [ ] Report tests actually run, historical evidence reused, and any remaining gaps.
- [ ] Deliver a local reviewable result with a concise change summary before any separate publishing step.

## Suggested execution milestones

1. Evidence baseline and revised Live Trivia story.
2. Futemon and SugereAI replacements plus new RTS Lab content, in both languages.
3. Shared content/layout/schema improvements and route migration.
4. Split editor and consistent project media.
5. Live Trivia diagram and enhanced command palette.
6. Homepage polish, accessibility/responsive checks, and final review.

Each milestone should leave the portfolio buildable and navigable. Prefer completing one representative case study through the shared presentation system before applying that system to all projects.


## Execution checkpoint — 2026-10-20

Completed and committed in separate steps:

- Evidence ledger and bilingual Live Trivia review; unsupported CPU percentage removed.
- Bilingual Futemon, RTS Lab and SugereAI development stories, accurate prototype positioning, curated ordering and redirects from old project URLs.
- Live Trivia rewritten in first person to describe development decisions and experience.
- Shared project page, content validation and localized section anchors.
- Split case-study editor with a sticky preview on wide containers, stacked narrow layouts, capture selection and expanded images.
- Interactive Live Trivia diagram for answers, typing and player presence, clearly labeled as an explanatory model.
- Enhanced command palette with technology matching, result details, contextual section/preview actions, keyboard selection, modal focus containment and Escape dismissal.

Verification: lint, bilingual content/media/redirect checks, navigation matching/anchor checks and production build pass. Browser checks covered desktop sticky previews, expanded captures, architecture interaction, Ctrl+K, technology search, architecture navigation and empty search results.

Additional completed steps: shared bilingual homepage with featured projects immediately after the introduction and compact technical-focus content; workflow previews replacing empty card media; functioning explorer root collapse; native mobile explorer dialog with focus restoration, Escape dismissal, backdrop dismissal and scroll locking. Desktop explorer collapse and the final sticky case-study layout were checked in the browser. Lint, content checks, navigation checks and production build pass.

Still pending: comprehensive mobile/tablet/zoom/reduced-motion and back/forward checks, fresh underlying-project captures where useful, and a real contact destination. RTS Lab runtime location in WSL is unconfirmed; its reused image and performance figures are explicitly historical. No underlying-project benchmarks were rerun.


### Capture follow-up — 2026-10-20

Fresh hero captures added for Live Trivia, Futemon, SugereAI and RTS Lab, with localized alt text and provenance captions. SugereAI additionally includes criteria and result screens. All four were run locally; RTS Lab used its existing Windows executable's built-in smoke capture. Underlying source files were not changed. A closer RTS gameplay capture remains optional, and historical benchmark claims remain separate from this visual verification.
