# User Guide - ShopVN

Hướng dẫn sử dụng chi tiết hệ thống ShopVN cho cả khách hàng và quản trị viên.

## Dành cho Khách hàng

### 1. Đăng ký và Đăng nhập

#### Đăng ký tài khoản mới
1. Click vào nút "Đăng nhập" trên header
2. Chọn "Đăng ký ngay" 
3. Nhập email và mật khẩu
4. Click "Đăng ký"

#### Đăng nhập
1. Click vào nút "Đăng nhập"
2. Nhập email và mật khẩu đã đăng ký
3. Click "Đăng nhập"

#### Đăng nhập khách (Guest)
- Click "Đăng nhập khách" để mua hàng mà không cần tạo tài khoản

### 2. Duyệt sản phẩm

#### Trang chủ
- **Banner**: Xem các khuyến mãi hot
- **Danh mục nổi bật**: Click để xem sản phẩm theo danh mục
- **Flash Sale**: Sản phẩm giảm giá trong thời gian giới hạn
- **Sản phẩm nổi bật**: Những sản phẩm được yêu thích nhất

#### Tìm kiếm sản phẩm
1. Nhập từ khóa vào ô tìm kiếm trên header
2. Click nút "Tìm" hoặc nhấn Enter
3. Xem kết quả tìm kiếm

#### Xem chi tiết sản phẩm
1. Click vào sản phẩm bất kỳ
2. Xem thông tin chi tiết:
   - Hình ảnh sản phẩm
   - Mô tả chi tiết
   - Giá và khuyến mãi
   - Đánh giá từ khách hàng
   - Thông số kỹ thuật

### 3. Mua hàng

#### Thêm vào giỏ hàng
1. Ở trang sản phẩm, chọn số lượng
2. Chọn biến thể (nếu có): màu sắc, kích thước
3. Click "Thêm vào giỏ hàng"
4. Hoặc click icon giỏ hàng trên ProductCard

#### Quản lý giỏ hàng
1. Click icon giỏ hàng trên header
2. Xem danh sách sản phẩm đã thêm
3. Thay đổi số lượng bằng nút +/-
4. Xóa sản phẩm bằng icon thùng rác
5. Xem tổng tiền và phí vận chuyển

#### Thanh toán
1. Từ trang giỏ hàng, click "Tiến hành thanh toán"
2. Nhập thông tin giao hàng:
   - Họ tên người nhận
   - Số điện thoại
   - Địa chỉ chi tiết
   - Phường/Xã, Quận/Huyện, Tỉnh/Thành phố
3. Chọn phương thức thanh toán:
   - **COD**: Thanh toán khi nhận hàng
   - **VNPay**: Thanh toán online qua ngân hàng
   - **MoMo**: Thanh toán qua ví MoMo
   - **ZaloPay**: Thanh toán qua ví ZaloPay
4. Nhập ghi chú (nếu có)
5. Click "Đặt hàng"

### 4. Quản lý tài khoản

#### Xem thông tin cá nhân
1. Click "Tài khoản" trên header
2. Tab "Thông tin tài khoản":
   - Xem tên, email, số điện thoại
   - Cập nhật thông tin (tính năng sẽ có)

#### Theo dõi đơn hàng
1. Vào trang "Tài khoản"
2. Tab "Đơn hàng":
   - Xem danh sách tất cả đơn hàng
   - Trạng thái đơn hàng:
     - **Chờ xác nhận**: Đơn hàng mới tạo
     - **Đã xác nhận**: Shop đã xác nhận
     - **Đang giao**: Đơn hàng đang được vận chuyển
     - **Đã giao**: Giao hàng thành công
     - **Đã hủy**: Đơn hàng bị hủy

### 5. Đánh giá sản phẩm

#### Viết đánh giá
1. Vào trang chi tiết sản phẩm đã mua
2. Scroll xuống phần "Đánh giá"
3. Chọn số sao (1-5)
4. Viết tiêu đề và nội dung đánh giá
5. Upload hình ảnh (nếu có)
6. Click "Gửi đánh giá"

#### Xem đánh giá
- Tất cả đánh giá hiển thị ở trang chi tiết sản phẩm
- Có thể lọc theo số sao
- Đánh giá từ khách hàng đã mua sẽ có dấu "Đã mua hàng"

## Dành cho Quản trị viên

### 1. Truy cập Admin Panel

#### Đăng nhập Admin
1. Đăng nhập với tài khoản admin
2. Click nút "Admin" trên header
3. Hoặc truy cập trực tiếp `/admin`

### 2. Dashboard

#### Tổng quan
- **Thống kê tổng quan**: Doanh thu, đơn hàng, khách hàng
- **Biểu đồ**: Doanh thu theo thời gian
- **Đơn hàng gần đây**: Danh sách đơn hàng mới nhất
- **Sản phẩm bán chạy**: Top sản phẩm có doanh số cao

### 3. Quản lý sản phẩm

#### Thêm sản phẩm mới
1. Vào "Sản phẩm" → "Thêm mới"
2. Nhập thông tin cơ bản:
   - Tên sản phẩm
   - Slug (URL thân thiện)
   - Mô tả ngắn và chi tiết
   - Giá bán và giá gốc
3. Chọn danh mục
4. Upload hình ảnh:
   - Kéo thả hoặc click để chọn file
   - Hỗ trợ nhiều hình ảnh
   - Chọn hình ảnh chính
5. Nhập thông tin bổ sung:
   - Số lượng tồn kho
   - Trọng lượng, kích thước
   - Thông số kỹ thuật
   - Tags SEO
