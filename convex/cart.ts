import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// For demo purposes, we'll use a fixed user ID when not authenticated
const DEMO_USER_ID = "demo-user" as any;

async function getUserId(ctx: any) {
  const userId = await getAuthUserId(ctx);
  return userId || DEMO_USER_ID;
}

export const add = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.number(),
    variants: v.optional(v.array(v.object({
      type: v.string(),
      value: v.string(),
    }))),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    
    // Check if item already exists in cart
    const existingItem = await ctx.db
      .query("cart")
      .withIndex("by_user_and_product", (q) => 
        q.eq("userId", userId).eq("productId", args.productId)
      )
      .first();

    if (existingItem) {
      // Update quantity
      await ctx.db.patch(existingItem._id, {
        quantity: existingItem.quantity + args.quantity,
      });
      return existingItem._id;
    } else {
      // Add new item
      // Get product to get price
      const product = await ctx.db.get(args.productId);
      if (!product) {
        throw new Error("Product not found");
      }

      return await ctx.db.insert("cart", {
        userId,
        productId: args.productId,
        quantity: args.quantity,
        variants: args.variants,
        price: product.price,
        addedAt: Date.now(),
      });
    }
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // Get product details for each cart item
    const itemsWithProducts = await Promise.all(
      cartItems.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return {
          ...item,
          product,
        };
      })
    );

    return itemsWithProducts;
  },
});

export const updateQuantity = mutation({
  args: {
    itemId: v.id("cart"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    
    const item = await ctx.db.get(args.itemId);
    if (!item || item.userId !== userId) {
      throw new Error("Cart item not found");
    }

    if (args.quantity <= 0) {
      await ctx.db.delete(args.itemId);
    } else {
      await ctx.db.patch(args.itemId, {
        quantity: args.quantity,
      });
    }
  },
});

export const remove = mutation({
  args: {
    itemId: v.id("cart"),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    
    const item = await ctx.db.get(args.itemId);
    if (!item || item.userId !== userId) {
      throw new Error("Cart item not found");
    }

    await ctx.db.delete(args.itemId);
  },
});

export const clear = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    for (const item of cartItems) {
      await ctx.db.delete(item._id);
    }
  },
});

export const getCount = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  },
});
