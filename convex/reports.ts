"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import ExcelJS from "exceljs";
import { api, internal } from "./_generated/api";

// Định nghĩa kiểu dữ liệu để thay thế
type StorageId = string;
type Order = {
  _id: string;
  userId: string;
  totalAmount: number;
  createdAt: number;
  paymentMethod: string;
  status: string;
  shippingAddress?: {
    name: string;
    phone: string;
    address: string;
    ward: string;
    district: string;
    city: string;
  };
  items: Array<{
    productId: string;
    productName?: string;
    quantity: number;
    price: number;
    variants?: Array<{
      type: string;
      value: string;
    }>;
  }>;
};

type User = {
  _id: string;
  name?: string;
  phone?: string;
};

// Helper để kiểm tra quyền admin
async function checkAdminAccess(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new Error("Không được phép truy cập");
  }
  
  const userRole = await ctx.db
    .query("userRoles")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .filter((q: any) => q.eq(q.field("role"), "admin"))
    .first();
  
  if (!userRole) {
    throw new Error("Yêu cầu quyền admin");
  }
  
  return userId;
}

// Báo cáo doanh thu
export const generateRevenueReport = action({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  returns: v.object({
    storageId: v.id("_storage"),
    summary: v.object({
      startDate: v.any(),
      endDate: v.any(),
      totalOrders: v.number(),
      totalRevenue: v.number(),
      paymentMethods: v.object({
        cod: v.number(),
        vnpay: v.number(),
        momo: v.number(),
        zalopay: v.number(),
      }),
    }),
  }),
  handler: async (ctx, args) => {
    await checkAdminAccess(ctx);
    
    // Lấy tất cả đơn hàng trong khoảng thời gian
    const orders = await ctx.runQuery(api.orders.listByDateRange, {
      startDate: args.startDate,
      endDate: args.endDate,
    });
    
    // Tạo workbook Excel
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "ShopVN Admin";
    workbook.created = new Date();
    
    // Tạo worksheet doanh thu
    const revenueSheet = workbook.addWorksheet("Doanh Thu");
    
    // Thiết lập tiêu đề và định dạng
    revenueSheet.columns = [
      { header: "Ngày", key: "date", width: 15 },
      { header: "Đơn Hàng", key: "orders", width: 12 },
      { header: "Doanh Thu", key: "revenue", width: 15 },
      { header: "COD", key: "cod", width: 15 },
      { header: "VNPay", key: "vnpay", width: 15 },
      { header: "MoMo", key: "momo", width: 15 },
      { header: "ZaloPay", key: "zalopay", width: 15 },
    ];
    
    // Style cho header
    revenueSheet.getRow(1).font = { bold: true };
    revenueSheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD3D3D3" },
    };
    
    // Nhóm đơn hàng theo ngày
    const dailyData: Record<string, {
      date: Date;
      orders: number;
      revenue: number;
      cod: number;
      vnpay: number;
      momo: number;
      zalopay: number;
    }> = {};
    
    // Tổng doanh thu
    let totalRevenue = 0;
    let totalOrders = 0;
    let totalCOD = 0;
    let totalVNPay = 0;
    let totalMoMo = 0;
    let totalZaloPay = 0;
    
    orders.forEach((order: Order) => {
      const orderDate = new Date(order.createdAt);
      const dateKey = orderDate.toISOString().split("T")[0];
      
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: orderDate,
          orders: 0,
          revenue: 0,
          cod: 0,
          vnpay: 0,
          momo: 0,
          zalopay: 0,
        };
      }
      
      dailyData[dateKey].orders += 1;
      dailyData[dateKey].revenue += order.totalAmount;
      
      switch (order.paymentMethod) {
        case "cod":
          dailyData[dateKey].cod += order.totalAmount;
          totalCOD += order.totalAmount;
          break;
        case "vnpay":
          dailyData[dateKey].vnpay += order.totalAmount;
          totalVNPay += order.totalAmount;
          break;
        case "momo":
          dailyData[dateKey].momo += order.totalAmount;
          totalMoMo += order.totalAmount;
          break;
        case "zalopay":
          dailyData[dateKey].zalopay += order.totalAmount;
          totalZaloPay += order.totalAmount;
          break;
      }
      
      totalRevenue += order.totalAmount;
      totalOrders += 1;
    });
    
    // Thêm dữ liệu vào worksheet
    Object.keys(dailyData)
      .sort()
      .forEach((dateKey) => {
        const data = dailyData[dateKey];
        revenueSheet.addRow({
          date: data.date,
          orders: data.orders,
          revenue: data.revenue,
          cod: data.cod,
          vnpay: data.vnpay,
          momo: data.momo,
          zalopay: data.zalopay,
        });
      });
    
    // Thêm dòng tổng
    const totalRow = revenueSheet.addRow({
      date: "TỔNG CỘNG",
      orders: totalOrders,
      revenue: totalRevenue,
      cod: totalCOD,
      vnpay: totalVNPay,
      momo: totalMoMo,
      zalopay: totalZaloPay,
    });
    
    totalRow.font = { bold: true };
    totalRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFF2CC" },
    };
    
    // Định dạng cột tiền tệ
    const formatCurrency = (cell: ExcelJS.Cell) => {
      if (cell.value && typeof cell.value === "number") {
        cell.numFmt = '#,##0 "₫"';
      }
    };
    
    // Áp dụng định dạng tiền tệ
    if (revenueSheet.columns && revenueSheet.columns.length > 0) {
      revenueSheet.columns.forEach(column => {
        if (column && typeof column.eachCell === 'function') {
          column.eachCell({ includeEmpty: true }, (cell) => {
            if (
              ["revenue", "cod", "vnpay", "momo", "zalopay"].includes(
                column.key || ""
              )
            ) {
              formatCurrency(cell);
            }
          });
        }
      });
    }
    
    // Tạo buffer từ workbook
    const buffer = await workbook.xlsx.writeBuffer();
    
    // Chuyển đổi Buffer thành Blob
    const blob = new Blob([buffer as ArrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    
    // Tải lên Convex storage
    const storageId = await ctx.storage.store(blob, {
      sha256: undefined
    });
    
    return {
      storageId,
      summary: {
        startDate: new Date(args.startDate),
        endDate: new Date(args.endDate),
        totalOrders,
        totalRevenue,
        paymentMethods: {
          cod: totalCOD,
          vnpay: totalVNPay,
          momo: totalMoMo,
          zalopay: totalZaloPay,
        },
      },
    };
  },
});

