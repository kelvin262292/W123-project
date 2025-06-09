# Test info

- Name: Page Navigation Smoke Test >> should open the Auth modal when clicking Account button (unauthenticated)
- Location: D:\W123-project\tests\navigation.spec.ts:42:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByTestId('auth-modal').getByRole('heading', { name: 'Đăng nhập vào Yapee' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByTestId('auth-modal').getByRole('heading', { name: 'Đăng nhập vào Yapee' })

    at D:\W123-project\tests\navigation.spec.ts:49:79
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
  - text: "107 Giờ : 40 Phút : 12 Giây"
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
   3 | test.describe("Page Navigation Smoke Test", () => {
   4 |   const appUrl = "http://localhost:5173";
   5 |
   6 |   test.beforeEach(async ({ page }) => {
   7 |     // Điều hướng đến URL gốc trước mỗi bài kiểm tra
   8 |     await page.goto(appUrl);
   9 |     // Chờ cho trang chủ tải xong, nhận biết bằng sự hiện diện của footer
  10 |     await expect(page.locator('footer')).toBeVisible();
  11 |   });
  12 |
  13 |   test("should navigate to the Home page by clicking the logo", async ({ page }) => {
  14 |     // Đầu tiên, điều hướng đến một trang khác (ví dụ: Giỏ hàng)
  15 |     await page.getByRole('button', { name: 'Cart' }).click();
  16 |     await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn' })).toBeVisible();
  17 |     
  18 |     // Sau đó, nhấp vào logo để quay lại Trang chủ
  19 |     await page.getByRole('button', { name: /Yapee/ }).click();
  20 |     
  21 |     // Xác minh rằng đã quay lại trang chủ bằng cách tìm một tiêu đề đặc trưng
  22 |     await expect(page.getByRole('heading', { name: 'Sản phẩm nổi bật' })).toBeVisible();
  23 |   });
  24 |
  25 |   test("should navigate to the Cart page", async ({ page }) => {
  26 |     // Nhấp vào biểu tượng giỏ hàng trong header
  27 |     await page.getByRole('button', { name: 'Cart' }).click();
  28 |     
  29 |     // Xác minh đã đến trang giỏ hàng (trường hợp giỏ hàng trống)
  30 |     await expect(page.getByRole('heading', { name: 'Giỏ hàng trống' })).toBeVisible();
  31 |     await expect(page.getByText('Bạn chưa có sản phẩm nào trong giỏ hàng')).toBeVisible();
  32 |   });
  33 |   
  34 |   test("should navigate to the Poster page", async ({ page }) => {
  35 |     // Nhấp vào nút 'Poster' trong header
  36 |     await page.getByRole('button', { name: 'Poster' }).click();
  37 |     
  38 |     // Xác minh đã đến trang Poster
  39 |     await expect(page.getByRole('heading', { name: 'Tạo Poster sản phẩm' })).toBeVisible();
  40 |   });
  41 |
  42 |   test("should open the Auth modal when clicking Account button (unauthenticated)", async ({ page }) => {
  43 |     // Nhấp vào nút 'Đăng nhập' trong header
  44 |     await page.getByRole('button', { name: 'Đăng nhập' }).click();
  45 |     
  46 |     // Xác minh modal xác thực đã xuất hiện
  47 |     const modal = page.getByTestId('auth-modal');
  48 |     await expect(modal).toBeVisible();
> 49 |     await expect(modal.getByRole("heading", { name: "Đăng nhập vào Yapee" })).toBeVisible();
     |                                                                               ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  50 |   });
  51 | }); 
```