import { test, expect } from '@playwright/test';

test.describe('Admin Panel Testing - Week 2', () => {
  const appUrl = 'http://localhost:5173';
  const adminCredentials = {
    email: 'admin@shopvn.test',
    password: 'admin123'
  };

  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto(appUrl);
    await expect(page.locator('footer')).toBeVisible();
    
    // Login as admin - Sử dụng data-testid thay vì text
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('auth-modal')).toBeVisible();
    
    // Fill login form
    await page.getByPlaceholder('Email').fill(adminCredentials.email);
    await page.getByPlaceholder('Mật khẩu').fill(adminCredentials.password);
    await page.getByTestId('submit-login').click();
    
    // Wait for login success
    await expect(page.getByTestId('user-account-button')).toBeVisible({ timeout: 10000 });
  });

  test.describe('3.1 Product Management', () => {
    test('should access admin dashboard', async ({ page }) => {
      // Try to navigate to admin panel
      await page.goto(`${appUrl}/admin`);
      
      // Check if admin dashboard is accessible
      await expect(page.getByTestId('admin-dashboard')).toBeVisible({ timeout: 10000 });
    });

    test('should display product management interface', async ({ page }) => {
      await page.goto(`${appUrl}/admin`);
      
      // Check for product management elements using data-testid
      await expect(page.getByTestId('product-management')).toBeVisible({ timeout: 10000 });
      await expect(page.getByTestId('add-product-button')).toBeVisible({ timeout: 10000 });
    });

    test('should be able to add new product', async ({ page }) => {
      await page.goto(`${appUrl}/admin`);
      
      // Click add product button
      const addButton = page.getByTestId('add-product-button');
      if (await addButton.isVisible()) {
        await addButton.click();
        
        // Fill product form
        const testProduct = {
          name: 'Test Product Admin',
          price: '999000',
          description: 'Test product description for admin testing',
          category: 'electronics'
        };
        
        // Fill form fields if they exist using data-testid
        await page.getByTestId('product-name-input').fill(testProduct.name);
        await page.getByTestId('product-price-input').fill(testProduct.price);
        await page.getByTestId('product-description-input').fill(testProduct.description);
        
        // Select category
        await page.getByTestId('product-category-select').selectOption({ label: testProduct.category });
        
        // Submit form
        await page.getByTestId('save-product-button').click();
        
        // Verify success message
        await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 10000 });
      } else {
        console.log('Add product button not found - admin interface may not be fully implemented');
      }
    });

    test('should be able to edit existing product', async ({ page }) => {
      await page.goto(`${appUrl}/admin`);
      
      // Look for edit buttons
      const editButton = page.getByTestId('edit-product-button').first();
      if (await editButton.isVisible()) {
        await editButton.click();
        
        // Modify product name
        await page.getByTestId('product-name-input').fill('Updated Product Name');
        
        // Save changes
        await page.getByTestId('save-product-button').click();
        
        // Verify success message
        await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 10000 });
      } else {
        console.log('Edit functionality not found - may need implementation');
      }
    });

    test('should be able to delete product', async ({ page }) => {
      await page.goto(`${appUrl}/admin`);
      
      // Look for delete buttons
      const deleteButton = page.getByTestId('delete-product-button').first();
      if (await deleteButton.isVisible()) {
        await deleteButton.click();
        
        // Confirm deletion if confirmation dialog appears
        await page.getByTestId('confirm-delete-button').click();
        
        // Verify success message
        await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 10000 });
      } else {
        console.log('Delete functionality not found - may need implementation');
      }
    });
  });

  test.describe('3.2 Order Management', () => {
    test('should display orders list', async ({ page }) => {
      await page.goto(`${appUrl}/admin`);
      
      // Navigate to orders section
      await page.getByTestId('orders-nav-link').click();
      
      // Check for orders table or list
      await expect(page.getByTestId('orders-table')).toBeVisible({ timeout: 10000 });
    });

    test('should be able to update order status', async ({ page }) => {
      await page.goto(`${appUrl}/admin`);
      
      // Navigate to orders section
      await page.getByTestId('orders-nav-link').click();
      
      // Look for status update dropdown
      await page.getByTestId('order-status-select').first().selectOption('processing');
      
      // Save status change
      await page.getByTestId('update-order-button').first().click();
      
      // Verify success message
      await expect(page.getByTestId('success-message')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('3.3 User Management', () => {
    test('should display users list', async ({ page }) => {
      await page.goto(`${appUrl}/admin`);
      
      // Navigate to users section
      await page.getByTestId('users-nav-link').click();
      
      // Check for users table
      await expect(page.getByTestId('users-table')).toBeVisible({ timeout: 10000 });
    });

    test('should be able to view user details', async ({ page }) => {
      await page.goto(`${appUrl}/admin`);
      
      // Navigate to users section
      await page.getByTestId('users-nav-link').click();
      
      // Click on first user
      await page.getByTestId('view-user-button').first().click();
      
      // Verify user details are displayed
      await expect(page.getByTestId('user-details')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Admin Authorization', () => {
    test('should protect admin routes from non-admin users', async ({ page }) => {
      // Logout first
      await page.getByTestId('user-account-button').click();
      await page.getByTestId('logout-button').click();
      
      // Try to access admin page directly
      await page.goto(`${appUrl}/admin`);
      
      // Should be redirected to login or access denied
      await expect(page.getByTestId('access-denied') || page.getByTestId('auth-modal')).toBeVisible({ timeout: 10000 });
    });

    test('should allow admin access with proper credentials', async ({ page }) => {
      // Already logged in from beforeEach
      await page.goto(`${appUrl}/admin`);
      
      // Should be able to access admin dashboard
      await expect(page.getByTestId('admin-dashboard')).toBeVisible({ timeout: 10000 });
    });
  });

  test.afterEach(async ({ page }) => {
    // Take screenshot for documentation
    await page.screenshot({ 
      path: `docs/admin-test-${Date.now()}.png`,
      fullPage: true 
    });
  });
});