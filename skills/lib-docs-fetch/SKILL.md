---
name: lib-docs-fetch
description: >-
  Auto-fetch tài liệu API từ nguồn trust cao cho Eino và các dependency Go khác. Dùng khi
  không chắc shape của một API (Eino, eino-ext, encore.dev, lib bất kỳ trong go.mod), khi
  thêm lib mới, khi bump version và build fail, hoặc khi cần refresh snapshot doc trong
  `docs/eino/`. MANDATE: không đoán API — fetch từ nguồn ưu tiên, cache snapshot, rồi mới code.
---

# lib-docs-fetch — Auto-fetch docs từ nguồn trust cao (Eino & deps Go)

> **Triggers:** "cập nhật doc eino", "eino doc", "fetch docs", API Eino/eino-ext không chắc shape, lib mới vào `go.mod`, build lỗi sau khi bump version lib.
>
> **MANDATE:** KHÔNG BAO GIỜ đoán API shape của Eino hay lib ngoài. Khi không chắc → fetch từ nguồn trust ≥90% bên dưới (theo thứ tự), cache snapshot, rồi mới code. Blog/medium/stackoverflow = trust thấp, chỉ tham khảo hướng, không lấy làm chuẩn API.

## 0. Version pin — đọc TRƯỚC khi fetch

Nguồn chuẩn version: `go.mod` ở gốc repo (eino, `eino-ext/.../gemini`, `eino-ext/.../openai`, `encore.dev`…). Mọi doc fetch phải khớp tag/version đang pin — doc của main branch có thể lệch API so với version trong `go.mod`.

## 1. Nguồn trust ≥90% (thứ tự ưu tiên)

| # | Nguồn | Cách lấy | Dùng khi |
|---|---|---|---|
| 1 | **Source thật trong module cache** (trust 100%) | subagent `librarian` — đọc thẳng source lib đã resolve theo go.mod; hoặc `go doc github.com/cloudwego/eino/<pkg>.<Symbol>` | Câu hỏi API chính xác (signature, behavior, edge case) — **mặc định dùng cái này** |
| 2 | **Repo chính chủ** github.com/cloudwego/eino (+ `eino-ext`, `eino-examples`) | `read` URL `https://github.com/cloudwego/eino/tree/<tag đang pin>` (đúng tag!), release notes `https://github.com/cloudwego/eino/releases` | Đọc README/design doc/examples, diff khi bump version |
| 3 | **Docs chính chủ CloudWeGo** | `read` `https://www.cloudwego.io/docs/eino/` (overview, core_modules, ecosystem) | Khái niệm/kiến trúc (Chain/Graph/ReAct/Callbacks/Schema) |
| 4 | **context7** (LLM-formatted dump) | `read` `https://context7.com/cloudwego/eino/llms.txt` (+ `?topic=<chủ đề>`; tương tự cho `cloudwego/eino-ext`) | Cần dump cô đọng nhiều API một lúc cho 1 chủ đề |
| 5 | **pkg.go.dev** | `read` `https://pkg.go.dev/github.com/cloudwego/eino@<tag>/<pkg>` | API reference versioned, godoc render sẵn |

Áp dụng y hệt cho lib khác trong go.mod (encore.dev → `https://encore.dev/docs/go`, pgvector-go, jsonschema…): luôn ưu tiên #1 source thật.

## 2. Cache snapshot — `docs/eino/`

- Fetch xong, lưu phần ĐÃ DÙNG (không dump cả site) vào `docs/eino/<YYYY-MM-DD>-<chủ-đề>.md`, header ghi: nguồn URL + version/tag + ngày fetch.
- Trước khi fetch mới: check cache đã có chưa (`find docs/eino/`) — cache hit + version khớp `go.mod` = dùng luôn, khỏi fetch.
- Bump version lib trong `go.mod` → cache cũ coi như STALE cho symbol bị đổi: fetch release notes diff giữa 2 tag trước, chỉ refresh chủ đề bị ảnh hưởng.

## 3. Recipe nhanh

```bash
# 1. Hỏi sâu hành vi/internals (trust 100%, source-verified):
#    → spawn librarian: "Đọc github.com/cloudwego/eino <tag>: <câu hỏi>. Trả lời kèm path:line."

# 2. API signature nhanh (source local):
go doc github.com/cloudwego/eino/compose.NewGraph

# 3. Dump chủ đề từ context7 (read tool, KHÔNG curl):
#    read https://context7.com/cloudwego/eino/llms.txt?topic=react+agent

# 4. Diff khi bump version:
#    read https://github.com/cloudwego/eino/compare/<tag-cũ>...<tag-mới>
```

## 4. Anti-patterns

- Code theo trí nhớ model về Eino API (API đổi nhanh giữa minor versions) → build fail/behavior lệch.
- Fetch doc main branch trong khi `go.mod` pin tag cũ.
- Dump cả website vào cache (chỉ lưu phần dùng, có header nguồn).
- Lấy blog bên thứ ba làm chuẩn API thay vì source/godoc.
