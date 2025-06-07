import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Generate upload URL for product images
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    return await ctx.storage.generateUploadUrl();
  },
});

// Save uploaded image metadata
export const saveProductImage = mutation({
  args: {
    storageId: v.id("_storage"),
    productId: v.optional(v.id("products")),
    alt: v.optional(v.string()),
    isPrimary: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Get file metadata from storage
    const fileMetadata = await ctx.db.system.get(args.storageId);
    if (!fileMetadata) {
      throw new Error("File not found");
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(fileMetadata.contentType || '')) {
      throw new Error("Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.");
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (fileMetadata.size > maxSize) {
      throw new Error("File too large. Maximum size is 5MB.");
    }

    const imageId = await ctx.db.insert("productImages", {
      storageId: args.storageId,
      productId: args.productId,
      alt: args.alt || "Product image",
      isPrimary: args.isPrimary || false,
      uploadedBy: userId,
      contentType: fileMetadata.contentType,
      size: fileMetadata.size,
    });

    return imageId;
  },
});

// Get product images
export const getProductImages = query({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    const images = await ctx.db
      .query("productImages")
      .filter((q) => q.eq(q.field("productId"), args.productId))
      .collect();

    return await Promise.all(
      images.map(async (image) => ({
        ...image,
        url: await ctx.storage.getUrl(image.storageId),
      }))
    );
  },
});

// Delete product image
export const deleteProductImage = mutation({
  args: { imageId: v.id("productImages") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const image = await ctx.db.get(args.imageId);
    if (!image) {
      throw new Error("Image not found");
    }

    // Delete from storage
    await ctx.storage.delete(image.storageId);
    
    // Delete from database
    await ctx.db.delete(args.imageId);

    return { success: true };
  },
});

// Update image metadata
export const updateProductImage = mutation({
  args: {
    imageId: v.id("productImages"),
    alt: v.optional(v.string()),
    isPrimary: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { imageId, ...updates } = args;
    
    // If setting as primary, unset other primary images for the same product
    if (updates.isPrimary) {
      const image = await ctx.db.get(imageId);
      if (image?.productId) {
        const otherImages = await ctx.db
          .query("productImages")
          .filter((q) => q.eq(q.field("productId"), image.productId))
          .collect();

        for (const otherImage of otherImages) {
          if (otherImage._id !== imageId && otherImage.isPrimary) {
            await ctx.db.patch(otherImage._id, { isPrimary: false });
          }
        }
      }
    }

    await ctx.db.patch(imageId, updates);
    return { success: true };
  },
});

// Get image by storage ID
export const getImageUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
