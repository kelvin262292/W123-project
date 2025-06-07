import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    categoryId: v.optional(v.id("categories")),
    search: v.optional(v.string()),
    sortBy: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let products;
    
    if (args.categoryId) {
      products = await ctx.db
        .query("products")
        .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId!))
        .collect();
    } else {
      products = await ctx.db.query("products").collect();
    }
    
    if (args.search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(args.search!.toLowerCase()) ||
        p.description.toLowerCase().includes(args.search!.toLowerCase())
      );
    }
    
    if (args.sortBy) {
      switch (args.sortBy) {
        case "price_asc":
          products.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          products.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "newest":
          products.sort((a, b) => b._creationTime - a._creationTime);
          break;
      }
    }
    
    if (args.limit) {
      products = products.slice(0, args.limit);
    }
    
    return products;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const getFlashSale = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    return await ctx.db
      .query("products")
      .withIndex("by_flash_sale", (q) => q.eq("isFlashSale", true))
      .filter((q) => q.gt(q.field("flashSaleEndTime"), now))
      .collect();
  },
});

export const getFeatured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const products = await ctx.db.query("products").collect();
    const featured = products
      .filter(p => (p.rating || 0) >= 4.5)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return args.limit ? featured.slice(0, args.limit) : featured;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    price: v.number(),
    categoryId: v.id("categories"),
    images: v.array(v.string()),
    stock: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", {
      ...args,
      soldCount: 0,
      isActive: true,
      isFeatured: false,
    });
  },
});

export const remove = mutation({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.productId);
  },
});
