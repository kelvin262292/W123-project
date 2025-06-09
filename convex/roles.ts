import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

// Các vai trò có sẵn trong hệ thống
export const ROLES = {
  ADMIN: "admin" as const,
  USER: "user" as const,
  MODERATOR: "moderator" as const,
  SUPPORT: "support" as const
};

// Kiểu cho vai trò
type Role = "admin" | "user" | "moderator" | "support";

// Cache cho vai trò người dùng để tăng hiệu suất
const userRolesCache = new Map<string, { roles: Role[], timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

/**
 * Kiểm tra xem người dùng có vai trò cụ thể hay không
 */
export const hasRole = query({
  args: {
    role: v.union(
      v.literal("admin"),
      v.literal("user"),
      v.literal("moderator"),
      v.literal("support")
    ),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const userId = args.userId || await getAuthUserId(ctx);
    if (!userId) return false;

    // Kiểm tra cache
    const cacheKey = `${userId.toString()}-${args.role}`;
    const cachedValue = userRolesCache.get(cacheKey);
    if (cachedValue && (Date.now() - cachedValue.timestamp) < CACHE_DURATION) {
      return cachedValue.roles.includes(args.role);
    }

    // Nếu không có trong cache, truy vấn cơ sở dữ liệu
    const userRole = await ctx.db
      .query("userRoles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("role"), args.role))
      .first();

    const hasRole = !!userRole;

    // Lưu vào cache
    const userRoles = await getUserRoles(ctx, userId);
    userRolesCache.set(cacheKey, { roles: userRoles, timestamp: Date.now() });

    return hasRole;
  },
});

/**
 * Kiểm tra xem người dùng có phải là admin hay không
 */
export const isAdmin = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;

    // Kiểm tra cache
    const cacheKey = `${userId.toString()}-${ROLES.ADMIN}`;
    const cachedValue = userRolesCache.get(cacheKey);
    if (cachedValue && (Date.now() - cachedValue.timestamp) < CACHE_DURATION) {
      return cachedValue.roles.includes(ROLES.ADMIN as Role);
    }

    // Nếu không có trong cache, truy vấn cơ sở dữ liệu
    const userRole = await ctx.db
      .query("userRoles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("role"), ROLES.ADMIN))
      .first();

    const isAdmin = !!userRole;

    // Lưu vào cache
    const userRoles = await getUserRoles(ctx, userId);
    userRolesCache.set(cacheKey, { roles: userRoles, timestamp: Date.now() });

    return isAdmin;
  },
});

/**
 * Gán vai trò cho người dùng
 */
export const assignRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(
      v.literal("admin"),
      v.literal("user"),
      v.literal("moderator"),
      v.literal("support")
    ),
  },
  handler: async (ctx, args) => {
    // Kiểm tra quyền admin
    const currentUserId = await getAuthUserId(ctx);
    if (!currentUserId) {
      throw new Error("Bạn cần đăng nhập để thực hiện hành động này");
    }

    const isCurrentUserAdmin = await ctx.db
      .query("userRoles")
      .withIndex("by_user", (q) => q.eq("userId", currentUserId))
      .filter((q) => q.eq(q.field("role"), ROLES.ADMIN))
      .first();

    if (!isCurrentUserAdmin) {
      throw new Error("Bạn không có quyền gán vai trò");
    }

    // Kiểm tra xem vai trò đã tồn tại chưa
    const existingRole = await ctx.db
      .query("userRoles")
      .withIndex("by_user_role", (q) => q.eq("userId", args.userId).eq("role", args.role))
      .first();

    if (existingRole) {
      return { success: true, message: "Vai trò đã được gán trước đó" };
    }

    // Gán vai trò mới
    await ctx.db.insert("userRoles", {
      userId: args.userId,
      role: args.role,
      assignedBy: currentUserId,
      assignedAt: Date.now(),
      createdAt: Date.now(),
    });

    // Xóa cache
    clearUserRoleCache(args.userId.toString());

    return { success: true, message: "Vai trò đã được gán thành công" };
  },
});

/**
 * Xóa vai trò của người dùng
 */
export const removeRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(
      v.literal("admin"),
      v.literal("user"),
      v.literal("moderator"),
      v.literal("support")
    ),
  },
  handler: async (ctx, args) => {
    // Kiểm tra quyền admin
    const currentUserId = await getAuthUserId(ctx);
    if (!currentUserId) {
      throw new Error("Bạn cần đăng nhập để thực hiện hành động này");
    }

    const isCurrentUserAdmin = await ctx.db
      .query("userRoles")
      .withIndex("by_user", (q) => q.eq("userId", currentUserId))
      .filter((q) => q.eq(q.field("role"), ROLES.ADMIN))
      .first();

    if (!isCurrentUserAdmin) {
      throw new Error("Bạn không có quyền xóa vai trò");
    }

    // Tìm vai trò cần xóa
    const roleToRemove = await ctx.db
      .query("userRoles")
      .withIndex("by_user_role", (q) => q.eq("userId", args.userId).eq("role", args.role))
      .first();

    if (!roleToRemove) {
      return { success: false, message: "Vai trò không tồn tại" };
    }

    // Xóa vai trò
    await ctx.db.delete(roleToRemove._id);

    // Xóa cache
    clearUserRoleCache(args.userId.toString());

    return { success: true, message: "Vai trò đã được xóa thành công" };
  },
});

/**
 * Lấy danh sách vai trò của người dùng
 */
export const getUserRoles = async (ctx: any, userId: Id<"users">): Promise<Role[]> => {
  const roles = await ctx.db
    .query("userRoles")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .collect();

  return roles.map((r: any) => r.role as Role);
};

/**
 * Lấy danh sách người dùng có vai trò cụ thể
 */
export const listUsersWithRole = query({
  args: {
    role: v.optional(v.union(
      v.literal("admin"),
      v.literal("user"),
      v.literal("moderator"),
      v.literal("support")
    )),
  },
  handler: async (ctx, args) => {
    // Kiểm tra quyền admin
    const currentUserId = await getAuthUserId(ctx);
    if (!currentUserId) {
      throw new Error("Bạn cần đăng nhập để xem thông tin này");
    }

    const isCurrentUserAdmin = await ctx.db
      .query("userRoles")
      .withIndex("by_user", (q) => q.eq("userId", currentUserId))
      .filter((q) => q.eq(q.field("role"), ROLES.ADMIN))
      .first();

    if (!isCurrentUserAdmin) {
      throw new Error("Bạn không có quyền xem thông tin này");
    }

    // Truy vấn vai trò
    let roleRecords;
    if (args.role) {
      roleRecords = await ctx.db
        .query("userRoles")
        .withIndex("by_role", (q) => q.eq("role", args.role as Role))
        .collect();
    } else {
      roleRecords = await ctx.db
        .query("userRoles")
        .collect();
    }

    // Lấy thông tin người dùng
    const userIds = [...new Set(roleRecords.map((r) => r.userId))];
    const users = await Promise.all(
      userIds.map(async (id) => {
        const user = await ctx.db.get(id);
        const userRoles = roleRecords
          .filter((r) => r.userId.toString() === id.toString())
          .map((r) => r.role as Role);
        
        return {
          ...user,
          roles: userRoles,
        };
      })
    );

    return users;
  },
});

/**
 * Xóa cache vai trò của người dùng
 */
function clearUserRoleCache(userId: string) {
  // Xóa tất cả các cache liên quan đến userId
  for (const key of userRolesCache.keys()) {
    if (key.startsWith(userId)) {
      userRolesCache.delete(key);
    }
  }
} 