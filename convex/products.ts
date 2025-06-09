import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const list = query({
  args: {
    categoryId: v.optional(v.id("categories")),
    search: v.optional(v.string()),
    sortBy: v.optional(v.string()),
    paginationOpts: v.optional(paginationOptsValidator),
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
    let productsQuery;
    
    if (args.categoryId) {
      productsQuery = ctx.db
        .query("products")
        .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId!));
    } else if (args.isFeatured) {
      productsQuery = ctx.db
        .query("products")
        .withIndex("by_featured", (q) => q.eq("isFeatured", true));
    } else if (args.isActive !== undefined) {
      productsQuery = ctx.db
        .query("products")
        .withIndex("by_active", (q) => q.eq("isActive", args.isActive));
    } else if (args.isFlashSale) {
      productsQuery = ctx.db
        .query("products")
        .withIndex("by_flash_sale", (q) => q.eq("isFlashSale", true));
    } else {
      productsQuery = ctx.db.query("products");
    }
    
    // Sắp xếp theo tiêu chí
    if (args.sortBy) {
      switch (args.sortBy) {
        case "price_asc":
          productsQuery = productsQuery.order("asc");
          break;
        case "price_desc":
          productsQuery = productsQuery.order("desc");
          break;
        case "newest":
          productsQuery = productsQuery.order("desc");
          break;
        case "rating_desc":
          // Sắp xếp theo rating sẽ được xử lý sau khi lấy dữ liệu
          productsQuery = productsQuery.order("desc");
          break;
        case "popularity":
          // Sắp xếp theo soldCount sẽ được xử lý sau khi lấy dữ liệu
          productsQuery = productsQuery.order("desc");
          break;
        default:
          productsQuery = productsQuery.order("desc");
      }
    } else {
      // Mặc định sắp xếp theo thời gian tạo giảm dần (mới nhất lên đầu)
      productsQuery = productsQuery.order("desc");
    }
    
    // Lấy tất cả sản phẩm để áp dụng bộ lọc nâng cao
    const allProducts = await productsQuery.collect();
    
    // Áp dụng các bộ lọc nâng cao
    let filteredProducts = allProducts;
    
    // Lọc theo từ khóa tìm kiếm
    if (args.search) {
      const searchLower = args.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Lọc theo khoảng giá
    if (args.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= args.minPrice!);
    }
    
    if (args.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= args.maxPrice!);
    }
    
    // Lọc theo đánh giá tối thiểu
    if (args.minRating !== undefined) {
      filteredProducts = filteredProducts.filter(p => (p.rating || 0) >= args.minRating!);
    }
    
    // Lọc theo tags
    if (args.tags && args.tags.length > 0) {
      filteredProducts = filteredProducts.filter(p => {
        if (!p.tags) return false;
        return args.tags!.some(tag => p.tags!.includes(tag));
      });
    }
    
    // Sắp xếp lại nếu cần
    if (args.sortBy) {
      switch (args.sortBy) {
        case "rating_desc":
          filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "popularity":
          filteredProducts.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
          break;
      }
    }
    
    // Phân trang thủ công
    if (args.paginationOpts) {
      const { numItems, cursor } = args.paginationOpts;
      let startIndex = 0;
      
      if (cursor) {
        startIndex = parseInt(cursor);
      }
      
      const endIndex = startIndex + numItems;
      const page = filteredProducts.slice(startIndex, endIndex);
      const isDone = endIndex >= filteredProducts.length;
      const continueCursor = isDone ? null : endIndex.toString();
      
      return {
        page,
        isDone,
        continueCursor,
        totalCount: filteredProducts.length // Thêm tổng số sản phẩm
      };
    }
    
    // Nếu không có phân trang, giới hạn kết quả trả về
    const limit = 50;
    const limitedProducts = filteredProducts.slice(0, limit);
    
    return {
      page: limitedProducts,
      isDone: limitedProducts.length < limit || limitedProducts.length === filteredProducts.length,
      continueCursor: null,
      totalCount: filteredProducts.length // Thêm tổng số sản phẩm
    };
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
    const products = await ctx.db.query("products").collect();
    const allTags = new Set<string>();
    
    products.forEach(product => {
      if (product.tags && Array.isArray(product.tags)) {
        product.tags.forEach(tag => allTags.add(tag));
      }
    });
    
    return Array.from(allTags);
  },
});
