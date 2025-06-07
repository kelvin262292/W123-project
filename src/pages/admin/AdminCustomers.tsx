import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const customers = useQuery(api.admin.getAllCustomers, {
    search: searchTerm || undefined,
    sortBy,
  }) || [];

  const customerStats = useQuery(
    api.admin.getCustomerStats,
    selectedCustomer ? { userId: selectedCustomer as any } : "skip"
  );

  const selectedCustomerData = useQuery(
    api.admin.getCustomerById,
    selectedCustomer ? { userId: selectedCustomer as any } : "skip"
  );

  const deleteCustomer = useMutation(api.admin.deleteCustomer);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('vi-VN');
  };

  const getCustomerStatus = (creationTime: number) => {
    const daysSinceJoined = Math.floor((Date.now() - creationTime) / (1000 * 60 * 60 * 24));
    if (daysSinceJoined <= 7) return { text: "Mới", color: "bg-green-100 text-green-800" };
    if (daysSinceJoined <= 30) return { text: "Hoạt động", color: "bg-blue-100 text-blue-800" };
    return { text: "Cũ", color: "bg-gray-100 text-gray-800" };
  };

  const handleDeleteCustomer = async (userId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa khách hàng này? Tất cả dữ liệu liên quan sẽ bị xóa.")) {
      try {
        await deleteCustomer({ userId: userId as any });
        toast.success("Đã xóa khách hàng!");
      } catch (error) {
        toast.error("Có lỗi xảy ra khi xóa khách hàng!");
      }
    }
  };

  const newCustomers = customers.filter(c => getCustomerStatus(c._creationTime).text === "Mới");
  const activeCustomers = customers.filter(c => getCustomerStatus(c._creationTime).text === "Hoạt động");
  const avgSpending = customers.length > 0 ? Math.round(1250000 / customers.length) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý khách hàng</h1>
          <p className="text-gray-600 mt-1">Quản lý thông tin và hoạt động của khách hàng</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2">
            <span>📊</span>
            <span>Xuất Excel</span>
          </button>
          
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <span>📧</span>
            <span>Gửi email</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{customers.length}</div>
              <div className="text-sm text-gray-600">Tổng khách hàng</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">🆕</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{newCustomers.length}</div>
              <div className="text-sm text-gray-600">Khách hàng mới</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">⭐</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{activeCustomers.length}</div>
              <div className="text-sm text-gray-600">Đang hoạt động</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xl">💰</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {avgSpending.toLocaleString('vi-VN')}đ
              </div>
              <div className="text-sm text-gray-600">Giá trị TB/khách</div>
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
                placeholder="Tên, email khách hàng..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sắp xếp
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="name">Theo tên</option>
            </select>
          </div>

          <div className="flex items-end">
            <button 
              onClick={() => {
                setSearchTerm("");
                setSortBy("newest");
              }}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <span>🔄</span>
              <span>Làm mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Khách hàng</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ngày tham gia</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Trạng thái</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => {
                const status = getCustomerStatus(customer._creationTime);
                
                return (
                  <tr key={customer._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {customer.name?.charAt(0).toUpperCase() || "?"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {customer.name || "Chưa cập nhật"}
                          </p>
                          <p className="text-sm text-gray-600">
                            ID: {customer._id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {customer.email || "Chưa có email"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {formatDate(customer._creationTime)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.text}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedCustomer(customer._id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <span className="text-sm">👁️</span>
                        </button>
                        <button 
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Gửi email"
                        >
                          <span className="text-sm">📧</span>
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa khách hàng"
                        >
                          <span className="text-sm">🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {customers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Không tìm thấy khách hàng
            </h3>
            <p className="text-gray-600">
              Thử thay đổi bộ lọc hoặc kiểm tra lại từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && customerStats && selectedCustomerData && (
        <CustomerDetailModal
          customer={selectedCustomerData}
          stats={customerStats}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}

function CustomerDetailModal({ 
  customer,
  stats, 
  onClose 
}: { 
  customer: any;
  stats: any; 
  onClose: () => void; 
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Chi tiết khách hàng</h3>
              <p className="text-sm text-gray-600">{customer.name || "Chưa cập nhật tên"}</p>
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
            {/* Customer Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Thông tin cá nhân</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{customer.email || "Chưa có"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Ngày tham gia:</span>
                  <p className="font-medium">{new Date(customer._creationTime).toLocaleDateString('vi-VN')}</p>
                </div>
                <div>
                  <span className="text-gray-600">Số điện thoại:</span>
                  <p className="font-medium">{customer.phone || "Chưa có"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Trạng thái:</span>
                  <p className="font-medium text-green-600">Hoạt động</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">{stats.totalOrders}</div>
                <div className="text-sm text-blue-800">Tổng đơn hàng</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">
                  {stats.totalSpent.toLocaleString('vi-VN')}đ
                </div>
                <div className="text-sm text-green-800">Tổng chi tiêu</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-600">{stats.completedOrders}</div>
                <div className="text-sm text-purple-800">Đơn hoàn thành</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-orange-600">
                  {stats.lastOrderDate ? new Date(stats.lastOrderDate).toLocaleDateString('vi-VN') : "Chưa có"}
                </div>
                <div className="text-sm text-orange-800">Đơn hàng cuối</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Gửi email
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Xem đơn hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
