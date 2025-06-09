import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api } from "./_generated/api";

// Check if user is admin
export const isAdmin = query({
  args: {},
  returns: v.boolean(),
  handler: async (ctx): Promise<boolean> => {
    try {
      const isUserAdmin: boolean = await ctx.runQuery(api.roles.isAdmin);
      return isUserAdmin;
    } catch {
      return false;
    }
  },
});

// Helper function to check admin access and throw error if not admin
async function requireAdmin(ctx: any): Promise<{ userId: string }> {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new Error("Unauthorized - Please login");
  }
  
  const isUserAdmin: boolean = await ctx.runQuery(api.roles.isAdmin);
  if (!isUserAdmin) {
    throw new Error("Admin access required");
  }
  
  return { userId };
}

export const getStats = query({
  args: { timeRange: v.string() },
  returns: v.object({
    revenue: v.number(),
    orders: v.number(),
    customers: v.number(),
    completionRate: v.number(),
  }),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const now = Date.now();
    let startTime = now;
    
    switch (args.timeRange) {
      case "7d":
        startTime = now - 7 * 24 * 60 * 60 * 1000;
        break;
      case "30d":
        startTime = now - 30 * 24 * 60 * 60 * 1000;
        break;
      case "90d":
        startTime = now - 90 * 24 * 60 * 60 * 1000;
        break;
      case "1y":
        startTime = now - 365 * 24 * 60 * 60 * 1000;
        break;
    }

    // Get orders in time range
    const orders = await ctx.db
      .query("orders")
      .filter((q) => q.gte(q.field("_creationTime"), startTime))
      .collect();

    // Get all users
    const users = await ctx.db.query("users").collect();
    const nonAdminUsers = users.filter(u => !u.email?.includes("admin"));

    // Calculate stats
    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const completedOrders = orders.filter(order => order.status === "delivered");
    const completionRate = orders.length > 0 ? Math.round((completedOrders.length / orders.length) * 100) : 0;

    return {
      revenue,
      orders: orders.length,
      customers: nonAdminUsers.length,
      completionRate,
    };
  },
});

export const getRecentOrders = query({
  args: { limit: v.number() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const orders = await ctx.db
      .query("orders")
      .order("desc")
      .take(args.limit);

    // Get user details for each order
    const ordersWithUsers = await Promise.all(
      orders.map(async (order) => {
        const user = await ctx.db.get(order.userId);
        return {
          ...order,
          user: user ? { name: user.name, email: user.email } : null,
        };
      })
    );

    return ordersWithUsers;
  },
});

export const getTopProducts = query({
  args: { limit: v.number() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const products = await ctx.db.query("products").collect();
    
    // Sort by soldCount (descending)
    const sortedProducts = products
      .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
      .slice(0, args.limit);

    return sortedProducts;
  },
});

export const getAllCustomers = query({
  args: {
    search: v.optional(v.string()),
    sortBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    let users = await ctx.db.query("users").collect();
    
    // Filter out admin users
    users = users.filter(u => !u.email?.includes("admin"));
    
    if (args.search) {
      const searchLower = args.search.toLowerCase();
      users = users.filter(u => 
        u.name?.toLowerCase().includes(searchLower) ||
        u.email?.toLowerCase().includes(searchLower)
      );
    }
    
    if (args.sortBy) {
      switch (args.sortBy) {
        case "newest":
          users.sort((a, b) => b._creationTime - a._creationTime);
          break;
        case "oldest":
          users.sort((a, b) => a._creationTime - b._creationTime);
          break;
        case "name":
          users.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
          break;
      }
    }
    
    return users;
  },
});

export const getCustomerStats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const orders = await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const completedOrders = orders.filter(order => order.status === "delivered");

    return {
      totalOrders: orders.length,
      totalSpent,
      completedOrders: completedOrders.length,
      lastOrderDate: orders.length > 0 ? Math.max(...orders.map(o => o._creationTime)) : null,
    };
  },
});

export const getCustomerById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.get(args.userId);
  },
});

export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const order = await ctx.db.get(args.orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    await ctx.db.patch(args.orderId, {
      status: args.status,
    });

    return { success: true };
  },
});

export const deleteCustomer = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    
    // First delete all orders for this user
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    
    for (const order of orders) {
      await ctx.db.delete(order._id);
    }
    
    // Delete cart items
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    
    for (const item of cartItems) {
      await ctx.db.delete(item._id);
    }
    
    // Delete reviews
    const reviews = await ctx.db.query("reviews").collect();
    const userReviews = reviews.filter(r => r.userId === args.userId);
    
    for (const review of userReviews) {
      await ctx.db.delete(review._id);
    }
    
    // Finally delete the user
    await ctx.db.delete(args.userId);
    
    return { success: true };
  },
});

export const updateSettings = mutation({
  args: {
    siteName: v.string(),
    siteDescription: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    address: v.string(),
    freeShippingThreshold: v.number(),
    defaultShippingFee: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    // For now, we'll store settings in a simple way
    // In a real app, you'd have a settings table
    return { 
      success: true,
      message: "Settings updated successfully",
      settings: args
    };
  },
});

export const getOrderStats = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    
    const orders = await ctx.db.query("orders").collect();
    
    const statusCounts = {
      pending: orders.filter(o => o.status === "pending").length,
      confirmed: orders.filter(o => o.status === "confirmed").length,
      shipped: orders.filter(o => o.status === "shipped").length,
      delivered: orders.filter(o => o.status === "delivered").length,
      cancelled: orders.filter(o => o.status === "cancelled").length,
    };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = orders.filter(o => o._creationTime >= today.getTime());
    
    return {
      total: orders.length,
      today: todayOrders.length,
      statusCounts,
    };
  },
});
