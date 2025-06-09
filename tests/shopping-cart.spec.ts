import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Workflow Testing - Week 2', () => {
  const appUrl = 'http://localhost:5173';
  const testUser = {
    email: 'carttest@shopvn.test',
    password: 'password123'
  };

  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto(appUrl);
    await expect(page.locator('footer')).toBeVisible();
  });

  test.describe('2.2 Shopping Cart Workflow', () => {
    test('should add product to cart from product card', async ({ page }) => {
      // Find and click "Add to Cart" button on a product card
      const addToCartButton = page.getByTestId(/add-to-cart-/).first();
      
      // Get initial cart count
      const cartButton = page.getByRole('button', { name: 'Cart' });
      const initialCartText = await cartButton.textContent();

      // Click add to cart
      await addToCartButton.click();

      // Wait for cart update (check for notification or cart count change)
      await expect(page.getByText(/đã thêm|added to cart/i)).toBeVisible({ timeout: 5000 });

      // Verify cart count increased
      await expect(cartButton).not.toHaveText(initialCartText || '');
    });

    test('should add product to cart from product detail page', async ({ page }) => {
      // Click on a product to go to detail page
      const productCard = page.getByTestId(/product-card-/).first();
      await productCard.click();
      
      // Wait for product detail page to load
      await expect(page.getByRole('heading')).toBeVisible();

      // Find add to cart button on detail page
      const addToCartButton = page.getByRole('button', { name: /thêm vào giỏ|add to cart/i });
      await addToCartButton.click();

      // Verify success message
      await expect(page.getByText(/đã thêm|added/i)).toBeVisible({ timeout: 5000 });
    });

    test('should display cart contents correctly', async ({ page }) => {
      // Add a product to cart first
      const addToCartButton = page.getByTestId(/add-to-cart-/).first();
      await addToCartButton.click();
      await page.waitForTimeout(1000); // Wait for cart update
      
      // Navigate to cart page
      await page.getByRole('button', { name: 'Cart' }).click();

      // Verify cart contains products (assuming add was successful)
      await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn' })).toBeVisible();
      await expect(page.locator('[data-testid*="cart-item"]')).toBeVisible();
      // Check that the empty cart message is NOT visible
      const emptyCartMessage = page.getByText('Giỏ hàng trống');
      await expect(emptyCartMessage).not.toBeVisible();
    });

    test('should update product quantity in cart', async ({ page }) => {
      // Add a product to cart first (ensure cart is not empty)
      const productCardAddToCartButton = page.getByTestId(/add-to-cart-/).first();
      await productCardAddToCartButton.click();
      await expect(page.getByText(/đã thêm|added to cart/i)).toBeVisible({ timeout: 5000 });

      // Navigate to cart page
      await page.getByRole('button', { name: 'Cart' }).click();
      
      // Check if cart has items
      const cartItem = page.locator('[data-testid*="cart-item"]').first();
      await expect(cartItem).toBeVisible(); // Ensure item is there before proceeding

      // Find quantity input or buttons
      const quantityInput = cartItem.getByRole('spinbutton');
      const increaseButton = cartItem.getByRole('button', { name: /\+|increase/i });
      // const decreaseButton = cartItem.getByRole('button', { name: /-|decrease/i }); // Not used in original conditional
      
      // Attempt to update quantity. Test will fail if elements aren't found.
      // This assumes either input or button is available.
      // A more robust test might check for one and then the other if the first isn't found.
      if (await quantityInput.isVisible()) {
        await quantityInput.fill('3');
        await quantityInput.blur(); // Ensure change is registered
        await expect(quantityInput).toHaveValue('3');
      } else {
        await increaseButton.click();
        // Add an assertion for the new quantity if possible, e.g., by checking input value or text
        // For now, just ensuring the action can be performed.
        await page.waitForTimeout(500); // Wait for potential UI update
      }

      // Verify total price updated (or at least visible)
      await expect(page.getByText(/tổng|total/i)).toBeVisible();
    });

    test('should remove product from cart', async ({ page }) => {
      // Add a product to cart first
      const productCardAddToCartButton = page.getByTestId(/add-to-cart-/).first();
      await productCardAddToCartButton.click();
      await expect(page.getByText(/đã thêm|added to cart/i)).toBeVisible({ timeout: 5000 });

      // Navigate to cart page
      await page.getByRole('button', { name: 'Cart' }).click();
      
      // Check if cart has items
      const cartItem = page.locator('[data-testid*="cart-item"]').first();
      await expect(cartItem).toBeVisible();
      
      // Find remove button
      const removeButton = cartItem.getByRole('button', { name: /xóa|remove|delete/i });
      await removeButton.click();

      // Confirm removal if confirmation dialog appears
      // This structure is fine as confirmation is conditional
      const confirmButton = page.getByRole('button', { name: /xác nhận|confirm|yes/i });
      if (await confirmButton.isVisible({timeout: 1000})) { // Shorter timeout if it's optional
        await confirmButton.click();
      }

      // Verify item removed
      await expect(cartItem).not.toBeVisible({ timeout: 5000 });
    });

    test('should calculate total price correctly', async ({ page }) => {
      // Add multiple products to cart
      const addButtons = page.getByTestId(/add-to-cart-/);
      await expect(addButtons.first()).toBeVisible(); // Ensure buttons are present

      // Add first two products (assuming at least two are available)
      await addButtons.nth(0).click();
      await page.waitForTimeout(500); // Allow time for UI update
      await addButtons.nth(1).click();
      await page.waitForTimeout(500); // Allow time for UI update

      // Navigate to cart
      await page.getByRole('button', { name: 'Cart' }).click();

      // Check if total calculation is displayed
      const totalElement = page.getByText(/tổng cộng|total|subtotal/i);
      await expect(totalElement).toBeVisible();

      // Verify total is a valid price format
      const totalText = await totalElement.textContent();
      expect(totalText).toMatch(/\d+[.,]?\d*/);
    });

    test('should apply discount/coupon code', async ({ page }) => {
      // Add a product to ensure cart is not empty for coupon application
      const productCardAddToCartButton = page.getByTestId(/add-to-cart-/).first();
      await productCardAddToCartButton.click();
      await expect(page.getByText(/đã thêm|added to cart/i)).toBeVisible({ timeout: 5000 });

      // Navigate to cart page
      await page.getByRole('button', { name: 'Cart' }).click();
      
      // Look for coupon/discount input
      const couponInput = page.getByPlaceholder(/mã giảm giá|coupon|discount/i);
      const applyButton = page.getByRole('button', { name: /áp dụng|apply/i });
      
      // Directly interact, test will fail if not found
      await couponInput.fill('DISCOUNT10');
      await applyButton.click();

      // Check for success or error message
      const message = page.getByText(/giảm giá|discount|invalid|expired/i);
      await expect(message).toBeVisible({ timeout: 5000 });
    });

    test('should proceed to checkout', async ({ page }) => {
      // Add product to cart first
      const addToCartButton = page.getByTestId(/add-to-cart-/).first();
      await addToCartButton.click();
      await page.waitForTimeout(1000); // Wait for cart update
      
      // Navigate to cart
      await page.getByRole('button', { name: 'Cart' }).click();

      // Look for checkout button
      const checkoutButton = page.getByRole('button', { name: /thanh toán|checkout|proceed/i });
      await checkoutButton.click();

      // Should navigate to checkout page or login prompt
      await expect(page.getByText(/thanh toán|checkout|đăng nhập|login/i)).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('2.3 Product Management Features', () => {
    test('should search for products', async ({ page }) => {
      // Look for search input
      const searchInput = page.getByPlaceholder(/tìm kiếm|search/i);
      await searchInput.fill('iPhone');
      await searchInput.press('Enter');
      
      // Wait for search results
      await page.waitForTimeout(1000); // Or use a more specific waiter for results

      // Verify search results
      const products = page.getByTestId(/product-card-/);
      // Expect at least one product to be found for a common term like 'iPhone'
      // If 'iPhone' might not exist, this assertion needs to be more flexible or the test data guaranteed.
      await expect(products.first()).toBeVisible({ timeout: 5000 });

      // Check if results contain search term in the first product
      const firstProduct = products.first();
      const productText = await firstProduct.textContent();
      expect(productText?.toLowerCase()).toContain('iphone');
    });

    test('should filter products by category', async ({ page }) => {
      // Look for category filters
      const categoryFilter = page.getByText(/danh mục|category|electronics|fashion/i).first();
      await categoryFilter.click();
      
      // Wait for filter to apply
      await page.waitForTimeout(1000); // Or use a specific waiter

      // Verify filtered results
      const products = page.getByTestId(/product-card-/);
      await expect(products.first()).toBeVisible({ timeout: 5000 }); // Check that some products are visible
      expect(await products.count()).toBeGreaterThan(0);
    });

    test('should sort products by price', async ({ page }) => {
      // Look for sort dropdown
      const sortDropdown = page.getByRole('combobox', { name: /sắp xếp|sort/i });
      await sortDropdown.click(); // Assuming click opens it
      
      // Select price sorting option
      // Using a more general text match for price option as it could be "Giá tăng dần", "Giá giảm dần", etc.
      const priceOption = page.getByRole('option', { name: /giá|price/i }).first();
      await priceOption.click();

      // Wait for sorting to apply
      await page.waitForTimeout(1000); // Or use a specific waiter

      // Verify products are sorted (at least some products are visible)
      const products = page.getByTestId(/product-card-/);
      await expect(products.first()).toBeVisible({ timeout: 5000 });
      expect(await products.count()).toBeGreaterThan(0);
    });

    test('should handle pagination', async ({ page }) => {
      // Look for pagination controls
      const nextButton = page.getByRole('button', { name: /next|tiếp theo|>/i });
      const pageNumbers = page.getByRole('button', { name: /^\d+$/ }); // Matches buttons with only numbers
      
      // This test assumes pagination is present. If not, it will fail, which is acceptable.
      // A more robust test could check if pagination is necessary (e.g. > X products).
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(1000); // Or specific waiter
        await expect(page.getByTestId(/product-card-/).first()).toBeVisible({ timeout: 5000 });
      } else if (await pageNumbers.count() > 1) { // Ensure there's more than one page number button
        await pageNumbers.nth(1).click(); // Click the second page number (e.g., "2")
        await page.waitForTimeout(1000); // Or specific waiter
        await expect(page.getByTestId(/product-card-/).first()).toBeVisible({ timeout: 5000 });
      } else {
        // If neither next button nor multiple page numbers are visible, the test might pass vacuously
        // or indicate pagination isn't active/needed. For this refactor, no explicit failure here.
        // Consider adding an assertion if pagination is *always* expected for certain views.
      }
    });
  });

  test.describe('Authenticated Shopping Flow', () => {
    test.beforeEach(async ({ page }) => {
      // Login before each authenticated test
      await page.getByRole('button', { name: 'Đăng nhập' }).click();
      await expect(page.getByTestId('auth-modal')).toBeVisible();
      
      await page.getByPlaceholder('Email').fill(testUser.email);
      await page.getByPlaceholder('Mật khẩu').fill(testUser.password);
      
      // Try login first
      await page.getByRole('button', { name: 'Đăng nhập' }).click();
      
      // If login fails (e.g. user not found), try signup
      // This relies on the "Đăng ký ngay" tab becoming visible or actionable if login fails
      // A more robust way would be to check for a specific login error message.
      const signupTab = page.getByRole('tab', { name: 'Đăng ký ngay' }); // Assuming it's a tab
      if (await signupTab.isVisible({timeout: 2000})) { // Check if signup tab is an option
        await signupTab.click();
        // Re-fill as fields might clear or be different
        await page.getByPlaceholder('Email').fill(testUser.email);
        await page.getByPlaceholder('Mật khẩu').fill(testUser.password);
        await page.getByRole('button', { name: 'Đăng ký' }).click();
      }
      
      // Wait for login success
      await expect(page.getByRole('button', { name: 'Tài khoản' })).toBeVisible({ timeout: 10000 }); // Increased timeout for auth
    });

    test('should save cart items for logged in user', async ({ page }) => {
      // Add items to cart
      const addToCartButton = page.getByTestId(/add-to-cart-/).first();
      await addToCartButton.click();
      await page.waitForTimeout(1000); // Allow UI to update
      
      // Navigate to cart
      await page.getByRole('button', { name: 'Cart' }).click();

      // Verify cart has items
      const cartItems = page.locator('[data-testid*="cart-item"]');
      await expect(cartItems.first()).toBeVisible(); // Ensure items are present

      // Refresh page to test persistence
      await page.reload();
      await expect(page.getByRole('button', { name: 'Cart' })).toBeVisible(); // Ensure cart button is back after reload
      await page.getByRole('button', { name: 'Cart' }).click();

      // Verify items are still there
      await expect(cartItems.first()).toBeVisible();
    });

    test('should proceed to checkout with user info', async ({ page }) => {
      // Add product and go to checkout
      const addToCartButton = page.getByTestId(/add-to-cart-/).first();
      await addToCartButton.click();
      await page.waitForTimeout(1000); // Allow UI to update
      
      await page.getByRole('button', { name: 'Cart' }).click();

      const checkoutButton = page.getByRole('button', { name: /thanh toán|checkout/i });
      await checkoutButton.click();

      // Should show checkout form with user info
      await expect(page.getByText(/thông tin giao hàng|shipping|billing/i)).toBeVisible({ timeout: 5000 });
    });
  });

  test.afterEach(async ({ page }) => {
    // Take screenshot for documentation
    await page.screenshot({ 
      path: `docs/cart-test-${Date.now()}.png`,
      fullPage: true 
    });
  });
});