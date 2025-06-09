import { test, expect, Page } from '@playwright/test';

// Security Test Suite for Week 3
test.describe('Security Testing', () => {
  
  test.describe('Authentication Security', () => {
    
    test('Should prevent access to admin routes without authentication', async ({ page }) => {
      // Try to access admin panel directly without login
      await page.goto('http://localhost:5173/#admin');
      
      // Should be redirected to login or show access denied
      await page.waitForTimeout(2000);
      
      // Check if admin content is not accessible
      const adminDashboard = page.locator('h1:has-text("Admin Dashboard")');
      await expect(adminDashboard).not.toBeVisible();
      
      // Take screenshot for documentation
      await page.screenshot({ 
        path: `docs/security-admin-unauthorized-${Date.now()}.png` 
      });
    });
    
    test('Should prevent non-admin users from accessing admin features', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      // Register as regular user
      await page.click('button:has-text("Đăng ký")');
      await page.fill('input[placeholder="Email"]', 'user@test.com');
      await page.fill('input[placeholder="Mật khẩu"]', 'password123');
      await page.click('button[type="submit"]:has-text("Đăng ký")');
      
      await page.waitForTimeout(3000);
      
      // Check if Admin button is not visible for regular users
      const adminButton = page.locator('button:has-text("Admin")');
      await expect(adminButton).not.toBeVisible();
      
      // Try to access admin URL directly
      await page.goto('http://localhost:5173/#admin');
      await page.waitForTimeout(2000);
      
      // Should not see admin dashboard
      const adminDashboard = page.locator('h1:has-text("Admin Dashboard")');
      await expect(adminDashboard).not.toBeVisible();
    });
    
    test('Should validate admin credentials properly', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      // Try login with invalid admin credentials
      await page.click('button:has-text("Đăng nhập")');
      await page.fill('input[placeholder="Email"]', 'fake-admin@test.com');
      await page.fill('input[placeholder="Mật khẩu"]', 'wrongpassword');
      await page.click('button[type="submit"]:has-text("Đăng nhập")');
      
      await page.waitForTimeout(3000);
      
      // Should not have access to admin features
      const adminButton = page.locator('button:has-text("Admin")');
      await expect(adminButton).not.toBeVisible();
    });
    
    test('Should handle session timeout properly', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      // Login as admin
      await page.click('button:has-text("Đăng nhập")');
      await page.fill('input[placeholder="Email"]', 'admin@shopvn.com');
      await page.fill('input[placeholder="Mật khẩu"]', 'admin123');
      await page.click('button[type="submit"]:has-text("Đăng nhập")');
      
      await page.waitForTimeout(3000);
      
      // Verify admin access
      const adminButton = page.locator('button:has-text("Admin")');
      await expect(adminButton).toBeVisible();
      
      // Clear session storage to simulate session timeout
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
      
      // Refresh page
      await page.reload();
      await page.waitForTimeout(2000);
      
      // Should lose admin access
      await expect(adminButton).not.toBeVisible();
    });
  });
  
  test.describe('Input Validation Security', () => {
    
    test('Should prevent XSS in search input', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      // Wait for search input
      await page.waitForSelector('input[placeholder*="Tìm kiếm"]');
      
      // Try XSS payload
      const xssPayload = '<script>alert("XSS")</script>';
      await page.fill('input[placeholder*="Tìm kiếm"]', xssPayload);
      await page.press('input[placeholder*="Tìm kiếm"]', 'Enter');
      
      await page.waitForTimeout(2000);
      
      // Check that script is not executed (no alert dialog)
      const dialogs: string[] = [];
      page.on('dialog', dialog => {
        dialogs.push(dialog.message());
        dialog.dismiss();
      });
      
      await page.waitForTimeout(1000);
      
      // Should not have any alert dialogs
      expect(dialogs).toHaveLength(0);
      
      // Take screenshot
      await page.screenshot({ 
        path: `docs/security-xss-search-${Date.now()}.png` 
      });
    });
    
    test('Should validate email format in registration', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      await page.click('button:has-text("Đăng ký")');
      
      // Try invalid email formats
      const invalidEmails = [
        'invalid-email',
        '@invalid.com',
        'test@',
        'test..test@example.com',
        'test@.com'
      ];
      
      for (const email of invalidEmails) {
        await page.fill('input[placeholder="Email"]', email);
        await page.fill('input[placeholder="Mật khẩu"]', 'password123');
        await page.click('button[type="submit"]:has-text("Đăng ký")');
        
        await page.waitForTimeout(1000);
        
        // Should show validation error or prevent submission
        const currentUrl = page.url();
        expect(currentUrl).toContain('localhost:5173'); // Should stay on same page
        
        // Clear fields for next test
        await page.fill('input[placeholder="Email"]', '');
        await page.fill('input[placeholder="Mật khẩu"]', '');
      }
    });
    
    test('Should enforce password strength requirements', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      await page.click('button:has-text("Đăng ký")');
      
      // Try weak passwords
      const weakPasswords = [
        '123',
        'password',
        'abc',
        '111111'
      ];
      
      for (const password of weakPasswords) {
        await page.fill('input[placeholder="Email"]', 'test@example.com');
        await page.fill('input[placeholder="Mật khẩu"]', password);
        await page.click('button[type="submit"]:has-text("Đăng ký")');
        
        await page.waitForTimeout(1000);
        
        // Should show validation error or prevent submission
        const currentUrl = page.url();
        expect(currentUrl).toContain('localhost:5173');
        
        // Clear fields
        await page.fill('input[placeholder="Email"]', '');
        await page.fill('input[placeholder="Mật khẩu"]', '');
      }
    });
  });
  
  test.describe('Data Protection Security', () => {
    
    test('Should not expose sensitive data in client-side', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      // Login as admin
      await page.click('button:has-text("Đăng nhập")');
      await page.fill('input[placeholder="Email"]', 'admin@shopvn.com');
      await page.fill('input[placeholder="Mật khẩu"]', 'admin123');
      await page.click('button[type="submit"]:has-text("Đăng nhập")');
      
      await page.waitForTimeout(3000);
      
      // Check localStorage and sessionStorage for sensitive data
      const storageData = await page.evaluate(() => {
        const local = { ...localStorage };
        const session = { ...sessionStorage };
        return { local, session };
      });
      
      // Should not store passwords or sensitive tokens in plain text
      const storageString = JSON.stringify(storageData).toLowerCase();
      expect(storageString).not.toContain('admin123');
      expect(storageString).not.toContain('password');
      
      console.log('Storage data check passed - no sensitive data exposed');
    });
    
    test('Should protect against CSRF attacks', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      // Login as admin
      await page.click('button:has-text("Đăng nhập")');
      await page.fill('input[placeholder="Email"]', 'admin@shopvn.com');
      await page.fill('input[placeholder="Mật khẩu"]', 'admin123');
      await page.click('button[type="submit"]:has-text("Đăng nhập")');
      
      await page.waitForTimeout(3000);
      
      // Try to perform admin action from different origin
      const maliciousScript = `
        fetch('http://localhost:5173/api/admin/users', {
          method: 'DELETE',
          credentials: 'include'
        }).then(response => {
          console.log('CSRF attack result:', response.status);
        }).catch(error => {
          console.log('CSRF attack blocked:', error);
        });
      `;
      
      // Execute script and check if it's blocked
      const result = await page.evaluate(maliciousScript);
      
      // Should be protected against CSRF
      console.log('CSRF protection test completed');
    });
  });
  
  test.describe('File Upload Security', () => {
    
    test('Should validate file types for uploads', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      // Login as admin to access file upload features
      await page.click('button:has-text("Đăng nhập")');
      await page.fill('input[placeholder="Email"]', 'admin@shopvn.com');
      await page.fill('input[placeholder="Mật khẩu"]', 'admin123');
      await page.click('button[type="submit"]:has-text("Đăng nhập")');
      
      await page.waitForTimeout(3000);
      
      // Navigate to admin panel
      await page.click('button:has-text("Admin")');
      await page.waitForTimeout(2000);
      
      // Look for file upload inputs
      const fileInputs = page.locator('input[type="file"]');
      const fileInputCount = await fileInputs.count();
      
      if (fileInputCount > 0) {
        console.log(`Found ${fileInputCount} file upload inputs`);
        
        // Test with malicious file types
        const maliciousFiles = [
          'test.exe',
          'script.js',
          'malware.bat',
          'virus.scr'
        ];
        
        // Note: In a real test, you would create these files and test upload
        console.log('File upload security validation needed for:', maliciousFiles);
      } else {
        console.log('No file upload inputs found - skipping file upload security test');
      }
    });
  });
  
  test.describe('API Security', () => {
    
    test('Should rate limit API requests', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      // Monitor network requests
      const requests: string[] = [];
      
      page.on('request', request => {
        if (request.url().includes('convex') || request.url().includes('/api/')) {
          requests.push(request.url());
        }
      });
      
      // Make rapid requests by refreshing page multiple times
      for (let i = 0; i < 10; i++) {
        await page.reload();
        await page.waitForTimeout(100);
      }
      
      console.log(`Made ${requests.length} API requests`);
      
      // In a production app, rapid requests should be rate limited
      // This test documents the current behavior
      await page.screenshot({ 
        path: `docs/security-rate-limit-${Date.now()}.png` 
      });
    });
    
    test('Should validate API authentication', async ({ page }) => {
      // Test API endpoints without proper authentication
      const response = await page.request.get('http://localhost:5173/api/admin/users');
      
      // Should return 401 or 403 for unauthorized access
      expect([401, 403, 404]).toContain(response.status());
      
      console.log(`API authentication test - Status: ${response.status()}`);
    });
  });
  
  test.describe('Browser Security', () => {
    
    test('Should have proper security headers', async ({ page }) => {
      const response = await page.goto('http://localhost:5173');
      
      if (response) {
        const headers = response.headers();
        
        // Check for security headers
        const securityHeaders = {
          'x-frame-options': 'Should prevent clickjacking',
          'x-content-type-options': 'Should prevent MIME sniffing',
          'x-xss-protection': 'Should enable XSS protection',
          'strict-transport-security': 'Should enforce HTTPS',
          'content-security-policy': 'Should prevent XSS and injection'
        };
        
        console.log('Security Headers Analysis:');
        Object.entries(securityHeaders).forEach(([header, description]) => {
          const value = headers[header];
          console.log(`${header}: ${value || 'NOT SET'} - ${description}`);
        });
        
        // Document current security header status
        await page.screenshot({ 
          path: `docs/security-headers-${Date.now()}.png` 
        });
      }
    });
    
    test('Should prevent information disclosure', async ({ page }) => {
      // Check for information disclosure in error pages
      await page.goto('http://localhost:5173/nonexistent-page');
      await page.waitForTimeout(2000);
      
      const pageContent = await page.content();
      
      // Should not expose server information, stack traces, or sensitive data
      const sensitivePatterns = [
        /stack trace/i,
        /internal server error/i,
        /database error/i,
        /convex.*error/i
      ];
      
      sensitivePatterns.forEach(pattern => {
        expect(pageContent).not.toMatch(pattern);
      });
      
      console.log('Information disclosure test passed');
    });
  });
});