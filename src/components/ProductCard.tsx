import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

interface ProductCardProps {
  product: any;
  onNavigate: (page: any, slug?: string) => void;
}

export function ProductCard({ product, onNavigate }: ProductCardProps) {
  const addToCart = useMutation(api.cart.add);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) {
      toast.error("Sản phẩm đã hết hàng!");
      return;
    }
    
    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
      });
      toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isOutOfStock = product.stock === 0;

  const handleCardClick = () => {
    onNavigate("product", product.slug);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group block w-full text-left cursor-pointer"
      data-testid={`product-card-${product.slug}`}
    >
      <div className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
        isOutOfStock ? "out-of-stock-overlay" : ""
      }`}>
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
              -{discountPercent}%
            </div>
          )}
          
          {/* Flash Sale Badge */}
          {product.isFlashSale && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              ⚡ FLASH
            </div>
          )}

          {/* Add to Cart Button */}
          {!isOutOfStock && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-700 shadow-lg z-10"
              data-testid={`add-to-cart-${product.slug}`}
              aria-label={`Thêm ${product.name} vào giỏ hàng`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-1 mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className={`text-xl font-bold ${isOutOfStock ? "text-gray-400" : "text-red-600"}`}>
              {product.price.toLocaleString('vi-VN')}đ
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>

          {/* Stock */}
          {product.stock < 10 && product.stock > 0 && (
            <div className="mt-2 text-sm text-orange-600">
              Chỉ còn {product.stock} sản phẩm
            </div>
          )}
          
          {product.stock === 0 && (
            <div className="mt-2 text-sm text-red-600 font-semibold bg-red-50 px-2 py-1 rounded-lg border border-red-200">
              ❌ Hết hàng
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
