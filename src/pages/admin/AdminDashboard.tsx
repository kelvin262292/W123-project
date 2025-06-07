import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  
  const stats = useQuery(api.admin.getStats, { timeRange });
  const recentOrders = useQuery(api.admin.getRecentOrders, { limit: 5 });
  const topProducts = useQuery(api.admin.getTopProducts, { limit: 5 });

  const statCards = [
    {
      title: "Doanh thu",
      value: stats?.revenue || 0,
      change: "+12.5%",
      icon: "💰",
      color: "from-green-500 to-emerald-600",
      format: "currency"
    },
    {
      title: "Đơn hàng",
      value: stats?.orders || 0,
      change: "+8.2%",
      icon: "📦",
      color: "from-blue-500 to-cyan-600",
      format: "number"
    },
    {
      title: "Khách hàng",
      value: stats?.customers || 0,
      change: "+15.3%",
      icon: "👥",
      color: "from-purple-500 to-violet-600",
      format: "number"
    },
    {
      title: "Tỷ lệ hoàn thành",
      value: stats?.completionRate || 0,
      change: "+2.1%",
      icon: "✅",
      color: "from-orange-500 to-red-600",
      format: "percentage"
    }
  ];

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case "currency":
        return `${value.toLocaleString('vi-VN')}đ`;
      case "percentage":
        return `${value}%`;
      default:
        return value.toLocaleString('vi-VN');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Tổng quan hoạt động kinh doanh</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">7 ngày qua</option>
            <option value="30d">30 ngày qua</option>
            <option value="90d">3 tháng qua</option>
            <option value="1y">1 năm qua</option>
          </select>
          
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <span>📊</span>
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={stat.title}
            className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                  {stat.icon}
                </div>
                <span className="text-green-600 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              
              <div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900">
                  {formatValue(stat.value, stat.format)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Doanh thu theo thời gian</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">Doanh thu</button>
              <button className="px-3 py-1 text-gray-600 rounded-lg text-sm hover:bg-gray-100">Đơn hàng</button>
            </div>
          </div>
          
          {/* Placeholder for chart */}
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-gray-600">Biểu đồ doanh thu</p>
              <p className="text-sm text-gray-500">Tích hợp Chart.js sẽ hiển thị ở đây</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Đơn hàng gần đây</h3>
          
          <div className="space-y-4">
            {recentOrders?.map((order) => (
              <div key={order._id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    #{order._id.slice(-4)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">
                    {order.shippingAddress?.name || "Khách hàng"}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {order.totalAmount.toLocaleString('vi-VN')}đ
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                  order.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                  order.status === "shipped" ? "bg-purple-100 text-purple-800" :
                  order.status === "delivered" ? "bg-green-100 text-green-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {order.status === "pending" ? "Chờ" :
                   order.status === "confirmed" ? "Xác nhận" :
                   order.status === "shipped" ? "Giao" :
                   order.status === "delivered" ? "Hoàn thành" : "Hủy"}
                </span>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition-colors text-sm font-medium">
            Xem tất cả đơn hàng →
          </button>
        </div>
      </div>

      {/* Top Products and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Sản phẩm bán chạy</h3>
          
          <div className="space-y-4">
            {topProducts?.map((product, index) => (
              <div key={product._id} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? "bg-yellow-100 text-yellow-800" :
                    index === 1 ? "bg-gray-100 text-gray-800" :
                    index === 2 ? "bg-orange-100 text-orange-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {index + 1}
                  </span>
                </div>
                
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                  <p className="text-gray-600 text-xs">
                    {product.price.toLocaleString('vi-VN')}đ
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">
                    {product.soldCount || 0}
                  </p>
                  <p className="text-gray-600 text-xs">đã bán</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Thông báo</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600">⚠️</span>
              </div>
              <div>
                <p className="font-medium text-red-800 text-sm">Sản phẩm sắp hết hàng</p>
                <p className="text-red-600 text-xs">5 sản phẩm có số lượng &lt; 10</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600">📋</span>
              </div>
              <div>
                <p className="font-medium text-yellow-800 text-sm">Đơn hàng chờ xử lý</p>
                <p className="text-yellow-600 text-xs">12 đơn hàng cần xác nhận</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600">📊</span>
              </div>
              <div>
                <p className="font-medium text-blue-800 text-sm">Báo cáo tuần</p>
                <p className="text-blue-600 text-xs">Báo cáo tuần này đã sẵn sàng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
