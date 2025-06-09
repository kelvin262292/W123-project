import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Kiểm tra người dùng có phải là admin
async function isAdmin(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return false;
  
  const user = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("authId"), identity.subject))
    .unique();
  
  return user?.role === "admin";
}

// Tạo bản sao lưu dữ liệu
export const createBackup = mutation({
  args: {
    name: v.string(),
  },
  returns: v.object({
    backupId: v.id("backups"),
    message: v.string()
  }),
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx);
    if (!isUserAdmin) {
      throw new Error("Unauthorized: Only admins can create backups");
    }
    
    // Lấy dữ liệu từ các bảng
    const users = await ctx.db.query("users").collect();
    const products = await ctx.db.query("products").collect();
    const orders = await ctx.db.query("orders").collect();
    const reviews = await ctx.db.query("reviews").collect();
    const cart = await ctx.db.query("cart").collect();
    const userRoles = await ctx.db.query("userRoles").collect();
    
    // Tạo đối tượng backup
    const backupData = {
      users,
      products,
      orders,
      reviews,
      cart,
      userRoles,
      createdAt: Date.now(),
    };
    
    // Lưu vào bảng backups
    const backupId = await ctx.db.insert("backups", {
      name: args.name,
      data: backupData,
      createdAt: Date.now(),
    });
    
    return { backupId, message: "Backup created successfully" };
  },
});

// Lấy danh sách các bản sao lưu
export const getBackups = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("backups"),
    name: v.string(),
    createdAt: v.number(),
  })),
  handler: async (ctx) => {
    const isUserAdmin = await isAdmin(ctx);
    if (!isUserAdmin) {
      throw new Error("Unauthorized: Only admins can view backups");
    }
    
    const backups = await ctx.db.query("backups")
      .order("desc")
      .collect();
    
    return backups.map(backup => ({
      _id: backup._id,
      name: backup.name,
      createdAt: backup.createdAt,
    }));
  },
});

// Lấy chi tiết một bản sao lưu
export const getBackupDetail = query({
  args: {
    backupId: v.id("backups"),
  },
  returns: v.any(),
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx);
    if (!isUserAdmin) {
      throw new Error("Unauthorized: Only admins can view backup details");
    }
    
    const backup = await ctx.db.get(args.backupId);
    if (!backup) {
      throw new Error("Backup not found");
    }
    
    return backup;
  },
});

// Khôi phục dữ liệu từ bản sao lưu
export const restoreBackup = mutation({
  args: {
    backupId: v.id("backups"),
  },
  returns: v.object({
    success: v.boolean(),
    message: v.string()
  }),
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx);
    if (!isUserAdmin) {
      throw new Error("Unauthorized: Only admins can restore backups");
    }
    
    const backup = await ctx.db.get(args.backupId);
    if (!backup) {
      throw new Error("Backup not found");
    }
    
    // Lưu trạng thái hiện tại trước khi khôi phục
    const currentState = {
      users: await ctx.db.query("users").collect(),
      products: await ctx.db.query("products").collect(),
      orders: await ctx.db.query("orders").collect(),
      reviews: await ctx.db.query("reviews").collect(),
      cart: await ctx.db.query("cart").collect(),
      userRoles: await ctx.db.query("userRoles").collect(),
      createdAt: Date.now(),
    };
    
    // Lưu trạng thái hiện tại như một bản sao lưu tự động
    await ctx.db.insert("backups", {
      name: `Auto backup before restore ${backup.name}`,
      data: currentState,
      createdAt: Date.now(),
    });
    
    // Thực hiện khôi phục dữ liệu
    try {
      // Xóa dữ liệu hiện tại
      await deleteAllData(ctx);
      
      // Khôi phục dữ liệu từ bản sao lưu
      for (const user of backup.data.users) {
        await ctx.db.insert("users", {
          ...user,
          _id: undefined,
          _creationTime: undefined,
        });
      }
      
      for (const product of backup.data.products) {
        await ctx.db.insert("products", {
          ...product,
          _id: undefined,
          _creationTime: undefined,
        });
      }
      
      for (const order of backup.data.orders) {
        await ctx.db.insert("orders", {
          ...order,
          _id: undefined,
          _creationTime: undefined,
        });
      }
      
      for (const review of backup.data.reviews) {
        await ctx.db.insert("reviews", {
          ...review,
          _id: undefined,
          _creationTime: undefined,
        });
      }
      
      for (const item of backup.data.cart || []) {
        await ctx.db.insert("cart", {
          ...item,
          _id: undefined,
          _creationTime: undefined,
        });
      }
      
      for (const role of backup.data.userRoles || []) {
        await ctx.db.insert("userRoles", {
          ...role,
          _id: undefined,
          _creationTime: undefined,
        });
      }
      
      return { success: true, message: "Backup restored successfully" };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return { success: false, message: `Failed to restore backup: ${errorMessage}` };
    }
  },
});

// Xóa một bản sao lưu
export const deleteBackup = mutation({
  args: {
    backupId: v.id("backups"),
  },
  returns: v.object({
    success: v.boolean(),
    message: v.string()
  }),
  handler: async (ctx, args) => {
    const isUserAdmin = await isAdmin(ctx);
    if (!isUserAdmin) {
      throw new Error("Unauthorized: Only admins can delete backups");
    }
    
    const backup = await ctx.db.get(args.backupId);
    if (!backup) {
      throw new Error("Backup not found");
    }
    
    await ctx.db.delete(args.backupId);
    
    return { success: true, message: "Backup deleted successfully" };
  },
});

// Hàm nội bộ để xóa tất cả dữ liệu
async function deleteAllData(ctx: any) {
  // Xóa tất cả dữ liệu hiện tại
  const cart = await ctx.db.query("cart").collect();
  for (const item of cart) {
    await ctx.db.delete(item._id);
  }
  
  const orders = await ctx.db.query("orders").collect();
  for (const order of orders) {
    await ctx.db.delete(order._id);
  }
  
  const reviews = await ctx.db.query("reviews").collect();
  for (const review of reviews) {
    await ctx.db.delete(review._id);
  }
  
  const products = await ctx.db.query("products").collect();
  for (const product of products) {
    await ctx.db.delete(product._id);
  }
  
  const userRoles = await ctx.db.query("userRoles").collect();
  for (const role of userRoles) {
    await ctx.db.delete(role._id);
  }
  
  // Không xóa người dùng để tránh mất thông tin đăng nhập
  // Chỉ giữ lại user_id nhưng cập nhật thông tin
  const users = await ctx.db.query("users").collect();
  for (const user of users) {
    await ctx.db.patch(user._id, {
      // Giữ lại thông tin đăng nhập, xóa các thông tin khác
      name: user.name,
      email: user.email,
      authId: user.authId,
      // Đặt lại các thông tin khác
      role: "user",
    });
  }
} 