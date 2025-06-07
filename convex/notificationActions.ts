"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";
import { api } from "./_generated/api";

// Sử dụng API key mặc định nếu không có trong biến môi trường
const resend = new Resend(process.env.CONVEX_RESEND_API_KEY || "re_dummy_key_for_development");

// Email templates
const EMAIL_TEMPLATES = {
  orderConfirmation: (order: any, user: any) => ({
    subject: `Xác nhận đơn hàng #${order._id.slice(-8).toUpperCase()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Cảm ơn bạn đã đặt hàng!</h2>
        <p>Xin chào ${user.name || 'Khách hàng'},</p>
        <p>Chúng tôi đã nhận được đơn hàng của bạn và đang xử lý.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Thông tin đơn hàng</h3>
          <p><strong>Mã đơn hàng:</strong> #${order._id.slice(-8).toUpperCase()}</p>
          <p><strong>Ngày đặt:</strong> ${new Date(order._creationTime).toLocaleDateString('vi-VN')}</p>
          <p><strong>Tổng tiền:</strong> ${order.totalAmount.toLocaleString('vi-VN')}đ</p>
          <p><strong>Phương thức thanh toán:</strong> ${order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}</p>
        </div>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Địa chỉ giao hàng</h3>
          <p>${order.shippingAddress.name}</p>
          <p>${order.shippingAddress.phone}</p>
          <p>${order.shippingAddress.address}, ${order.shippingAddress.ward}, ${order.shippingAddress.district}, ${order.shippingAddress.city}</p>
        </div>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Sản phẩm đã đặt</h3>
          ${order.items.map((item: any) => `
            <div style="border-bottom: 1px solid #e5e7eb; padding: 10px 0;">
              <p><strong>Sản phẩm:</strong> ${item.productName || `#${item.productId.slice(-8)}`}</p>
              <p><strong>Số lượng:</strong> ${item.quantity}</p>
              <p><strong>Giá:</strong> ${item.price.toLocaleString('vi-VN')}đ</p>
              <p><strong>Thành tiền:</strong> ${(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
            </div>
          `).join('')}
        </div>

        <p>Chúng tôi sẽ thông báo cho bạn khi đơn hàng được xác nhận và giao hàng.</p>
        <p>Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng!</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc hotline.
          </p>
        </div>
      </div>
    `,
  }),

  orderStatusUpdate: (order: any, user: any, newStatus: string) => {
    const statusText = {
      confirmed: 'đã được xác nhận',
      shipped: 'đang được giao',
      delivered: 'đã được giao thành công',
      cancelled: 'đã bị hủy',
    }[newStatus] || newStatus;

    return {
      subject: `Cập nhật đơn hàng #${order._id.slice(-8).toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Cập nhật trạng thái đơn hàng</h2>
          <p>Xin chào ${user.name || 'Khách hàng'},</p>
          <p>Đơn hàng #${order._id.slice(-8).toUpperCase()} của bạn ${statusText}.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Thông tin đơn hàng</h3>
            <p><strong>Mã đơn hàng:</strong> #${order._id.slice(-8).toUpperCase()}</p>
            <p><strong>Trạng thái:</strong> ${statusText}</p>
            <p><strong>Tổng tiền:</strong> ${order.totalAmount.toLocaleString('vi-VN')}đ</p>
          </div>

          ${newStatus === 'shipped' ? `
            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1d4ed8;">Đơn hàng đang được giao</h3>
              <p>Đơn hàng của bạn đang trên đường giao đến địa chỉ:</p>
              <p>${order.shippingAddress.address}, ${order.shippingAddress.ward}, ${order.shippingAddress.district}, ${order.shippingAddress.city}</p>
              <p>Vui lòng chuẩn bị sẵn sàng để nhận hàng.</p>
            </div>
          ` : ''}

          ${newStatus === 'delivered' ? `
            <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #16a34a;">Giao hàng thành công!</h3>
              <p>Cảm ơn bạn đã mua sắm tại cửa hàng. Hy vọng bạn hài lòng với sản phẩm!</p>
              <p>Đừng quên để lại đánh giá cho sản phẩm nhé!</p>
            </div>
          ` : ''}

          <p>Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng!</p>
        </div>
      `,
    };
  },
};

// Send order confirmation email
export const sendOrderConfirmationEmail = action({
  args: {
    orderId: v.id("orders"),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Get order details
      const order = await ctx.runQuery(api.orders.getById, { orderId: args.orderId });
      if (!order) {
        throw new Error("Order not found");
      }

      // Get user details
      const user = await ctx.runQuery(api.auth.loggedInUser);
      
      const template = EMAIL_TEMPLATES.orderConfirmation(order, user || { name: "Khách hàng" });

      const { data, error } = await resend.emails.send({
        from: "ShopVN <orders@shopvn.com>",
        to: args.userEmail,
        subject: template.subject,
        html: template.html,
      });

      if (error) {
        throw new Error(`Failed to send email: ${JSON.stringify(error)}`);
      }

      // Log email sent
      await ctx.runMutation(api.notifications.logEmailSent, {
        orderId: args.orderId,
        email: args.userEmail,
        type: "order_confirmation",
        emailId: data?.id,
      });

      return { success: true, emailId: data?.id };
    } catch (error) {
      console.error("Email sending failed:", error);
      throw new Error(`Email sending failed: ${error}`);
    }
  },
});

// Send order status update email
export const sendOrderStatusUpdateEmail = action({
  args: {
    orderId: v.id("orders"),
    userEmail: v.string(),
    newStatus: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Get order details
      const order = await ctx.runQuery(api.orders.getById, { orderId: args.orderId });
      if (!order) {
        throw new Error("Order not found");
      }

      // Get user details
      const user = await ctx.runQuery(api.auth.loggedInUser);
      
      const template = EMAIL_TEMPLATES.orderStatusUpdate(order, user || { name: "Khách hàng" }, args.newStatus);

      const { data, error } = await resend.emails.send({
        from: "ShopVN <orders@shopvn.com>",
        to: args.userEmail,
        subject: template.subject,
        html: template.html,
      });

      if (error) {
        throw new Error(`Failed to send email: ${JSON.stringify(error)}`);
      }

      // Log email sent
      await ctx.runMutation(api.notifications.logEmailSent, {
        orderId: args.orderId,
        email: args.userEmail,
        type: "status_update",
        emailId: data?.id,
        metadata: { newStatus: args.newStatus },
      });

      return { success: true, emailId: data?.id };
    } catch (error) {
      console.error("Email sending failed:", error);
      throw new Error(`Email sending failed: ${error}`);
    }
  },
});
