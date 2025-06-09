import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal, api } from "./_generated/api"; // Import api

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password, Anonymous],
});

export const loggedInUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    }
    return user;
  },
});

export const getAllUsers = query({
  handler: async (ctx) => {
    const isUserAdmin = await ctx.runQuery(api.roles.isAdmin);
    if (!isUserAdmin) {
      throw new Error("Unauthorized: Admin access required to fetch all users.");
    }
    return await ctx.db.query("users").collect();
  },
});

export const requestPasswordReset = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Tìm người dùng với email đã cung cấp
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .unique();
    
    if (!user) {
      // Không trả về lỗi để tránh tiết lộ thông tin về việc email có tồn tại hay không
      return { success: true };
    }
    
    // Tạo mã đặt lại mật khẩu
    const resetCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const expirationTime = Date.now() + 3600000; // Hết hạn sau 1 giờ
    
    // Lưu mã đặt lại mật khẩu vào cơ sở dữ liệu
    await ctx.db.insert("passwordResets", {
      userId: user._id,
      resetCode,
      expirationTime,
      isUsed: false,
    });
    
    // Gửi email đặt lại mật khẩu (trong môi trường thực tế)
    // Trong phiên bản demo này, chúng ta chỉ ghi log mã đặt lại
    console.log(`Mã đặt lại mật khẩu cho ${args.email}: ${resetCode}`);
    
    // Trong môi trường thực tế, bạn sẽ gọi một action để gửi email
    // await ctx.scheduler.runAfter(0, internal.emails.sendPasswordResetEmail, {
    //   email: args.email,
    //   resetCode,
    // });
    
    return { success: true };
  },
});

export const resetPassword = mutation({
  args: {
    resetCode: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    // Tìm yêu cầu đặt lại mật khẩu
    const resetRequest = await ctx.db
      .query("passwordResets")
      .withIndex("by_reset_code", (q) => q.eq("resetCode", args.resetCode))
      .filter((q) => q.eq(q.field("isUsed"), false))
      .unique();
    
    if (!resetRequest) {
      throw new Error("Mã đặt lại mật khẩu không hợp lệ hoặc đã hết hạn");
    }
    
    if (resetRequest.expirationTime < Date.now()) {
      throw new Error("Mã đặt lại mật khẩu đã hết hạn");
    }
    
    // Đánh dấu yêu cầu đặt lại mật khẩu đã được sử dụng
    await ctx.db.patch(resetRequest._id, { isUsed: true });
    
    // Lấy thông tin người dùng
    const user = await ctx.db.get(resetRequest.userId);
    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }
    
    // Trong môi trường thực tế, bạn cần sử dụng API của nhà cung cấp xác thực để đặt lại mật khẩu
    // Đây chỉ là một giải pháp tạm thời - Lưu ý rằng trong môi trường thực tế, không nên lưu mật khẩu dưới dạng văn bản thuần
    
    // Thay vì cập nhật mật khẩu trực tiếp, chúng ta có thể gửi thông báo cho người dùng
    console.log(`Mật khẩu đã được đặt lại cho người dùng: ${user._id}`);
    
    // Trong môi trường thực tế, bạn sẽ sử dụng một API riêng để cập nhật mật khẩu
    // await ctx.scheduler.runAfter(0, internal.auth.updateUserPassword, {
    //   userId: user._id,
    //   password: args.newPassword,
    // });
    
    return { success: true };
  },
});
