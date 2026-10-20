# Portfolio evidence ledger

Reviewed 2026-10-20. Source inspection is distinct from runtime verification.

## Live Trivia

Source: /home/iago/workspace/live_trivia, revision b4ec86d.
- player_live.ex calls Game.submit_guess; bubble broadcasts are separate.
- game.ex owns room state, timers, scoring and PubSub state broadcasts.
- typing_channel.ex normalizes and broadcasts typing payloads outside game decisions.
- Existing captures are retained historical product views.
- Removed the unqualified ~0.7% CPU assertion: reviewed evidence does not establish the stated Oracle result with sufficient measurement context.

## Futemon

Source: /home/iago/workspace/futemon.
- match_analysis.go: local attribute/type-based matchup analysis.
- llm.go and simulation.go: generation, fallback, validation, normalization, event-derived scores.
- match_renderer.go and static/app.js: timed narration, synchronization and replay.
- sqlite_store.go and tests: team history, transfers, limits and persistence.
- Uses Go HTML templates, not Templ. No embedding search found.

## RTS Lab

Inspected Windows copy: F:/Users/Iago/Documents/workspace/rts-lab.
- User identifies active runtime as WSL; no checkout found under /home/iago/workspace or /home/iago/test at searched depth. Current runtime remains unverified.
- sim.zig, combat.zig, terrain.zig: fixed ticks, command validation, simultaneous damage and terrain.
- verify-replay.ps1 compares independent replays across three build modes.
- docs/PERFORMANCE.md and linked JSON record a 2026-09-27 profile on RTX 3060 Ti, 150-unit scenes, uncapped one-tick-per-frame sampling.
- Dense ReleaseSafe median: 5.331 ms before / 1.487 ms after. Historical results, not fresh measurements or a scalability guarantee.
- Diagnostic captures copied into portfolio are labeled historical.

## SugereAI

Source: F:/Users/Iago/Documents/Senac/SugereAI/sugereai, Windows runtime.
- server.ts: interpretation, normalization/fallback, post-ranking explanation enrichment.
- recommendationEngine.ts: heuristic ranking with relaxed constraints; scores are not probabilities.
- Mapping tests assert RAM/storage regressions. Recommendation script prints scenarios, not ranking assertions.
- App.tsx: editable criteria; request errors currently log to console.
- React/Vite/TypeScript/Express/PostgreSQL, not Next.js.

## Baseline

Portfolio lint and production build passed before changes on 2026-10-20. Underlying project tests and historical benchmarks have not been rerun. Diagrams are explanatory models, not telemetry. Do not use placeholder artwork as product evidence.
