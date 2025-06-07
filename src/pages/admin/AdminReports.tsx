import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function AdminReports() {
  const [timeRange, setTimeRange] = useState("30d");
  const [reportType, setReportType] = useState("revenue");

  const stats = useQuery(api.admin.getStats, { timeRange });
  const orders = useQuery(api.orders.list) || [];
  const products = useQuery(api.products.list, {}) || [];

  const getRevenueByPeriod = () => {
    const now = Date.now();
    const periods: { [key: string]: number } = {};
    
    orders.forEach(order => {
      const date = new Date(order._creationTime);
      const key = timeRange === "7d" || timeRange === "30d" 
        ? date.toLocaleDateString('vi-VN')
        : `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      periods[key] = (periods[key] || 0) + order.totalAmount;
    });

    return Object.entries(periods).map(([date, revenue]) => ({ date, revenue }));
  };

  const getTopSellingProducts = () => {
    return products
      .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
      .slice(0, 10);
  };

  const getOrderStatusDistribution = () => {
    const distribution = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(distribution).map(([status, count]) => ({
      status,
      count,
      percentage: Math.round((count / orders.length) * 100)
    }));
  };

  const revenueData = getRevenueByPeriod();
  const topProducts = getTopSellingProducts();
  const statusDistribution = getOrderStatusDistribution();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
          <p className="text-gray-600 mt-1">Phân tích hiệu suất kinh doanh</p>
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
          
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <span>📊</span>
            <span>Xuất PDF</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">💰</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.revenue?.toLocaleString('vi-VN') || 0}đ
              </div>
              <div className="text-sm text-gray-600">Doanh thu</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">📦</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.orders || 0}</div>
              <div className="text-sm text-gray-600">Đơn hàng</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">👥</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.customers || 0}</div>
              <div className="text-sm text-gray-600">Khách hàng</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xl">✅</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.completionRate || 0}%</div>
              <div className="text-sm text-gray-600">Tỷ lệ hoàn thành</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Doanh thu theo thời gian</h3>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-gray-600">Biểu đồ doanh thu</p>
              <div className="mt-4 space-y-2">
                {revenueData.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.date}</span>
                    <span className="font-semibold">{item.revenue.toLocaleString('vi-VN')}đ</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Phân bố trạng thái đơn hàng</h3>
          <div className="space-y-4">
            {statusDistribution.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    item.status === "pending" ? "bg-yellow-500" :
                    item.status === "confirmed" ? "bg-blue-500" :
                    item.status === "shipped" ? "bg-purple-500" :
                    item.status === "delivered" ? "bg-green-500" :
                    "bg-red-500"
                  }`}></div>
                  <span className="text-gray-700 capitalize">
                    {item.status === "pending" ? "Chờ xử lý" :
                     item.status === "confirmed" ? "Đã xác nhận" :
                     item.status === "shipped" ? "Đang giao" :
                     item.status === "delivered" ? "Đã giao" :
                     "Đã hủy"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 font-semibold">{item.count}</span>
                  <span className="text-gray-600 text-sm">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Top 10 sản phẩm bán chạy</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Hạng</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sản phẩm</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Đã bán</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Doanh thu</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tồn kho</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topProducts.map((product, index) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? "bg-yellow-100 text-yellow-800" :
                      index === 1 ? "bg-gray-100 text-gray-800" :
                      index === 2 ? "bg-orange-100 text-orange-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.images[0] || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.price.toLocaleString('vi-VN')}đ</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{product.soldCount || 0}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {((product.soldCount || 0) * product.price).toLocaleString('vi-VN')}đ
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock === 0 ? "bg-red-100 text-red-800" :
                      product.stock < 10 ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
