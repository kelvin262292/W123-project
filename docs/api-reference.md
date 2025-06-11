# 📚 API Reference – ShopVN

Phiên bản: **1.0**  
Cập nhật: *10/06/2025*  
Mọi ví dụ bên dưới sử dụng `curl`, **JSON UTF-8**, và endpoint giả định `https://api.shopvn.com`.

---

## 1. Tổng quan về API

| Giao thức | Base URL | Kiểu | Bảo mật |
|-----------|----------|------|---------|
| HTTPS REST | `https://api.shopvn.com` | JSON | Bearer JWT / Cookie |
| HTTP (dev) | `http://localhost:4000` | JSON | Cookie (SameSite=Lax) |

Các tài nguyên chia theo **domain-driven**:

```
/products      Sản phẩm
/categories    Danh mục
/cart          Giỏ hàng
/orders        Đơn hàng
/auth          Xác thực
/admin         Chức năng quản trị
```

> 📝 **Lưu ý**: Sau khi chuyển sang **Next.js + SSR** API REST vẫn được giữ nguyên; GraphQL gateway (dự kiến `/graphql`) cho mobile sẽ được bổ sung ở phiên bản 2.0.

---

## 2. Authentication

### 2.1 Đăng ký

`POST /auth/signup`

```json
{
  "name": "Nguyễn Văn A",
  "email": "nguenvana@example.com",
  "password": "P@ssw0rd!"
}
```

**Phản hồi**

```json
{
  "accessToken": "jwt_token_here",
  "user": {
    "id": "usr_01H...",
    "name": "Nguyễn Văn A",
    "email": "nguenvana@example.com"
  }
}
```

### 2.2 Đăng nhập

`POST /auth/signin`

Field         | Bắt buộc | Mô tả
--------------|----------|-------
`email`       | ✔        | Email đã đăng ký
`password`    | ✔        | Mật khẩu

Server trả về JWT (`accessToken`) + cookie `shopvn_session` (HTTP-only, SameSite=Lax).

### 2.3 Refresh token

`POST /auth/refresh`

- Gửi kèm `refreshToken` (HTTP-only cookie) → trả JWT mới.

### 2.4 Đăng xuất

`POST /auth/signout`  
Xoá cookie session & token.

---

## 3. Cấu trúc & Định dạng chung

- **Content-Type**: `application/json; charset=utf-8`
- **Múi giờ**: `UTC+07:00`
- **Format ID**: Convex `Id<"collection">`, ví dụ `prod_01HT…`
- **Giá**: `number` (VND, đơn vị **đồng**)
- Tất cả `createdAt`, `updatedAt` dạng Unix timestamp (ms).

---

## 4. Error Handling

| Thuộc tính | Kiểu | Ví dụ | Ý nghĩa |
|------------|------|-------|---------|
| `status`   | int  | `400` | HTTP status code |
| `code`     | str  | `VALIDATION_ERROR` | Mã lỗi nội bộ |
| `message`  | str  | `Email đã tồn tại` | Mô tả ngắn gọn |
| `details`  | obj? | `{ field: "email" }` | Thông tin bổ sung |

```json
{
  "status": 401,
  "code": "UNAUTHORIZED",
  "message": "Bạn cần đăng nhập để thực hiện hành động này"
}
```

---

## 5. Rate Limiting

| Hành động                 | Giới hạn | Cửa sổ |
|---------------------------|----------|--------|
| Đăng nhập                 | 5 lần    | 1 phút |
| Đặt lại mật khẩu          | 3 lần    | 10 phút|
| Checkout                  | 10 lần   | 1 giờ  |
| Truy cập admin            | 20 lần   | 1 phút |

Khi vượt giới hạn, server trả **429 Too Many Requests** với header:

```
Retry-After: 45
```

---

## 6. API Endpoints

### 6.1 Products

| Phương thức | Endpoint                | Miêu tả                       |
|------------|-------------------------|-------------------------------|
| `GET`      | `/products`             | Danh sách sản phẩm            |
| `GET`      | `/products/{slug}`      | Chi tiết sản phẩm             |
| `POST`     | `/admin/products`       | **(Admin)** Tạo sản phẩm      |
| `PATCH`    | `/admin/products/{id}`  | **(Admin)** Cập nhật sản phẩm |
| `DELETE`   | `/admin/products/{id}`  | **(Admin)** Xoá sản phẩm      |

#### Ví dụ: Lấy danh sách sản phẩm

`GET /products?category=electronics&minPrice=50000&sortBy=price_desc&page=1&limit=20`

**Response 200**

```json
{
  "data": [
    {
      "id": "prod_01HT...",
      "name": "iPhone 15 Pro Max",
      "slug": "iphone-15-pro-max",
      "price": 34990000,
      "originalPrice": 39990000,
      "rating": 4.8,
      "stock": 24,
      "images": ["https://cdn.../iphone.jpg"],
      "category": { "id": "cat_01HZ...", "name": "Điện thoại" },
      "tags": ["apple", "smartphone"],
      "isFeatured": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 143
  }
}
```

### 6.2 Categories

