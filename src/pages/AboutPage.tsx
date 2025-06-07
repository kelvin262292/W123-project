import React from "react";

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Giới thiệu về Yapee</h1>

        {/* Lời chào và Sứ mệnh */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Lời chào và Sứ mệnh</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Chào mừng Quý khách đến với Yapee!
            </p>
            <p className="mb-4">
              Tại Yapee, chúng tôi tin rằng mọi người đều xứng đáng được tiếp cận những sản phẩm chất lượng cao mà không cần phải đắn đo về giá cả. Chính vì vậy, sứ mệnh của chúng tôi là <strong>"Yapee cung cấp các sản phẩm chất lượng cao với giá cả phải chăng. Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng."</strong>
            </p>
            <p className="mb-4">
              Chúng tôi hiểu rằng "chất lượng cao" không chỉ nằm ở bản thân sản phẩm mà còn ở quy trình lựa chọn, kiểm định nghiêm ngặt để đảm bảo mỗi mặt hàng đến tay Quý khách đều đạt tiêu chuẩn tốt nhất. Đồng thời, "giá cả phải chăng" là nỗ lực không ngừng của Yapee trong việc tối ưu hóa vận hành và hợp tác với các nhà cung cấp uy tín, nhằm mang lại giá trị tối đa cho ngân sách của bạn.
            </p>
            <p>
              Hơn thế nữa, Yapee luôn nỗ lực để "trải nghiệm mua sắm tốt nhất" không chỉ là lời hứa. Chúng tôi xây dựng một nền tảng mua sắm trực tuyến thân thiện, dễ sử dụng, cùng với dịch vụ hỗ trợ khách hàng tận tâm và quy trình vận hành đáng tin cậy. Việc xây dựng lòng tin và sự hài lòng của khách hàng là nền tảng cho sự phát triển bền vững của Yapee, bởi chúng tôi nhận thức rõ tầm quan trọng của sự an tâm và tin cậy trong môi trường thương mại điện tử ngày nay. Chúng tôi mong muốn Yapee không chỉ là nơi bán hàng, mà còn là người bạn đồng hành đáng tin cậy trong hành trình mua sắm của Quý khách.
            </p>
          </div>
        </section>

        {/* Giá trị Cốt lõi */}
        <section className="mb-12 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Giá trị Cốt lõi</h2>
          <p className="mb-4">Hoạt động của Yapee luôn xoay quanh những giá trị cốt lõi sau:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                  <span className="text-xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold">Chất lượng</h3>
              </div>
              <p>Chúng tôi không thỏa hiệp về chất lượng. Từ khâu lựa chọn sản phẩm đến quy trình bảo quản và vận chuyển, chất lượng luôn là ưu tiên hàng đầu.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                  <span className="text-xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold">Giá cả Hợp lý</h3>
              </div>
              <p>Chúng tôi cam kết mang đến mức giá cạnh tranh và hợp lý nhất có thể, giúp Quý khách tiết kiệm chi phí mà vẫn sở hữu được sản phẩm ưng ý.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-3">
                  <span className="text-xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold">Khách hàng là Trọng tâm</h3>
              </div>
              <p>Mọi quyết định và hành động của Yapee đều hướng đến sự hài lòng của khách hàng. Chúng tôi lắng nghe, thấu hiểu và nỗ lực đáp ứng nhu cầu của bạn một cách tốt nhất.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-3">
                  <span className="text-xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold">Đáng tin cậy</h3>
              </div>
              <p>Chúng tôi xây dựng niềm tin bằng sự minh bạch trong thông tin, sự chuẩn xác trong giao dịch và sự đảm bảo trong cam kết về sản phẩm và dịch vụ.</p>
            </div>
          </div>
        </section>

        {/* Cam kết của Chúng tôi */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Cam kết của Chúng tôi</h2>
          <div className="prose max-w-none">
            <p className="mb-2">Yapee cam kết:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Mang đến trải nghiệm mua sắm trực tuyến liền mạch, an toàn và tiện lợi.</li>
              <li>Kiểm soát chặt chẽ chất lượng sản phẩm, đảm bảo hàng hóa đến tay khách hàng đúng như mô tả.</li>
              <li>Cung cấp thông tin sản phẩm rõ ràng, minh bạch.</li>
              <li>Thực hiện quy trình giao hàng nhanh chóng và đáng tin cậy, như được nêu chi tiết trong Điều khoản Sử dụng.</li>
              <li>Bảo vệ tuyệt đối thông tin cá nhân của khách hàng theo Chính sách Bảo mật của chúng tôi, tuân thủ nghiêm ngặt các quy định pháp luật Việt Nam.</li>
              <li>Luôn lắng nghe và tiếp thu phản hồi của khách hàng để không ngừng cải thiện chất lượng dịch vụ.</li>
            </ul>
          </div>
        </section>

        {/* Tầm nhìn */}
        <section className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Tầm nhìn</h2>
          <p className="text-xl">
            Yapee hướng tới trở thành thương hiệu mua sắm trực tuyến được yêu thích và tin cậy hàng đầu tại Việt Nam, là lựa chọn ưu tiên của mọi gia đình khi tìm kiếm các sản phẩm chất lượng với giá cả phải chăng.
          </p>
        </section>

        {/* Thông tin Liên hệ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Thông tin Liên hệ</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Thông tin Cơ bản</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">🏢</span>
                <div>
                  <strong>Tên Cửa hàng:</strong> Yapee
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">📍</span>
                <div>
                  <strong>Địa chỉ:</strong> 74 đường số 13, Phường Bình Trị Đông B, quận Bình Tân, Thành phố Hồ Chí Minh
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">📞</span>
                <div>
                  <strong>Hotline:</strong> 0333.938.014
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">🕒</span>
                <div>
                  <strong>Thời gian làm việc:</strong> 8h00 - 19h00, từ Thứ Hai đến Chủ Nhật
                </div>
              </div>
            </div>

            <h3 className="text-xl font-medium mt-8 mb-4">Các Kênh Liên hệ Khác</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">✉️</span>
                <div>
                  <strong>Email Hỗ trợ Khách hàng:</strong> cskh@yapee.vn
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">💬</span>
                <div>
                  <strong>Zalo:</strong> 0333.938.014
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hỗ trợ Khách hàng */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Hỗ trợ Khách hàng</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Bộ phận Chăm sóc Khách hàng của Yapee luôn sẵn sàng hỗ trợ Quý khách về mọi vấn đề liên quan đến:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tư vấn thông tin sản phẩm.</li>
              <li>Hướng dẫn đặt hàng và thanh toán.</li>
              <li>Theo dõi tình trạng đơn hàng.</li>
              <li>Giải đáp các thắc mắc về chính sách giao hàng, đổi trả, bảo hành.</li>
              <li>Tiếp nhận và xử lý các yêu cầu hỗ trợ, khiếu nại (nếu có).</li>
              <li>Ghi nhận ý kiến đóng góp, phản hồi về sản phẩm và dịch vụ.</li>
            </ul>
            <p className="mt-4">
              Chúng tôi cố gắng phản hồi mọi yêu cầu trong thời gian sớm nhất, thường là trong vòng 24 giờ kể từ khi nhận được thông tin.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <button 
            onClick={() => window.history.back()} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Quay lại mua sắm
          </button>
        </div>
      </div>
    </div>
  );
} 