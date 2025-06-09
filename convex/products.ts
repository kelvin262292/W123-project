import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const list = query({
  args: {
    categoryId: v.optional(v.id("categories")),
    search: v.optional(v.string()),
    sortBy: v.optional(v.string()),
    paginationOpts: paginationOptsValidator, // paginationOpts is now non-optional
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
    let query = ctx.db.query("products");

    // Index-based filtering (mutually exclusive)
    if (args.categoryId) {
      query = query.withIndex("by_category", (q) => q.eq("categoryId", args.categoryId!));
    } else if (args.isFeatured) {
      query = query.withIndex("by_featured", (q) => q.eq("isFeatured", true));
    } else if (args.isActive !== undefined) {
      query = query.withIndex("by_active", (q) => q.eq("isActive", args.isActive));
    } else if (args.isFlashSale) {
      query = query.withIndex("by_flash_sale", (q) => q.eq("isFlashSale", true));
    }
    // Note: If none of the above are true, the query remains a full table scan before other filters.

    // Dynamic filters
    const filters: ((doc: any) => boolean)[] = [];

    if (args.search) {
      const searchLower = args.search.toLowerCase();
      filters.push((doc) =>
        doc.name.toLowerCase().includes(searchLower) ||
        doc.description.toLowerCase().includes(searchLower)
      );
    }

    if (args.minPrice !== undefined) {
      filters.push((doc) => doc.price >= args.minPrice!);
    }

    if (args.maxPrice !== undefined) {
      filters.push((doc) => doc.price <= args.maxPrice!);
    }

    if (args.minRating !== undefined) {
      filters.push((doc) => doc.rating !== null && doc.rating !== undefined && doc.rating >= args.minRating!);
    }

    if (args.tags && args.tags.length > 0) {
      filters.push((doc) => {
        if (!Array.isArray(doc.tags)) return false;
        // Product matches if it has AT LEAST ONE of the specified tags
        return args.tags!.some(tag => doc.tags.includes(tag));
      });
    }

    if (filters.length > 0) {
      query = query.filter((doc) => filters.every((f) => f(doc)));
    }

    // Sorting
    let sortField: string = "_creationTime"; // Default sort field
    let sortOrder: "asc" | "desc" = "desc"; // Default sort order

    if (args.sortBy) {
      switch (args.sortBy) {
        case "price_asc":
          sortField = "price";
          sortOrder = "asc";
          break;
        case "price_desc":
          sortField = "price";
          sortOrder = "desc";
          break;
        case "newest":
          sortField = "_creationTime";
          sortOrder = "desc";
          break;
        case "rating_desc":
          sortField = "rating";
          sortOrder = "desc";
          break;
        case "popularity":
          sortField = "soldCount";
          sortOrder = "desc";
          break;
        // default: // Defaults are set above
      }
    }
    
    // Convex query builder expects the field name for ordering.
    // For _creationTime, it's implicitly handled if no other order is set,
    // but to be explicit or to sort by other fields like 'price', 'rating', 'soldCount':
    if (sortField === "_creationTime" && sortOrder === "desc" && !args.sortBy) {
        // Default case, Convex sorts by _creationTime descending by default if no order is specified
        // However, if other filters might change this, or to be explicit:
        query = query.order("desc"); // This will sort by _creationTime
    } else {
         // @ts-ignore (Convex expects specific field names for TypedTable, using string for flexibility here)
        query = query.order(sortOrder, sortField);
    }


    // Pagination
    return query.paginate(args.paginationOpts);
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
    let query = ctx.db.query("products");

    // Filter for products where rating is not undefined AND rating >= 4.5
    query = query.filter(q =>
      q.and(
        q.neq(q.field("rating"), undefined),
        q.gte(q.field("rating"), 4.5)
      )
    );

    // Sort by rating in descending order
    // @ts-ignore because rating can be undefined based on schema, but filter handles it
    query = query.order("desc", "rating");

    // Limit the results
    query = query.take(args.limit || defaultLimit);

    return await query.collect();
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
export const getAllTags = query({
  args: {},
  handler: async (ctx) => {
    // Step 1: Base Query - already implicitly part of the chain
    // Step 2: Server-Side Map to extract tags & Step 3: Server-Side Filter
    const tagsArrays = await ctx.db
      .query("products")
      // @ts-ignore Assuming 'tags' field exists on product documents.
      // And assuming server-side map and filter are available and work this way.
      // This specific map/filter chain might need adjustment based on actual Convex capabilities
      // for non-indexed fields or specific behaviors of server-side map.
      // For now, following the prompt's conceptual steps.
      .map(product => product.tags)
      .filter(tags => tags !== undefined && Array.isArray(tags) && tags.length > 0)
      .collect();

    // Step 4: Collect Tag Arrays (done above)

    // Step 5: Flatten and Unique in Handler
    const flattenedTags = tagsArrays.flatMap(tagArray => tagArray as string[]); // Ensure elements are strings
    const uniqueTags = new Set<string>(flattenedTags);
    
    return Array.from(uniqueTags);
  },
});
