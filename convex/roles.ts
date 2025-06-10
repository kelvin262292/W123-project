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
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;
    
    // Dùng email thay vì authId để tìm người dùng
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .unique();
    
    if (!user) return false;
    
    // Kiểm tra trong bảng userRoles
    const userRole = await ctx.db
      .query("userRoles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("role"), "admin"))
      .first();
    
    return !!userRole;
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
    role: v.string(),
  },
  handler: async (ctx, args) => {
    const userRoles = await ctx.db
      .query("userRoles")
      .filter((q) => q.eq(q.field("role"), args.role))
      .collect();
    
    const userIds = userRoles.map(role => role.userId);
    
    const users = await Promise.all(
      userIds.map(userId => ctx.db.get(userId))
    );
    
    return users.filter(user => user !== null);
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

// Hàm đặc biệt để cấp quyền admin cho bản thân
export const giveAdminAccess = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return {
        success: false,
        message: "Bạn chưa đăng nhập",
      };
    }
    
    // Dùng email thay vì authId để tìm người dùng
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .unique();
    
    if (!user) {
      return {
        success: false,
        message: "Không tìm thấy thông tin người dùng",
      };
    }
    
    // Kiểm tra xem đã có quyền admin chưa
    const existingRole = await ctx.db
      .query("userRoles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("role"), "admin"))
      .first();
    
    if (existingRole) {
      return {
        success: true,
        message: "Bạn đã có quyền admin rồi",
        alreadyAdmin: true,
      };
    }
    
    // Cấp quyền admin
    const roleId = await ctx.db.insert("userRoles", {
      userId: user._id,
      role: "admin",
      createdAt: Date.now(),
    });
    
    return {
      success: true,
      message: "Đã cấp quyền admin thành công",
      roleId,
    };
  },
});

// Hàm đặc biệt để cấp quyền admin cho bất kỳ ai mà không cần xác thực
// Chỉ sử dụng trong môi trường phát triển!
export const forceGiveAdminAccess = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Tìm user theo email
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();
    
    if (!user) {
      return {
        success: false,
        message: `Không tìm thấy người dùng với email ${args.email}`,
      };
    }
    
    // Kiểm tra xem đã có quyền admin chưa
    const existingRole = await ctx.db
      .query("userRoles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("role"), "admin"))
      .first();
    
    if (existingRole) {
      return {
        success: true,
        message: `Người dùng ${args.email} đã có quyền admin rồi`,
        alreadyAdmin: true,
      };
    }
    
    // Cấp quyền admin
    const roleId = await ctx.db.insert("userRoles", {
      userId: user._id,
      role: "admin",
      createdAt: Date.now(),
    });
    
    return {
      success: true,
      message: `Đã cấp quyền admin cho ${args.email} thành công`,
      roleId,
    };
  },
}); 