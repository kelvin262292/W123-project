import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

interface CheckoutPageProps {
  onNavigate: (page: any, slug?: string) => void;
}

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const cartItems = useQuery(api.cart.list) || [];
  const createOrder = useMutation(api.orders.create);
  const clearCart = useMutation(api.cart.clear);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    paymentMethod: "cod",
    couponCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng trống!");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const orderItems = cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.product?.price || 0,
        variants: item.variants,
      }));

      await createOrder({
        items: orderItems,
        totalAmount: total,
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          ward: formData.ward,
        },
        paymentMethod: formData.paymentMethod === "bank" ? "vnpay" : formData.paymentMethod as "cod" | "vnpay" | "momo" | "zalopay",
        couponCode: formData.couponCode || undefined,
      });

      await clearCart();
      
      toast.success("Đặt hàng thành công!");
      onNavigate("account");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đặt hàng!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Giỏ hàng trống
          </h2>
          <p className="text-gray-600 mb-6">
            Bạn cần có sản phẩm trong giỏ hàng để thanh toán
          </p>
          <button
            onClick={() => onNavigate("home")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Thông tin giao hàng
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Số nhà, tên đường"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tỉnh/Thành phố *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quận/Huyện *
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phường/Xã *
                </label>
                <input
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Phương thức thanh toán
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleInputChange}
                  className="text-blue-600"
                />
                <div className="flex-1">
                  <div className="font-semibold">Thanh toán khi nhận hàng (COD)</div>
                  <div className="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</div>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-300 rounded-lg hover:bg-gray-50 opacity-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  disabled
                  className="text-blue-600"
                />
                <div className="flex-1">
                  <div className="font-semibold">Chuyển khoản ngân hàng</div>
                  <div className="text-sm text-gray-600">Sắp có</div>
                </div>
              </label>
            </div>
          </div>

          {/* Coupon */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Mã giảm giá
            </h3>
            
            <div className="flex space-x-4">
              <input
                type="text"
                name="couponCode"
                value={formData.couponCode}
                onChange={handleInputChange}
                placeholder="Nhập mã giảm giá"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-md sticky top-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Đơn hàng của bạn
            </h3>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center space-x-3">
                  <img
                    src={item.product?.images?.[0] || "/placeholder.jpg"}
                    alt={item.product?.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      {item.product?.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      Số lượng: {item.quantity}
                    </div>
                  </div>
                  <div className="font-semibold text-sm">
                    {((item.product?.price || 0) * item.quantity).toLocaleString('vi-VN')}đ
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary */}
            <div className="space-y-3 mb-6 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span className="font-semibold">
                  {subtotal.toLocaleString('vi-VN')}đ
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span className="font-semibold">
                  {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString('vi-VN')}đ`}
                </span>
              </div>
              
              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Tổng cộng</span>
                <span className="text-red-600">
                  {total.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
