import { test, expect, Page } from '@playwright/test';
import { performance } from 'perf_hooks';

// Performance Test Suite for Week 3
test.describe('Performance Testing', () => {
  let startTime: number;
  let endTime: number;

  test.beforeEach(async ({ page }) => {
    // Setup performance monitoring
    startTime = performance.now();
  });

  test.afterEach(async ({ page }) => {
    endTime = performance.now();
    const loadTime = endTime - startTime;
    console.log(`Test execution time: ${loadTime.toFixed(2)}ms`);
  });

  test('Homepage load performance', async ({ page }) => {
    const startLoad = performance.now();
    
    // Navigate to homepage
    await page.goto('http://localhost:5173');
    
    // Wait for main content to load
    await page.waitForSelector('[data-testid="product-grid"]', { timeout: 10000 });
    
    const endLoad = performance.now();
    const loadTime = endLoad - startLoad;
    
    console.log(`Homepage load time: ${loadTime.toFixed(2)}ms`);
    
    // Performance assertion - should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Take screenshot for documentation
    await page.screenshot({ 
      path: `docs/performance-homepage-${Date.now()}.png`,
      fullPage: true 
    });
  });

  test('Product search performance', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Wait for page to load
    await page.waitForSelector('input[placeholder*="Tìm kiếm"]');
    
    const searchStart = performance.now();
    
    // Perform search
    await page.fill('input[placeholder*="Tìm kiếm"]', 'laptop');
    await page.press('input[placeholder*="Tìm kiếm"]', 'Enter');
    
    // Wait for search results
    await page.waitForSelector('[data-testid="product-grid"]', { timeout: 5000 });
    
    const searchEnd = performance.now();
    const searchTime = searchEnd - searchStart;
    
    console.log(`Search response time: ${searchTime.toFixed(2)}ms`);
    
    // Search should complete within 2 seconds
    expect(searchTime).toBeLessThan(2000);
  });

  test('Cart operations performance', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]');
    
    const addToCartStart = performance.now();
    
    // Add product to cart
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await firstProduct.locator('button:has-text("Thêm vào giỏ")').click();
    
    // Wait for cart update
    await page.waitForSelector('[data-testid="cart-count"]', { timeout: 3000 });
    
    const addToCartEnd = performance.now();
    const addToCartTime = addToCartEnd - addToCartStart;
    
    console.log(`Add to cart time: ${addToCartTime.toFixed(2)}ms`);
    
    // Cart operations should be fast
    expect(addToCartTime).toBeLessThan(1000);
  });

  test('Admin panel load performance', async ({ page }) => {
    // Login as admin first
    await page.goto('http://localhost:5173');
    
    // Click login
    await page.click('button:has-text("Đăng nhập")');
    
    // Fill admin credentials
    await page.fill('input[placeholder="Email"]', 'admin@shopvn.com');
    await page.fill('input[placeholder="Mật khẩu"]', 'admin123');
    await page.click('button[type="submit"]:has-text("Đăng nhập")');
    
    // Wait for login to complete
    await page.waitForTimeout(2000);
    
    const adminLoadStart = performance.now();
    
    // Navigate to admin panel
    await page.click('button:has-text("Admin")');
    
    // Wait for admin panel to load
    await page.waitForSelector('h1:has-text("Admin Dashboard")', { timeout: 10000 });
    
    const adminLoadEnd = performance.now();
    const adminLoadTime = adminLoadEnd - adminLoadStart;
    
    console.log(`Admin panel load time: ${adminLoadTime.toFixed(2)}ms`);
    
    // Admin panel should load within 5 seconds
    expect(adminLoadTime).toBeLessThan(5000);
    
    // Take screenshot
    await page.screenshot({ 
      path: `docs/performance-admin-${Date.now()}.png`,
      fullPage: true 
    });
  });

  test('Memory usage monitoring', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory ? {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
      } : null;
    });
    
    if (initialMemory) {
      console.log('Initial memory usage:', initialMemory);
    }
    
    // Perform various operations
    await page.waitForSelector('[data-testid="product-grid"]');
    
    // Navigate through different pages
    await page.click('a:has-text("Danh mục")');
    await page.waitForTimeout(1000);
    
    await page.click('a:has-text("Trang chủ")');
    await page.waitForTimeout(1000);
    
    // Get final memory usage
    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory ? {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
      } : null;
    });
    
    if (finalMemory && initialMemory) {
      const memoryIncrease = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize;
      console.log('Memory increase:', memoryIncrease, 'bytes');
      console.log('Final memory usage:', finalMemory);
      
      // Memory increase should be reasonable (less than 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    }
  });

  test('API response time testing', async ({ page }) => {
    // Monitor network requests
    const apiCalls: Array<{url: string, duration: number}> = [];
    
    page.on('response', async (response) => {
      if (response.url().includes('/api/') || response.url().includes('convex')) {
        const request = response.request();
        const timing = response.timing();
        
        apiCalls.push({
          url: response.url(),
          duration: timing.responseEnd - timing.requestStart
        });
      }
    });
    
    await page.goto('http://localhost:5173');
    
    // Wait for all API calls to complete
    await page.waitForTimeout(5000);
    
    // Analyze API performance
    console.log('API Calls Performance:');
    apiCalls.forEach(call => {
      console.log(`${call.url}: ${call.duration.toFixed(2)}ms`);
      
      // Each API call should respond within 500ms
      expect(call.duration).toBeLessThan(500);
    });
  });

  test('Concurrent user simulation', async ({ browser }) => {
    const contexts = [];
    const pages = [];
    
    // Create 5 concurrent users
    for (let i = 0; i < 5; i++) {
      const context = await browser.newContext();
      const page = await context.newPage();
      contexts.push(context);
      pages.push(page);
    }
    
    const startConcurrent = performance.now();
    
    // All users navigate to homepage simultaneously
    const promises = pages.map(async (page, index) => {
      await page.goto('http://localhost:5173');
      await page.waitForSelector('[data-testid="product-grid"]');
      
      // Each user performs different actions
      if (index % 2 === 0) {
        // Search for products
        await page.fill('input[placeholder*="Tìm kiếm"]', 'laptop');
        await page.press('input[placeholder*="Tìm kiếm"]', 'Enter');
      } else {
        // Browse categories
        await page.click('a:has-text("Danh mục")');
      }
      
      await page.waitForTimeout(2000);
    });
    
    await Promise.all(promises);
    
    const endConcurrent = performance.now();
    const concurrentTime = endConcurrent - startConcurrent;
    
    console.log(`Concurrent users test time: ${concurrentTime.toFixed(2)}ms`);
    
    // System should handle 5 concurrent users within 10 seconds
    expect(concurrentTime).toBeLessThan(10000);
    
    // Cleanup
    for (const context of contexts) {
      await context.close();
    }
  });
});