# Hướng dẫn Triển khai Chi tiết (Implementation Guide)
**Tech Stack:** Next.js (App Router) + Tailwind CSS + Shadcn UI
**Design System:** Adyen Marketing (Dark Canvas `#001222`, Mint Voltage `#00d16a`, 6px Radius)

---

## 1. Ràng buộc Thiết kế (Adyen Design Constraints)
Để áp dụng đúng spec của `adyen.design.md`, toàn bộ UI phải tuân thủ nghiêm ngặt các quy tắc sau:
- **Màu sắc (Colors):**
  - Cực kỳ hạn chế màu Mint (`#00d16a`). Chỉ dùng cho Nút bấm chính (Primary CTA) và Dấu chấm chỉ báo (Indicator dot).
  - Nền tối (Dark Canvas) phải dùng mã `#001222` (Navy-leaning black), tuyệt đối không dùng `#000000`.
- **Hình khối (Shapes):**
  - **MỌI THỨ** (Button, Input, Card) đều phải bo góc chính xác **6px**. Không dùng bất kỳ mức radius nào khác.
- **Typography:**
  - Font chữ chính (Sans): Dùng **Inter Variable** (thay thế cho font Adyen).
  - Font chữ ghim/nhãn (Mono): Dùng **JetBrains Mono** (thay cho AdyenMono). Luôn set `12px`, `uppercase`, và `tracking-0`.
- **Giao diện (Layout):**
  - Không đổ bóng (No shadows). Chiều sâu được tạo ra bằng độ tương phản giữa nền tối và sáng.

---

## 2. Kế hoạch Triển khai Siêu nhỏ (Granular Breakdown)

### Phase 1: Khởi tạo Project & Cấu hình Tailwind/Shadcn
- [ ] **1.1 Init Next.js:** Chạy lệnh `npx create-next-app@latest source` (dùng TypeScript, Tailwind, App Router).
- [ ] **1.2 Cài đặt Fonts:** Mở `app/layout.tsx`, import `Inter` và `JetBrains_Mono` từ `next/font/google`. Áp dụng vào thẻ `<body>`.
- [ ] **1.3 Cấu hình Tailwind (`tailwind.config.ts`):** 
  - Khai báo colors: `adyen-mint: '#00d16a'`, `adyen-canvas: '#001222'`, `adyen-light: '#f4f5f6'`.
  - Khai báo borderRadius: `adyen: '6px'`.
- [ ] **1.4 Init Shadcn UI:** Chạy `npx shadcn-ui@latest init`. Cấu hình style `default`, base color `slate`.
- [ ] **1.5 Ghi đè Shadcn UI:** Mở `globals.css`, tìm biến `--radius` đổi hết thành `0.375rem` (tương đương 6px) để ép Shadcn tuân thủ Adyen shapes.

### Phase 2: Xây dựng Adyen Base Components (UI Kit)
- [ ] **2.1 Component `MonoEyebrow`:** Tạo thẻ text 12px, font JetBrains Mono, IN HOA. Kèm theo một hình vuông nhỏ 8x8px màu `#00d16a` đặt sát đầu dòng.
- [ ] **2.2 Component `AdyenButton`:** Bọc lại Shadcn Button. Set mặc định bg `#00d16a`, text đen `#001222`, bo góc 6px, hover không đổi màu (hoặc tối đi rất nhẹ).
- [ ] **2.3 Component `HeroBand` & `SectionBand`:** Tạo wrapper components. Một cái có nền `#001222` chữ trắng, một cái nền trắng chữ `#001222`. Padding dọc cực lớn (tối thiểu 72px đến 240px).

### Phase 3: Thuật toán & Dữ liệu (Core Logic)
- [ ] **3.1 Tạo Mock Data:** Tạo file `source/data/candidates.json` chứa mảng 20 object (id, name, avatar, skills[]).
- [ ] **3.2 Xây dựng Custom Hook `useTeamMatching`:**
  - Viết thuật toán Vét cạn (Backtracking/Combinations).
  - Input: Danh sách `candidates`, mảng `requiredSkills`, số `maxMembers`.
  - Output: `matchedTeam` (mảng người dùng) hoặc `error` (chuỗi báo lỗi cụ thể như "Thiếu kỹ năng X").

### Phase 4: Xây dựng Giao diện MVP (Dựa trên Adyen Layout)
- [ ] **4.1 Layout chính:** Chia màn hình. Nửa trên (Hero) dùng nền Dark `#001222`, chứa Tiêu đề và Form. Nửa dưới dùng nền Light hiển thị Kho ứng viên và Kết quả.
- [ ] **4.2 Form Cấu hình (Project Setup):** 
  - Đặt trong Hero Band.
  - Sử dụng Shadcn `Input` và `Badge` (bo góc 6px) để người dùng nhập/xóa kỹ năng yêu cầu và giới hạn số người.
- [ ] **4.3 Nút Call-to-Action:** Đặt một nút `AdyenButton` "Tạo Đội Hình" to rõ dưới Form.
- [ ] **4.4 Kho Ứng viên (Candidate Grid):** Hiển thị danh sách 20 người dưới dạng Grid Card nền trắng/xám nhạt (`#f4f5f6`), bo góc 6px, border mỏng.
- [ ] **4.5 Bảng Báo cáo (Success Report):** Nếu matching thành công, hiển thị một Band nền tối. Báo cáo rõ AI/Thuật toán đã gán kỹ năng nào cho ai.
- [ ] **4.6 Thông báo Vô nghiệm (Error Alert):** Chế độ khắt khe của Adyen không dùng màu đỏ, nhưng để báo lỗi rõ ràng theo yêu cầu đề, tạo một text box hoặc border đỏ mỏng hiển thị lỗi "Không tìm thấy tổ hợp" kèm lý do chi tiết từ Hook ở bước 3.2.

### Phase 5: Gắn kết State & Testing
- [ ] **5.1 Tích hợp State:** Bắt sự kiện `onChange` từ Form. Nếu form thay đổi (thêm/bớt skill), gọi hàm `resetResult()` để xóa kết quả hiện tại ngay lập tức.
- [ ] **5.2 Testing Checkpoint 1 & 2:** Nhập liệu và xem danh sách data.
- [ ] **5.3 Testing Checkpoint 3 & 4:** Bấm ghép đội thành công -> Sửa điều kiện -> Xem UI tự reset.
- [ ] **5.4 Testing Checkpoint 5:** Cố tình nhập 1 skill ảo (VD: "Alien Language") -> Bấm ghép đội -> Kiểm tra lỗi có bắn ra đúng lý do hay không.
