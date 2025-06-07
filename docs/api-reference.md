# API Reference - ShopVN

Tài liệu này mô tả tất cả các API functions trong hệ thống ShopVN.

## Tổng quan

Hệ thống sử dụng Convex functions với 3 loại chính:
- **Query**: Đọc dữ liệu (real-time)
- **Mutation**: Thay đổi dữ liệu
- **Action**: Xử lý logic phức tạp, gọi external APIs

## Authentication APIs

### `api.auth.loggedInUser`
**Type**: Query  
**Description**: Lấy thông tin user hiện tại  
**Returns**: User object hoặc null

```typescript
const user = useQuery(api.auth.loggedInUser);
```

## Admin APIs

### `api.admin.isAdmin`
**Type**: Query  
**Description**: Kiểm tra user có quyền admin  
**Returns**: boolean

```typescript
const isAdmin = useQuery(api.admin.isAdmin);
```

## Product APIs

### `api.products.list`
**Type**: Query  
**Args**: 
- `categoryId?: Id<"categories">` - Lọc theo danh mục
- `limit?: number` - Giới hạn số lượng
- `search?: string` - Tìm kiếm

```typescript
const products = useQuery(api.products.list, { 
  categoryId: "category_id",
  limit: 20,
  search: "iPhone"
});
```

### `api.products.getFeatured`
**Type**: Query  
**Args**: 
- `limit?: number` - Số lượng sản phẩm (default: 8)

```typescript
const featuredProducts = useQuery(api.products.getFeatured, { limit: 8 });
```

### `api.products.getFlashSale`
**Type**: Query  
**Description**: Lấy sản phẩm flash sale đang hoạt động

```typescript
const flashSaleProducts = useQuery(api.products.getFlashSale);
```

### `api.products.getBySlug`
**Type**: Query  
**Args**: 
- `slug: string` - URL slug của sản phẩm

```typescript
const product = useQuery(api.products.getBySlug, { slug: "iphone-15-pro" });
```

### `api.products.create`
**Type**: Mutation  
**Args**: Product data object  
**Auth**: Admin required

```typescript
const createProduct = useMutation(api.products.create);
await createProduct({
  name: "iPhone 15 Pro",
  slug: "iphone-15-pro",
  description: "...",
  price: 25000000,
  categoryId: "category_id",
  // ... other fields
});
```

### `api.products.update`
**Type**: Mutation  
**Args**: 
- `id: Id<"products">`
- Product update data

```typescript
const updateProduct = useMutation(api.products.update);
await updateProduct({
  id: "product_id",
  name: "New Name",
  price: 20000000
});
```

### `api.products.delete`
**Type**: Mutation  
**Args**: 
- `id: Id<"products">`

```typescript
const deleteProduct = useMutation(api.products.delete);
await deleteProduct({ id: "product_id" });
```

## Category APIs

### `api.categories.list`
**Type**: Query  
**Description**: Lấy danh sách tất cả danh mục

```typescript
const categories = useQuery(api.categories.list);
```

### `api.categories.getFeatured`
**Type**: Query  
**Description**: Lấy danh mục nổi bật

```typescript
const featuredCategories = useQuery(api.categories.getFeatured);
```

### `api.categories.getBySlug`
**Type**: Query  
**Args**: 
- `slug: string`

```typescript
const category = useQuery(api.categories.getBySlug, { slug: "dien-thoai" });
```

### `api.categories.create`
**Type**: Mutation  
**Auth**: Admin required

```typescript
const createCategory = useMutation(api.categories.create);
await createCategory({
  name: "Điện thoại",
  slug: "dien-thoai",
  description: "Điện thoại thông minh"
});
```

## Cart APIs

### `api.cart.list`
**Type**: Query  
**Description**: Lấy giỏ hàng của user hiện tại

```typescript
const cartItems = useQuery(api.cart.list);
```

### `api.cart.add`
**Type**: Mutation  
**Args**: 
- `productId: Id<"products">`
- `quantity: number`
- `variants?: Array<{type: string, value: string}>`

```typescript
const addToCart = useMutation(api.cart.add);
await addToCart({
  productId: "product_id",
  quantity: 1,
  variants: [{ type: "color", value: "red" }]
});
```

### `api.cart.updateQuantity`
**Type**: Mutation  
**Args**: 
- `itemId: Id<"cart">`
- `quantity: number`

```typescript
const updateQuantity = useMutation(api.cart.updateQuantity);
await updateQuantity({ itemId: "cart_item_id", quantity: 3 });
```

### `api.cart.remove`
**Type**: Mutation  
**Args**: 
- `itemId: Id<"cart">`

```typescript
const removeItem = useMutation(api.cart.remove);
await removeItem({ itemId: "cart_item_id" });
```

### `api.cart.clear`
**Type**: Mutation  
**Description**: Xóa toàn bộ giỏ hàng

