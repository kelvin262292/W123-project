import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const list = query({
  args: {
    categoryId: v.optional(v.id("categories")),
    search: v.optional(v.string()),
    sortBy: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
    // Các bộ lọc nâng cao
    minPrice: v.optional(v.number()),
    maxPrice: v.optional(v.number()),
    minRating: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    isFlashSale: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    let productsQuery = ctx.db.query("products");

    // Index-based filtering
    if (args.categoryId) {
      productsQuery = productsQuery.withIndex("by_category", (q) => q.eq("categoryId", args.categoryId));
    } else if (args.isFeatured) {
      productsQuery = productsQuery.withIndex("by_featured", (q) => q.eq("isFeatured", true));
    } else if (args.isActive !== undefined) {
      productsQuery = productsQuery.withIndex("by_active", (q) => q.eq("isActive", args.isActive));
    } else if (args.isFlashSale) {
      productsQuery = productsQuery.withIndex("by_flash_sale", (q) => q.eq("isFlashSale", true));
    }

    // Áp dụng bộ lọc nâng cao khi cần thiết
    if (args.search) {
      const searchLower = args.search.toLowerCase();
      productsQuery = productsQuery.filter((q) => {
        const name = q.field("name");
        const description = q.field("description");
        return q.or(
          q.where((m) => m.contains(m.lower(name), searchLower)),
          q.where((m) => m.contains(m.lower(description), searchLower))
        );
      });
    }

    if (args.minPrice !== undefined) {
      productsQuery = productsQuery.filter((q) => q.gte(q.field("price"), args.minPrice!));
    }

    if (args.maxPrice !== undefined) {
      productsQuery = productsQuery.filter((q) => q.lte(q.field("price"), args.maxPrice!));
    }

    if (args.minRating !== undefined) {
      productsQuery = productsQuery.filter((q) => {
        const rating = q.field("rating");
        return q.and(
          q.exists(rating),
          q.gte(rating, args.minRating!)
        );
      });
    }

    if (args.tags && args.tags.length > 0) {
      productsQuery = productsQuery.filter((q) => {
        const tags = q.field("tags");
        return q.and(
          q.exists(tags),
          q.where((m) => {
            const tagsArray = m.value(tags);
            const searchTags = m.value(args.tags!);
            // Kiểm tra nếu ít nhất một phần tử trong searchTags có trong tagsArray
            return m.some(searchTags, tag => m.includes(tagsArray, tag));
          })
        );
      });
    }

    // Sorting
    productsQuery = productsQuery.order("desc");

    // Pagination
    return productsQuery.paginate(args.paginationOpts);
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
    const defaultLimit = 8;
    return await ctx.db
      .query("products")
      .filter((q) => {
        const rating = q.field("rating");
        return q.and(
          q.exists(rating),
          q.gte(rating, 4.5)
        );
      })
      .order("desc")
      .take(args.limit || defaultLimit);
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

export const update = mutation({
  args: {
    productId: v.id("products"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    price: v.optional(v.number()),
    originalPrice: v.optional(v.number()),
    categoryId: v.optional(v.id("categories")),
    images: v.optional(v.array(v.string())),
    stock: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    isFlashSale: v.optional(v.boolean()),
    flashSaleEndTime: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { productId, ...updateData } = args;
    return await ctx.db.patch(productId, updateData);
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

// Lấy danh sách tất cả các tags hiện có
export const getTags = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    
    // Extract tags from all products
    const tagsArrays = products
      .map(product => product.tags)
      .filter((tags: any) => tags !== undefined && Array.isArray(tags) && tags.length > 0);
    
    // Flatten the arrays and remove duplicates
    const flattenedTags = tagsArrays.flatMap((tagArray: any) => tagArray as string[]); // Ensure elements are strings
    const uniqueTags = [...new Set(flattenedTags)];
    
    return uniqueTags.sort();
  },
});
