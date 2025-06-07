import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    siteName: "ShopVN",
    siteDescription: "Cửa hàng trực tuyến hàng đầu Việt Nam",
    contactEmail: "contact@shopvn.com",
    contactPhone: "1900 1234",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    freeShippingThreshold: 500000,
    defaultShippingFee: 30000,
  });

  const updateSettings = useMutation(api.admin.updateSettings);

  const handleSave = async () => {
    try {
      await updateSettings(settings);
      toast.success("Đã lưu cài đặt!");
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const tabs = [
    { id: "general", label: "Tổng quan", icon: "⚙️" },
    { id: "shipping", label: "Vận chuyển", icon: "🚚" },
    { id: "payment", label: "Thanh toán", icon: "💳" },
    { id: "notifications", label: "Thông báo", icon: "🔔" },
    { id: "security", label: "Bảo mật", icon: "🔒" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
          <p className="text-gray-600 mt-1">Quản lý cấu hình và tùy chỉnh cửa hàng</p>
        </div>
        
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
        >
          <span className="text-xl">💾</span>
          <span>Lưu cài đặt</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Thông tin chung</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên cửa hàng
                      </label>
                      <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email liên hệ
                      </label>
                      <input
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        value={settings.contactPhone}
                        onChange={(e) => setSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả cửa hàng
                    </label>
                    <textarea
                      value={settings.siteDescription}
                      onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Settings */}
            {activeTab === "shipping" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Cài đặt vận chuyển</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phí vận chuyển mặc định
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={settings.defaultShippingFee}
                          onChange={(e) => setSettings(prev => ({ ...prev, defaultShippingFee: Number(e.target.value) }))}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">đ</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Miễn phí vận chuyển từ
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={settings.freeShippingThreshold}
                          onChange={(e) => setSettings(prev => ({ ...prev, freeShippingThreshold: Number(e.target.value) }))}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">đ</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">ℹ️</span>
                      <span className="text-blue-800 font-medium">Thông tin</span>
                    </div>
                    <p className="text-blue-700 mt-2">
                      Đơn hàng từ {settings.freeShippingThreshold.toLocaleString('vi-VN')}đ trở lên sẽ được miễn phí vận chuyển.
                      Các đơn hàng khác sẽ tính phí {settings.defaultShippingFee.toLocaleString('vi-VN')}đ.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === "payment" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Phương thức thanh toán</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">💵</span>
                        <div>
                          <div className="font-semibold">Thanh toán khi nhận hàng (COD)</div>
                          <div className="text-sm text-gray-600">Khách hàng thanh toán khi nhận hàng</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg opacity-50">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">🏦</span>
                        <div>
                          <div className="font-semibold">Chuyển khoản ngân hàng</div>
                          <div className="text-sm text-gray-600">Sắp có</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          disabled
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg opacity-50">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">💳</span>
                        <div>
                          <div className="font-semibold">Thẻ tín dụng/ghi nợ</div>
                          <div className="text-sm text-gray-600">Sắp có</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          disabled
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Cài đặt thông báo</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                      <div>
                        <div className="font-semibold">Thông báo đơn hàng mới</div>
                        <div className="text-sm text-gray-600">Nhận thông báo khi có đơn hàng mới</div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                      <div>
                        <div className="font-semibold">Thông báo sản phẩm hết hàng</div>
                        <div className="text-sm text-gray-600">Nhận thông báo khi sản phẩm sắp hết hàng</div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                      <div>
                        <div className="font-semibold">Báo cáo hàng ngày</div>
                        <div className="text-sm text-gray-600">Nhận báo cáo doanh thu hàng ngày</div>
                      </div>
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Cài đặt bảo mật</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Đổi mật khẩu
                      </label>
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Mật khẩu hiện tại"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="Mật khẩu mới"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="Xác nhận mật khẩu mới"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Cập nhật mật khẩu
                        </button>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                        <div>
                          <div className="font-semibold">Xác thực hai yếu tố (2FA)</div>
                          <div className="text-sm text-gray-600">Tăng cường bảo mật tài khoản</div>
                        </div>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                          Kích hoạt
                        </button>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-600">⚠️</span>
                        <span className="text-yellow-800 font-medium">Lưu ý bảo mật</span>
                      </div>
                      <ul className="text-yellow-700 mt-2 space-y-1 text-sm">
                        <li>• Sử dụng mật khẩu mạnh với ít nhất 8 ký tự</li>
                        <li>• Không chia sẻ thông tin đăng nhập với người khác</li>
                        <li>• Đăng xuất sau khi sử dụng xong</li>
                        <li>• Kích hoạt xác thực hai yếu tố để tăng cường bảo mật</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
