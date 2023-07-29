# Quy ước chung cho các commit


1. Tiêu đề Commit (Commit Title):

Sử dụng ngôn ngữ bắt đầu bằng chữ viết hoa.
Tránh viết quá dài, giữ cho tiêu đề ngắn gọn và trực quan.
Tránh sử dụng dấu chấm (.) ở cuối tiêu đề.

2. Nội dung Commit (Commit Message):

Sử dụng ngôn ngữ lịch sự, rõ ràng, và chính xác.
Miêu tả rõ ràng những thay đổi đã thực hiện. Hãy trả lời câu hỏi "Tại sao thay đổi này cần thiết?".
Nếu cần, cung cấp thông tin bổ sung về ngữ cảnh, vấn đề đã gặp phải và cách giải quyết.

3. Liên kết vấn đề (Issue Linking):

Khi commit giải quyết một vấn đề đã được mở trước đó, hãy thêm liên kết đến vấn đề đó.
Ví dụ: "Fix #123" hoặc "Resolve issue #123".

4. Nhánh (Branch):

Đảm bảo commit được thực hiện trên nhánh phù hợp, tránh commit trực tiếp vào nhánh chính (master/develop).
Nếu làm việc trên tính năng cụ thể hoặc vấn đề, hãy tạo nhánh riêng và sau đó tạo pull request khi hoàn thành.

5. Tách commit (Commit Splitting):

Tránh kết hợp nhiều thay đổi không liên quan vào một commit duy nhất.
Nếu một commit sửa một lỗi nhỏ và thêm một tính năng mới, hãy tách thành hai commit riêng biệt.
Sử dụng các lệnh trong Commit Message:
Sử dụng các từ khóa như "Fix", "Style", "Update", "Remove", "Feat" để làm rõ mục tiêu của commit.
Kiểm tra lại trước khi commit:

Ví dụ: 
/////////////////////////////////////////////
<br>
Tiêu đề: Thêm tính năng xác thực người dùng

Mô tả:
- Thực hiện chức năng đăng nhập và đăng ký người dùng.
- Thêm middleware xác thực người dùng để bảo vệ các đường dẫn nhạy cảm.
- Khắc phục lỗi không gửi email đặt lại mật khẩu.

Vấn đề: #42
/////////////////////////////////////////////

Trước khi thực hiện commit, đảm bảo xem lại các thay đổi để tránh commit lỗi hoặc chưa hoàn thành.
