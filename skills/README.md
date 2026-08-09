# skills/ — bộ kỹ năng cho agent làm việc trên repo này

27 skill, mỗi skill là một thư mục `<tên>/SKILL.md` (kèm `references/`, `scripts/` nếu có).
Frontmatter YAML (`name`, `description`) là phần agent đọc để quyết định có nạp skill hay không.

Cấu trúc repo mà các skill tham chiếu tới:

| Thư mục | Nội dung |
|---|---|
| `pkg/mcp/` | framework MCP stdio thuần stdlib |
| `plugins/<tên>/` | binary MCP stdio (1 plugin = 1 binary) |
| `services/<tên>/` | Encore service (kèm `migrations/`) |
| `scripts/`, `docs/` | tooling và tài liệu (ADR, snapshot doc thư viện) |

Cách dùng: bắt đầu ở `using-agent-skills` → nó chỉ ra skill phù hợp với việc đang làm.

---

## Tầng 1 — CORE (luôn áp dụng, đọc trước khi gõ dòng code đầu tiên)

| Skill | Dùng khi nào | Một câu |
|---|---|---|
| `karpathy-guidelines` | Trước MỌI task code không tầm thường | Kỷ luật kỹ thuật: đọc trước khi ghi, test trước khi refactor, bước nhỏ, nhàm chán là tốt, xoá nhiều hơn thêm. |
| `ponytail` | Khi thấy mình sắp viết nhiều code / thêm dependency | Ép ra lời giải lười nhất mà vẫn chạy: hỏi task có cần tồn tại không, stdlib trước, tính năng native trước dependency. |
| `codegraph` | Mọi câu hỏi "X định nghĩa ở đâu / cái gì gọi Y / subsystem này chạy sao" | Tìm kiếm code theo ngữ nghĩa qua chỉ mục `.codegraph/` — định vị trước, đọc file sau, rẻ hơn grep/đọc cả file. |
| `using-agent-skills` | Đầu mỗi phiên làm việc, hoặc khi không biết dùng skill nào | Meta-skill: cây quyết định phase → skill, cộng các hành vi vận hành bắt buộc (nêu giả định, không nịnh, giữ đúng scope). |

## Tầng 2 — SPECIALIST Go stack (Encore + eino)

| Skill | Dùng khi nào | Một câu |
|---|---|---|
| `eino-first` | BẮT BUỘC trước mọi việc đụng runtime chat/agent (`services/<ten>`, tools, guardrails, prompt) | Doctrine "data → prompt → eino primitive": bản đồ eino ↔ code, pattern chuẩn (ToolReturnDirectly, tool-side state gate, confirm-before-action), cấm regex post-process và hardcode business value. |
| `eino-examples` | Cần mẫu code Eino thật, biên dịch được: ReAct loop, handoff, follow-up, session, RAG, SSE, multi-agent, human-in-the-loop | Bản đồ "vấn đề → thư mục ví dụ" trong submodule `third_party/eino-examples`, kèm cách cập nhật/pin submodule và luật trích pattern (không copy nguyên khối). |
| `lib-docs-fetch` | Không chắc shape API của Eino/eino-ext/encore.dev/lib bất kỳ, thêm lib mới, hoặc bump version rồi build fail | Thứ tự nguồn trust ≥90% (module cache → repo tag → docs chính chủ → context7 → pkg.go.dev) + luật cache snapshot vào `docs/eino/`. |
| `encore-migrations` | Mọi thay đổi schema/seed/config DB trong Encore service | Encore chỉ chạy file `.up.sql` MỚI đúng một lần → sửa tại chỗ = prod trôi khỏi git; hai đường hợp lệ (thêm migration mới, hoặc squash + reset) kèm gate tự verify. |

## Tầng 3 — ON-DEMAND (gọi theo pha công việc)

