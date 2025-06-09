import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
}

export function AdminProtectedRoute({ children, onNavigate }: AdminProtectedRouteProps) {
  const [isChecking, setIsChecking] = useState(true);
  const user = useQuery(api.auth.loggedInUser);
  const isAdmin = useQuery(api.roles.isAdmin);

  useEffect(() => {
    // Khi thông tin người dùng và quyền admin đã được tải
    if (user !== undefined && isAdmin !== undefined) {
      // Nếu không đăng nhập hoặc không phải admin, chuyển hướng về trang chủ
      if (!user || !isAdmin) {
        onNavigate("home");
      }
      setIsChecking(false);
    }
  }, [user, isAdmin, onNavigate]);

  // Đang kiểm tra quyền
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="admin-loading">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Không có quyền truy cập
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" data-testid="access-denied">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-red-100 rounded-full">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Truy cập bị từ chối</h2>
          <p className="text-gray-600 mb-6">
            Bạn không có quyền truy cập vào trang quản trị. Vui lòng đăng nhập với tài khoản có quyền admin.
          </p>
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => onNavigate("home")}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              data-testid="back-to-home"
            >
              Về trang chủ
            </button>
            <button
              onClick={() => {
                // Hiển thị form đăng nhập
                // Trong thực tế, bạn có thể sử dụng một context hoặc state để hiển thị modal đăng nhập
                console.log("Hiển thị form đăng nhập");
              }}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              data-testid="login-as-admin"
            >
              Đăng nhập với tài khoản khác
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Có quyền truy cập, hiển thị nội dung
  return <div data-testid="admin-content">{children}</div>;
}
