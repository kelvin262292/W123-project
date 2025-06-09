# Khuyến Nghị Sửa Lỗi - ShopVN Platform

## 🚨 Lỗi Ưu Tiên Cao: Nested Buttons trong ProductCard

### Vấn đề
Trong file `src/components/ProductCard.tsx`, có cấu trúc nested buttons gây lỗi hydration:

```tsx
// ❌ PROBLEMATIC CODE
<button onClick={() => onNavigate("product", product.slug)} className="group block w-full text-left">
  <div className="bg-white rounded-2xl...">
    {/* ... */}
    <button onClick={handleAddToCart} className="absolute bottom-3 right-3...">
      {/* Add to cart icon */}
    </button>
  </div>
</button>
```

### Tác động
- ❌ Lỗi hydration trong React
- ❌ Vi phạm HTML semantics
- ❌ Accessibility issues
- ❌ Unpredictable click behavior

### Giải pháp

#### Option 1: Sử dụng div với event handling (Khuyến nghị)

```tsx
// ✅ FIXED CODE
export function ProductCard({ product, onNavigate }: ProductCardProps) {
  const addToCart = useMutation(api.cart.add);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Ngăn event bubbling
    
    if (product.stock === 0) {
      toast.error("Sản phẩm đã hết hàng!");
      return;
    }
    
    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
      });
      toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const handleProductClick = () => {
    onNavigate("product", product.slug);
  };

  // ... other code ...

  return (
    <div 
      onClick={handleProductClick}
      className="group block w-full text-left cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleProductClick();
        }
      }}
    >
      <div className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
        isOutOfStock ? "out-of-stock-overlay" : ""
      }`}>
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badges remain the same */}
          {discountPercent > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
              -{discountPercent}%
            </div>
          )}
          
          {product.isFlashSale && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              ⚡ FLASH
            </div>
          )}

          {/* Add to Cart Button - Now properly isolated */}
          {!isOutOfStock && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-700 shadow-lg z-10"
              data-testid="add-to-cart-btn"
              aria-label={`Thêm ${product.name} vào giỏ hàng`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
              </svg>
            </button>
          )}
        </div>

        {/* Content remains the same */}
        <div className="p-4">
          {/* ... existing content ... */}
        </div>
      </div>
    </div>
  );
}
```

#### Option 2: Sử dụng Portal cho Add to Cart

```tsx
import { createPortal } from 'react-dom';

// Tạo overlay riêng cho add to cart button
const AddToCartOverlay = ({ onAddToCart, isVisible }) => {
  if (!isVisible) return null;
  
  return createPortal(
    <button
      onClick={onAddToCart}
      className="fixed z-50 bg-blue-600 text-white p-2 rounded-full"
      style={{ /* position based on card location */ }}
    >
      {/* Icon */}
    </button>,
    document.body
  );
};
```

## 🔧 Cải thiện Testability

### Thêm Test IDs

```tsx
// Trong Header.tsx
<div data-testid="cart-icon" className="cart-icon">
  🛒
</div>

// Trong ProductCard.tsx
<button data-testid="add-to-cart-btn" ...>
<div data-testid="product-card" ...>

// Trong CategoryGrid.tsx
<div data-testid="category-electronics" ...>
```

### Cải thiện Selectors

```tsx
// Thay vì dựa vào emoji hoặc class phức tạp
// ❌ Bad
<div className="🛒">Cart</div>
<button className="bg-blue-600 text-white p-2 rounded-full">+</button>

// ✅ Good
<div data-testid="cart-button" className="cart-button">
  <span aria-hidden="true">🛒</span>
  <span className="sr-only">Giỏ hàng</span>
</div>
<button data-testid="add-to-cart" className="add-to-cart-btn">
  <span aria-hidden="true">+</span>
  <span className="sr-only">Thêm vào giỏ hàng</span>
</button>
```

## 🚀 Cải thiện Performance

### Lazy Loading cho Images

```tsx
<img
  src={product.images[0] || "/placeholder.jpg"}
  alt={product.name}
  loading="lazy"
  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
/>
```

### Memoization cho ProductCard

```tsx
import { memo } from 'react';

export const ProductCard = memo(({ product, onNavigate }: ProductCardProps) => {
  // ... component logic
}, (prevProps, nextProps) => {
  return prevProps.product._id === nextProps.product._id &&
         prevProps.product.stock === nextProps.product.stock;
});
```

## 📱 Accessibility Improvements

```tsx
// Thêm ARIA labels và keyboard navigation
<div 
  onClick={handleProductClick}
  className="group block w-full text-left cursor-pointer"
  role="button"
  tabIndex={0}
  aria-label={`Xem chi tiết sản phẩm ${product.name}`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProductClick();
    }
  }}
>
```

## 🔍 Error Handling

```tsx
const handleAddToCart = async (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  
  if (product.stock === 0) {
    toast.error("Sản phẩm đã hết hàng!");
    return;
  }
  
  try {
    await addToCart({
      productId: product._id,
      quantity: 1,
    });
    toast.success("Đã thêm vào giỏ hàng!");
  } catch (error) {
    console.error('Add to cart error:', error);
    if (error.message.includes('authentication')) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm!");
    } else {
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng!");
    }
  }
};
```

## 📋 Checklist Triển Khai

- [ ] Sửa nested buttons trong ProductCard
- [ ] Thêm data-testid cho các elements quan trọng
- [ ] Cải thiện accessibility với ARIA labels
- [ ] Thêm keyboard navigation
- [ ] Implement error handling chi tiết
- [ ] Thêm loading states
- [ ] Optimize images với lazy loading
- [ ] Test trên multiple browsers
- [ ] Test responsive design
- [ ] Validate HTML semantics

---
*Tài liệu được tạo ngày 07/06/2025*