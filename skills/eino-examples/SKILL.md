---
name: eino-examples
description: >-
  Use when enhancing or debugging an Eino agent runtime (services/<ten>) and you need a REAL, compilable Eino reference — agent loop (ReAct), tool-calling, agent transfer/handoff, multi-turn info-gathering (follow-up), session/memory, RAG, streaming SSE, multi-agent/supervisor, human-in-the-loop. Pairs with `lib-docs-fetch` + `docs/eino/`: docs explain the API, this skill points at WORKING code in the vendored `third_party/eino-examples/` submodule (cloudwego/eino-examples). Consult BEFORE inventing an Eino ADK/compose pattern from memory.
---

# eino-examples — vendored CloudWeGo reference for agent enhancement

Real, compilable Eino code lives in the git submodule **`third_party/eino-examples/`** (upstream `https://github.com/cloudwego/eino-examples`). It is the ground truth for "how does a production Eino agent actually do X".

## Track / update the submodule

```bash
# first checkout on a fresh clone (submodule already registered in .gitmodules):
git submodule update --init third_party/eino-examples
# pull the latest upstream snapshot (do this when you need newer patterns):
git submodule update --remote --merge third_party/eino-examples
# pin: commit the bumped submodule pointer so the team gets the same revision.
```

The repo index is **`third_party/eino-examples/COOKBOOK.md`** (bilingual table of every example → path + 1-line purpose). Open it FIRST, then read the exact example dir.

## Topic → path map (what to read for which problem)

| Agent concern | Eino example (`third_party/eino-examples/…`) |
|---|---|
| Agent loop / tool-calling (the core runtime) | `flow/agent/react/` (+ `react/tools`, `react/memory_example`) |
| **Unknown tool / no-info → graceful path** | `flow/agent/react/unknown_tool_handler_example/` |
| **Handoff / transfer to a specialist agent** | `adk/intro/transfer/` (+ `adk/intro/transfer/subagents`) |
| **Multi-turn info gathering without nagging** | `adk/human-in-the-loop/4_follow-up/` (detect missing info → ask, then proceed) |
| Approval / review before a sensitive write | `adk/human-in-the-loop/1_approval`, `2_review-and-edit` |
| Session / cross-turn state (per-turn memory parity) | `adk/intro/session/` |
| Conversation summary (returning user topic) | `adk/intro/agent_with_summarization/` |
| Streaming SSE (streaming turn parity) | `adk/intro/http-sse-service/` |
| RAG retriever wiring | `quickstart/chatwitheino/rag/`, `quickstart/eino_assistant/` |
| Tool authoring (search-style tools) | `components/tool/`, `flow/agent/react/tools` |
| Supervisor / multi-agent routing | `adk/multiagent/`, `flow/agent/multiagent/{host,plan_execute}` |
| Custom agent contract | `adk/intro/custom/` |

## How to use it (grounding rule)

1. Hit a "how should the Eino agent do X" question → open `COOKBOOK.md`, find the row, **read that example's `.go` files** (compare `third_party/eino-examples/go.mod` against the root `go.mod` to see how far the versions drift).
2. Cite the example `path:line` in your reasoning, the same way `codegraph` / `docs/eino` citations work.
3. If the example uses a newer Eino API than the root `go.mod` pins, verify against `docs/eino/core-api-pinned.md` (`go doc`, trust 100%) before adopting — examples track `main`, the backend is pinned.
4. NEVER copy an example wholesale into `services/` — extract the PATTERN (loop shape, transfer wiring, follow-up gating) and apply it to the existing structure (kernel data → prompt → Eino primitive), per the LLM-first rule.

## Boundaries

- Reference only — **do not import** `third_party/eino-examples/*` from `services/` (separate go module).
- Examples inform internal engine/agent design, never a published wire contract.
