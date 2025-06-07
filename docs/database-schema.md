# Database Schema - ShopVN

Tài liệu này mô tả chi tiết cấu trúc cơ sở dữ liệu của hệ thống ShopVN.

## Tổng quan

Hệ thống sử dụng Convex làm cơ sở dữ liệu với 12 bảng chính:

1. **users** - Thông tin người dùng (từ Convex Auth)
2. **categories** - Danh mục sản phẩm
3. **products** - Sản phẩm
4. **productImages** - Hình ảnh sản phẩm
5. **cart** - Giỏ hàng
6. **orders** - Đơn hàng
7. **paymentTransactions** - Giao dịch thanh toán
8. **reviews** - Đánh giá sản phẩm
9. **banners** - Banner quảng cáo
10. **coupons** - Mã giảm giá
11. **notifications** - Thông báo
12. **settings** - Cài đặt hệ thống

## Chi tiết các bảng

### 1. Categories (Danh mục)

```typescript
categories: {
  name: string,              // Tên danh mục
  slug: string,              // URL slug (unique)
  description?: string,      // Mô tả
  icon?: string,            // Icon danh mục
  parentId?: Id<"categories">, // Danh mục cha (cho cây danh mục)
  isActive?: boolean,       // Trạng thái hoạt động
  isFeatured?: boolean,     // Danh mục nổi bật
  _id: Id<"categories">,    // ID tự động
  _creationTime: number     // Thời gian tạo
}
```

**Indexes:**
- `by_slug` - Tìm kiếm theo slug

### 2. Products (Sản phẩm)

```typescript
products: {
  name: string,                    // Tên sản phẩm
  slug: string,                    // URL slug (unique)
  description: string,             // Mô tả chi tiết
  shortDescription?: string,       // Mô tả ngắn
  price: number,                   // Giá hiện tại
  originalPrice?: number,          // Giá gốc (để tính giảm giá)
  categoryId: Id<"categories">,    // ID danh mục
  images: string[],                // Mảng URL hình ảnh
  variants?: any,                  // Biến thể sản phẩm (size, color, etc.)
  specifications?: Array<{         // Thông số kỹ thuật
    name: string,
    value: string
  }>,
  stock: number,                   // Số lượng tồn kho
  soldCount?: number,              // Số lượng đã bán
  rating?: number,                 // Điểm đánh giá trung bình
  reviewCount?: number,            // Số lượng đánh giá
  isActive?: boolean,              // Trạng thái hoạt động
  isFeatured?: boolean,            // Sản phẩm nổi bật
  isFlashSale?: boolean,           // Flash sale
  flashSaleEndTime?: number,       // Thời gian kết thúc flash sale
  tags?: string[],                 // Tags sản phẩm
  seoTitle?: string,               // SEO title
  seoDescription?: string,         // SEO description
  weight?: number,                 // Trọng lượng (gram)
  dimensions?: {                   // Kích thước
    length: number,
    width: number,
    height: number
  },
  _id: Id<"products">,
  _creationTime: number
}
```

**Indexes:**
- `by_slug` - Tìm kiếm theo slug
- `by_category` - Lọc theo danh mục
- `by_featured` - Lọc sản phẩm nổi bật
- `by_active` - Lọc sản phẩm hoạt động
- `by_flash_sale` - Lọc flash sale

### 3. ProductImages (Hình ảnh sản phẩm)

```typescript
productImages: {
  storageId: Id<"_storage">,       // ID file trong Convex storage
  productId?: Id<"products">,      // ID sản phẩm (optional cho upload temp)
  alt: string,                     // Alt text
  isPrimary: boolean,              // Hình ảnh chính
  uploadedBy: Id<"users">,         // Người upload
  contentType?: string,            // MIME type
  size: number,                    // Kích thước file (bytes)
  _id: Id<"productImages">,
  _creationTime: number
}
```

**Indexes:**
- `by_product` - Lấy hình ảnh theo sản phẩm

### 4. Cart (Giỏ hàng)

```typescript
cart: {
  userId: Id<"users">,             // ID người dùng
  productId: Id<"products">,       // ID sản phẩm
  quantity: number,                // Số lượng
  variants?: Array<{               // Biến thể đã chọn
    type: string,                  // Loại (size, color, etc.)
    value: string                  // Giá trị
  }>,
  price: number,                   // Giá tại thời điểm thêm vào giỏ
  _id: Id<"cart">,
  _creationTime: number
}
```

**Indexes:**
- `by_user` - Lấy giỏ hàng theo user
- `by_product` - Lấy theo sản phẩm
- `by_user_and_product` - Kiểm tra sản phẩm đã có trong giỏ

### 5. Orders (Đơn hàng)

```typescript
orders: {
  userId: Id<"users">,             // ID người đặt hàng
  items: Array<{                   // Danh sách sản phẩm
    productId: Id<"products">,
    productName?: string,          // Tên sản phẩm (backup)
    quantity: number,
    price: number,                 // Giá tại thời điểm đặt hàng
    variants?: Array<{
      type: string,
      value: string
    }>
  }>,
  totalAmount: number,             // Tổng tiền
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled",
  paymentMethod: "cod" | "vnpay" | "momo" | "zalopay",
  paymentStatus?: "pending" | "paid" | "failed",
  shippingAddress: {               // Địa chỉ giao hàng
    name: string,
    phone: string,
    address: string,
    ward: string,
    district: string,
    city: string
  },
  notes?: string,                  // Ghi chú
  couponCode?: string,             // Mã giảm giá
  discountAmount?: number,         // Số tiền giảm
  shippingFee?: number,            // Phí vận chuyển
  _id: Id<"orders">,
  _creationTime: number
}
```

