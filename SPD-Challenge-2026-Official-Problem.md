# ĐỀ THI CHÍNH THỨC SPD Challenge 2026

**Chủ đề:** Xây dựng hệ thống khám phá, đánh giá và hình thành đội ngũ (Team-Matching) dựa trên ràng buộc đa biến.

## 1. YÊU CẦU BÀI TOÁN

Trong môi trường làm việc nhóm, một trong những điều tồi tệ nhất có thể xảy ra là khi có những nhiệm vụ mà không thành viên nào thực hiện được. Vì thế, việc chọn đồng đội một cách khôn ngoan ngay từ bước thành lập nhóm là rất quan trọng.

Trong thời gian 360 phút, các đội thi phải xây dựng một nguyên mẫu (prototype) phần mềm có khả năng tự động hóa việc lập đội hình tối ưu cho một dự án (chẳng hạn, khóa luận tốt nghiệp, startup, nhóm làm đồ án, nhóm thuyết trình, v.v.).

Đội thi được toàn quyền quyết định bối cảnh ứng dụng (ví dụ: ghép đội hackathon, phân ca trực, tìm nhóm nghiên cứu), đối tượng người dùng, UI/UX và công nghệ triển khai. Bối cảnh phải được đặc tả rõ ràng trong sản phẩm.

## 2. LUỒNG THỰC THI CỐT LÕI (CORE FLOW)

Hệ thống phải đảm bảo giám khảo có thể thực hiện trơn tru chu trình kiểm thử sau:

1. Khởi tạo/lựa chọn một mục tiêu dự án với các ràng buộc cụ thể.
2. Khám phá kho dữ liệu ứng viên tiềm năng.
3. Kích hoạt tính năng hình thành/đề xuất đội hình.
4. Đối chiếu báo cáo giải thích (lý do hệ thống chọn phương án này).
5. Điều chỉnh các biến số (thêm/bớt điều kiện) để kiểm tra khả năng cập nhật của hệ thống.
6. Xác nhận cách hệ thống xử lý ngoại lệ khi không có phương án thỏa mãn.

## 3. ĐẶC TẢ CHỨC NĂNG BẮT BUỘC

### 3.1. Quản trị Dữ liệu Ứng viên

*   **Yêu cầu dữ liệu:** Khởi tạo tối thiểu 20 hồ sơ ứng viên (Mock data) ở trạng thái mặc định. Không bắt buộc phải có dữ liệu người dùng thật hoặc hệ thống Backend/Database phức tạp (được phép dùng Local Storage hoặc JSON).
*   **Ràng buộc logic:** Một ứng viên phải có khả năng đáp ứng nhiều năng lực/vai trò cùng lúc. Dữ liệu không được giả định quan hệ 1-1 giữa người và kỹ năng.
*   **Tiêu chuẩn Dữ liệu:** Sử dụng dữ liệu giả lập minh bạch. Nghiêm cấm thiết lập các bộ lọc dựa trên thông tin nhạy cảm (dân tộc, tôn giáo, quan điểm chính trị).

### 3.2. Thuật toán Đề xuất (Xử lý Logic)

Hệ thống phải xuất ra ít nhất 01 phương án đội hình hợp lệ nếu dữ liệu cho phép. Phương án hợp lệ bắt buộc thỏa mãn 4 điều kiện:

1. Không lặp lại cùng một cá nhân trong đội.
2. Tổng số nhân sự tuân thủ giới hạn quy định.
3. Tập hợp thành viên phải bao phủ 100% các năng lực được yêu cầu.
4. Thỏa mãn tuyệt đối các ràng buộc bổ sung.

*Ghi chú: Đội thi tự do lựa chọn phương pháp giải quyết (Filter, Scoring, Tổ hợp, Đồ thị, AI Model...). Không bắt buộc sử dụng thuật toán cụ thể.*

### 3.3. Tính ứng dụng

Khi xuất kết quả, hệ thống phải cung cấp báo cáo trực quan thể hiện:

*   Các yêu cầu đã được đáp ứng.
*   Phân bổ vai trò (Thành viên nào đảm nhận yêu cầu nào).
*   Giải thích logic tại sao phương án này là tối ưu.

Không có ràng buộc chi tiết về UI/UX. Các đội thi được tự do lựa chọn sản phẩm của đội thi sẽ theo mô hình nào (ví dụ, mạng xã hội Tinder). Tuy nhiên, cần đáp ứng các yêu cầu UI/UX cơ bản (giao diện đẹp, dễ sử dụng, v.v.).

### 3.4. Tính Kháng lỗi & Phản hồi (Stability & Error Handling)

*   **Cập nhật động:** Khi thay đổi danh sách các ứng viên trong thời gian thực, hoặc thay đổi điều kiện lập đội, các kết quả không còn thỏa mãn điều kiện phải bị loại bỏ lập tức khỏi trạng thái "hợp lệ".
*   **Trường hợp Vô nghiệm:** Khi không có tổ hợp nào thỏa mãn điều kiện, hệ thống PHẢI:
    *   Báo lỗi rành mạch (Chỉ rõ đang thiếu hụt năng lực/điều kiện nào).
    *   Nghiêm cấm: Tự tạo dữ liệu giả để lấp chỗ trống, lặp lại thành viên, treo vô hạn (Infinite Loop), văng lỗi không xác định (Undefined) hoặc hiển thị màn hình trắng.

## 4. QUY ĐỊNH VỀ VIDEO DEMO (TỐI ĐA 3 PHÚT)

Video nộp bài phải quay màn hình luồng hoạt động xuyên suốt, tập trung vào 5 Checkpoint:

1. Khai báo mục tiêu và các ràng buộc.
2. Thao tác đánh giá, lọc ứng viên.
3. Kích hoạt đề xuất đội hình thành công và báo cáo giải thích.
4. Xử lý tình huống thay đổi điều kiện động.
5. Xử lý ngoại lệ: Demo một trường hợp hệ thống vô nghiệm và cách báo lỗi.

Chúc các đội thi may mắn!