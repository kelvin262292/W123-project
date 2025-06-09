# Test info

- Name: Authentication and User Flows >> 1. User can sign up for a new account
- Location: D:\W123-project\tests\auth.spec.ts:14:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByTestId('auth-modal').getByRole('heading', { name: 'Đăng nhập vào Yapee' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByTestId('auth-modal').getByRole('heading', { name: 'Đăng nhập vào Yapee' })

    at D:\W123-project\tests\auth.spec.ts:21:79
```

# Page snapshot

```yaml
- region "Notifications alt+T"
- banner:
  - button "Y Yapee"
  - textbox "Tìm kiếm sản phẩm..."
  - img
  - button "Tìm"
  - button "🌟 Poster"
  - button:
    - img
  - button "Đăng nhập":
    - img
    - text: Đăng nhập
- heading "Đăng nhập" [level=2]
- button:
  - img
- textbox "Email"
- textbox "Mật khẩu"
- button "Quên mật khẩu?"
- button "Đăng nhập"
- text: Chưa có tài khoản?
- button "Đăng ký ngay"
- separator
- text: hoặc
- separator
- button "Đăng nhập khách"
- main:
  - heading "🎉 Chào mừng đến ShopVN" [level=1]
  - paragraph: 🛍️ Khám phá hàng triệu sản phẩm chất lượng cao với giá tốt nhất thị trường!
  - text: 🚚 Giao hàng nhanh Miễn phí ship 💎 Chất lượng cao Hàng chính hãng 🎁 Ưu đại khủng Giảm đến 70%
  - button "🛒 Mua ngay"
  - button "✨ Xem sản phẩm nổi bật"
  - text: 1M+ Khách hàng 100K+ Sản phẩm 4.8⭐ Đánh giá
  - heading "🏷️ Danh Mục Sản Phẩm" [level=2]
  - paragraph: Khám phá các danh mục sản phẩm đa dạng
  - button "📱 Điện tử Thiết bị điện tử, công nghệ":
    - text: 📱
    - heading "Điện tử" [level=3]
    - paragraph: Thiết bị điện tử, công nghệ
  - button "👕 Thời trang Quần áo, phụ kiện thời trang":
    - text: 👕
    - heading "Thời trang" [level=3]
    - paragraph: Quần áo, phụ kiện thời trang
  - button "🏠 Gia dụng Đồ gia dụng, nội thất":
    - text: 🏠
    - heading "Gia dụng" [level=3]
    - paragraph: Đồ gia dụng, nội thất
  - heading "🔥 KHUYẾN MÃI HOT 🔥" [level=3]
  - paragraph: Giảm giá lên đến 70% cho tất cả danh mục!
  - button "Mua Ngay 🛒"
  - text: 💥 ⚡ 🎉 🎁 ⚡
  - heading "Flash Sale" [level=2]
  - paragraph: Giảm giá sốc trong thời gian có hạn
  - text: "107 Giờ : 41 Phút : 52 Giây"
  - img "iPhone 15 Pro Max"
  - text: "-9% ⚡ FLASH"
  - button "Thêm iPhone 15 Pro Max vào giỏ hàng":
    - img
  - heading "iPhone 15 Pro Max" [level=3]
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (156) 29.990.000đ 32.990.000đ
  - img "Nồi Cơm Điện Cao Cấp"
  - text: "-17% ⚡ FLASH"
  - button "Thêm Nồi Cơm Điện Cao Cấp vào giỏ hàng":
    - img
  - heading "Nồi Cơm Điện Cao Cấp" [level=3]
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (67) 2.490.000đ 2.990.000đ
  - img "Tai Nghe Bluetooth Premium"
  - text: "-20% ⚡ FLASH"
  - button "Thêm Tai Nghe Bluetooth Premium vào giỏ hàng":
    - img
  - heading "Tai Nghe Bluetooth Premium" [level=3]
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (123) 1.990.000đ 2.490.000đ
  - button "Xem tất cả":
    - text: Xem tất cả
    - img
  - heading "Sản phẩm nổi bật" [level=2]
  - paragraph: Những sản phẩm được yêu thích nhất
  - img "MacBook Air M3"
  - text: "-7%"
  - button "Thêm MacBook Air M3 vào giỏ hàng":
    - img
  - heading "MacBook Air M3" [level=3]
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (89) 27.990.000đ 29.990.000đ
  - 'img "Sách: Đắc Nhân Tâm"'
  - text: "-26%"
  - 'button "Thêm Sách: Đắc Nhân Tâm vào giỏ hàng"':
    - img
  - 'heading "Sách: Đắc Nhân Tâm" [level=3]'
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (567) 89.000đ 120.000đ
  - img "iPhone 15 Pro Max"
  - text: "-9% ⚡ FLASH"
  - button "Thêm iPhone 15 Pro Max vào giỏ hàng":
    - img
  - heading "iPhone 15 Pro Max" [level=3]
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (156) 29.990.000đ 32.990.000đ
  - img "Máy Pha Cà Phê Espresso"
  - button "Thêm Máy Pha Cà Phê Espresso vào giỏ hàng":
    - img
  - heading "Máy Pha Cà Phê Espresso" [level=3]
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (45) 3.990.000đ
  - img "Bút Bi Cao Cấp Parker"
  - button "Thêm Bút Bi Cao Cấp Parker vào giỏ hàng":
    - img
  - heading "Bút Bi Cao Cấp Parker" [level=3]
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (34) 450.000đ
  - img "Nồi Cơm Điện Cao Cấp"
  - text: "-17% ⚡ FLASH"
  - button "Thêm Nồi Cơm Điện Cao Cấp vào giỏ hàng":
    - img
  - heading "Nồi Cơm Điện Cao Cấp" [level=3]
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (67) 2.490.000đ 2.990.000đ
  - img "Tai Nghe Bluetooth Premium"
  - text: "-20% ⚡ FLASH"
  - button "Thêm Tai Nghe Bluetooth Premium vào giỏ hàng":
    - img
  - heading "Tai Nghe Bluetooth Premium" [level=3]
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (123) 1.990.000đ 2.490.000đ
  - img "Giày Sneaker Unisex"
  - text: "-25%"
  - button "Thêm Giày Sneaker Unisex vào giỏ hàng":
    - img
  - heading "Giày Sneaker Unisex" [level=3]
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (178) 899.000đ 1.199.000đ
- contentinfo:
  - text: 🛍️ Yapee
  - paragraph: Yapee cung cấp các sản phẩm chất lượng cao với giá cả phải chăng. Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng.
  - link "📘":
    - /url: "#"
  - link "📷":
    - /url: "#"
  - link "🐦":
    - /url: "#"
  - heading "Chăm sóc khách hàng" [level=3]
  - list:
    - listitem:
      - link "Trung tâm trợ giúp":
        - /url: "#"
    - listitem:
      - link "Liên hệ":
        - /url: "#"
    - listitem:
      - link "Hướng dẫn mua hàng":
        - /url: "#"
    - listitem:
      - link "Chính sách đổi trả":
        - /url: "#"
  - heading "Về Yapee" [level=3]
  - list:
    - listitem:
      - link "Giới thiệu":
        - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    - listitem:
      - link "Chính sách bảo mật":
        - /url: "#"
    - listitem:
      - link "Điều khoản sử dụng":
        - /url: "#"
    - listitem:
      - link "Câu hỏi thường gặp":
        - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
  - heading "Thông tin liên hệ" [level=3]
  - list:
    - listitem: 📍 74 đường số 13, Phường Bình Trị Đông B, quận Bình Tân, TP. Hồ Chí Minh
    - listitem: 📞 0333.938.014
    - listitem: ✉️ cskh@yapee.vn
    - listitem: 🕒 8h00 - 19h00, Thứ Hai - Chủ Nhật
  - paragraph: © 2024 Yapee. Tất cả quyền được bảo lưu.
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe.serial("Authentication and User Flows", () => {
   4 |   const userEmail = `testuser_${Date.now()}@example.com`;
   5 |   const userPassword = "password123";
   6 |
   7 |   // URL của trang web, mặc định là localhost của Vite
   8 |   const appUrl = "http://localhost:5173";
   9 |
   10 |   test.beforeEach(async ({ page }) => {
   11 |     await page.goto(appUrl);
   12 |   });
   13 |
   14 |   test("1. User can sign up for a new account", async ({ page }) => {
   15 |     // Mở modal đăng nhập/đăng ký
   16 |     await page.getByRole('button', { name: 'Đăng nhập' }).click();
   17 |     
   18 |     // Chờ modal xuất hiện và xác minh tiêu đề, sử dụng data-testid
   19 |     const modal = page.getByTestId('auth-modal');
   20 |     await expect(modal).toBeVisible();
>  21 |     await expect(modal.getByRole("heading", { name: "Đăng nhập vào Yapee" })).toBeVisible();
      |                                                                               ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   22 |
   23 |     // Chuyển sang biểu mẫu đăng ký
   24 |     await modal.getByRole("button", { name: "Đăng ký ngay" }).click();
   25 |
   26 |     // Điền thông tin đăng ký
   27 |     await modal.getByPlaceholder("Email").fill(userEmail);
   28 |     await modal.getByPlaceholder("Mật khẩu").fill(userPassword);
   29 |
   30 |     // Gửi biểu mẫu đăng ký
   31 |     await modal.getByRole("button", { name: "Đăng ký" }).click();
   32 |
   33 |     // Xác minh rằng modal đã đóng và người dùng đã đăng nhập thành công
   34 |     await expect(modal).not.toBeVisible();
   35 |     await expect(page.getByRole("button", { name: "Tài khoản" })).toBeVisible();
   36 |     
   37 |     // Điều hướng đến trang tài khoản để kiểm tra chi tiết
   38 |     await page.getByRole("button", { name: "Tài khoản" }).click();
   39 |     await expect(page.getByRole("heading", { name: "Thông tin tài khoản" })).toBeVisible();
   40 |     await expect(page.getByText(userEmail)).toBeVisible();
   41 |   });
   42 |
   43 |   test("2. User can sign out", async ({ page }) => {
   44 |     // Test này giả định người dùng đã đăng nhập từ test trước
   45 |     // Chờ trang tài khoản tải xong sau khi đăng ký
   46 |     await page.waitForURL(`${appUrl}/account`);
   47 |     await expect(page.getByRole("heading", { name: "Tài khoản" })).toBeVisible();
   48 |     
   49 |     // Tìm và nhấp vào nút Đăng xuất
   50 |     await page.getByRole("button", { name: "Sign out" }).click();
   51 |
   52 |     // Xác minh rằng người dùng đã đăng xuất
   53 |     // Nút "Tài khoản" sẽ đổi thành "Đăng nhập"
   54 |     await expect(page.getByRole("button", { name: "Đăng nhập" })).toBeVisible();
   55 |     await expect(page.getByRole("button", { name: "Tài khoản" })).not.toBeVisible();
   56 |
   57 |     // Thử mở modal đăng nhập
   58 |     await page.getByRole("button", { name: "Đăng nhập" }).click();
   59 |     const modal = page.getByTestId('auth-modal');
   60 |     await expect(modal).toBeVisible();
   61 |     await expect(modal.getByRole("heading", { name: "Đăng nhập vào Yapee" })).toBeVisible();
   62 |   });
   63 |
   64 |   test("3. User can sign in", async ({ page }) => {
   65 |     // Test này giả định người dùng đã được tạo và đăng xuất từ các test trước
   66 |      
   67 |     // Mở modal đăng nhập
   68 |     await page.getByRole('button', { name: 'Đăng nhập' }).click();
   69 |     const modal = page.getByTestId('auth-modal');
   70 |     await expect(modal).toBeVisible();
   71 |     await expect(modal.getByRole("heading", { name: "Đăng nhập vào Yapee" })).toBeVisible();
   72 |
   73 |     // Điền thông tin đăng nhập
   74 |     await modal.getByPlaceholder("Email").fill(userEmail);
   75 |     await modal.getByPlaceholder("Mật khẩu").fill(userPassword);
   76 |
   77 |     // Gửi biểu mẫu đăng nhập (nút bên trong modal)
   78 |     await modal.getByRole("button", { name: "Đăng nhập" }).click();
   79 |
   80 |     // Xác minh đăng nhập thành công và modal đã đóng
   81 |     await expect(modal).not.toBeVisible();
   82 |     await expect(page.getByRole("button", { name: "Tài khoản" })).toBeVisible();
   83 |   });
   84 |
   85 |   test("4. User can view account information and order history", async ({ page }) => {
   86 |     // Test này giả định người dùng đã đăng nhập từ test trước
   87 |     
   88 |     // Điều hướng đến trang tài khoản
   89 |     await page.getByRole("button", { name: "Tài khoản" }).click();
   90 |     await expect(page.getByRole("heading", { name: "Tài khoản" })).toBeVisible();
   91 |
   92 |     // 1. Xác minh tab "Thông tin tài khoản"
   93 |     await expect(page.getByRole("heading", { name: "Thông tin tài khoản" })).toBeVisible();
   94 |     await expect(page.getByText(userEmail)).toBeVisible();
   95 |
   96 |     // 2. Chuyển sang tab "Lịch sử đơn hàng"
   97 |     await page.getByRole("button", { name: /Đơn hàng/ }).click();
   98 |
   99 |     // 3. Xác minh nội dung tab "Lịch sử đơn hàng"
  100 |     await expect(page.getByRole("heading", { name: "Lịch sử đơn hàng" })).toBeVisible();
  101 |     await expect(page.getByText("Bạn chưa có đơn hàng nào")).toBeVisible();
  102 |   });
  103 | }); 
```