import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Log email sent
export const logEmailSent = mutation({
  args: {
    orderId: v.id("orders"),
    email: v.string(),
    type: v.string(),
    emailId: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("emailLogs", {
      orderId: args.orderId,
      email: args.email,
      type: args.type,
      emailId: args.emailId,
      metadata: args.metadata,
      sentAt: Date.now(),
    });
  },
});

// Get email logs for order
export const getEmailLogs = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("emailLogs")
      .filter((q) => q.eq(q.field("orderId"), args.orderId))
      .order("desc")
      .collect();
  },
});

// Create notification
export const createNotification = mutation({
  args: {
    userId: v.id("users"),
    type: v.string(),
    title: v.string(),
    message: v.string(),
    data: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notifications", {
      userId: args.userId,
      type: args.type,
      title: args.title,
      message: args.message,
      data: args.data,
      isRead: false,
    });
  },
});

// Get user notifications
export const getUserNotifications = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("notifications")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .take(args.limit || 20);
  },
});

// Mark notification as read
export const markNotificationAsRead = mutation({
  args: { notificationId: v.id("notifications") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const notification = await ctx.db.get(args.notificationId);
    if (!notification || notification.userId !== userId) {
      throw new Error("Notification not found");
    }

    await ctx.db.patch(args.notificationId, { isRead: true });
    return { success: true };
  },
});

// Mark all notifications as read
export const markAllNotificationsAsRead = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const notifications = await ctx.db
      .query("notifications")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("isRead"), false))
      .collect();

    for (const notification of notifications) {
      await ctx.db.patch(notification._id, { isRead: true });
    }

    return { success: true, count: notifications.length };
  },
});
