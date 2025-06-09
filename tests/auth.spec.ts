import { test, expect } from "@playwright/test";

test.describe.serial("Authentication and User Flows", () => {
  const userEmail = `testuser_${Date.now()}@example.com`;
  const userPassword = "password123";

  // URL của trang web, mặc định là localhost của Vite
  const appUrl = "http://localhost:5173";

  test.beforeEach(async ({ page }) => {
    await page.goto(appUrl);
  });

  test("1. User can sign up for a new account", async ({ page }) => {
    // Mở modal đăng nhập/đăng ký
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    
    // Chờ modal xuất hiện và xác minh tiêu đề, sử dụng data-testid
    const modal = page.getByTestId('auth-modal');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole("heading", { name: "Đăng nhập vào Yapee" })).toBeVisible();

    // Chuyển sang biểu mẫu đăng ký
    await modal.getByRole("button", { name: "Đăng ký ngay" }).click();

    // Điền thông tin đăng ký
    await modal.getByPlaceholder("Email").fill(userEmail);
    await modal.getByPlaceholder("Mật khẩu").fill(userPassword);

    // Gửi biểu mẫu đăng ký
    await modal.getByRole("button", { name: "Đăng ký" }).click();

    // Xác minh rằng modal đã đóng và người dùng đã đăng nhập thành công
    await expect(modal).not.toBeVisible();
    await expect(page.getByRole("button", { name: "Tài khoản" })).toBeVisible();
    
    // Điều hướng đến trang tài khoản để kiểm tra chi tiết
    await page.getByRole("button", { name: "Tài khoản" }).click();
    await expect(page.getByRole("heading", { name: "Thông tin tài khoản" })).toBeVisible();
    await expect(page.getByText(userEmail)).toBeVisible();
  });

  test("2. User can sign out", async ({ page }) => {
    // Test này giả định người dùng đã đăng nhập từ test trước
    // Chờ trang tài khoản tải xong sau khi đăng ký
    await page.waitForURL(`${appUrl}/account`);
    await expect(page.getByRole("heading", { name: "Tài khoản" })).toBeVisible();
    
    // Tìm và nhấp vào nút Đăng xuất
    await page.getByRole("button", { name: "Sign out" }).click();

    // Xác minh rằng người dùng đã đăng xuất
    // Nút "Tài khoản" sẽ đổi thành "Đăng nhập"
    await expect(page.getByRole("button", { name: "Đăng nhập" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Tài khoản" })).not.toBeVisible();

    // Thử mở modal đăng nhập
    await page.getByRole("button", { name: "Đăng nhập" }).click();
    const modal = page.getByTestId('auth-modal');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole("heading", { name: "Đăng nhập vào Yapee" })).toBeVisible();
  });

  test("3. User can sign in", async ({ page }) => {
    // Test này giả định người dùng đã được tạo và đăng xuất từ các test trước
     
    // Mở modal đăng nhập
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    const modal = page.getByTestId('auth-modal');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole("heading", { name: "Đăng nhập vào Yapee" })).toBeVisible();

    // Điền thông tin đăng nhập
    await modal.getByPlaceholder("Email").fill(userEmail);
    await modal.getByPlaceholder("Mật khẩu").fill(userPassword);

    // Gửi biểu mẫu đăng nhập (nút bên trong modal)
    await modal.getByRole("button", { name: "Đăng nhập" }).click();

    // Xác minh đăng nhập thành công và modal đã đóng
    await expect(modal).not.toBeVisible();
    await expect(page.getByRole("button", { name: "Tài khoản" })).toBeVisible();
  });

  test("4. User can view account information and order history", async ({ page }) => {
    // Test này giả định người dùng đã đăng nhập từ test trước
    
    // Điều hướng đến trang tài khoản
    await page.getByRole("button", { name: "Tài khoản" }).click();
    await expect(page.getByRole("heading", { name: "Tài khoản" })).toBeVisible();

    // 1. Xác minh tab "Thông tin tài khoản"
    await expect(page.getByRole("heading", { name: "Thông tin tài khoản" })).toBeVisible();
    await expect(page.getByText(userEmail)).toBeVisible();

    // 2. Chuyển sang tab "Lịch sử đơn hàng"
    await page.getByRole("button", { name: /Đơn hàng/ }).click();

    // 3. Xác minh nội dung tab "Lịch sử đơn hàng"
    await expect(page.getByRole("heading", { name: "Lịch sử đơn hàng" })).toBeVisible();
    await expect(page.getByText("Bạn chưa có đơn hàng nào")).toBeVisible();
  });
}); 