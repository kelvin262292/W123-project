import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('ShopVN_2025-06-07', async ({ page, context }) => {
  
    // Navigate to URL
    await page.goto('http://localhost:5173');

    // Navigate to URL
    await page.goto('http://localhost:3000');

    // Navigate to URL
    await page.goto('http://localhost:5173');

    // Take screenshot
    await page.screenshot({ path: 'homepage.png', fullPage: true });

    // Click element
    await page.click('text=Tạo dữ liệu mẫu');

    // Click element
    await page.click('text=MacBook Air M3');

    // Take screenshot
    await page.screenshot({ path: 'product_detail.png', fullPage: true });

    // Click element
    await page.click('text=Thêm vào giỏ hàng');

    // Take screenshot
    await page.screenshot({ path: 'add_to_cart.png' });

    // Click element
    await page.click('svg[viewBox="0 0 24 24"]:has(path[d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"])');

    // Take screenshot
    await page.screenshot({ path: 'cart_page.png', fullPage: true });

    // Fill input field
    await page.fill('input[placeholder="Tìm kiếm sản phẩm..."]', 'iPhone');

    // Click element
    await page.click('button:has-text("Tìm")');

    // Take screenshot
    await page.screenshot({ path: 'search_results.png', fullPage: true });

    // Click element
    await page.click('text=Trang chủ');

    // Click element
    await page.click('text=Điện tử');

    // Take screenshot
    await page.screenshot({ path: 'category_page.png', fullPage: true });

    // Click element
    await page.click('text=Poster');

    // Take screenshot
    await page.screenshot({ path: 'poster_page.png', fullPage: true });
});