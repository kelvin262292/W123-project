# System Architecture - ShopVN

Tài liệu này mô tả kiến trúc tổng thể của hệ thống ShopVN.

## Tổng quan kiến trúc

ShopVN được xây dựng theo mô hình **Full-Stack Serverless** với Convex làm backend và React làm frontend.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Convex        │    │   External      │
│   (React)       │◄──►│   Backend       │◄──►│   Services      │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Frontend Architecture

### Technology Stack
- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Vite** - Build Tool & Dev Server

### Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ...
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── ProductPage.tsx
│   ├── CartPage.tsx
│   └── admin/          # Admin pages
├── lib/                # Utilities
└── index.css          # Global styles
```

### Component Architecture

```
App.tsx (Root)
├── Header
├── Router Logic
├── Page Components
│   ├── HomePage
│   │   ├── HeroBanner
│   │   ├── CategoryGrid
│   │   ├── FlashSale
│   │   └── ProductGrid
│   ├── ProductPage
│   ├── CartPage
│   └── AdminLayout
└── Footer
```

### State Management
- **Convex Queries**: Server state (real-time)
- **React useState**: Local component state
- **URL State**: Navigation và filters

## Backend Architecture (Convex)

### Core Concepts
- **Database**: NoSQL document store
- **Functions**: Queries, Mutations, Actions
- **Real-time**: Automatic subscriptions
- **Authentication**: Built-in auth system
- **File Storage**: Integrated file handling

### Function Types

#### 1. Queries (Read Operations)
```typescript
// Real-time data fetching
export const list = query({
  args: { categoryId: v.optional(v.id("categories")) },
  handler: async (ctx, args) => {
    return await ctx.db.query("products")
      .withIndex("by_category", q => q.eq("categoryId", args.categoryId))
      .collect();
  }
});
```

#### 2. Mutations (Write Operations)
```typescript
// Transactional data changes
export const create = mutation({
  args: { name: v.string(), price: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", args);
  }
});
```

#### 3. Actions (External Operations)
```typescript
// External API calls, email sending
export const sendEmail = action({
  args: { to: v.string(), subject: v.string() },
  handler: async (ctx, args) => {
    // Call external email service
  }
});
```

### Database Design

#### Schema Organization
```
convex/
├── schema.ts           # Database schema definition
├── auth.ts            # Authentication setup
├── products.ts        # Product operations
├── cart.ts           # Cart operations
├── orders.ts         # Order operations
├── categories.ts     # Category operations
├── admin.ts          # Admin operations
└── fileStorage.ts    # File handling
```

#### Index Strategy
```typescript
// Optimized for common queries
products: defineTable({...})
  .index("by_category", ["categoryId"])
  .index("by_featured", ["isFeatured"])
  .index("by_slug", ["slug"])
  .index("by_active", ["isActive"])
