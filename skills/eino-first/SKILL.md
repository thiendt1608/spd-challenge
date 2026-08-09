---
name: eino-first
description: >
  BẮT BUỘC đọc TRƯỚC mọi việc đụng backend chat/agent Go (services/<ten>, services/<ten>,
  tools, guardrails, kernel/prompt, hành vi bot). Hệ thống build 100% trên eino framework
  (CloudWeGo) — KHÔNG tự chế regex/string post-process / hardcode thay cho eino primitive.
  Skill = doctrine + bản đồ eino↔code + pattern chuẩn (terminal reply tool với
  ToolReturnDirectly, tool-side state gate, confirm-before-action) + nguồn tra cứu
  (docs/eino, third_party/eino-examples). Dùng khi: "fix hành vi bot", "thêm tool",
  "đổi prompt/kernel", "guardrail", "eino", "ReAct", "build backend chat/agent".
---

# eino-first — build hệ thống chat/agent 100% bằng eino framework

## ⛔ MANDATE (bất biến)
Backend Go (`services/<ten>`, `services/<ten>/tools`,
`services/<ten>/guardrails`) chạy trên **eino core** (CloudWeGo, pin version trong
`docs/eino/README.md`). Mọi fix hành vi / format / luồng bot đi theo
**data → prompt → eino primitive**. TUYỆT ĐỐI KHÔNG:
- regex/split/string post-process để **sửa NỘI DUNG/semantic** output. LƯU Ý: split theo marker `[[SPLIT]]`/blank-line + `stripMarkdown` = presentation-layer HỢP LỆ (boundary do LLM tự đặt, chỉ bóc marker widget không render) — KHÔNG phải cái bị cấm; ghi quyết định vào `docs/DECISIONS.md`;
- hardcode business value trong Go (kernel/prompt/config sống ở `services/<tên>/migrations/*.up.sql`);
- đoán API eino — tra `docs/eino/` + `third_party/eino-examples/` TRƯỚC (skill `lib-docs-fetch`).
Guardrail deterministic CHỈ numeric/state (đếm/cờ), KHÔNG sanitize prose.