**Indexes:**
- `by_user` - Lấy đơn hàng theo user

### 6. PaymentTransactions (Giao dịch thanh toán)

```typescript
paymentTransactions: {
  orderId: Id<"orders">,           // ID đơn hàng
  userId: Id<"users">,             // ID người dùng
  paymentMethod: "vnpay" | "momo" | "zalopay",
  amount: number,                  // Số tiền
  status: "pending" | "success" | "failed" | "cancelled",
  transactionCode: string,         // Mã giao dịch
  paymentData?: any,               // Dữ liệu từ payment gateway
  completedAt?: number,            // Thời gian hoàn thành
  _id: Id<"paymentTransactions">,
  _creationTime: number
}
```

**Indexes:**
- `by_order` - Lấy giao dịch theo đơn hàng
- `by_transaction_code` - Tìm theo mã giao dịch

### 7. Reviews (Đánh giá)

```typescript
reviews: {
  productId: Id<"products">,       // ID sản phẩm
  userId: Id<"users">,             // ID người đánh giá
  orderId?: Id<"orders">,          // ID đơn hàng (nếu có)
  rating: number,                  // Điểm đánh giá (1-5)
  title?: string,                  // Tiêu đề đánh giá
  comment: string,                 // Nội dung đánh giá
  images?: string[],               // Hình ảnh đánh giá
  isVerified: boolean,             // Đánh giá đã xác thực
  isApproved: boolean,             // Đã được duyệt
  helpfulCount?: number,           // Số lượt hữu ích
  _id: Id<"reviews">,
  _creationTime: number
}
```

**Indexes:**
- `by_product` - Lấy đánh giá theo sản phẩm
- `by_user` - Lấy đánh giá theo user

### 8. Banners (Banner quảng cáo)

```typescript
banners: {
  title: string,                   // Tiêu đề
  subtitle?: string,               // Phụ đề
  image: string,                   // URL hình ảnh
  link?: string,                   // Link khi click
  buttonText?: string,             // Text nút CTA
  isActive: boolean,               // Trạng thái hoạt động
  order: number,                   // Thứ tự hiển thị
  startDate?: number,              // Ngày bắt đầu
  endDate?: number,                // Ngày kết thúc
  _id: Id<"banners">,
  _creationTime: number
}
```

### 9. Coupons (Mã giảm giá)

```typescript
coupons: {
  code: string,                    // Mã giảm giá (unique)
  name: string,                    // Tên chương trình
  description?: string,            // Mô tả
  type: "percentage" | "fixed",    // Loại giảm giá
  value: number,                   // Giá trị giảm
  minOrderAmount?: number,         // Đơn hàng tối thiểu
  maxDiscountAmount?: number,      // Giảm tối đa
  usageLimit?: number,             // Giới hạn sử dụng
  usedCount?: number,              // Đã sử dụng
  isActive: boolean,               // Trạng thái
  startDate: number,               // Ngày bắt đầu
  endDate: number,                 // Ngày kết thúc
  _id: Id<"coupons">,
  _creationTime: number
}
```

**Indexes:**
- `by_code` - Tìm theo mã

### 10. Notifications (Thông báo)

```typescript
notifications: {
  userId: Id<"users">,             // ID người nhận
  type: string,                    // Loại thông báo
  title: string,                   // Tiêu đề
  message: string,                 // Nội dung
  data?: any,                      // Dữ liệu bổ sung
  isRead: boolean,                 // Đã đọc
  _id: Id<"notifications">,
  _creationTime: number
}
```

**Indexes:**
- `by_user` - Lấy thông báo theo user

### 11. EmailLogs (Log email)

```typescript
emailLogs: {
  orderId: Id<"orders">,           // ID đơn hàng
  email: string,                   // Email nhận
  type: string,                    // Loại email
  emailId?: string,                // ID email từ service
  metadata?: any,                  // Metadata
  sentAt: number,                  // Thời gian gửi
  _id: Id<"emailLogs">,
  _creationTime: number
}
```

**Indexes:**
- `by_order` - Lấy log theo đơn hàng

### 12. Settings (Cài đặt)

```typescript
settings: {
  key: string,                     // Khóa cài đặt (unique)
  value: any,                      // Giá trị
  description?: string,            // Mô tả
  _id: Id<"settings">,
  _creationTime: number
}
```

**Indexes:**
- `by_key` - Tìm theo khóa

## Quan hệ giữa các bảng

```
users (Auth)
├── cart (1:n)
├── orders (1:n)
├── reviews (1:n)
├── notifications (1:n)
└── paymentTransactions (1:n)

categories
├── products (1:n)
└── categories (self-reference for hierarchy)

products
├── cart (1:n)
├── reviews (1:n)
├── productImages (1:n)
└── order items (1:n)

orders
├── paymentTransactions (1:n)
└── emailLogs (1:n)
```

## Lưu ý quan trọng

1. **File Storage**: Hình ảnh được lưu trong Convex Storage, chỉ lưu ID trong database
2. **Real-time**: Tất cả thay đổi được sync real-time nhờ Convex
3. **Authentication**: Sử dụng Convex Auth với email/password và anonymous
4. **Indexing**: Các index được tối ưu cho performance queries
5. **Validation**: Tất cả fields đều có validation với Convex validators
