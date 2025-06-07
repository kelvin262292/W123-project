// Removed react-router-dom dependency

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🛍️</span>
              </div>
              <span className="text-xl font-bold">Yapee</span>
            </div>
            <p className="text-gray-400">
              Yapee cung cấp các sản phẩm chất lượng cao với giá cả phải chăng. Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <span>📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <span>📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <span>🐦</span>
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Chăm sóc khách hàng</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả</a></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Về Yapee</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="javascript:void(0)" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'about' }))} className="hover:text-white transition-colors">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a></li>
              <li><a href="javascript:void(0)" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'faq' }))} className="hover:text-white transition-colors">Câu hỏi thường gặp</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thông tin liên hệ</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start space-x-2">
                <span>📍</span>
                <span>74 đường số 13, Phường Bình Trị Đông B, quận Bình Tân, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <span>0333.938.014</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>✉️</span>
                <span>cskh@yapee.vn</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🕒</span>
                <span>8h00 - 19h00, Thứ Hai - Chủ Nhật</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Yapee. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
