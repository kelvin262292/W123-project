import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const isAdmin = useQuery(api.admin.isAdmin);
  const user = useQuery(api.auth.loggedInUser);

  if (isAdmin === undefined || user === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Yêu cầu đăng nhập</h2>
            <p className="text-gray-600 mb-6">
              Bạn cần đăng nhập để truy cập trang quản trị
            </p>
            <button 
              onClick={() => window.location.href = "/"}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-6xl mb-4">⛔</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Không có quyền truy cập</h2>
            <p className="text-gray-600 mb-6">
              Bạn không có quyền truy cập vào trang quản trị. Chỉ admin mới có thể truy cập.
            </p>
            <button 
              onClick={() => window.location.href = "/"}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
