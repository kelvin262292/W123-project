import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const orders = useQuery(api.admin.getRecentOrders, { limit: 100 }) || [];
  const orderStats = useQuery(api.admin.getOrderStats) || { 
    total: 0, 
    today: 0, 
    statusCounts: {
      pending: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    }
  };
  const updateOrderStatus = useMutation(api.admin.updateOrderStatus);

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch = !searchTerm || 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({ 
        orderId: orderId as any, 
        status: newStatus as any 
      });
      toast.success("Đã cập nhật trạng thái đơn hàng!");
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Chờ xử lý";
      case "confirmed": return "Đã xác nhận";
      case "shipped": return "Đang giao";
      case "delivered": return "Đã giao";
      case "cancelled": return "Đã hủy";
      default: return status;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="text-gray-600 mt-1">Theo dõi và xử lý đơn hàng của khách hàng</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2">
            <span>📊</span>
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">📦</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{orderStats.total}</div>
              <div className="text-sm text-gray-600">Tổng đơn hàng</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">🆕</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{orderStats.today}</div>
              <div className="text-sm text-gray-600">Hôm nay</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-xl">⏳</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{orderStats.statusCounts.pending}</div>
              <div className="text-sm text-gray-600">Chờ xử lý</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">🚚</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{orderStats.statusCounts.shipped}</div>
              <div className="text-sm text-gray-600">Đang giao</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{orderStats.statusCounts.delivered}</div>
              <div className="text-sm text-gray-600">Đã giao</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Mã đơn hàng, tên khách hàng..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả</option>
              <option value="pending">Chờ xử lý</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="shipped">Đang giao</option>
              <option value="delivered">Đã giao</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          <div className="flex items-end">
            <button 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <span>🔄</span>
              <span>Làm mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Mã đơn hàng</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Khách hàng</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ngày đặt</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tổng tiền</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Trạng thái</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      #{order._id.slice(-8).toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.items.length} sản phẩm
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                          {order.user?.name?.charAt(0).toUpperCase() || "?"}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {order.user?.name || "Khách hàng"}
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.user?.email || "Chưa có email"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {formatDate(order._creationTime)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {order.totalAmount.toLocaleString('vi-VN')}đ
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <span className="text-sm">👁️</span>
                      </button>
                      
                      {order.status === "pending" && (
                        <button
                          onClick={() => handleStatusUpdate(order._id, "confirmed")}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Xác nhận"
                        >
                          <span className="text-sm">✅</span>
                        </button>
                      )}
                      
                      {order.status === "confirmed" && (
                        <button
                          onClick={() => handleStatusUpdate(order._id, "shipped")}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Giao hàng"
                        >
                          <span className="text-sm">🚚</span>
                        </button>
                      )}
                      
                      {order.status === "shipped" && (
                        <button
                          onClick={() => handleStatusUpdate(order._id, "delivered")}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Hoàn thành"
                        >
                          <span className="text-sm">📦</span>
                        </button>
                      )}
                      
                      {order.status !== "delivered" && order.status !== "cancelled" && (
                        <button
                          onClick={() => handleStatusUpdate(order._id, "cancelled")}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hủy đơn"
                        >
                          <span className="text-sm">❌</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Không tìm thấy đơn hàng
            </h3>
            <p className="text-gray-600">
              Thử thay đổi bộ lọc hoặc kiểm tra lại từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}

function OrderDetailModal({ 
  order, 
  onClose, 
  onStatusUpdate 
}: { 
  order: any; 
  onClose: () => void;
  onStatusUpdate: (orderId: string, status: string) => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Chờ xử lý";
      case "confirmed": return "Đã xác nhận";
      case "shipped": return "Đang giao";
      case "delivered": return "Đã giao";
      case "cancelled": return "Đã hủy";
      default: return status;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Chi tiết đơn hàng #{order._id.slice(-8).toUpperCase()}
              </h3>
              <p className="text-sm text-gray-600">
                Đặt ngày {new Date(order._creationTime).toLocaleDateString('vi-VN')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status and Actions */}
            <div className="flex items-center justify-between">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
              
              <div className="flex space-x-2">
                {order.status === "pending" && (
                  <button
                    onClick={() => {
                      onStatusUpdate(order._id, "confirmed");
                      onClose();
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Xác nhận đơn hàng
                  </button>
                )}
                
                {order.status === "confirmed" && (
                  <button
                    onClick={() => {
                      onStatusUpdate(order._id, "shipped");
                      onClose();
                    }}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Giao hàng
                  </button>
                )}
                
                {order.status === "shipped" && (
                  <button
                    onClick={() => {
                      onStatusUpdate(order._id, "delivered");
                      onClose();
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Hoàn thành
                  </button>
                )}
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Thông tin khách hàng</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Tên:</span>
                  <p className="font-medium">{order.user?.name || "Chưa cập nhật"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{order.user?.email || "Chưa có"}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Địa chỉ giao hàng</h4>
              <div className="space-y-2">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p className="text-gray-600">{order.shippingAddress.phone}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.address}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Sản phẩm đã đặt</h4>
              <div className="space-y-3">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">Sản phẩm #{item.productId.slice(-8)}</p>
                      <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      {item.variants && item.variants.length > 0 && (
                        <p className="text-sm text-gray-600">
                          Phân loại: {item.variants.map((v: any) => `${v.type}: ${v.value}`).join(", ")}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.price.toLocaleString('vi-VN')}đ</p>
                      <p className="text-sm text-gray-600">
                        Tổng: {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Tổng kết đơn hàng</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Phương thức thanh toán:</span>
                  <span className="font-medium">
                    {order.paymentMethod === "cod" ? "Thanh toán khi nhận hàng" : "Chuyển khoản"}
                  </span>
                </div>
                {order.couponCode && (
                  <div className="flex justify-between">
                    <span>Mã giảm giá:</span>
                    <span className="font-medium">{order.couponCode}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Tổng cộng:</span>
                  <span className="text-blue-600">{order.totalAmount.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
            </div>

            {order.notes && (
              <div className="bg-yellow-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Ghi chú</h4>
                <p className="text-gray-700">{order.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
