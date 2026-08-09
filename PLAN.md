# Kế hoạch thực thi: SPD Challenge 2026 - Team Matching MVP

Tài liệu này chia nhỏ các yêu cầu của bài toán thành các Phase và Task cụ thể để thực hiện trong thời gian giới hạn của Hackathon (6 tiếng).

## Phase 1: Foundation & Setup (Khởi tạo dự án)
- [ ] **Task 1.1:** Tạo thư mục `source/` theo đúng yêu cầu chấm điểm cấu trúc.
- [ ] **Task 1.2:** Khởi tạo project Frontend (khuyến nghị Next.js hoặc Vite + React) bên trong `source/`.
- [ ] **Task 1.3:** Cài đặt UI framework (Tailwind CSS, Shadcn UI) để đẩy nhanh tốc độ code giao diện.
- [ ] **Task 1.4:** Tạo file `.gitignore` và `submission.json` ở thư mục gốc (để chắc chắn lấy trọn 20 điểm cấu trúc tĩnh).

## Phase 2: Data Mocking (Chuẩn bị dữ liệu)
- [ ] **Task 2.1:** Thiết kế cấu trúc dữ liệu ứng viên (`id`, `name`, `avatar`, mảng `skills`). Phải đảm bảo 1 người có nhiều kỹ năng.
- [ ] **Task 2.2:** Tạo file `source/data/candidates.json` chứa ít nhất 20 hồ sơ giả lập minh bạch, không chứa thông tin nhạy cảm.

## Phase 3: Core Algorithm (Thuật toán cốt lõi)
- [ ] **Task 3.1:** Viết hàm `findOptimalTeam(candidates, requiredSkills, maxMembers)` bằng thuật toán Vét cạn (Brute-force/Backtracking). Thuật toán phải quét qua danh sách để thỏa 4 điều kiện: Không trùng người, không lố size, cover 100% skill, thỏa constraint phụ.
- [ ] **Task 3.2:** Viết logic xử lý lỗi (Exception logic). Nếu thuật toán duyệt xong trả về `null`, phải tính toán được lý do (VD: Do không ai có skill X, hay do ép max_members quá nhỏ) để làm data hiển thị lỗi.
- [ ] **Task 3.3:** Viết hàm mapping: Phân bổ rõ ràng thành viên nào đảm nhận skill nào phục vụ cho báo cáo kết quả.

## Phase 4: UI/UX Implementation (Xây dựng Giao diện)
*Tạo Layout chính gồm 2 vùng: Dashboard bên trái (Cấu hình) và Vùng hiển thị bên phải (Kết quả/Lỗi).*
- [ ] **Task 4.1 - Cấu hình:** Build form nhập mục tiêu dự án (Thêm/Xóa required skills, chỉnh số người tối đa).
- [ ] **Task 4.2 - Kho ứng viên:** Build component hiển thị danh sách 20 ứng viên dưới dạng Card/Grid để người dùng dễ xem.
- [ ] **Task 4.3 - Báo cáo thành công:** Build component hiển thị kết quả (Team bao gồm những ai, nhãn role tương ứng, dòng text giải thích lý do tối ưu).
- [ ] **Task 4.4 - Báo cáo vô nghiệm:** Build component Alert màu đỏ, text to rõ ràng chỉ ra chính xác lý do không thể ghép đội.

## Phase 5: State & Integration (Kết nối và Tương tác động)
- [ ] **Task 5.1:** Đưa các hàm thuật toán vào React State/Effect.
- [ ] **Task 5.2:** Xử lý Cập nhật động: Viết sự kiện lắng nghe sự thay đổi của Form cấu hình. Hễ người dùng thêm/xóa 1 skill -> Gỡ bỏ kết quả hợp lệ hiện tại (nếu có) -> Chạy lại thuật toán ngay lập tức (Check point số 4).

## Phase 6: QA & Demo Prep (Kiểm thử và Quay video)
- [ ] **Task 6.1:** Test Checkpoint 1 & 2 (Khai báo và xem data).
- [ ] **Task 6.2:** Test Checkpoint 3 (Ghép đội thành công & Ra báo cáo).
- [ ] **Task 6.3:** Test Checkpoint 4 (Đổi điều kiện, app tự tính lại).
- [ ] **Task 6.4:** Test Checkpoint 5 (Nhập skill khó, app văng báo lỗi đàng hoàng).
- [ ] **Task 6.5:** Ghi hình màn hình 3 phút nộp bài.