## eino ↔ code (bản đồ; chi tiết `docs/eino/how-we-use-eino.md`)
| eino primitive | code | vai trò |
|---|---|---|
| `flow/agent/react` `react.NewAgent` | `services/<ten>/pipeline.go` | vòng ReAct 1 model ⇄ tools (`agent.Generate`) |
| `react.AgentConfig.ToolReturnDirectly` | pipeline.go | tool kết thúc lượt + trả thẳng output (vd terminal reply tool) |
| `components/tool` + `tool/utils.InferTool` | `services/<ten>/tools/*` | mỗi tool = `InvokableTool`, args = JSON-schema từ struct tag |
| `compose.ToolsNodeConfig` | pipeline.go | bộ tool theo allowlist (`tools.Select`) |
| `components/model` + `eino-ext/.../{openai,gemini}` | `services/<ten>/models/factory.go` | ChatModel theo provider |
| `schema` Message/ToolInfo | engine/* | SystemMessage(kernel+state+context) + history |
| per-turn `Memory` (cột JSONB trong bảng sessions) | `services/<ten>/process.go` | "checkpoint" tự quản (eino compose interrupt/checkpoint CHƯA wire) |
| `replyMode` (graph agent-node) | `services/<ten>/pipeline.go` | 2 path reply: **prose** → react end-on-message → `splitBubbles`+`stripMarkdown` (chat layer); **tool** → terminal reply tool + `ToolReturnDirectly` verbatim |

## Pattern chuẩn (tái dùng — KHÔNG chế mới)
1. **Reply bubbles — 2 modality theo `replyMode`:** (a) **prose** — react end-on-message → `splitBubbles` (split theo marker `[[SPLIT]]`/blank-line do LLM tự đặt) + `stripMarkdown` = presentation-layer hợp lệ; (b) **tool** — synthetic reply tool + `ToolReturnDirectly`, engine render verbatim. Boundary LUÔN do LLM quyết; KHÔNG re-add heuristic tách câu.
2. **An toàn deterministic = tool-side state gate** (numeric/state, surfaced qua ReAct feedback loop): tool trả `Reason:"NEED_X"` + Message hướng dẫn → model đọc kết quả tool → hành động đúng ở lượt sau. Mẫu trong `services/demo/tools/example_tool.go`:
   - `MISSING_INPUT` (thiếu field bắt buộc → chưa tạo);
   - idempotency (`sig` = khoá nghiệp vụ + window) → KHÔNG tạo trùng;
   - `ClaimOnce("<tên action>")` → tối đa 1 create/lượt;
   - **confirm-before-create**: state có `ConfirmAt` — lần create đầu trả `NEED_CONFIRM` (echo lại input đã hiểu, "đúng không?"), KHÔNG tạo; lượt sau người dùng xác nhận → tạo 1 lần. Đây là "human-confirm-before-action" eino-native cho kiến trúc per-turn (thay cho eino interrupt/checkpoint chưa wire); cùng họ với order-gate bên dưới.
3. **Order gate** (buộc tool A trước tool B cùng lượt): tool B đòi kết quả tool A qua `st.Snapshot()`, thiếu → trả `NEED_<A>`.
4. **Steer hành vi = kernel/prompt (DB) + tool description**, KHÔNG Go logic. Sửa = migration `replace()` trên bảng prompt (skill `encore-migrations`).

## Khi thêm/sửa (quy tắc quyết định)
- Tool mới → `utils.InferTool[In]` + struct `jsonschema` tag; add `tools.Registry()` + allowlist (migration). Terminal/reply-delivery → cân nhắc `ToolReturnDirectly`.
- Cần "xác nhận trước khi hành động" / chống trùng / chặn theo điều kiện → **tool-side state gate** (mẫu confirm-before-create), KHÔNG prompt-only (prompt dễ "detect-but-not-correct").
- Cần multi-agent thật (supervisor / plan-execute) → `docs/eino/adk-patterns.md` + ADR trước.

## Verify (BẮT BUỘC — build/typecheck KHÔNG đủ)
Chạy thật một lượt end-to-end rồi đọc **trace tool-call** (bảng trace: `tool_calls`) + state đã ghi (`record_ids`), KHÔNG dựa vào reply/screenshot. Bằng chứng "tool đã fire" và "không tạo trùng" phải đến từ trace/DB.

## Nguồn (lib-docs-fetch)
`docs/eino/`: `README.md` (pin + map) · `core-api-pinned.md` (sinh bằng `go doc`, trust 100%) · `how-we-use-eino.md` · `adk-patterns.md`. `third_party/eino-examples/` (quickstart/flow/compose/adk/components).
Ưu tiên: module-cache `go doc github.com/cloudwego/eino/<pkg>` > repo tag đang pin > cloudwego.io / context7 > pkg.go.dev. Blog = direction only, KHÔNG phải chuẩn API.

## Encore (build case đúng)
Patterns Encore ↔ code (chi tiết skill `encore-migrations`):
- **Config/knob:** seed bảng runtime-config qua migration `services/<tên>/migrations/NN_*.up.sql` (`ON CONFLICT (key) DO UPDATE SET description`) + đọc `RuntimeString/RuntimeInt(ctx, key, default)`. Setter runtime CHỈ UPDATE key có sẵn → **knob MỚI BẮT BUỘC có seed migration**. Business value (giá/model/persona) → DB, KHÔNG hardcode Go.
- **Async sau reply:** `pubsub` topic fire-and-forget SAU khi publish reply (reply-first perceived-latency); cân nhắc kỹ competing-consumer nếu chạy trên push-based serverless.
- **Secrets:** khoá LLM = `encore secret set <Name>` + đọc qua secret struct, KHÔNG hardcode.
- **Verify/deploy:** build gate `encore check` (KHÔNG `go build` — codegen artifact); soi DB qua `encore db shell <db>`; deploy theo pipeline CI của repo.