6. Cài đặt trạng thái:
   - Hoạt động/Không hoạt động
   - Sản phẩm nổi bật
   - Flash sale
7. Click "Lưu"

#### Chỉnh sửa sản phẩm
1. Vào danh sách sản phẩm
2. Click "Sửa" trên sản phẩm cần chỉnh sửa
3. Cập nhật thông tin
4. Click "Cập nhật"

#### Xóa sản phẩm
1. Click "Xóa" trên sản phẩm
2. Xác nhận xóa
3. **Lưu ý**: Không thể xóa sản phẩm đã có đơn hàng

### 4. Quản lý danh mục

#### Thêm danh mục
1. Vào "Danh mục" → "Thêm mới"
2. Nhập tên và slug
3. Chọn danh mục cha (nếu có)
4. Thêm mô tả và icon
5. Cài đặt trạng thái
6. Click "Lưu"

#### Cấu trúc cây danh mục
- Hỗ trợ danh mục con không giới hạn cấp
- Kéo thả để sắp xếp thứ tự
- Ẩn/hiện danh mục

### 5. Quản lý đơn hàng

#### Xem danh sách đơn hàng
1. Vào "Đơn hàng"
2. Lọc theo:
   - Trạng thái
   - Ngày đặt hàng
   - Phương thức thanh toán
   - Khách hàng

#### Xử lý đơn hàng
1. Click vào đơn hàng để xem chi tiết
2. Cập nhật trạng thái:
   - **Xác nhận**: Xác nhận đơn hàng
   - **Chuẩn bị hàng**: Đóng gói sản phẩm
   - **Giao hàng**: Chuyển cho đơn vị vận chuyển
   - **Hoàn thành**: Giao hàng thành công
   - **Hủy**: Hủy đơn hàng (kèm lý do)
3. Thêm ghi chú nội bộ
4. In hóa đơn/phiếu giao hàng

#### Quản lý thanh toán
- Xem trạng thái thanh toán
- Xác nhận thanh toán COD
- Theo dõi giao dịch online

### 6. Quản lý khách hàng

#### Xem danh sách khách hàng
1. Vào "Khách hàng"
2. Xem thông tin:
   - Thông tin cá nhân
   - Lịch sử mua hàng
   - Tổng chi tiêu
   - Trạng thái tài khoản

#### Phân tích khách hàng
- Khách hàng VIP (chi tiêu cao)
- Khách hàng mới
- Khách hàng lâu không mua hàng

### 7. Báo cáo và thống kê

#### Báo cáo doanh thu
- Doanh thu theo ngày/tháng/năm
- So sánh với kỳ trước
- Biểu đồ trực quan

#### Báo cáo sản phẩm
- Sản phẩm bán chạy nhất
- Sản phẩm ế ẩm
- Tồn kho sắp hết

#### Báo cáo khách hàng
- Khách hàng mới
- Tỷ lệ khách hàng quay lại
- Phân tích hành vi mua hàng

### 8. Cài đặt hệ thống

#### Cài đặt chung
- Thông tin website
- Logo và favicon
- Thông tin liên hệ
- Chính sách bảo mật

#### Cài đặt thanh toán
- Cấu hình VNPay
- Cấu hình MoMo
- Cấu hình ZaloPay
- Phí vận chuyển

#### Cài đặt email
- SMTP server
- Template email
- Email thông báo

## Tính năng nâng cao

### 1. Flash Sale
- Tạo chương trình flash sale
- Đặt thời gian bắt đầu/kết thúc
- Giới hạn số lượng
- Hiển thị đếm ngược

### 2. Mã giảm giá
- Tạo mã giảm giá
- Cài đặt điều kiện áp dụng
- Giới hạn số lần sử dụng
- Theo dõi hiệu quả

### 3. Banner quảng cáo
- Tạo banner cho trang chủ
- Hỗ trợ nhiều banner (carousel)
- Đặt lịch hiển thị
- Theo dõi click

### 4. Thông báo
- Gửi thông báo cho khách hàng
- Thông báo đơn hàng
- Thông báo khuyến mãi
- Push notification

## Troubleshooting

### Lỗi thường gặp

#### Không thể đăng nhập
- Kiểm tra email/mật khẩu
- Xóa cache trình duyệt
- Thử đăng nhập khách

#### Không thể thêm vào giỏ hàng
- Kiểm tra đăng nhập
- Kiểm tra tồn kho sản phẩm
- Refresh trang

#### Lỗi thanh toán
- Kiểm tra thông tin thẻ
- Kiểm tra kết nối mạng
- Thử phương thức khác

#### Không nhận được email
- Kiểm tra spam/junk folder
- Kiểm tra địa chỉ email
- Liên hệ support

### Liên hệ hỗ trợ
- **Email**: support@shopvn.com
- **Hotline**: 1900-xxxx
- **Live Chat**: Góc phải màn hình
- **Giờ làm việc**: 8:00 - 22:00 hàng ngày

## Tips và Tricks

### Cho khách hàng
- Đăng ký nhận thông báo khuyến mãi
- Theo dõi flash sale để mua giá tốt
- Đọc đánh giá trước khi mua
- Mua đủ 500k để free ship

### Cho admin
- Cập nhật sản phẩm thường xuyên
- Theo dõi báo cáo hàng ngày
- Phản hồi đánh giá khách hàng
- Tối ưu SEO cho sản phẩm
- Backup dữ liệu định kỳ
