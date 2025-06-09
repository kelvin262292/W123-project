import { defineConfig, devices } from '@playwright/test';

/**
 * Cấu hình Playwright cho ShopVN
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: '../',
  /* Thời gian tối đa cho mỗi test */
  timeout: 60000,
  /* Thời gian chờ cho các expect */
  expect: {
    timeout: 10000
  },
  /* Số lần thử lại nếu test thất bại */
  retries: 2,
  /* Reporter để hiển thị kết quả test */
  reporter: [
    ['html'],
    ['list']
  ],
  /* Cấu hình cho các trình duyệt */
  use: {
    /* Thời gian chờ cho các action */
    actionTimeout: 15000,
    /* Thời gian chờ cho navigation */
    navigationTimeout: 30000,
    /* Chụp ảnh khi test thất bại */
    screenshot: 'only-on-failure',
    /* Ghi lại trace khi test thất bại */
    trace: 'retain-on-failure',
  },
  /* Cấu hình cho các project */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
}); 