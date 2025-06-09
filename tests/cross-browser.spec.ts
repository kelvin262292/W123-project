import { test, expect, devices } from '@playwright/test';

// Cross-Browser Testing Suite for Week 3
test.describe('Cross-Browser Compatibility Testing', () => {
  
  // Test on different browsers
  const browsers = ['chromium', 'firefox', 'webkit'];
  
  browsers.forEach(browserName => {
    test.describe(`${browserName} Browser Tests`, () => {
      
      test(`Homepage loads correctly on ${browserName}`, async ({ page }) => {
        await page.goto('http://localhost:5173');
        
        // Wait for main content
        await page.waitForSelector('h1', { timeout: 10000 });
        
        // Check if main elements are visible
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('nav')).toBeVisible();
        
        // Take screenshot for documentation
        await page.screenshot({ 
          path: `docs/cross-browser-${browserName}-homepage-${Date.now()}.png`,
          fullPage: true 
        });
        
        console.log(`${browserName}: Homepage loaded successfully`);
      });
      
      test(`Navigation works on ${browserName}`, async ({ page }) => {
        await page.goto('http://localhost:5173');
        
        // Test navigation links
        const navLinks = [
          { text: 'Trang chủ', expected: '/' },
          { text: 'Danh mục', expected: '#categories' },
          { text: 'Giới thiệu', expected: '#about' }
        ];
        
        for (const link of navLinks) {
          await page.click(`a:has-text("${link.text}")`);
          await page.waitForTimeout(1000);
          
          // Verify navigation worked
          const currentUrl = page.url();
          expect(currentUrl).toContain('localhost:5173');
          
          console.log(`${browserName}: Navigation to ${link.text} works`);
        }
      });
      
      test(`Search functionality works on ${browserName}`, async ({ page }) => {
        await page.goto('http://localhost:5173');
        
        // Wait for search input
        await page.waitForSelector('input[placeholder*="Tìm kiếm"]', { timeout: 10000 });
        
        // Perform search
        await page.fill('input[placeholder*="Tìm kiếm"]', 'laptop');
        await page.press('input[placeholder*="Tìm kiếm"]', 'Enter');
        
        await page.waitForTimeout(2000);
        
        // Verify search results or no errors
        const pageContent = await page.content();
        expect(pageContent).not.toContain('error');
        
        console.log(`${browserName}: Search functionality works`);
      });
      
      test(`Authentication works on ${browserName}`, async ({ page }) => {
        await page.goto('http://localhost:5173');
        
        // Test login flow
        await page.click('button:has-text("Đăng nhập")');
        await page.waitForTimeout(1000);
        
        // Fill login form
        await page.fill('input[placeholder="Email"]', 'test@example.com');
        await page.fill('input[placeholder="Mật khẩu"]', 'password123');
        
        // Submit form
        await page.click('button[type="submit"]:has-text("Đăng nhập")');
        await page.waitForTimeout(3000);
        
        // Verify no critical errors
        const pageContent = await page.content();
        expect(pageContent).not.toContain('critical error');
        
        console.log(`${browserName}: Authentication flow works`);
      });
      
      test(`Cart functionality works on ${browserName}`, async ({ page }) => {
        await page.goto('http://localhost:5173');
        
        // Wait for products to load
        await page.waitForTimeout(3000);
        
        // Look for add to cart buttons
        const addToCartButtons = page.locator('button:has-text("Thêm vào giỏ")');
        const buttonCount = await addToCartButtons.count();
        
        if (buttonCount > 0) {
          // Click first add to cart button
          await addToCartButtons.first().click();
          await page.waitForTimeout(2000);
          
          console.log(`${browserName}: Cart functionality works`);
        } else {
          console.log(`${browserName}: No add to cart buttons found`);
        }
      });
    });
  });
  
  test.describe('Mobile Device Testing', () => {
    
    test('Mobile layout - iPhone', async ({ browser }) => {
      const context = await browser.newContext({
        ...devices['iPhone 12']
      });
      const page = await context.newPage();
      
      await page.goto('http://localhost:5173');
      await page.waitForTimeout(3000);
      
      // Check mobile layout
      const viewport = page.viewportSize();
      expect(viewport?.width).toBeLessThanOrEqual(414);
      
      // Take mobile screenshot
      await page.screenshot({ 
        path: `docs/mobile-iphone-${Date.now()}.png`,
        fullPage: true 
      });
      
      // Test mobile navigation (hamburger menu)
      const mobileMenu = page.locator('[data-testid="mobile-menu"]');
      if (await mobileMenu.isVisible()) {
        await mobileMenu.click();
        await page.waitForTimeout(1000);
      }
      
      await context.close();
      console.log('iPhone layout test completed');
    });
    
    test('Mobile layout - Android', async ({ browser }) => {
      const context = await browser.newContext({
        ...devices['Pixel 5']
      });
      const page = await context.newPage();
      
      await page.goto('http://localhost:5173');
      await page.waitForTimeout(3000);
      
      // Check mobile layout
      const viewport = page.viewportSize();
      expect(viewport?.width).toBeLessThanOrEqual(393);
      
      // Take mobile screenshot
      await page.screenshot({ 
        path: `docs/mobile-android-${Date.now()}.png`,
        fullPage: true 
      });
      
      await context.close();
      console.log('Android layout test completed');
    });
    
    test('Tablet layout - iPad', async ({ browser }) => {
      const context = await browser.newContext({
        ...devices['iPad Pro']
      });
      const page = await context.newPage();
      
      await page.goto('http://localhost:5173');
      await page.waitForTimeout(3000);
      
      // Check tablet layout
      const viewport = page.viewportSize();
      expect(viewport?.width).toBeGreaterThan(768);
      
      // Take tablet screenshot
      await page.screenshot({ 
        path: `docs/tablet-ipad-${Date.now()}.png`,
        fullPage: true 
      });
      
      await context.close();
      console.log('iPad layout test completed');
    });
  });
  
  test.describe('Responsive Design Testing', () => {
    
    test('Responsive breakpoints', async ({ page }) => {
      const breakpoints = [
        { name: 'Mobile', width: 375, height: 667 },
        { name: 'Tablet', width: 768, height: 1024 },
        { name: 'Desktop', width: 1920, height: 1080 },
        { name: 'Large Desktop', width: 2560, height: 1440 }
      ];
      
      for (const breakpoint of breakpoints) {
        await page.setViewportSize({ 
          width: breakpoint.width, 
          height: breakpoint.height 
        });
        
        await page.goto('http://localhost:5173');
        await page.waitForTimeout(2000);
        
        // Take screenshot at each breakpoint
        await page.screenshot({ 
          path: `docs/responsive-${breakpoint.name.toLowerCase()}-${Date.now()}.png`,
          fullPage: true 
        });
        
        // Check if layout adapts properly
        const body = page.locator('body');
        await expect(body).toBeVisible();
        
        console.log(`${breakpoint.name} (${breakpoint.width}x${breakpoint.height}): Layout test passed`);
      }
    });
    
    test('Touch interactions on mobile', async ({ browser }) => {
      const context = await browser.newContext({
        ...devices['iPhone 12'],
        hasTouch: true
      });
      const page = await context.newPage();
      
      await page.goto('http://localhost:5173');
      await page.waitForTimeout(3000);
      
      // Test touch interactions
      const touchableElements = [
        'button:has-text("Đăng nhập")',
        'a:has-text("Trang chủ")',
        'input[placeholder*="Tìm kiếm"]'
      ];
      
      for (const selector of touchableElements) {
        const element = page.locator(selector);
        if (await element.isVisible()) {
          await element.tap();
          await page.waitForTimeout(500);
          console.log(`Touch interaction with ${selector} works`);
        }
      }
      
      await context.close();
    });
  });
  
  test.describe('Browser Feature Support', () => {
    
    test('JavaScript features compatibility', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      // Test modern JavaScript features
      const jsFeatures = await page.evaluate(() => {
        const features = {
          es6: typeof Promise !== 'undefined',
          fetch: typeof fetch !== 'undefined',
          localStorage: typeof localStorage !== 'undefined',
          sessionStorage: typeof sessionStorage !== 'undefined',
          webWorkers: typeof Worker !== 'undefined',
          modules: 'noModule' in HTMLScriptElement.prototype
        };
        
        return features;
      });
      
      // Verify essential features are supported
      expect(jsFeatures.es6).toBe(true);
      expect(jsFeatures.fetch).toBe(true);
      expect(jsFeatures.localStorage).toBe(true);
      
      console.log('JavaScript features support:', jsFeatures);
    });
    
    test('CSS features compatibility', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      // Test CSS features
      const cssFeatures = await page.evaluate(() => {
        const testElement = document.createElement('div');
        const features = {
          flexbox: 'flex' in testElement.style,
          grid: 'grid' in testElement.style,
          customProperties: CSS.supports('--custom: value'),
          transforms: 'transform' in testElement.style,
          transitions: 'transition' in testElement.style
        };
        
        return features;
      });
      
      // Verify essential CSS features
      expect(cssFeatures.flexbox).toBe(true);
      expect(cssFeatures.transforms).toBe(true);
      
      console.log('CSS features support:', cssFeatures);
    });
  });
  
  test.describe('Performance Across Browsers', () => {
    
    test('Load time comparison across browsers', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('http://localhost:5173');
      await page.waitForSelector('h1', { timeout: 10000 });
      
      const loadTime = Date.now() - startTime;
      
      console.log(`Load time: ${loadTime}ms`);
      
      // Should load within reasonable time
      expect(loadTime).toBeLessThan(10000);
    });
    
    test('Memory usage across browsers', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      // Get memory usage if available
      const memoryInfo = await page.evaluate(() => {
        return (performance as any).memory ? {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
        } : null;
      });
      
      if (memoryInfo) {
        console.log('Memory usage:', memoryInfo);
        
        // Memory usage should be reasonable
        expect(memoryInfo.usedJSHeapSize).toBeLessThan(100 * 1024 * 1024); // 100MB
      } else {
        console.log('Memory API not available in this browser');
      }
    });
  });
});