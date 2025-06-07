import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

interface ProductPageProps {
  slug: string;
  onNavigate: (page: any, slug?: string) => void;
}

export function ProductPage({ slug, onNavigate }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const product = useQuery(api.products.getBySlug, { slug });
  const addToCart = useMutation(api.cart.add);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Không tìm thấy sản phẩm
          </h2>
          <p className="text-gray-600 mb-4">
            Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa
          </p>
          <button
            onClick={() => onNavigate("home")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      const variants = Object.entries(selectedVariants).map(([type, value]) => ({
        type,
        value,
      }));

      await addToCart({
        productId: product._id,
        quantity,
        variants: variants.length > 0 ? variants : undefined,
      });
      toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Group variants by type
  const variantsByType = product.variants?.reduce((acc: Record<string, any[]>, variant: any) => {
    if (!acc[variant.type]) {
      acc[variant.type] = [];
    }
    acc[variant.type].push(variant);
    return acc;
  }, {} as Record<string, any[]>) || {};

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <button onClick={() => onNavigate("home")} className="hover:text-blue-600">
          Trang chủ
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={product.images[selectedImage] || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}>
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviewCount || 0} đánh giá)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl font-bold text-red-600">
                {product.price.toLocaleString('vi-VN')}đ
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {product.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                    -{discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Flash Sale */}
            {product.isFlashSale && (
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-lg mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">⚡</span>
                  <span className="font-bold">FLASH SALE</span>
                </div>
                <p className="text-sm opacity-90">Ưu đãi có thời hạn!</p>
              </div>
            )}
          </div>

          {/* Variants */}
          {Object.entries(variantsByType).map(([type, variants]) => (
            <div key={type}>
              <h3 className="font-semibold text-gray-900 mb-3 capitalize">
                {type === "size" ? "Kích thước" : type === "color" ? "Màu sắc" : type}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(variants as any[]).map((variant: any) => (
                  <button
                    key={`${variant.type}-${variant.value}`}
                    onClick={() => setSelectedVariants(prev => ({
                      ...prev,
                      [type]: variant.value
                    }))}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedVariants[type] === variant.value
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Số lượng</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-gray-600">
                {product.stock} sản phẩm có sẵn
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
            </button>
            
            <button 
              onClick={() => onNavigate("checkout")}
              className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Mua ngay
            </button>
          </div>

          {/* Product Info */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Mô tả sản phẩm</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Thẻ</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
