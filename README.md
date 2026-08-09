# Adyen Emergency Squad (AES) - IT Rescue Team Matcher

**SPD Challenge 2026 - Hackathon Solution**
**Team:** syncx | **Team Code:** TEAM-TPV2FP

---

## 1. Tên và Mô tả ngắn

**Adyen Emergency Squad (AES)** là một nền tảng ghép đội thông minh, sử dụng Agentic AI để tự động xây dựng đội hình IT tối ưu từ ngôn ngữ tự nhiên. Người dùng chỉ cần mô tả yêu cầu bằng văn bản, hệ thống sẽ phân tích và trả về đội hình phù hợp nhất.

## 2. Bài toán giải quyết

Trong các tình huống khẩn cấp về IT (sự cố hệ thống, dự án cần rescue), việc tìm và ghép đội hình phù hợp thường tốn thời gian do phải lọc thủ công qua nhiều tiêu chí: kỹ năng chuyên môn, thời gian rảnh, ngoại ngữ, phong cách làm việc...

**AES** giải quyết bài toán này bằng cách:
- Thay thế các bộ lọc dropdown truyền thống bằng giao diện **Text-to-Team** (nhập ngôn ngữ tự nhiên).
- Tự động bóc tách (parse) yêu cầu thành các ràng buộc có cấu trúc (JSON constraints).
- Áp dụng thuật toán **Generalized Set Cover** kết hợp **AI Semantic Routing** để tìm đội hình tối ưu về chi phí và văn hóa làm việc.

## 3. Danh sách tính năng chính

### 3.1. Text-to-Team (Natural Language Parsing)
Người dùng nhập yêu cầu bằng văn bản tự nhiên:
> *"Cần 1 team tối đa 3 người, rảnh rỗi vào Ca Sáng, chuyên môn là Python và giỏi Tiếng Anh"*

Hệ thống dùng **Gemini API** (kèm Regex fallback phía client) để trích xuất thành JSON constraints: `maxMembers`, `reqSkills`, `reqLangs`, `reqAvail`.

### 3.2. AI Semantic Routing & Ontology Mapping
Khi người dùng yêu cầu các thuật ngữ chung chung như "AI" hay "Web", hệ thống không khớp chuỗi đơn giản mà sử dụng AI để ánh xạ ngữ nghĩa sang các tag chính xác trong cơ sở dữ liệu (VD: `"AI"` → `["RAG", "Machine Learning"]`).

### 3.3. Generalized Set Cover Algorithm
Engine ghép đội hai giai đoạn:
- **Giai đoạn 1 (Pre-processing):** Loại ứng viên không đáp ứng ràng buộc giao (thời gian, ngoại ngữ).
- **Giai đoạn 2 (Backtracking & Scoring):** Tìm kiếm tổ hợp đội hình sao cho toàn đội bao phủ 100% kỹ năng yêu cầu, tối ưu hóa theo Multi-tasking bonus và Culture Fit score.

### 3.4. Agentic Pipeline UI & Data Visualization
- Terminal mô phỏng pipeline AI (NLP Agent → Combinatorial Agent → Culture Fit Agent → Gemini AI Agent).
- Dashboard hiển thị các Progress Bar: Tech Coverage, Cost Efficiency, Culture Fit Score.
- Gemini LLM tổng hợp báo cáo giải thích lý do chọn đội hình.

### 3.5. Interactive PixelBlast Background
Hiệu ứng nền WebGL (Three.js + Shader) với Bayer dithering và ripple waves khi click, tạo trải nghiệm thị giác sinh động.

## 4. Công nghệ và phụ thuộc

| Công nghệ | Mục đích |
|---|---|
| **Next.js 14** (App Router) | Framework fullstack (SSR + API Routes) |
| **React 18** | UI component library |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Shadcn UI** | Component primitives (Button, Card, Badge, Label, Input) |
| **Framer Motion** | Animation & transitions |
| **Google Gemini API** | NLP parsing & reasoning report generation |
| **Three.js + Postprocessing** | WebGL background effects (PixelBlast) |
| **Mock Data (JSON)** | 40 candidate profiles với multi-variable attributes |

