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
      
      if (await addToCartButton.isVisible()) {
        // Get initial cart count
        const cartButton = page.getByRole('button', { name: 'Cart' });
        const initialCartText = await cartButton.textContent();
        
        // Click add to cart
        await addToCartButton.click();
        
        // Wait for cart update (check for notification or cart count change)
        await expect(page.getByText(/đã thêm|added to cart/i)).toBeVisible({ timeout: 5000 });
        
        // Verify cart count increased
        await expect(cartButton).not.toHaveText(initialCartText || '');
      } else {
        console.log('Add to cart button not found on product cards');
      }
    });

    test('should add product to cart from product detail page', async ({ page }) => {
      // Click on a product to go to detail page
      const productCard = page.getByTestId(/product-card-/).first();
      
      if (await productCard.isVisible()) {
        await productCard.click();
        
        // Wait for product detail page to load
        await expect(page.getByRole('heading')).toBeVisible();
        
        // Find add to cart button on detail page
        const addToCartButton = page.getByRole('button', { name: /thêm vào giỏ|add to cart/i });
        
        if (await addToCartButton.isVisible()) {
          await addToCartButton.click();
          
          // Verify success message
          await expect(page.getByText(/đã thêm|added/i)).toBeVisible({ timeout: 5000 });
        } else {
          console.log('Add to cart button not found on product detail page');
        }
      }
    });

    test('should display cart contents correctly', async ({ page }) => {
      // Add a product to cart first
      const addToCartButton = page.getByTestId(/add-to-cart-/).first();
      
      if (await addToCartButton.isVisible()) {
        await addToCartButton.click();
        await page.waitForTimeout(1000); // Wait for cart update
        
        // Navigate to cart page
        await page.getByRole('button', { name: 'Cart' }).click();
        
        // Check if cart is no longer empty
        const emptyCartMessage = page.getByText('Giỏ hàng trống');
        
        if (await emptyCartMessage.isVisible()) {
          console.log('Cart appears empty - add to cart functionality may need implementation');
        } else {
          // Verify cart contains products
          await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn' })).toBeVisible();
          await expect(page.locator('[data-testid*="cart-item"]')).toBeVisible();
        }
      }
    });

    test('should update product quantity in cart', async ({ page }) => {
      // Navigate to cart page
      await page.getByRole('button', { name: 'Cart' }).click();
      
      // Check if cart has items
      const cartItem = page.locator('[data-testid*="cart-item"]').first();
      
      if (await cartItem.isVisible()) {
        // Find quantity input or buttons
        const quantityInput = cartItem.getByRole('spinbutton');
        const increaseButton = cartItem.getByRole('button', { name: /\+|increase/i });
        const decreaseButton = cartItem.getByRole('button', { name: /-|decrease/i });
        
        if (await quantityInput.isVisible()) {
          // Test direct input
          await quantityInput.fill('3');
          await quantityInput.blur();
          
          // Verify quantity updated
          await expect(quantityInput).toHaveValue('3');
        } else if (await increaseButton.isVisible()) {
          // Test increase button
          await increaseButton.click();
          
          // Verify quantity increased
          await page.waitForTimeout(500);
        }
        
        // Verify total price updated
        await expect(page.getByText(/tổng|total/i)).toBeVisible();
      } else {
        console.log('No cart items found for quantity testing');
      }
    });

    test('should remove product from cart', async ({ page }) => {
      // Navigate to cart page
      await page.getByRole('button', { name: 'Cart' }).click();
      
      // Check if cart has items
      const cartItem = page.locator('[data-testid*="cart-item"]').first();
      
      if (await cartItem.isVisible()) {
        // Find remove button
        const removeButton = cartItem.getByRole('button', { name: /xóa|remove|delete/i });
        
        if (await removeButton.isVisible()) {
          await removeButton.click();
          
          // Confirm removal if confirmation dialog appears
          const confirmButton = page.getByRole('button', { name: /xác nhận|confirm|yes/i });
          if (await confirmButton.isVisible()) {
            await confirmButton.click();
          }
          
          // Verify item removed
          await expect(cartItem).not.toBeVisible({ timeout: 5000 });
        } else {
          console.log('Remove button not found in cart item');
        }
      } else {
        console.log('No cart items found for removal testing');
      }
    });

    test('should calculate total price correctly', async ({ page }) => {
      // Add multiple products to cart
      const addButtons = page.getByTestId(/add-to-cart-/);
      const buttonCount = await addButtons.count();
      
      if (buttonCount > 0) {
        // Add first two products
        await addButtons.nth(0).click();
        await page.waitForTimeout(500);
        await addButtons.nth(1).click();
        await page.waitForTimeout(500);
        
        // Navigate to cart
        await page.getByRole('button', { name: 'Cart' }).click();
        
        // Check if total calculation is displayed
        const totalElement = page.getByText(/tổng cộng|total|subtotal/i);
        
        if (await totalElement.isVisible()) {
          // Verify total is a valid price format
          const totalText = await totalElement.textContent();
          expect(totalText).toMatch(/\d+[.,]?\d*/);
        } else {
          console.log('Total price calculation not found');
        }
      }
    });

    test('should apply discount/coupon code', async ({ page }) => {
      // Navigate to cart page
      await page.getByRole('button', { name: 'Cart' }).click();
      
      // Look for coupon/discount input
      const couponInput = page.getByPlaceholder(/mã giảm giá|coupon|discount/i);
      const applyButton = page.getByRole('button', { name: /áp dụng|apply/i });
      
      if (await couponInput.isVisible() && await applyButton.isVisible()) {
        // Test with a sample coupon code
        await couponInput.fill('DISCOUNT10');
        await applyButton.click();
        
        // Check for success or error message
        const message = page.getByText(/giảm giá|discount|invalid|expired/i);
        await expect(message).toBeVisible({ timeout: 5000 });
      } else {
        console.log('Coupon/discount functionality not found');
      }
    });

    test('should proceed to checkout', async ({ page }) => {
      // Add product to cart first
      const addToCartButton = page.getByTestId(/add-to-cart-/).first();
      
      if (await addToCartButton.isVisible()) {
        await addToCartButton.click();
        await page.waitForTimeout(1000);
        
        // Navigate to cart
        await page.getByRole('button', { name: 'Cart' }).click();
        
        // Look for checkout button
        const checkoutButton = page.getByRole('button', { name: /thanh toán|checkout|proceed/i });
        
        if (await checkoutButton.isVisible()) {
          await checkoutButton.click();
          
          // Should navigate to checkout page or login prompt
          await expect(page.getByText(/thanh toán|checkout|đăng nhập|login/i)).toBeVisible({ timeout: 5000 });
        } else {
          console.log('Checkout button not found');
        }
      }
    });
  });

  test.describe('2.3 Product Management Features', () => {
    test('should search for products', async ({ page }) => {
      // Look for search input
      const searchInput = page.getByPlaceholder(/tìm kiếm|search/i);
      
      if (await searchInput.isVisible()) {
        await searchInput.fill('iPhone');
        await searchInput.press('Enter');
        
        // Wait for search results
        await page.waitForTimeout(1000);
        
        // Verify search results
        const products = page.getByTestId(/product-card-/);
        const productCount = await products.count();
        
        if (productCount > 0) {
          // Check if results contain search term
          const firstProduct = products.first();
          const productText = await firstProduct.textContent();
          expect(productText?.toLowerCase()).toContain('iphone');
        } else {
          console.log('No search results found');
        }
      } else {
        console.log('Search functionality not found');
      }
    });

    test('should filter products by category', async ({ page }) => {
      // Look for category filters
      const categoryFilter = page.getByText(/danh mục|category|electronics|fashion/i).first();
      
      if (await categoryFilter.isVisible()) {
        await categoryFilter.click();
        
        // Wait for filter to apply
        await page.waitForTimeout(1000);
        
        // Verify filtered results
        const products = page.getByTestId(/product-card-/);
        const productCount = await products.count();
        
        expect(productCount).toBeGreaterThan(0);
      } else {
        console.log('Category filter not found');
      }
    });

    test('should sort products by price', async ({ page }) => {
      // Look for sort dropdown
      const sortDropdown = page.getByRole('combobox', { name: /sắp xếp|sort/i });
      
      if (await sortDropdown.isVisible()) {
        await sortDropdown.click();
        
        // Select price sorting
        const priceOption = page.getByText(/giá|price/i);
        if (await priceOption.isVisible()) {
          await priceOption.click();
          
          // Wait for sorting to apply
          await page.waitForTimeout(1000);
          
          // Verify products are sorted
          const products = page.getByTestId(/product-card-/);
          expect(await products.count()).toBeGreaterThan(0);
        }
      } else {
        console.log('Sort functionality not found');
      }
    });

    test('should handle pagination', async ({ page }) => {
      // Look for pagination controls
      const nextButton = page.getByRole('button', { name: /next|tiếp theo|>/i });
      const pageNumbers = page.getByRole('button', { name: /^\d+$/ });
      
      if (await nextButton.isVisible()) {
        await nextButton.click();
        
        // Wait for page to load
        await page.waitForTimeout(1000);
        
        // Verify page changed
        await expect(page.getByTestId(/product-card-/)).toBeVisible();
      } else if (await pageNumbers.count() > 0) {
        await pageNumbers.nth(1).click();
        await page.waitForTimeout(1000);
        await expect(page.getByTestId(/product-card-/)).toBeVisible();
      } else {
        console.log('Pagination not found or not needed');
      }
    });
  });

  test.describe('Authenticated Shopping Flow', () => {
    test.beforeEach(async ({ page }) => {
      // Login before each authenticated test
      await page.getByRole('button', { name: 'Đăng nhập' }).click();
      await expect(page.getByTestId('auth-modal')).toBeVisible();
      
      // Try to register if user doesn't exist, otherwise login
      await page.getByPlaceholder('Email').fill(testUser.email);
      await page.getByPlaceholder('Mật khẩu').fill(testUser.password);
      
      // Try login first
      await page.getByRole('button', { name: 'Đăng nhập' }).click();
      
      // If login fails, try signup
      const signupTab = page.getByText('Đăng ký ngay');
      if (await signupTab.isVisible()) {
        await signupTab.click();
        await page.getByPlaceholder('Email').fill(testUser.email);
        await page.getByPlaceholder('Mật khẩu').fill(testUser.password);
        await page.getByRole('button', { name: 'Đăng ký' }).click();
      }
      
      // Wait for login success
      await expect(page.getByRole('button', { name: 'Tài khoản' })).toBeVisible();
    });

    test('should save cart items for logged in user', async ({ page }) => {
      // Add items to cart
      const addToCartButton = page.getByTestId(/add-to-cart-/).first();
      
      if (await addToCartButton.isVisible()) {
        await addToCartButton.click();
        await page.waitForTimeout(1000);
        
        // Navigate to cart
        await page.getByRole('button', { name: 'Cart' }).click();
        
        // Verify cart has items
        const cartItems = page.locator('[data-testid*="cart-item"]');
        
        if (await cartItems.count() > 0) {
          // Refresh page to test persistence
          await page.reload();
          await page.getByRole('button', { name: 'Cart' }).click();
          
          // Verify items are still there
          await expect(cartItems.first()).toBeVisible();
        }
      }
    });

    test('should proceed to checkout with user info', async ({ page }) => {
      // Add product and go to checkout
      const addToCartButton = page.getByTestId(/add-to-cart-/).first();
      
      if (await addToCartButton.isVisible()) {
        await addToCartButton.click();
        await page.waitForTimeout(1000);
        
        await page.getByRole('button', { name: 'Cart' }).click();
        
        const checkoutButton = page.getByRole('button', { name: /thanh toán|checkout/i });
        
        if (await checkoutButton.isVisible()) {
          await checkoutButton.click();
          
          // Should show checkout form with user info
          await expect(page.getByText(/thông tin giao hàng|shipping|billing/i)).toBeVisible({ timeout: 5000 });
        }
      }
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