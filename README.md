# ShopVN - Vietnamese E-commerce Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Convex-Latest-FF6B6B?style=for-the-badge&logo=convex&logoColor=white" alt="Convex" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.14-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-5.4.10-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Cài đặt](#-cài-đặt)
- [Cấu hình](#-cấu-hình)
- [Chạy ứng dụng](#-chạy-ứng-dụng)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Tính năng Admin](#-tính-năng-admin)
- [Tính năng User](#-tính-năng-user)
- [Deployment](#-deployment)
- [Performance](#-performance)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Giới thiệu

**ShopVN** là một nền tảng thương mại điện tử hiện đại được xây dựng dành riêng cho thị trường Việt Nam. Ứng dụng được phát triển với React, TypeScript và Convex, cung cấp trải nghiệm mua sắm trực tuyến mượt mà và hiệu quả.

### 🎯 Mục tiêu dự án
- Tạo ra một nền tảng e-commerce hoàn chỉnh cho thị trường Việt Nam
- Cung cấp giao diện người dùng hiện đại và thân thiện
- Đảm bảo hiệu suất cao và khả năng mở rộng
- Hỗ trợ đa thiết bị (responsive design)
- Tích hợp các tính năng thanh toán phổ biến tại Việt Nam

## ✨ Tính năng

### 🛍️ Tính năng khách hàng
- **Duyệt sản phẩm**: Xem danh sách sản phẩm với bộ lọc và sắp xếp
- **Tìm kiếm**: Tìm kiếm sản phẩm theo tên, mô tả, tags
- **Chi tiết sản phẩm**: Xem thông tin chi tiết, hình ảnh, đánh giá
- **Giỏ hàng**: Thêm, xóa, cập nhật số lượng sản phẩm
- **Thanh toán**: Quy trình thanh toán đơn giản và bảo mật
- **Tài khoản**: Quản lý thông tin cá nhân và lịch sử đơn hàng
- **Flash Sale**: Chương trình giảm giá có thời hạn
- **Đánh giá sản phẩm**: Xem và để lại đánh giá
- **Wishlist**: Lưu sản phẩm yêu thích

### 👨‍💼 Tính năng quản trị
- **Dashboard**: Tổng quan doanh thu, đơn hàng, khách hàng
- **Quản lý sản phẩm**: CRUD sản phẩm với hình ảnh và variants
- **Quản lý đơn hàng**: Theo dõi và cập nhật trạng thái đơn hàng
- **Quản lý khách hàng**: Xem thông tin và lịch sử mua hàng
- **Quản lý danh mục**: Tổ chức sản phẩm theo danh mục
- **Báo cáo**: Thống kê doanh thu, sản phẩm bán chạy
- **Cài đặt**: Cấu hình hệ thống và thông tin cửa hàng

### 🔧 Tính năng kỹ thuật
- **Real-time updates**: Cập nhật dữ liệu thời gian thực
- **Responsive design**: Tương thích mọi thiết bị
- **SEO friendly**: Tối ưu cho công cụ tìm kiếm
- **Progressive Web App**: Có thể cài đặt như ứng dụng native
- **Offline support**: Hoạt động cơ bản khi mất kết nối
- **Image optimization**: Tối ưu hình ảnh tự động
- **Lazy loading**: Tải nội dung theo yêu cầu

## 🛠️ Công nghệ sử dụng

### Frontend
| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| **React** | 18.3.1 | Thư viện UI chính |
| **TypeScript** | 5.6.2 | Ngôn ngữ lập trình |
| **Vite** | 5.4.10 | Build tool và dev server |
| **Tailwind CSS** | 3.4.14 | CSS framework |
| **React Router** | 6.28.0 | Routing |
| **Sonner** | 1.7.1 | Toast notifications |

### Backend & Database
| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| **Convex** | Latest | Backend-as-a-Service |
| **Convex Auth** | Latest | Authentication system |
| **Node.js** | 18+ | Runtime environment |

### Development Tools
| Tool | Phiên bản | Mô tả |
|------|-----------|-------|
| **ESLint** | 9.13.0 | Code linting |
| **PostCSS** | 8.4.47 | CSS processing |
| **Autoprefixer** | 10.4.20 | CSS vendor prefixes |

## 📁 Cấu trúc dự án

```
ShopVN/
├── 📁 convex/                    # Backend logic (Convex)
│   ├── 📄 auth.config.ts         # Cấu hình authentication
│   ├── 📄 auth.ts                # Logic authentication
│   ├── 📄 banners.ts             # API banners
│   ├── 📄 cart.ts                # API giỏ hàng
│   ├── 📄 categories.ts          # API danh mục
│   ├── 📄 http.ts                # HTTP handlers
│   ├── 📄 orders.ts              # API đơn hàng
│   ├── 📄 products.ts            # API sản phẩm
│   ├── 📄 router.ts              # HTTP routing
│   ├── 📄 schema.ts              # Database schema
│   ├── 📄 seed.ts                # Dữ liệu mẫu
│   └── 📁 _generated/            # Auto-generated files
├── 📁 src/                       # Frontend source code
│   ├── 📁 components/            # React components
│   │   ├── 📄 CategoryGrid.tsx   # Grid danh mục
│   │   ├── 📄 FlashSale.tsx      # Component flash sale
│   │   ├── 📄 Footer.tsx         # Footer
│   │   ├── 📄 Header.tsx         # Header với navigation
│   │   ├── 📄 HeroBanner.tsx     # Banner chính
│   │   ├── 📄 ProductCard.tsx    # Card sản phẩm
│   │   └── 📄 ProductGrid.tsx    # Grid sản phẩm
│   ├── 📁 pages/                 # Các trang chính
│   │   ├── 📁 admin/             # Trang quản trị
│   │   │   ├── 📄 AdminDashboard.tsx
│   │   │   ├── 📄 AdminLayout.tsx
│   │   │   ├── 📄 AdminOrders.tsx
│   │   │   └── 📄 AdminProducts.tsx
│   │   ├── 📄 AccountPage.tsx    # Trang tài khoản
│   │   ├── 📄 CartPage.tsx       # Trang giỏ hàng
│   │   ├── 📄 CategoryPage.tsx   # Trang danh mục
│   │   ├── 📄 CheckoutPage.tsx   # Trang thanh toán
│   │   ├── 📄 HomePage.tsx       # Trang chủ
│   │   └── 📄 ProductPage.tsx    # Trang chi tiết sản phẩm
│   ├── 📁 lib/                   # Utilities
│   │   └── 📄 utils.ts           # Helper functions
│   ├── 📄 App.tsx                # Component chính
│   ├── 📄 main.tsx               # Entry point
│   ├── 📄 SignInForm.tsx         # Form đăng nhập
│   ├── 📄 SignOutButton.tsx      # Nút đăng xuất
│   └── 📄 index.css              # Global styles
├── 📁 public/                    # Static assets
├── 📄 package.json               # Dependencies
├── 📄 tailwind.config.js         # Tailwind configuration
├── 📄 vite.config.ts             # Vite configuration
├── 📄 tsconfig.json              # TypeScript configuration
└── 📄 README.md                  # Documentation
```

## 🔧 Cài đặt

### Yêu cầu hệ thống
- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0 hoặc **yarn**: >= 1.22.0
- **Git**: Latest version

### Bước 1: Clone repository
```bash
git clone https://github.com/your-username/shopvn.git
cd shopvn
```

### Bước 2: Cài đặt dependencies
```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install
```

### Bước 3: Cài đặt Convex CLI
```bash
npm install -g convex
```

## ⚙️ Cấu hình

### Environment Variables
Tạo file `.env.local` trong thư mục gốc:

```env
# Convex Configuration
VITE_CONVEX_URL=your_convex_deployment_url

# Optional: Custom configurations
VITE_APP_NAME=ShopVN
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://api.shopvn.com
```

### Convex Setup
1. **Đăng ký tài khoản Convex**:
   ```bash
   npx convex login
   ```

2. **Khởi tạo project**:
   ```bash
   npx convex init
   ```

3. **Deploy backend**:
   ```bash
   npx convex deploy
   ```

### Database Schema
Schema được định nghĩa trong `convex/schema.ts`:

```typescript
// Các bảng chính
- users: Thông tin người dùng
- products: Sản phẩm
- categories: Danh mục
- orders: Đơn hàng
- cart: Giỏ hàng
- banners: Banner quảng cáo
```

## 🚀 Chạy ứng dụng

### Development Mode
```bash
# Terminal 1: Chạy Convex dev server
npx convex dev

# Terminal 2: Chạy Vite dev server
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

### Production Build
```bash
# Build frontend
npm run build

# Deploy Convex
npx convex deploy --prod
```

### Preview Production Build
```bash
npm run preview
```

## 📚 API Documentation

### Products API

#### `api.products.list`
```typescript
// Lấy danh sách sản phẩm
const products = useQuery(api.products.list, {
  search?: string,
  categoryId?: Id<"categories">,
  sortBy?: "newest" | "price_asc" | "price_desc" | "rating",
  limit?: number
});
```

#### `api.products.getBySlug`
```typescript
// Lấy sản phẩm theo slug
const product = useQuery(api.products.getBySlug, {
  slug: string
});
```

#### `api.products.create`
```typescript
// Tạo sản phẩm mới (Admin)
const createProduct = useMutation(api.products.create);
await createProduct({
  name: string,
  slug: string,
  description: string,
  price: number,
  originalPrice?: number,
  categoryId: Id<"categories">,
  stock: number,
  images: string[],
  variants?: ProductVariant[],
  tags?: string[]
});
```

### Cart API

#### `api.cart.list`
```typescript
// Lấy giỏ hàng của user
const cartItems = useQuery(api.cart.list);
```

#### `api.cart.add`
```typescript
// Thêm sản phẩm vào giỏ hàng
const addToCart = useMutation(api.cart.add);
await addToCart({
  productId: Id<"products">,
  quantity: number,
  variants?: CartVariant[]
});
```

### Orders API

#### `api.orders.create`
```typescript
// Tạo đơn hàng mới
const createOrder = useMutation(api.orders.create);
await createOrder({
  items: OrderItem[],
  totalAmount: number,
  shippingAddress: ShippingAddress,
  paymentMethod: "cod" | "bank",
  couponCode?: string
});
```

## 🗄️ Database Schema

### Products Table
```typescript
products: defineTable({
  name: v.string(),                    // Tên sản phẩm
  slug: v.string(),                    // URL slug
  description: v.string(),             // Mô tả
  price: v.number(),                   // Giá bán
  originalPrice: v.optional(v.number()), // Giá gốc
  categoryId: v.id("categories"),      // ID danh mục
  stock: v.number(),                   // Số lượng tồn kho
  images: v.array(v.string()),         // Mảng URL hình ảnh
  variants: v.optional(v.array(v.object({
    type: v.string(),                  // Loại variant (size, color)
    name: v.string(),                  // Tên hiển thị
    value: v.string(),                 // Giá trị
    price: v.optional(v.number()),     // Giá riêng (nếu có)
    stock: v.optional(v.number())      // Tồn kho riêng
  }))),
  tags: v.optional(v.array(v.string())), // Tags
  rating: v.optional(v.number()),      // Đánh giá trung bình
  reviewCount: v.optional(v.number()), // Số lượng đánh giá
  soldCount: v.optional(v.number()),   // Số lượng đã bán
  isFlashSale: v.optional(v.boolean()), // Flash sale
  flashSaleEndTime: v.optional(v.number()), // Thời gian kết thúc flash sale
  isFeatured: v.optional(v.boolean())  // Sản phẩm nổi bật
})
.index("by_category", ["categoryId"])
.index("by_slug", ["slug"])
.index("by_featured", ["isFeatured"])
.index("by_flash_sale", ["isFlashSale"])
```

### Categories Table
```typescript
categories: defineTable({
  name: v.string(),                    // Tên danh mục
  slug: v.string(),                    // URL slug
  description: v.optional(v.string()), // Mô tả
  icon: v.optional(v.string()),        // Icon emoji
  image: v.optional(v.string()),       // Hình ảnh
  parentId: v.optional(v.id("categories")), // Danh mục cha
  isActive: v.optional(v.boolean()),   // Trạng thái hoạt động
  sortOrder: v.optional(v.number()),   // Thứ tự sắp xếp
  isFeatured: v.optional(v.boolean())  // Danh mục nổi bật
})
.index("by_slug", ["slug"])
.index("by_parent", ["parentId"])
.index("by_featured", ["isFeatured"])
```

### Orders Table
```typescript
orders: defineTable({
  userId: v.id("users"),               // ID người dùng
  items: v.array(v.object({
    productId: v.id("products"),       // ID sản phẩm
    quantity: v.number(),              // Số lượng
    price: v.number(),                 // Giá tại thời điểm mua
    variants: v.optional(v.array(v.object({
      type: v.string(),
      value: v.string()
    })))
  })),
  totalAmount: v.number(),             // Tổng tiền
  status: v.union(
    v.literal("pending"),              // Chờ xử lý
    v.literal("confirmed"),            // Đã xác nhận
    v.literal("shipped"),              // Đang giao
    v.literal("delivered"),            // Đã giao
    v.literal("cancelled")             // Đã hủy
  ),
  shippingAddress: v.object({
    name: v.string(),
    phone: v.string(),
    address: v.string(),
    city: v.string(),
    district: v.string(),
    ward: v.string()
  }),
  paymentMethod: v.union(
    v.literal("cod"),                  // Thanh toán khi nhận hàng
    v.literal("bank")                  // Chuyển khoản
  ),
  paymentStatus: v.optional(v.union(
    v.literal("pending"),
    v.literal("paid"),
    v.literal("failed")
  )),
  couponCode: v.optional(v.string()),  // Mã giảm giá
  notes: v.optional(v.string())        // Ghi chú
})
.index("by_user", ["userId"])
.index("by_status", ["status"])
```

## 👨‍💼 Tính năng Admin

### Dashboard Analytics
- **Doanh thu**: Theo ngày, tuần, tháng, năm
- **Đơn hàng**: Tổng số, trạng thái, xu hướng
- **Khách hàng**: Số lượng, khách hàng mới
- **Sản phẩm**: Bán chạy, tồn kho thấp
- **Biểu đồ**: Doanh thu theo thời gian

### Quản lý sản phẩm
- **CRUD operations**: Tạo, đọc, cập nhật, xóa
- **Bulk actions**: Thao tác hàng loạt
- **Image upload**: Upload và quản lý hình ảnh
- **Variants**: Quản lý biến thể sản phẩm
- **Inventory**: Theo dõi tồn kho
- **SEO**: Tối ưu SEO cho sản phẩm

### Quản lý đơn hàng
- **Order tracking**: Theo dõi trạng thái
- **Status updates**: Cập nhật trạng thái
- **Shipping**: Quản lý vận chuyển
- **Invoices**: Tạo hóa đơn
- **Refunds**: Xử lý hoàn tiền

## 👤 Tính năng User

### Trải nghiệm mua sắm
- **Product browsing**: Duyệt sản phẩm mượt mà
- **Advanced search**: Tìm kiếm nâng cao
- **Filters**: Lọc theo giá, danh mục, đánh giá
- **Wishlist**: Danh sách yêu thích
- **Compare**: So sánh sản phẩm
- **Reviews**: Đánh giá và nhận xét

### Quản lý tài khoản
- **Profile management**: Quản lý thông tin cá nhân
- **Order history**: Lịch sử đơn hàng
- **Address book**: Sổ địa chỉ
- **Notifications**: Thông báo đơn hàng
- **Preferences**: Tùy chọn cá nhân

## 🚀 Deployment

### Vercel Deployment
1. **Connect repository**:
   ```bash
   # Push code to GitHub
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Import project from GitHub
   - Set environment variables
   - Deploy

3. **Environment variables on Vercel**:
   ```
   VITE_CONVEX_URL=your_production_convex_url
   ```

### Convex Production Deployment
```bash
# Deploy to production
npx convex deploy --prod

# Set production environment variables
npx convex env set VARIABLE_NAME value --prod
```

### Custom Domain Setup
1. **Add domain in Vercel**
2. **Configure DNS**:
   ```
   Type: CNAME
   Name: www
   Value: your-project.vercel.app
   ```

## ⚡ Performance

### Optimization Strategies
- **Code splitting**: Tách code theo route
- **Lazy loading**: Tải component theo yêu cầu
- **Image optimization**: Tối ưu hình ảnh
- **Caching**: Cache API responses
- **Bundle analysis**: Phân tích bundle size

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Monitoring
```bash
# Analyze bundle size
npm run build
npm run analyze

# Performance testing
npm run lighthouse
```

## 🔒 Security

### Authentication
- **Convex Auth**: Secure authentication system
- **JWT tokens**: Stateless authentication
- **Session management**: Automatic token refresh
- **Role-based access**: Admin/User permissions

### Data Protection
- **Input validation**: Server-side validation
- **SQL injection**: Protected by Convex
- **XSS protection**: Content sanitization
- **CSRF protection**: Built-in protection

### Best Practices
- **Environment variables**: Secure configuration
- **HTTPS only**: Force secure connections
- **Rate limiting**: API rate limiting
- **Error handling**: Secure error messages

## 🤝 Contributing

### Development Workflow
1. **Fork repository**
2. **Create feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make changes**
4. **Run tests**:
   ```bash
   npm run test
   npm run lint
   ```
5. **Commit changes**:
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open Pull Request**

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format

### Testing
```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

### Documentation
- **API Docs**: [/docs/api](./docs/api.md)
- **Component Docs**: [/docs/components](./docs/components.md)
- **Deployment Guide**: [/docs/deployment](./docs/deployment.md)

### Community
- **GitHub Issues**: [Report bugs](https://github.com/your-username/shopvn/issues)
- **Discussions**: [Community discussions](https://github.com/your-username/shopvn/discussions)
- **Discord**: [Join our Discord](https://discord.gg/shopvn)

### Contact
- **Email**: support@shopvn.com
- **Website**: [https://shopvn.com](https://shopvn.com)
- **Twitter**: [@ShopVN](https://twitter.com/shopvn)

---

<div align="center">
  <p>Made with ❤️ for Vietnamese e-commerce</p>
  <p>© 2024 ShopVN. All rights reserved.</p>
</div>