**Design System:** Tuân thủ Adyen Design Constraints — `#001222` Dark Canvas, `#00d16a` Mint Voltage, `6px` border radius, JetBrains Mono labels.

## 5. Hướng dẫn cài đặt và chạy dự án

### Yêu cầu
- Node.js >= 18
- npm hoặc bun

### Các bước

```bash
# 1. Clone repository
git clone https://github.com/thiendt1608/spd-challenge.git
cd spd-challenge

# 2. Di chuyển vào thư mục source
cd source

# 3. Cài đặt dependencies
npm install

# 4. Tạo file .env với Gemini API key (nếu muốn dùng AI features)
echo "GEMINI_API_KEY=your_api_key_here" > .env

# 5. Chạy development server
npm run dev

# 6. Mở trình duyệt
# Landing Page:      http://localhost:3000
# Manager Dashboard: http://localhost:3000/dashboard
```

### Build production

```bash
npm run build
npm start
```

## 6. Cấu trúc thư mục

```
spd-challenge/
├── README.md                          # File này
├── submission.json                    # Metadata nộp bài
├── PLAN.md                            # Kế hoạch thực hiện
├── IMPLEMENTATION_GUIDE.md            # Hướng dẫn triển khai chi tiết
├── chatlog.md                         # Lịch sử prompt & response
├── SPD-Challenge-2026-Official-Problem.md  # Đề bài gốc
│
└── source/                            # Mã nguồn chính (Next.js project)
    ├── package.json
    ├── tailwind.config.ts             # Cấu hình Tailwind + Adyen design tokens
    ├── next.config.mjs
    ├── tsconfig.json
    │
    └── src/
        ├── app/
        │   ├── layout.tsx             # Root layout
        │   ├── page.tsx               # Landing page (Marketing)
        │   ├── globals.css            # Global styles + CSS variables
        │   ├── dashboard/
        │   │   ├── layout.tsx         # Dashboard layout (header + sticky nav)
        │   │   └── page.tsx           # Manager Portal (Text-to-Team UI)
        │   └── api/
        │       ├── parse-prompt/
        │       │   └── route.ts       # API: Gemini NLP parsing
        │       └── generate-reasoning/
        │           └── route.ts       # API: Gemini reasoning report
        │
        ├── components/
        │   ├── SetupForm.tsx          # Form nhập prompt ngôn ngữ tự nhiên
        │   ├── ResultBoard.tsx        # Bảng kết quả đội hình + metrics
        │   ├── CandidateGrid.tsx      # Grid hiển thị pool ứng viên
        │   ├── ErrorAlert.tsx         # Component thông báo lỗi
        │   ├── adyen/                 # Components theo Adyen Design System
        │   │   ├── SectionBand.tsx    # Layout section (dark/light variant)
        │   │   ├── AdyenButton.tsx    # Button component
        │   │   └── MonoEyebrow.tsx    # Label eyebrow (JetBrains Mono)
        │   ├── layout/
        │   │   └── TopNav.tsx         # Navigation bar (Landing page)
        │   └── ui/                    # Shadcn UI primitives + effects
        │       ├── PixelBlast.jsx     # WebGL background effect
        │       ├── PixelBlast.css
        │       ├── button.tsx
        │       ├── card.tsx
        │       ├── badge.tsx
        │       ├── label.tsx
        │       └── input.tsx
        │
        ├── hooks/
        │   └── useTeamMatching.ts     # Core logic: parsing + matching + scoring
        │
        ├── data/
        │   └── candidates.json        # 40 candidate profiles (mock data)
        │
        └── lib/
            └── utils.ts               # Utility functions (cn helper)
```

## 7. Đội ngũ phát triển

### Team syncx

| Thành viên | Vai trò |
|---|---|
| **Nguyễn Quang Linh** | Frontend Developer & UI/UX — Thiết kế giao diện, xây dựng Design System theo chuẩn Adyen, triển khai Landing Page và Dashboard UI |
| **Nguyễn Nho Chí Thiện** | Backend Developer & AI Engineer — Xây dựng thuật toán Set Cover, tích hợp Gemini API, thiết kế pipeline NLP parsing và matching engine |