```typescript
const clearCart = useMutation(api.cart.clear);
await clearCart();
```

### `api.cart.getCount`
**Type**: Query  
**Description**: Lấy tổng số lượng items trong giỏ hàng

```typescript
const cartCount = useQuery(api.cart.getCount);
```

## Order APIs

### `api.orders.list`
**Type**: Query  
**Description**: Lấy danh sách đơn hàng của user

```typescript
const orders = useQuery(api.orders.list);
```

### `api.orders.create`
**Type**: Mutation  
**Args**: Order data

```typescript
const createOrder = useMutation(api.orders.create);
await createOrder({
  items: cartItems,
  shippingAddress: {
    name: "Nguyễn Văn A",
    phone: "0123456789",
    address: "123 Đường ABC",
    ward: "Phường 1",
    district: "Quận 1",
    city: "TP.HCM"
  },
  paymentMethod: "cod",
  notes: "Giao hàng giờ hành chính"
});
```

### `api.orders.updateStatus`
**Type**: Mutation  
**Args**: 
- `orderId: Id<"orders">`
- `status: OrderStatus`
**Auth**: Admin required

```typescript
const updateOrderStatus = useMutation(api.orders.updateStatus);
await updateOrderStatus({
  orderId: "order_id",
  status: "shipped"
});
```

## Banner APIs

### `api.banners.list`
**Type**: Query  
**Description**: Lấy danh sách banner đang hoạt động

```typescript
const banners = useQuery(api.banners.list);
```

### `api.banners.create`
**Type**: Mutation  
**Auth**: Admin required

```typescript
const createBanner = useMutation(api.banners.create);
await createBanner({
  title: "Sale 50%",
  subtitle: "Khuyến mãi lớn",
  image: "banner_url",
  isActive: true,
  order: 1
});
```

## File Storage APIs

### `api.fileStorage.generateUploadUrl`
**Type**: Mutation  
**Description**: Tạo URL upload file

```typescript
const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
const uploadUrl = await generateUploadUrl();
```

### `api.fileStorage.getUrl`
**Type**: Query  
**Args**: 
- `storageId: Id<"_storage">`

```typescript
const fileUrl = useQuery(api.fileStorage.getUrl, { storageId: "storage_id" });
```

## Notification APIs

### `api.notifications.list`
**Type**: Query  
**Description**: Lấy thông báo của user

```typescript
const notifications = useQuery(api.notifications.list);
```

### `api.notifications.markAsRead`
**Type**: Mutation  
**Args**: 
- `notificationId: Id<"notifications">`

```typescript
const markAsRead = useMutation(api.notifications.markAsRead);
await markAsRead({ notificationId: "notification_id" });
```

## Payment APIs

### `api.payments.createTransaction`
**Type**: Action  
**Args**: 
- `orderId: Id<"orders">`
- `paymentMethod: PaymentMethod`

```typescript
const createTransaction = useMutation(api.payments.createTransaction);
const paymentUrl = await createTransaction({
  orderId: "order_id",
  paymentMethod: "vnpay"
});
```

### `api.payments.verifyTransaction`
**Type**: Action  
**Args**: Payment verification data

```typescript
// Được gọi từ webhook hoặc return URL
const verifyTransaction = useMutation(api.payments.verifyTransaction);
await verifyTransaction({ transactionCode: "TXN123", status: "success" });
```

## Error Handling

Tất cả functions đều có thể throw errors:

```typescript
try {
  await addToCart({ productId: "invalid_id", quantity: 1 });
} catch (error) {
  console.error("Error:", error.message);
  toast.error("Có lỗi xảy ra!");
}
```

## Real-time Updates

Convex queries tự động cập nhật real-time:

```typescript
// Component sẽ re-render khi có thay đổi
const cartItems = useQuery(api.cart.list);
const orderCount = useQuery(api.orders.getCount);
```

## Authentication Context

Một số functions yêu cầu authentication:

```typescript
// Sử dụng trong component
<Authenticated>
  <CartPage />
</Authenticated>

<Unauthenticated>
  <SignInForm />
</Unauthenticated>
```

## Rate Limiting

- Queries: Không giới hạn (cached)
- Mutations: 100 requests/minute/user
- Actions: 50 requests/minute/user

## Best Practices

1. **Sử dụng "skip" cho conditional queries**:
```typescript
const product = useQuery(
  api.products.getBySlug,
  slug ? { slug } : "skip"
);
```

2. **Batch operations khi có thể**:
```typescript
// Thay vì multiple mutations
await Promise.all([
  updateProduct({ id: "1", name: "A" }),
  updateProduct({ id: "2", name: "B" })
]);
```

3. **Handle loading states**:
```typescript
const products = useQuery(api.products.list);
if (products === undefined) return <Loading />;
```

4. **Error boundaries**:
```typescript
<ErrorBoundary>
  <ProductList />
</ErrorBoundary>
```
