import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

interface CartPageProps {
  onNavigate: (page: any, slug?: string) => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const cartItems = useQuery(api.cart.list) || [];
  const updateQuantity = useMutation(api.cart.updateQuantity);
  const removeItem = useMutation(api.cart.remove);

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      await updateQuantity({ itemId: itemId as any, quantity: newQuantity });
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeItem({ itemId: itemId as any });
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Giỏ hàng trống
          </h2>
          <p className="text-gray-600 mb-6">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </p>
          <button
            onClick={() => onNavigate("home")}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center space-x-4">
                <img
                  src={item.product?.images?.[0] || "/placeholder.jpg"}
                  alt={item.product?.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.product?.name}
                  </h3>
                  
                  {item.variants && item.variants.length > 0 && (
                    <div className="text-sm text-gray-600 mb-2">
                      {item.variants.map((variant, index) => (
                        <span key={index}>
                          {variant.type}: {variant.value}
                          {index < item.variants!.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-red-600">
                      {(item.product?.price || 0).toLocaleString('vi-VN')}đ
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-md sticky top-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Tóm tắt đơn hàng
            </h3>
            
            <div className="space-y-4 mb-6">
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
              
              {shipping === 0 && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  🎉 Bạn được miễn phí vận chuyển!
                </div>
              )}
              
              {shipping > 0 && (
                <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                  Mua thêm {(500000 - subtotal).toLocaleString('vi-VN')}đ để được miễn phí vận chuyển
                </div>
              )}
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-red-600">
                    {total.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => onNavigate("checkout")}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
            >
              Tiến hành thanh toán
            </button>
            
            <button
              onClick={() => onNavigate("home")}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center block mt-3"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