```

## Data Flow

### 1. User Interaction Flow
```
User Action → React Component → Convex Mutation → Database → Real-time Update → UI Update
```

### 2. Real-time Updates
```
Database Change → Convex Subscription → React Query Hook → Component Re-render
```

### 3. File Upload Flow
```
User Selects File → Generate Upload URL → Upload to Convex Storage → Save Storage ID → Display Image
```

## Authentication Architecture

### Convex Auth Integration
```typescript
// Authentication providers
export default {
  providers: [
    Password({ profile: { name: "", email: "" } }),
    Anonymous()
  ]
};
```

### Auth Flow
```
1. User submits credentials
2. Convex Auth validates
3. JWT token issued
4. Token stored in browser
5. Subsequent requests include token
6. Server validates token per request
```

### Authorization Levels
- **Anonymous**: Browse products, view details
- **Authenticated**: Add to cart, place orders
- **Admin**: Manage products, orders, users

## Performance Optimizations

### Frontend Optimizations
1. **Code Splitting**: Dynamic imports for admin pages
2. **Image Optimization**: Lazy loading, responsive images
3. **Caching**: Convex automatic query caching
4. **Bundle Optimization**: Vite tree-shaking

### Backend Optimizations
1. **Database Indexes**: Optimized for common queries
2. **Query Batching**: Minimize database calls
3. **Real-time Subscriptions**: Efficient WebSocket usage
4. **File Storage**: CDN-backed storage

## Security Architecture

### Data Security
- **Input Validation**: Convex validators on all inputs
- **SQL Injection**: Not applicable (NoSQL)
- **XSS Protection**: React built-in escaping
- **CSRF Protection**: SameSite cookies

### Authentication Security
- **JWT Tokens**: Secure token-based auth
- **Password Hashing**: Automatic by Convex Auth
- **Session Management**: Automatic token refresh
- **Anonymous Users**: Secure guest sessions

### Authorization
```typescript
// Function-level authorization
export const adminOnly = mutation({
  handler: async (ctx, args) => {
    const user = await getAuthUserId(ctx);
    if (!user || !await isAdmin(ctx, user)) {
      throw new Error("Unauthorized");
    }
    // Admin operation
  }
});
```

## Deployment Architecture

### Development Environment
```
Local Machine
├── Vite Dev Server (Frontend)
├── Convex Dev (Backend)
└── Hot Reload (Both)
```

### Production Environment
```
CDN (Frontend Static Files)
├── Convex Cloud (Backend)
├── Global Edge Network
└── Automatic Scaling
```

### CI/CD Pipeline
```
Git Push → Build Frontend → Deploy to CDN → Deploy Convex Functions → Health Check
```

## External Integrations

### Payment Gateways
- **VNPay**: Vietnamese payment gateway
- **MoMo**: Mobile wallet
- **ZaloPay**: Digital wallet

### Email Service
- **Resend**: Transactional emails
- **Templates**: Order confirmations, notifications

### File Storage
- **Convex Storage**: Images, documents
- **CDN**: Global content delivery

## Monitoring & Analytics

### Error Tracking
- **Error Boundaries**: React error catching
- **Convex Logs**: Server-side error logging
- **User Feedback**: Toast notifications

### Performance Monitoring
- **Convex Dashboard**: Function performance
- **Browser DevTools**: Frontend performance
- **Real User Monitoring**: Core Web Vitals

## Scalability Considerations

### Horizontal Scaling
- **Convex**: Automatic scaling
- **CDN**: Global distribution
- **Database**: Automatic sharding

### Vertical Scaling
- **Function Limits**: 1s for queries/mutations
- **File Size**: 1MB per document
- **Concurrent Users**: Unlimited

### Caching Strategy
```
Browser Cache → CDN Cache → Convex Cache → Database
```

## Development Workflow

### Local Development
1. Clone repository
2. Install dependencies: `npm install`
3. Start Convex: `npx convex dev`
4. Start frontend: `npm run dev`
5. Open browser: `http://localhost:5173`

### Code Organization
- **Separation of Concerns**: Clear frontend/backend split
- **Type Safety**: Full TypeScript coverage
- **Reusable Components**: Modular UI components
- **API Consistency**: Standardized function patterns

### Testing Strategy
- **Unit Tests**: Component testing
- **Integration Tests**: API testing
- **E2E Tests**: User flow testing
- **Manual Testing**: Admin workflows

## Future Architecture Considerations

### Microservices Migration
- **Service Boundaries**: Products, Orders, Users
- **API Gateway**: Unified API layer
- **Event Sourcing**: Order processing events

### Advanced Features
- **Search Engine**: Elasticsearch integration
- **Recommendation Engine**: ML-based suggestions
- **Analytics**: Real-time business metrics
- **Mobile App**: React Native extension

### Performance Enhancements
- **Database Optimization**: Query optimization
- **Caching Layer**: Redis integration
- **CDN Enhancement**: Advanced caching rules
- **Load Balancing**: Geographic distribution