// Báo cáo đơn hàng
export const generateOrdersReport = action({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  returns: v.object({
    storageId: v.id("_storage"),
    summary: v.object({
      startDate: v.any(),
      endDate: v.any(),
      totalOrders: v.number(),
      totalAmount: v.number(),
    }),
  }),
  handler: async (ctx, args) => {
    await checkAdminAccess(ctx);
    
    // Lấy tất cả đơn hàng trong khoảng thời gian
    const orders: Order[] = await ctx.runQuery(api.orders.listByDateRange, {
      startDate: args.startDate,
      endDate: args.endDate,
    });
    
    // Lấy thông tin người dùng
    const userIds = [...new Set(orders.map((order) => order.userId))];
    const users = await Promise.all(
      userIds.map((userId) => ctx.db.get(userId))
    );
    
    // Map userId to user info
    const userMap = users.reduce((map: Record<string, User>, user: any) => {
      if (user) {
        map[user._id] = user;
      }
      return map;
    }, {});
    
    // Tạo workbook Excel
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "ShopVN Admin";
    workbook.created = new Date();
    
    // Tạo worksheet đơn hàng
    const ordersSheet = workbook.addWorksheet("Đơn Hàng");
    
    // Thiết lập tiêu đề và định dạng
    ordersSheet.columns = [
      { header: "Mã Đơn", key: "id", width: 20 },
      { header: "Ngày Tạo", key: "date", width: 15 },
      { header: "Khách Hàng", key: "customer", width: 20 },
      { header: "Điện Thoại", key: "phone", width: 15 },
      { header: "Địa Chỉ", key: "address", width: 30 },
      { header: "Tổng Tiền", key: "total", width: 15 },
      { header: "Phương Thức", key: "payment", width: 15 },
      { header: "Trạng Thái", key: "status", width: 15 },
    ];
    
    // Style cho header
    ordersSheet.getRow(1).font = { bold: true };
    ordersSheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD3D3D3" },
    };
    
    // Thêm dữ liệu vào worksheet
    orders.forEach((order) => {
      const user = userMap[order.userId] || {};
      
      ordersSheet.addRow({
        id: order._id.toString(),
        date: new Date(order.createdAt),
        customer: user.name || "Không xác định",
        phone: order.shippingAddress?.phone || user.phone || "Không xác định",
        address: formatAddress(order.shippingAddress),
        total: order.totalAmount,
        payment: translatePaymentMethod(order.paymentMethod),
        status: translateOrderStatus(order.status),
      });
    });
    
    // Định dạng cột tiền tệ và ngày tháng
    if (ordersSheet.columns && ordersSheet.columns.length > 0) {
      ordersSheet.columns.forEach(column => {
        if (column && typeof column.eachCell === 'function') {
          column.eachCell({ includeEmpty: true }, (cell) => {
            if (column.key === "total") {
              if (cell.value && typeof cell.value === "number") {
                cell.numFmt = '#,##0 "₫"';
              }
            } else if (column.key === "date") {
              if (cell.value instanceof Date) {
                cell.numFmt = "dd/mm/yyyy hh:mm";
              }
            }
          });
        }
      });
    }
    
    // Tạo buffer từ workbook
    const buffer = await workbook.xlsx.writeBuffer();
    
    // Chuyển đổi Buffer thành Blob
    const blob = new Blob([buffer as ArrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    
    // Tải lên Convex storage
    const storageId = await ctx.storage.store(blob, {
      sha256: undefined
    });
    
    return {
      storageId,
      summary: {
        startDate: new Date(args.startDate),
        endDate: new Date(args.endDate),
        totalOrders: orders.length,
        totalAmount: orders.reduce((sum: number, order: Order) => sum + order.totalAmount, 0),
      },
    };
  },
});

// Báo cáo sản phẩm bán chạy
export const generateProductsReport = action({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  returns: v.object({
    storageId: v.id("_storage"),
    summary: v.object({
      startDate: v.any(),
      endDate: v.any(),
      totalProducts: v.number(),
      totalQuantity: v.number(),
      totalRevenue: v.number(),
    }),
  }),
  handler: async (ctx, args) => {
    await checkAdminAccess(ctx);
    
    // Lấy tất cả đơn hàng trong khoảng thời gian
    const orders: Order[] = await ctx.runQuery(api.orders.listByDateRange, {
      startDate: args.startDate,
      endDate: args.endDate,
    });
    
    // Trích xuất thông tin sản phẩm từ đơn hàng
    const productMap: Record<
      string,
      { id: string; name: string; quantity: number; revenue: number }
    > = {};
    
    // Tính tổng số lượng và doanh thu cho mỗi sản phẩm
    orders.forEach((order) => {
      if (!order.items || !Array.isArray(order.items)) return;
      
      order.items.forEach((item) => {
        const productId = item.productId;
        if (!productId) return;
        
        if (!productMap[productId]) {
          productMap[productId] = {
            id: productId,
            name: item.productName || "Sản phẩm không xác định",
            quantity: 0,
            revenue: 0,
          };
        }
        
        productMap[productId].quantity += item.quantity || 0;
        productMap[productId].revenue += (item.price || 0) * (item.quantity || 0);
      });
    });
    
    // Chuyển đổi thành mảng và sắp xếp theo doanh thu giảm dần
    const products = Object.values(productMap).sort(
      (a, b) => b.revenue - a.revenue
    );
    
    // Tạo workbook Excel
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "ShopVN Admin";
    workbook.created = new Date();
    
    // Tạo worksheet sản phẩm
    const productsSheet = workbook.addWorksheet("Sản Phẩm Bán Chạy");
    
    // Thiết lập tiêu đề và định dạng
    productsSheet.columns = [
      { header: "STT", key: "index", width: 5 },
      { header: "Mã Sản Phẩm", key: "id", width: 20 },
      { header: "Tên Sản Phẩm", key: "name", width: 40 },
      { header: "Số Lượng", key: "quantity", width: 12 },
      { header: "Doanh Thu", key: "revenue", width: 15 },
    ];
    
    // Style cho header
    productsSheet.getRow(1).font = { bold: true };
    productsSheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD3D3D3" },
    };
    
    // Thêm dữ liệu vào worksheet
    products.forEach((product, index) => {
      productsSheet.addRow({
        index: index + 1,
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        revenue: product.revenue,
      });
    });
    
    // Thêm dòng tổng
    const totalRow = productsSheet.addRow({
      index: "",
      id: "",
      name: "TỔNG CỘNG",
      quantity: products.reduce((sum, product) => sum + product.quantity, 0),
      revenue: products.reduce((sum, product) => sum + product.revenue, 0),
    });
    
    totalRow.font = { bold: true };
    totalRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFF2CC" },
    };
    
    // Định dạng cột tiền tệ
    if (productsSheet.columns && productsSheet.columns.length > 0) {
      productsSheet.columns.forEach(column => {
        if (column && typeof column.eachCell === 'function') {
          column.eachCell({ includeEmpty: true }, (cell) => {
            if (column.key === "revenue") {
              if (cell.value && typeof cell.value === "number") {
                cell.numFmt = '#,##0 "₫"';
              }
            }
          });
        }
      });
    }
    
    // Tạo buffer từ workbook
    const buffer = await workbook.xlsx.writeBuffer();
    
    // Chuyển đổi Buffer thành Blob
    const blob = new Blob([buffer as ArrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    
    // Tải lên Convex storage
    const storageId = await ctx.storage.store(blob, {
      sha256: undefined
    });
    
    return {
      storageId,
      summary: {
        startDate: new Date(args.startDate),
        endDate: new Date(args.endDate),
        totalProducts: products.length,
        totalQuantity: products.reduce((sum, product) => sum + product.quantity, 0),
        totalRevenue: products.reduce((sum, product) => sum + product.revenue, 0),
      },
    };
  },
});

// Helper functions
function formatAddress(address: any) {
  if (!address) return "Không xác định";
  
  return [
    address.address,
    address.ward,
    address.district,
    address.city,
  ]
    .filter(Boolean)
    .join(", ");
}

function translatePaymentMethod(method: string) {
  switch (method) {
    case "cod":
      return "Tiền mặt (COD)";
    case "vnpay":
      return "VNPay";
    case "momo":
      return "MoMo";
    case "zalopay":
      return "ZaloPay";
    default:
      return method;
  }
}

function translateOrderStatus(status: string) {
  switch (status) {
    case "pending":
      return "Chờ xác nhận";
    case "confirmed":
      return "Đã xác nhận";
    case "shipped":
      return "Đang giao hàng";
    case "delivered":
      return "Đã giao hàng";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
}