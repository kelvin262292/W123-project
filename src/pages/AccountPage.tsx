import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "../SignInForm";

interface AccountPageProps {
  onNavigate: (page: any, slug?: string) => void;
}

function AccountInfo() {
  const user = useQuery(api.auth.loggedInUser);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Thông tin tài khoản
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên
          </label>
          <div className="px-4 py-3 bg-gray-50 rounded-lg">
            {user?.name || "Chưa cập nhật"}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="px-4 py-3 bg-gray-50 rounded-lg">
            {user?.email || "Chưa cập nhật"}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại
          </label>
          <div className="px-4 py-3 bg-gray-50 rounded-lg">
            {user?.phone || "Chưa cập nhật"}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderHistory() {
  const orders = useQuery(api.orders.list) || [];

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
      case "pending": return "Chờ xác nhận";
      case "confirmed": return "Đã xác nhận";
      case "shipped": return "Đang giao";
      case "delivered": return "Đã giao";
      case "cancelled": return "Đã hủy";
      default: return status;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Lịch sử đơn hàng
      </h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📦</div>
          <p className="text-gray-600">Bạn chưa có đơn hàng nào</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold">
                    Đơn hàng #{order._id.slice(-8)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(order._creationTime).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>Sản phẩm x{item.quantity}</span>
                    <span>{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-semibold">Tổng cộng:</span>
                <span className="font-bold text-red-600">
                  {order.totalAmount.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function AccountPage({ onNavigate }: AccountPageProps) {
  const [currentTab, setCurrentTab] = useState("info");

  const menuItems = [
    { key: "info", label: "Thông tin tài khoản", icon: "👤" },
    { key: "orders", label: "Đơn hàng", icon: "📦" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Unauthenticated>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Đăng nhập
              </h1>
              <p className="text-gray-600">
                Vui lòng đăng nhập để xem thông tin tài khoản
              </p>
            </div>
            <SignInForm />
            <div className="mt-6 text-center">
              <button
                onClick={() => onNavigate("home")}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Về trang chủ
              </button>
            </div>
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tài khoản</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setCurrentTab(item.key)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      currentTab === item.key
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {currentTab === "info" && <AccountInfo />}
            {currentTab === "orders" && <OrderHistory />}
          </div>
        </div>
      </Authenticated>
    </div>
  );
}
