import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  category: string;
}

export function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const faqItems: FAQItem[] = [
    // Đặt hàng
    {
      category: "order",
      question: "Tôi đặt hàng trên website Yapee như thế nào?",
      answer: (
        <p>
          Rất đơn giản! Bạn chỉ cần duyệt qua các danh mục sản phẩm, chọn sản phẩm muốn mua và nhấn nút "Thêm vào giỏ hàng". 
          Sau khi chọn đủ sản phẩm, bạn vào giỏ hàng, kiểm tra lại thông tin, điền địa chỉ nhận hàng, chọn phương thức vận chuyển, 
          phương thức thanh toán và nhấn "Đặt hàng".
        </p>
      ),
    },
    {
      category: "order",
      question: "Tôi có thể thay đổi hoặc hủy đơn hàng sau khi đã đặt không?",
      answer: (
        <p>
          Vui lòng liên hệ Hotline 0333.938.014 hoặc email cskh@yapee.vn sớm nhất có thể. 
          Chúng tôi sẽ hỗ trợ bạn thay đổi hoặc hủy đơn hàng nếu đơn hàng chưa được đóng gói và bàn giao cho đơn vị vận chuyển.
        </p>
      ),
    },
    {
      category: "order",
      question: "Làm thế nào để tôi kiểm tra tình trạng đơn hàng của mình?",
      answer: (
        <p>
          Bạn có thể kiểm tra tình trạng đơn hàng bằng cách đăng nhập vào tài khoản và xem lịch sử đơn hàng, hoặc liên hệ Hotline. 
          Chúng tôi cũng sẽ gửi email/SMS cập nhật trạng thái đơn hàng cho bạn.
        </p>
      ),
    },
    {
      category: "order",
      question: "Yapee có nhận đặt hàng số lượng lớn/đơn hàng dự án không?",
      answer: (
        <p>
          Có. Yapee luôn sẵn sàng đáp ứng nhu cầu mua hàng số lượng lớn. 
          Vui lòng liên hệ trực tiếp qua Hotline 0333.938.014 hoặc email cskh@yapee.vn 
          để trao đổi chi tiết về sản phẩm, số lượng và chính sách giá ưu đãi.
        </p>
      ),
    },
    
    // Thanh toán
    {
      category: "payment",
      question: "Yapee chấp nhận những phương thức thanh toán nào?",
      answer: (
        <div>
          <p>Chúng tôi chấp nhận các hình thức thanh toán linh hoạt:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Thanh toán khi nhận hàng (COD)</li>
            <li>Chuyển khoản ngân hàng</li>
            <li>Thanh toán trực tuyến qua cổng: Thẻ ATM nội địa, Thẻ tín dụng/ghi nợ (Visa, Mastercard,...), Ví điện tử</li>
          </ul>
        </div>
      ),
    },
    {
      category: "payment",
      question: "Thanh toán trực tuyến trên Yapee có an toàn không?",
      answer: (
        <p>
          Tuyệt đối an toàn. Mọi giao dịch thanh toán trực tuyến đều được thực hiện qua cổng thanh toán của đối tác uy tín, 
          được mã hóa bằng giao thức SSL và tuân thủ các tiêu chuẩn bảo mật quốc tế. Yapee không lưu trữ thông tin thẻ của bạn.
        </p>
      ),
    },
    {
      category: "payment",
      question: "Giá sản phẩm hiển thị trên website đã bao gồm thuế VAT chưa?",
      answer: (
        <p>
          Giá bán các sản phẩm tại Yapee đã bao gồm thuế Giá trị gia tăng (VAT). 
          Thông tin này cũng được ghi rõ trong chi tiết đơn hàng.
        </p>
      ),
    },
    
    // Giao hàng
    {
      category: "shipping",
      question: "Phí vận chuyển được tính như thế nào?",
      answer: (
        <p>
          Phí vận chuyển phụ thuộc vào địa chỉ nhận hàng và trọng lượng/kích thước đơn hàng. 
          Phí vận chuyển cụ thể sẽ được hiển thị rõ ràng ở bước thanh toán trước khi bạn xác nhận đặt hàng.
        </p>
      ),
    },
    {
      category: "shipping",
      question: "Thời gian giao hàng dự kiến là bao lâu?",
      answer: (
        <div>
          <p>Thời gian giao hàng dự kiến:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Nội thành TP.HCM: 1-2 ngày làm việc.</li>
            <li>Các tỉnh thành khác: 3-5 ngày làm việc.</li>
          </ul>
          <p className="mt-2">Thời gian giao hàng chính xác có thể thay đổi tùy thuộc vào địa chỉ cụ thể và điều kiện vận chuyển thực tế.</p>
        </div>
      ),
    },
    {
      category: "shipping",
      question: "Yapee có giao hàng toàn quốc không?",
      answer: (
        <p>
          Có, Yapee hỗ trợ giao hàng đến hầu hết các tỉnh thành trên toàn quốc.
        </p>
      ),
    },
    {
      category: "shipping",
      question: "Tôi có được thông báo trước khi giao hàng không?",
      answer: (
        <p>
          Có. Nhân viên giao hàng sẽ liên hệ với bạn qua điện thoại trước khi giao hàng để xác nhận thời gian và địa điểm nhận hàng.
        </p>
      ),
    },
    
    // Sản phẩm
    {
      category: "product",
      question: "Làm sao để biết sản phẩm trên Yapee là hàng chính hãng/chất lượng tốt?",
      answer: (
        <p>
          Yapee cam kết chỉ cung cấp các sản phẩm chất lượng cao, có nguồn gốc rõ ràng. 
          Chúng tôi làm việc trực tiếp với các nhà cung cấp uy tín và có quy trình kiểm tra chất lượng đầu vào. 
          Thông tin chi tiết về sản phẩm (thương hiệu, xuất xứ, thành phần,...) được công bố minh bạch trên trang chi tiết sản phẩm.
        </p>
      ),
    },
    {
      category: "product",
      question: "Hạn sử dụng của sản phẩm là bao lâu?",
      answer: (
        <p>
          Hạn sử dụng (HSD) khác nhau tùy thuộc vào từng loại sản phẩm. 
          Thông tin HSD được ghi rõ trên bao bì sản phẩm và/hoặc trong phần mô tả chi tiết trên website. 
          Yapee cam kết giao hàng có HSD còn đủ xa để bạn yên tâm sử dụng.
        </p>
      ),
    },
    
    // Đổi trả & Hoàn tiền
    {
      category: "return",
      question: "Chính sách đổi trả hàng của Yapee như thế nào?",
      answer: (
        <p>
          Yapee có chính sách đổi trả linh hoạt trong vòng 7 ngày kể từ ngày nhận hàng đối với các sản phẩm bị lỗi do nhà sản xuất, 
          giao sai hàng, hoặc hư hỏng do vận chuyển.
        </p>
      ),
    },
    {
      category: "return",
      question: "Làm thế nào để tôi yêu cầu đổi trả hàng?",
      answer: (
        <p>
          Bạn vui lòng liên hệ Hotline 0333.938.014 hoặc email cskh@yapee.vn và cung cấp mã đơn hàng, 
          thông tin sản phẩm cần đổi trả cùng lý do và hình ảnh/video chứng minh (nếu có). 
          Nhân viên CSKH sẽ hướng dẫn bạn các bước tiếp theo.
        </p>
      ),
    },
    {
      category: "return",
      question: "Khi nào tôi nhận được tiền hoàn lại?",
      answer: (
        <p>
          Sau khi Yapee nhận được hàng trả lại và xác nhận đủ điều kiện hoàn tiền, 
          chúng tôi sẽ tiến hành hoàn tiền cho bạn trong vòng 5-7 ngày làm việc qua phương thức chuyển khoản ngân hàng.
        </p>
      ),
    },
  ];

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "order", name: "Đặt hàng" },
    { id: "payment", name: "Thanh toán" },
    { id: "shipping", name: "Giao hàng" },
    { id: "product", name: "Sản phẩm" },
    { id: "return", name: "Đổi trả & Hoàn tiền" },
  ];

  const filteredFAQs = activeCategory === "all" 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Câu hỏi thường gặp</h1>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {filteredFAQs.map((faq, index) => (
            <FAQAccordion key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Bạn vẫn cần hỗ trợ?</h2>
          <p className="mb-4">
            Nếu câu hỏi của bạn không có trong danh sách này, hoặc bạn cần hỗ trợ thêm, vui lòng liên hệ trực tiếp với Bộ phận Chăm sóc Khách hàng của Yapee:
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">📞</span>
              <span>Hotline: 0333.938.014 (8h00 - 19h00, Thứ Hai - Chủ Nhật)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600">✉️</span>
              <span>Email: cskh@yapee.vn</span>
            </div>
          </div>
          <p className="mt-4 text-center font-medium">Yapee luôn sẵn lòng lắng nghe và giải đáp mọi thắc mắc của bạn!</p>
        </div>
      </div>
    </div>
  );
}

interface FAQAccordionProps {
  question: string;
  answer: React.ReactNode;
}

function FAQAccordion({ question, answer }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 md:p-6 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium">{question}</h3>
        <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200">
          <div className="prose max-w-none">{answer}</div>
        </div>
      )}
    </div>
  );
} 