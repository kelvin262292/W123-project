import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Create payment transaction
export const createPaymentTransaction = mutation({
  args: {
    orderId: v.id("orders"),
    paymentMethod: v.union(v.literal("vnpay"), v.literal("momo"), v.literal("zalopay")),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const order = await ctx.db.get(args.orderId);
    if (!order || order.userId !== userId) {
      throw new Error("Order not found or unauthorized");
    }

    const transactionId = await ctx.db.insert("paymentTransactions", {
      orderId: args.orderId,
      userId,
      paymentMethod: args.paymentMethod,
      amount: args.amount,
      status: "pending",
      transactionCode: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });

    return transactionId;
  },
});

// Update payment status
export const updatePaymentStatus = mutation({
  args: {
    transactionCode: v.string(),
    status: v.union(v.literal("success"), v.literal("failed"), v.literal("cancelled")),
    paymentData: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const transaction = await ctx.db
      .query("paymentTransactions")
      .filter((q) => q.eq(q.field("transactionCode"), args.transactionCode))
      .unique();

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    await ctx.db.patch(transaction._id, {
      status: args.status,
      paymentData: args.paymentData,
      completedAt: Date.now(),
    });

    // Update order status if payment successful
    if (args.status === "success") {
      await ctx.db.patch(transaction.orderId, {
        status: "confirmed",
        paymentStatus: "paid",
      });
    }

    return transaction._id;
  },
});

// Get payment transactions for order
export const getPaymentTransactions = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("paymentTransactions")
      .filter((q) => q.eq(q.field("orderId"), args.orderId))
      .collect();
  },
});
