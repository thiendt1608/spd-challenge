# 🚀 CHIẾN LƯỢC TEAM-MATCHING: HACKATHON 6H EDITION

**Bối cảnh:** Thuật toán được tinh gọn tối đa để ráp kịp trong 6 tiếng nhưng vẫn đảm bảo 100% output hợp lệ, kh lặp thành viên, thỏa mãn size team và bao phủ toàn bộ skill[cite: 1].
**Ngôn ngữ khuyên dùng:** Python (vì xử lý list/dict và tổ hợp cực lẹ) hoặc Go (để chạy đệ quy Backtracking bao tốc độ).

---

## 1. MÔ TẢ KỸ THUẬT: MIX 2 THUẬT TOÁN (TWO-STAGE ARCHITECTURE)

Hệ thống sẽ chạy qua 2 giai đoạn cốt lõi:

### Giai đoạn 1: Filter & Combinations (Thuật toán Backtracking / Quay lui)
*   **Mục đích:** Tìm ra TẤT CẢ các tổ hợp nhóm thỏa mãn "ràng buộc cứng" (Hard Constraints).
*   **Logic:** Xem bài toán như một dạng rút gọn của *Set Cover Problem*. Chúng ta sẽ dùng đệ quy (Backtracking) để duyệt qua danh sách 20+ ứng viên[cite: 1]. 
*   **Điền kiện cắt tỉa (Pruning):** Đang sinh tổ hợp mà thấy team size vượt quá giới hạn hoặc trùng người thì ngắt nhánh đó luôn để tối ưu hiệu năng $O(2^N)$[cite: 1].

### Giai đoạn 2: Optimization & Explainability (Thuật toán Weighted Scoring)
*   **Mục đích:** Xếp hạng các tổ hợp đã lọc ở GĐ1 để chọn ra team BEST nhất và tạo dữ liệu giải thích[cite: 1].
*   **Logic:** Áp dụng công thức tính điểm toán học đơn giản cho từng team hợp lệ.
    $$Score_{team} = (W_1 \times \text{Độ đa nhiệm}) + (W_2 \times \text{Độ dư thừa skill})$$
    Trong đó:
    *   *Độ đa nhiệm:* Ứng viên cân được nhiều skill cùng lúc thì team càng nhỏ gọn.
    *   *Độ dư thừa skill (Penalty):* Nếu team bị lố skill kh cần thiết thì trừ điểm.

---

## 2. TỪNG BƯỚC THỰC THI LUỒNG CORE (STEP-BY-STEP)

### Bước 1: Tiền xử lý dữ liệu (Pre-processing)
*   **Input:** Nhận JD từ user (VD: Cần 1 DB, 1 API, 1 UI, size tối đa 3 người)[cite: 1].
*   **Action:** Quét kho 20 mock CV[cite: 1]. Loại ngay lập tức những khứa kh có BẤT KỲ skill nào trùng với JD. (Làm z để giảm size của tập $N$ trước khi đưa vào Backtracking).

### Bước 2: Sinh tổ hợp bằng Backtracking (Core Stage 1)
*   Viết một hàm đệ quy `find_valid_teams(candidates, current_team, current_skills)`.
*   Tại mỗi bước, thử add 1 ứng viên vào `current_team`.
*   **Check điều kiện (Ràng buộc cứng)[cite: 1]:**
    1.  `len(current_team) > MAX_SIZE` -> Bỏ qua.
    2.  Ứng viên đã có trong team -> Bỏ qua[cite: 1].
    3.  Cập nhật `current_skills = current_skills U candidate_skills`.
*   Nếu `current_skills == JD_skills` (Phủ 100% năng lực) -> Lưu `current_team` vào danh sách `ValidTeams`[cite: 1].

### Bước 3: Đánh giá và Xếp hạng (Core Stage 2)
*   Duyệt qua danh sách `ValidTeams`.
*   Chấm điểm từng team dựa trên logic: Team nào size nhỏ hơn mà vẫn cover đủ 100% skill thì xếp hạng 1 (tối ưu chi phí). Team nào có thành viên "gánh" được nhiều role thì cộng thêm điểm[cite: 1].
*   Bốc ra Top 1 Team.

### Bước 4: Xử lý ngoại lệ (Exception Handling)
*   Nếu chạy xong Bước 2 mà mảng `ValidTeams` rỗng (len == 0).
*   Kích hoạt cơ chế báo lỗi rành mạch: "Hệ thống vô nghiệm. Đang thiếu hụt năng lực [X, Y]. Vui lòng nới lỏng giới hạn size team hoặc nạp thêm hồ sơ"[cite: 1]. Tuyệt đối kh giả lập data ảo để lấp vào[cite: 1].

### Bước 5: Đóng gói Báo cáo Giải thích (Explainability)
*   Từ Top 1 Team, map lại thành viên với yêu cầu để xuất UI[cite: 1].
*   Data trả về Front-end dạng JSON phải có:
    ```json
    {
      "status": "success",
      "team": ["Thien", "Hieu", "An"],
      "role_mapping": {
        "API": "Thien",
        "DB": "Thien",
        "UI": "Hieu"
      },
      "reasoning": "Team được chọn vì thỏa mãn 100% kỹ năng, size tối ưu (3/4 người), và Thien đảm nhiệm tốt đa vai trò (API & DB)."
    }
    ```

---

## 3. CHEAT-CODE ĐỂ GHI ĐIỂM VỚI BAN GIÁM KHẢO
1.  **Giao diện động (Reactive):** Lúc show demo, m vừa kéo thanh gạt "Max Size" từ 5 xuống 2, UI lập tức chớp đỏ báo vô nghiệm. Giám khảo cực thích cái vụ phản hồi theo thời gian thực này[cite: 1].
2.  **Khôn khéo ở Mock Data:** Đừng random data bậy bạ. Hãy tạo ra tầm 3 "siêu nhân" (cân 4-5 skill) và 10 "người thường" (1 skill). Như z thuật toán của m mới có đất diễn để show ra nó khôn ở chỗ biết chọn 1 "siêu nhân" thay vì 4 "người thường" để tiết kiệm slot[cite: 1].