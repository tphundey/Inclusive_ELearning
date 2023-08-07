## Quy ước chung cho các commit

1. Tiêu đề Commit (Commit Title):

Sử dụng ngôn ngữ bắt đầu bằng chữ viết hoa.
Tránh viết quá dài, giữ cho tiêu đề ngắn gọn và trực quan.
Tránh sử dụng dấu chấm (.) ở cuối tiêu đề.

2. Nội dung Commit (Commit Message):

Sử dụng ngôn ngữ lịch sự, rõ ràng, và chính xác.
Miêu tả rõ ràng những thay đổi đã thực hiện.

3. Liên kết vấn đề (Issue Linking):

Khi commit giải quyết một vấn đề đã được mở trước đó, hãy thêm liên kết đến vấn đề đó.
Ví dụ: "Fix #123" hoặc "Resolve issue #123".

4. Nhánh (Branch):

Đảm bảo commit được thực hiện trên nhánh phù hợp, tránh commit trực tiếp vào nhánh chính (main/develop).
Nếu làm việc trên tính năng cụ thể hoặc vấn đề, hãy tạo nhánh riêng và sau đó tạo pull request khi hoàn thành.

5. Tách commit (Commit Splitting):

Tránh kết hợp nhiều thay đổi không liên quan vào một commit duy nhất.
Nếu một commit sửa một lỗi nhỏ và thêm một tính năng mới, hãy tách thành hai commit riêng biệt.
Sử dụng các lệnh trong Commit Message:
Sử dụng các từ khóa như "Fix", "Style", "Update", "Remove", "Feat",... để làm rõ mục tiêu của commit.
Kiểm tra lại trước khi commit:

<br>

- feat: Để thêm một tính năng mới vào mã nguồn.<br>
"feat: Add user authentication feature"

- fix: Để sửa các lỗi hoặc vấn đề trong mã nguồn.<br>
"fix: Fix null pointer exception in user validation"

- refactor: Để tái cấu trúc lại mã nguồn mà không thêm tính năng mới hoặc sửa lỗi.<br>
"refactor: Extract common validation functions"

- docs: Liên quan đến các thay đổi về tài liệu, comment, hoặc chú thích.<br>
"docs: Update README with installation instructions"

- chore: Liên quan đến các công việc phụ trợ, cập nhật phiên bản, xóa các file không cần thiết, v.v.<br>
"chore: Update dependencies to latest versions"

- test: Liên quan đến việc thêm, sửa đổi hoặc xóa các test.<br>
"test: Add unit tests for user service"

- perf: Để thực hiện các cải tiến về hiệu suất.<br>
"perf: Optimize database query for faster response"

- revert: Để đảo ngược một commit trước đó.<br>
"revert: Revert changes in previous commit"

Ví dụ: 
Feat: Login with google form
Mô tả:
- Thực hiện chức năng đăng nhập và đăng ký người dùng với google.

Vấn đề: #42


Trước khi thực hiện commit, đảm bảo xem lại các thay đổi để tránh commit lỗi hoặc chưa hoàn thành.
Message được viết bằng tiếng Anh và chỉ viết hoa chữ đầu tiên. 
Cảm ơn đã đọc mong chúng ta đồng hành tốt để ra trường tốt nhất !
