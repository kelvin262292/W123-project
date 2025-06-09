import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("orders").order("desc").collect();
  },
});

export const getByUser = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const userId = args.userId || await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getById = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const order = await ctx.db.get(args.orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    // Check if user owns this order or is admin
    const user = await ctx.db.get(userId);
    const isAdmin = user?.email?.includes("admin");
    
    if (order.userId !== userId && !isAdmin) {
      throw new Error("Unauthorized");
    }

    return order;
  },
});

export const create = mutation({
  args: {
    items: v.array(v.object({
      productId: v.id("products"),
      productName: v.optional(v.string()),
      quantity: v.number(),
      price: v.number(),
      variants: v.optional(v.array(v.object({
        type: v.string(),
        value: v.string()
      })))
    })),
    totalAmount: v.number(),
    shippingAddress: v.object({
      name: v.string(),
      phone: v.string(),
      address: v.string(),
      city: v.string(),
      district: v.string(),
      ward: v.string()
    }),
    paymentMethod: v.union(v.literal("cod"), v.literal("vnpay"), v.literal("momo"), v.literal("zalopay")),
    couponCode: v.optional(v.string()),
    discountAmount: v.optional(v.number()),
    shippingFee: v.optional(v.number()),
    notes: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    
    return await ctx.db.insert("orders", {
      userId,
      items: args.items,
      totalAmount: args.totalAmount,
      status: "pending",
      paymentMethod: args.paymentMethod,
      paymentStatus: "pending",
      shippingAddress: args.shippingAddress,
      couponCode: args.couponCode,
      discountAmount: args.discountAmount,
      shippingFee: args.shippingFee,
      notes: args.notes,
      createdAt: Date.now()
    });
  },
});

export const updateStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    )
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Check if user is admin
    const user = await ctx.db.get(userId);
    const isAdmin = user?.email?.includes("admin");
    
    if (!isAdmin) {
      throw new Error("Admin access required");
    }

    return await ctx.db.patch(args.orderId, {
      status: args.status
    });
  },
});

export const getUserOrders = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getOrderWithProducts = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const order = await ctx.db.get(args.orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    // Check if user owns this order or is admin
    const user = await ctx.db.get(userId);
    const isAdmin = user?.email?.includes("admin");
    
    if (order.userId !== userId && !isAdmin) {
      throw new Error("Unauthorized");
    }

    // Get product details for each item
    const itemsWithProducts = await Promise.all(
      order.items.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return {
          ...item,
          product: product ? {
            name: product.name,
            slug: product.slug,
            images: product.images
          } : null
        };
      })
    );

    return {
      ...order,
      items: itemsWithProducts
    };
  },
});

export const cancelOrder = mutation({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const order = await ctx.db.get(args.orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    if (order.userId !== userId) {
      throw new Error("Unauthorized");
    }

    if (order.status !== "pending") {
      throw new Error("Can only cancel pending orders");
    }

    return await ctx.db.patch(args.orderId, {
      status: "cancelled"
    });
  },
});

export const listByDateRange = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .filter((q) => 
        q.and(
          q.gte(q.field("createdAt"), args.startDate),
          q.lte(q.field("createdAt"), args.endDate)
        )
      )
      .order("desc")
      .collect();
  },
});
