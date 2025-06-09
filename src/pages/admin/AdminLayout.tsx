import { useState } from "react";
import { AdminDashboard } from "./AdminDashboard";
import { AdminProducts } from "./AdminProducts";
import { AdminOrders } from "./AdminOrders";
import { AdminCustomers } from "./AdminCustomers";
import { AdminCategories } from "./AdminCategories";
import { AdminReports } from "./AdminReports";
import { AdminSettings } from "./AdminSettings";

interface AdminLayoutProps {
  onNavigate: (page: any, slug?: string) => void;
}

export function AdminLayout({ onNavigate }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      key: "products",
      label: "Sản phẩm",
      icon: "📦",
      badge: "125"
    },
    {
      key: "orders",
      label: "Đơn hàng",
      icon: "🛒",
      badge: "12"
    },
    {
      key: "customers",
      label: "Khách hàng",
      icon: "👥",
      badge: "89"
    },
    {
      key: "categories",
      label: "Danh mục",
      icon: "📂"
    },
    {
      key: "reports",
      label: "Báo cáo",
      icon: "📈"
    },
    {
      key: "settings",
      label: "Cài đặt",
      icon: "⚙️"
    }
  ];

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <AdminProducts />;
      case "orders":
        return <AdminOrders />;
      case "customers":
        return <AdminCustomers />;
      case "categories":
        return <AdminCategories />;
      case "reports":
        return <AdminReports />;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="admin-dashboard">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-xl transition-all duration-300 flex flex-col`} data-testid="admin-sidebar">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">🛍️</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-gray-900">ShopVN</h1>
                <p className="text-sm text-gray-600">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2" data-testid="admin-nav">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setCurrentPage(item.key)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                currentPage === item.key
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              data-testid={`${item.key}-nav-link`}
            >
              <span className={`text-xl ${currentPage === item.key ? "scale-110" : "group-hover:scale-110"} transition-transform`}>
                {item.icon}
              </span>
              {sidebarOpen && (
                <>
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      currentPage === item.key
                        ? "bg-white/20 text-white"
                        : "bg-blue-100 text-blue-600"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Toggle */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            data-testid="sidebar-toggle"
          >
            <span className="text-xl">
              {sidebarOpen ? "◀️" : "▶️"}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col" data-testid="admin-content">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                data-testid="mobile-sidebar-toggle"
              >
                <span className="text-xl">☰</span>
              </button>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  data-testid="admin-search-input"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Back to Store */}
              <button
                onClick={() => onNavigate("home")}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                data-testid="back-to-store"
              >
                <span>🏪</span>
                <span className="hidden md:inline">Về cửa hàng</span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg" data-testid="admin-notifications">
                <span className="text-xl">🔔</span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3" data-testid="admin-profile">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-900">Admin</p>
                  <p className="text-sm text-gray-600">Quản trị viên</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-auto" data-testid="admin-main-content">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {currentPage === "dashboard" && "Dashboard"}
              {currentPage === "products" && "Quản lý Sản phẩm"}
              {currentPage === "orders" && "Quản lý Đơn hàng"}
              {currentPage === "customers" && "Quản lý Khách hàng"}
              {currentPage === "categories" && "Quản lý Danh mục"}
              {currentPage === "reports" && "Báo cáo"}
              {currentPage === "settings" && "Cài đặt Hệ thống"}
            </h1>
            <p className="text-gray-600 mt-2">
              {currentPage === "dashboard" && "Xem tổng quan về hoạt động của cửa hàng"}
              {currentPage === "products" && "Quản lý danh sách sản phẩm, thêm, sửa, xóa sản phẩm"}
              {currentPage === "orders" && "Xem và xử lý các đơn hàng mới nhất"}
              {currentPage === "customers" && "Quản lý thông tin khách hàng"}
              {currentPage === "categories" && "Quản lý các danh mục sản phẩm"}
              {currentPage === "reports" && "Xem các báo cáo về doanh thu và hoạt động"}
              {currentPage === "settings" && "Thiết lập cấu hình hệ thống"}
            </p>
          </div>

          {/* Page Content */}
          <div data-testid={`${currentPage}-management`}>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
