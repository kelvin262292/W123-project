// Defines common TypeScript interfaces used across the frontend.

// Assuming Id is typically sourced from the Convex generated dataModel.
// Adjust the import path according to your project structure.
// For example, if types.ts is in src/ and convex/ is a sibling to src/,
// then the path might be "../convex/_generated/dataModel".
// If your convex directory is directly under src (e.g., src/convex/),
// then it might be "./convex/_generated/dataModel" or "../convex/_generated/dataModel"
// depending on where this types.ts file is located relative to the convex folder.
// For now, using a common relative path.
import { Id } from "../convex/_generated/dataModel";

export interface ProductVariant {
  type: string; // e.g., "Color", "Size"
  value: string; // e.g., "Red", "XL"
  name?: string; // Optional: e.g., "Red Color", "Extra Large" - used for display clarity
  // Add other variant-specific fields if they exist, for example:
  // priceModifier?: number; // If a variant changes the product price
  // stock?: number; // If stock is tracked per variant
}

export interface ProductSpecification {
  name: string; // e.g., "Material", "Weight"
  value: string; // e.g., "Cotton", "200g"
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  // unit?: string; // Optional: e.g., "cm", "inch" - if not implicitly defined
}

export interface Product {
  _id: Id<"products">;
  _creationTime: number;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  categoryId: Id<"categories">;
  images: string[]; // Array of image URLs or storage IDs
  variants?: ProductVariant[];
  specifications?: ProductSpecification[];
  stock: number;
  soldCount?: number;
  rating?: number;
  reviewCount?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  flashSaleEndTime?: number;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  weight?: number; // e.g., in grams or a standard unit
  dimensions?: ProductDimensions;
  createdBy?: Id<"users">; // Assuming a user ID from a "users" table
  updatedAt?: number; // Timestamp of the last update
}

// You can also define other shared types here, for example:
export interface Category {
  _id: Id<"categories">;
  _creationTime: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: Id<"categories">;
  isActive?: boolean;
  isFeatured?: boolean;
}

// Example for CartItem if needed elsewhere
export interface CartItem {
  _id: Id<"cart">; // Or could be a composite ID or just use product ID if cart is client-side
  userId: Id<"users">;
  productId: Id<"products">;
  productName?: string; // Denormalized for display
  productImage?: string; // Denormalized for display
  quantity: number;
  variants?: ProductVariant[]; // Selected variants for this cart item
  price: number; // Price at the time of adding to cart, might include variant adjustments
  addedAt: number;
}
