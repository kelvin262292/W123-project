# Test info

- Name: Page Navigation Smoke Test >> should navigate to the Poster page
- Location: D:\W123-project\tests\navigation.spec.ts:34:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('heading', { name: 'Tạo Poster sản phẩm' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Tạo Poster sản phẩm' })

    at D:\W123-project\tests\navigation.spec.ts:39:78
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
- main:
  - heading "🌟 Sản Phẩm Nổi Bật 🌟" [level=2]
  - paragraph: Khám phá những sản phẩm được yêu thích nhất tại ShopVN
  - img "MacBook Air M3"
  - text: "-7%"
  - heading "MacBook Air M3" [level=3]
  - paragraph: Laptop siêu mỏng, hiệu năng cao cho công việc và sáng tạo
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (89 đánh giá) 27.990.000đ 29.990.000đ
  - button "Xem Chi Tiết"
  - 'img "Sách: Đắc Nhân Tâm"'
  - text: "-26%"
  - 'heading "Sách: Đắc Nhân Tâm" [level=3]'
  - paragraph: Sách kinh điển về nghệ thuật giao tiếp và ứng xử
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (567 đánh giá) 89.000đ 120.000đ
  - button "Xem Chi Tiết"
  - img "iPhone 15 Pro Max"
  - text: "-9% ⚡ FLASH SALE"
  - heading "iPhone 15 Pro Max" [level=3]
  - paragraph: Điện thoại thông minh cao cấp với hiệu năng vượt trội
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (156 đánh giá) 29.990.000đ 32.990.000đ
  - button "Xem Chi Tiết"
  - img "Máy Pha Cà Phê Espresso"
  - heading "Máy Pha Cà Phê Espresso" [level=3]
  - paragraph: Máy pha cà phê espresso chuyên nghiệp tại nhà
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (45 đánh giá) 3.990.000đ
  - button "Xem Chi Tiết"
  - img "Bút Bi Cao Cấp Parker"
  - heading "Bút Bi Cao Cấp Parker" [level=3]
  - paragraph: Bút bi Parker cao cấp, thiết kế sang trọng
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (34 đánh giá) 450.000đ
  - button "Xem Chi Tiết"
  - img "Nồi Cơm Điện Cao Cấp"
  - text: "-17% ⚡ FLASH SALE"
  - heading "Nồi Cơm Điện Cao Cấp" [level=3]
  - paragraph: Nồi cơm điện thông minh với công nghệ IH hiện đại
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (67 đánh giá) 2.490.000đ 2.990.000đ
  - button "Xem Chi Tiết"
  - heading "🎉 Còn nhiều sản phẩm khác đang chờ bạn khám phá!" [level=3]
  - paragraph: Hàng ngàn sản phẩm chất lượng với giá tốt nhất thị trường
  - button "Khám Phá Ngay 🚀"
  - text: ✨ 🌟 💫 ⭐
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
> 39 |     await expect(page.getByRole('heading', { name: 'Tạo Poster sản phẩm' })).toBeVisible();
     |                                                                              ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  40 |   });
  41 |
  42 |   test("should open the Auth modal when clicking Account button (unauthenticated)", async ({ page }) => {
  43 |     // Nhấp vào nút 'Đăng nhập' trong header
  44 |     await page.getByRole('button', { name: 'Đăng nhập' }).click();
  45 |     
  46 |     // Xác minh modal xác thực đã xuất hiện
  47 |     const modal = page.getByTestId('auth-modal');
  48 |     await expect(modal).toBeVisible();
  49 |     await expect(modal.getByRole("heading", { name: "Đăng nhập vào Yapee" })).toBeVisible();
  50 |   });
  51 | }); 
```