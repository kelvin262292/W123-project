import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    parentId: v.optional(v.id("categories")),
    isActive: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin authentication check
    return await ctx.db.insert("categories", {
      name: args.name,
      slug: args.slug,
      description: args.description,
      icon: args.icon,
      parentId: args.parentId,
      isActive: args.isActive !== false,
      isFeatured: args.isFeatured || false,
    });
  },
});

export const update = mutation({
  args: {
    categoryId: v.id("categories"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    parentId: v.optional(v.id("categories")),
    isActive: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin authentication check
    const { categoryId, ...updates } = args;
    return await ctx.db.patch(categoryId, updates);
  },
});

export const remove = mutation({
  args: {
    categoryId: v.id("categories"),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin authentication check
    return await ctx.db.delete(args.categoryId);
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("isFeatured"), true))
      .collect();
  },
});
