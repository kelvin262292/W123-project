import { test, expect } from "@playwright/test";

test.describe("Page Navigation Smoke Test", () => {
  const appUrl = "http://localhost:5173";

  test.beforeEach(async ({ page }) => {
    // Điều hướng đến URL gốc trước mỗi bài kiểm tra
    await page.goto(appUrl);
    // Chờ cho trang chủ tải xong, nhận biết bằng sự hiện diện của footer
    await expect(page.locator('footer')).toBeVisible();
  });

  test("should navigate to the Home page by clicking the logo", async ({ page }) => {
    // Đầu tiên, điều hướng đến một trang khác (ví dụ: Giỏ hàng)
    await page.getByRole('button', { name: 'Cart' }).click();
    await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn' })).toBeVisible();
    
    // Sau đó, nhấp vào logo để quay lại Trang chủ
    await page.getByRole('button', { name: /Yapee/ }).click();
    
    // Xác minh rằng đã quay lại trang chủ bằng cách tìm một tiêu đề đặc trưng
    await expect(page.getByRole('heading', { name: 'Sản phẩm nổi bật' })).toBeVisible();
  });

  test("should navigate to the Cart page", async ({ page }) => {
    // Nhấp vào biểu tượng giỏ hàng trong header
    await page.getByRole('button', { name: 'Cart' }).click();
    
    // Xác minh đã đến trang giỏ hàng (trường hợp giỏ hàng trống)
    await expect(page.getByRole('heading', { name: 'Giỏ hàng trống' })).toBeVisible();
    await expect(page.getByText('Bạn chưa có sản phẩm nào trong giỏ hàng')).toBeVisible();
  });
  
  test("should navigate to the Poster page", async ({ page }) => {
    // Nhấp vào nút 'Poster' trong header
    await page.getByRole('button', { name: 'Poster' }).click();
    
    // Xác minh đã đến trang Poster
    await expect(page.getByRole('heading', { name: 'Tạo Poster sản phẩm' })).toBeVisible();
  });

  test("should open the Auth modal when clicking Account button (unauthenticated)", async ({ page }) => {
    // Nhấp vào nút 'Đăng nhập' trong header
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    
    // Xác minh modal xác thực đã xuất hiện
    const modal = page.getByTestId('auth-modal');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole("heading", { name: "Đăng nhập vào Yapee" })).toBeVisible();
  });
}); 