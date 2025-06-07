import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    parentId: v.optional(v.id("categories")),
    isActive: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
  }).index("by_slug", ["slug"]),

  products: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    shortDescription: v.optional(v.string()),
    price: v.number(),
    originalPrice: v.optional(v.number()),
    categoryId: v.id("categories"),
    images: v.array(v.string()),
    variants: v.optional(v.any()),
    specifications: v.optional(v.array(v.object({
      name: v.string(),
      value: v.string(),
    }))),
    stock: v.number(),
    soldCount: v.optional(v.number()),
    rating: v.optional(v.number()),
    reviewCount: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    isFlashSale: v.optional(v.boolean()),
    flashSaleEndTime: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    weight: v.optional(v.number()),
    dimensions: v.optional(v.object({
      length: v.number(),
      width: v.number(),
      height: v.number(),
    })),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categoryId"])
    .index("by_featured", ["isFeatured"])
    .index("by_active", ["isActive"])
    .index("by_flash_sale", ["isFlashSale"]),

  productImages: defineTable({
    storageId: v.id("_storage"),
    productId: v.optional(v.id("products")),
    alt: v.string(),
    isPrimary: v.boolean(),
    uploadedBy: v.id("users"),
    contentType: v.optional(v.string()),
    size: v.number(),
  }).index("by_product", ["productId"]),

  cart: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
    variants: v.optional(v.array(v.object({
      type: v.string(),
      value: v.string(),
    }))),
    price: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_product", ["productId"])
    .index("by_user_and_product", ["userId", "productId"]),

  orders: defineTable({
    userId: v.id("users"),
    items: v.array(v.object({
      productId: v.id("products"),
      productName: v.optional(v.string()),
      quantity: v.number(),
      price: v.number(),
      variants: v.optional(v.array(v.object({
        type: v.string(),
        value: v.string(),
      }))),
    })),
    totalAmount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    paymentMethod: v.union(v.literal("cod"), v.literal("vnpay"), v.literal("momo"), v.literal("zalopay")),
    paymentStatus: v.optional(v.union(v.literal("pending"), v.literal("paid"), v.literal("failed"))),
    shippingAddress: v.object({
      name: v.string(),
      phone: v.string(),
      address: v.string(),
      ward: v.string(),
      district: v.string(),
      city: v.string(),
    }),
    notes: v.optional(v.string()),
    couponCode: v.optional(v.string()),
    discountAmount: v.optional(v.number()),
    shippingFee: v.optional(v.number()),
  }).index("by_user", ["userId"]),

  paymentTransactions: defineTable({
    orderId: v.id("orders"),
    userId: v.id("users"),
    paymentMethod: v.union(v.literal("vnpay"), v.literal("momo"), v.literal("zalopay")),
    amount: v.number(),
    status: v.union(v.literal("pending"), v.literal("success"), v.literal("failed"), v.literal("cancelled")),
    transactionCode: v.string(),
    paymentData: v.optional(v.any()),
    completedAt: v.optional(v.number()),
  })
    .index("by_order", ["orderId"])
    .index("by_transaction_code", ["transactionCode"]),

  reviews: defineTable({
    productId: v.id("products"),
    userId: v.id("users"),
    orderId: v.optional(v.id("orders")),
    rating: v.number(),
    title: v.optional(v.string()),
    comment: v.string(),
    images: v.optional(v.array(v.string())),
    isVerified: v.boolean(),
    isApproved: v.boolean(),
    helpfulCount: v.optional(v.number()),
  })
    .index("by_product", ["productId"])
    .index("by_user", ["userId"]),

  banners: defineTable({
    title: v.string(),
    subtitle: v.optional(v.string()),
    image: v.string(),
    link: v.optional(v.string()),
    buttonText: v.optional(v.string()),
    isActive: v.boolean(),
    order: v.number(),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  }),

  coupons: defineTable({
    code: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    type: v.union(v.literal("percentage"), v.literal("fixed")),
    value: v.number(),
    minOrderAmount: v.optional(v.number()),
    maxDiscountAmount: v.optional(v.number()),
    usageLimit: v.optional(v.number()),
    usedCount: v.optional(v.number()),
    isActive: v.boolean(),
    startDate: v.number(),
    endDate: v.number(),
  }).index("by_code", ["code"]),

  notifications: defineTable({
    userId: v.id("users"),
    type: v.string(),
    title: v.string(),
    message: v.string(),
    data: v.optional(v.any()),
    isRead: v.boolean(),
  }).index("by_user", ["userId"]),

  emailLogs: defineTable({
    orderId: v.id("orders"),
    email: v.string(),
    type: v.string(),
    emailId: v.optional(v.string()),
    metadata: v.optional(v.any()),
    sentAt: v.number(),
  }).index("by_order", ["orderId"]),

  settings: defineTable({
    key: v.string(),
    value: v.any(),
    description: v.optional(v.string()),
  }).index("by_key", ["key"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