| Skill | Dùng khi nào | Một câu |
|---|---|---|
| `spec-driven-development` | Bắt đầu project/feature/thay đổi lớn mà chưa có spec, hoặc yêu cầu còn mơ hồ | Viết spec + acceptance criteria trước khi viết code. |
| `planning-and-task-breakdown` | Đã có spec, cần chia việc; hoặc task lớn tới mức không biết bắt đầu từ đâu | Bẻ thành các task nhỏ có thứ tự và verify được, nhận ra phần chạy song song được. |
| `context-engineering` | Mở phiên mới, chất lượng output tụt, hoặc chuyển task | Nạp đúng ngữ cảnh vào đúng lúc, cấu hình rules file cho dự án. |
| `incremental-implementation` | Thay đổi chạm hơn một file, hoặc sắp viết một lượng code lớn | Lát cắt dọc mỏng: mỗi lát chạy được và test được trước khi mở rộng. |
| `source-driven-development` | Cần code có trích dẫn nguồn, tránh pattern lỗi thời của framework | Mọi quyết định implement phải neo vào tài liệu chính chủ, kèm link nguồn trong comment. |
| `doubt-driven-development` | Việc rủi ro cao, code lạ, thao tác không thể hoàn tác, hoặc output "trông đúng quá" | Đưa mọi quyết định không tầm thường qua một reviewer fresh-context có tính đối kháng trước khi chốt. |
| `api-and-interface-design` | Thiết kế API, ranh giới module, contract kiểu dữ liệu giữa các thành phần | Interface ổn định với contract rõ ràng và đường tiến hoá không phá vỡ client. |
| `test-driven-development` | Viết logic mới, sửa bug, đổi hành vi | Test đỏ trước, code cho xanh sau; test bảo vệ hành vi quan sát được chứ không phải chi tiết nội bộ. |
| `debugging-and-error-recovery` | Test fail, build vỡ, hành vi lệch kỳ vọng | Quy trình hệ thống: tái hiện → khoanh vùng → sửa gốc → chốt bằng test chặn tái phát. |
| `code-review-and-quality` | Trước khi merge bất kỳ thay đổi nào | Review đa trục (đúng đắn, thiết kế, bảo mật, hiệu năng, khả năng bảo trì) kèm quality gate. |
| `code-simplification` | Code chạy đúng nhưng khó đọc/khó sửa, hoặc đã tích tụ độ phức tạp thừa | Giảm phức tạp mà giữ nguyên hành vi. |
| `security-and-hardening` | Xử lý input người dùng, auth, lưu trữ dữ liệu, tích hợp bên thứ ba | Chống lỗ hổng theo OWASP: validate input, least privilege, coi mọi dữ liệu ngoài là không tin cậy. |
| `performance-optimization` | Có yêu cầu hiệu năng, nghi ngờ regression, hoặc profiling chỉ ra nút thắt | Đo trước, chỉ tối ưu cái thực sự đáng, chứng minh bằng số. |
| `observability-and-instrumentation` | Ship thứ gì đó chạy production và cần bằng chứng nó hoạt động | Log có cấu trúc, metric RED, trace, alert theo triệu chứng — cài đặt song song lúc build chứ không phải sau. |
| `git-workflow-and-versioning` | Mọi lần commit, tạo nhánh, xử lý conflict | Commit nguyên tử, lịch sử sạch, versioning nhất quán. |
| `ci-cd-and-automation` | Dựng/sửa pipeline build & deploy | Tự động hoá quality gate trên mọi thay đổi, cấu hình test runner và chiến lược deploy. |
| `deprecation-and-migration` | Gỡ hệ thống/API/feature cũ, di chuyển người dùng sang implementation mới | Quy trình khai tử an toàn: thông báo, đường song hành, cắt dứt điểm, không để lại shim. |
| `documentation-and-adrs` | Ra quyết định kiến trúc, đổi public API, ship feature | Ghi lại "tại sao" dưới dạng ADR để người sau không phải đoán. |
| `docker` | Cần chạy code lạ/thí nghiệm trong môi trường cô lập | Chạy trong container sandbox, mount workspace, kết quả sync ngược về host. |

---

## Quy ước

- Skill là **workflow**, không phải gợi ý: làm đúng thứ tự các bước, không bỏ bước verify.
- Nhiều skill có thể áp dụng cùng lúc; chuỗi điển hình cho một feature nằm ở mục *Lifecycle Sequence* trong `using-agent-skills`.
- Không chắc bắt đầu từ đâu → `spec-driven-development`.