| Phương thức | Endpoint           | Miêu tả                 |
|------------|--------------------|-------------------------|
| `GET`      | `/categories`      | Danh sách danh mục      |
| `GET`      | `/categories/{slug}` | Chi tiết danh mục      |
| `POST/PATCH/DELETE` | `/admin/categories` | **Admin CRUD** |

### 6.3 Cart

| Method | Endpoint          | Miêu tả          | Auth |
|--------|-------------------|------------------|------|
| `GET`  | `/cart`           | Lấy giỏ hàng     | ✔ |
| `POST` | `/cart/items`     | Thêm sản phẩm    | ✔ |
| `PATCH`| `/cart/items/{id}`| Cập nhật số lượng| ✔ |
| `DELETE`| `/cart/items/{id}`| Xoá sản phẩm    | ✔ |

#### Thêm sản phẩm vào giỏ

```bash
POST /cart/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "prod_01HT...",
  "quantity": 2,
  "variants": [
    { "type": "color", "value": "black" }
  ]
}
```

### 6.4 Orders

| Method | Endpoint           | Miêu tả                         |
|--------|--------------------|---------------------------------|
| `GET`  | `/orders`          | Lịch sử đơn hàng (user)         |
| `POST` | `/orders`          | Tạo đơn hàng / Thanh toán       |
| `GET`  | `/orders/{id}`     | Chi tiết đơn hàng               |
| `PATCH`| `/admin/orders/{id}` | **Admin** cập nhật trạng thái |

#### Tạo đơn hàng + Redirect Payment

```bash
POST /orders
Authorization: Bearer <token>

{
  "items": [
    { "productId": "prod_01HT...", "quantity": 1 }
  ],
  "shippingAddress": {
    "name": "Nguyễn Văn A",
    "phone": "0912345678",
    "address": "12 Nguyễn Huệ",
    "ward": "Bến Nghé",
    "district": "Quận 1",
    "city": "HCM"
  },
  "paymentMethod": "vnpay"
}
```

**Response 201**

```json
{
  "orderId": "ord_01HU...",
  "paymentUrl": "https://sandbox.vnpay.vn/pay/..."
}
```

Người dùng được chuyển hướng tới `paymentUrl`. Sau khi thanh toán, VNPay sẽ gọi **Webhook** (xem mục 8).

### 6.5 Users / Admin

| Method | Endpoint          | Miêu tả                         | Quyền |
|--------|-------------------|---------------------------------|-------|
| `GET`  | `/admin/users`    | Danh sách người dùng            | Admin |
| `PATCH`| `/admin/users/{id}/role` | Gán / thu hồi vai trò | Admin |

---

## 7. Ví dụ Request / Response

| Tác vụ | Request (cURL) | Response mẫu |
|--------|----------------|--------------|
| Đăng nhập | `curl -X POST https://api.shopvn.com/auth/signin -d '{"email":"a@b.com","password":"***"}' -H "Content-Type: application/json"` | `{ "accessToken": "...", "refreshToken": "...", "user":{...}}` |
| Lấy Flash Sale | `curl https://api.shopvn.com/products?isFlashSale=true` | `[{...}]` |
| Thêm Cart | `curl -X POST https://api.shopvn.com/cart/items -H "Authorization: Bearer $TOKEN" -d '{...}'` | `{ "success": true }` |

---

## 8. Webhooks

| Provider | Endpoint (server) | Mô tả |
|----------|------------------|-------|
| VNPay    | `POST /payments/webhook/vnpay` | Xác thực checksum, cập nhật `orders.paymentStatus` |
| MoMo     | `POST /payments/webhook/momo`  | Xác thực RSA |
| ZaloPay  | `POST /payments/webhook/zalopay` | Xác thực HMAC |

Headers yêu cầu:
```
Content-Type: application/json
X-Signature: <checksum>
```

Phản hồi:
```
200 OK
Body: OK
```

Bất kỳ giá trị khác → Gateway sẽ retry.

---

## 9. Best Practices

1. **Sử dụng TLS (HTTPS)** 100 % – HTTP sẽ redirect 301 → HTTPS.  
2. **Authentication**: Lưu JWT trong HTTP-only **Secure cookie** (`SameSite=Lax`).  
3. **Retry-After**: Tuân thủ header khi bị rate-limit.  
4. **Idempotency**: Thêm header `Idempotency-Key` cho các `POST /orders` để tránh tạo trùng.  
5. **Pagination**: Dùng `page`, `limit` hoặc cursor (`after`).  
6. **Filtering & Sorting**: Tham số `?category=...&minPrice=...&sortBy=price_desc`.  
7. **Versioning**: Tiền tố `/v1/...`; breaking changes sẽ nâng `v2`.  
8. **Error Codes**: Bắt lỗi theo bảng ở mục 4; log `code` để debug.  
9. **Webhook Security**: Kiểm checksum & timestamp, lưu `txnId` unique để idempotent.  
10. **CORS**: Chỉ allow domain whitelisted (`https://shopvn.com`, subdomains).  

---

> Mọi thắc mắc, vui lòng liên hệ **dev@shopvn.com**.  
> Tài liệu này thuộc sở hữu © 2025 ShopVN.  
