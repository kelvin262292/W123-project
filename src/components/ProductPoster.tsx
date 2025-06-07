import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface ProductPosterProps {
  onNavigate: (page: any, slug?: string) => void;
}

export function ProductPoster({ onNavigate }: ProductPosterProps) {
  const featuredProducts = useQuery(api.products.getFeatured, { limit: 6 }) || [];
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
  const [scrollY, setScrollY] = useState(0);

  // Enhanced parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (featuredProducts.length > 0) {
      // Stagger animation with wave effect
      featuredProducts.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProducts(prev => [...prev, index]);
        }, index * 200);
      });
    }
  }, [featuredProducts.length]);

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 overflow-hidden">
      {/* Enhanced parallax background decorations */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-float-medium"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-float-fast"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-float-slow"></div>
        
        {/* Animated gradient waves */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-100/30 to-transparent animate-wave"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-100/30 to-transparent animate-wave-reverse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header with parallax */}
        <div 
          className="text-center mb-12"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-slide-in-up">
              🌟 Sản Phẩm Nổi Bật 🌟
            </h2>
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-expand"></div>
          </div>
          <p className="text-xl text-gray-600 mt-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Khám phá những sản phẩm được yêu thích nhất tại ShopVN
          </p>
        </div>

        {/* Enhanced Products Grid with parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, index) => {
            const isVisible = visibleProducts.includes(index);
            const discountPercent = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product._id}
                className={`transform transition-all duration-700 ${
                  isVisible 
                    ? "translate-y-0 opacity-100 scale-100" 
                    : "translate-y-8 opacity-0 scale-95"
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transform: `translateY(${scrollY * 0.03 * (index % 2 === 0 ? 1 : -1)}px)`,
                }}
              >
                <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 relative">
                  {/* Product Image with enhanced effects */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={product.images[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Enhanced discount badge with pulse animation */}
                    {discountPercent > 0 && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse-hot">
                        <span className="animate-bounce-gentle">-{discountPercent}%</span>
                      </div>
                    )}
                    
                    {/* Enhanced Flash Sale Badge with hot deal animation */}
                    {product.isFlashSale && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse-hot">
                        <span className="animate-flash">⚡ FLASH SALE</span>
                      </div>
                    )}

                    {/* Enhanced overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Floating particles on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-4 left-1/2 w-1 h-1 bg-white/60 rounded-full animate-sparkle"></div>
                      <div className="absolute bottom-4 right-1/4 w-1 h-1 bg-white/60 rounded-full animate-sparkle-delay"></div>
                      <div className="absolute top-1/2 right-4 w-1 h-1 bg-white/60 rounded-full animate-sparkle-fast"></div>
                    </div>
                  </div>

                  {/* Enhanced Product Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    {/* Enhanced Rating */}
                    {product.rating && (
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`transition-all duration-300 ${
                                i < Math.floor(product.rating || 0) 
                                  ? "text-yellow-400 animate-sparkle" 
                                  : "text-gray-300"
                              }`}
                              style={{ animationDelay: `${i * 100}ms` }}
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          ({product.reviewCount || 0} đánh giá)
                        </span>
                      </div>
                    )}

                    {/* Enhanced Price with animation */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-red-600 animate-pulse-price">
                          {product.price.toLocaleString('vi-VN')}đ
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through opacity-75">
                            {product.originalPrice.toLocaleString('vi-VN')}đ
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Enhanced CTA Button */}
                    <button
                      onClick={() => onNavigate("product", product.slug)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group-hover:animate-pulse-button"
                    >
                      <span className="group-hover:animate-bounce-x">Xem Chi Tiết</span>
                    </button>
                  </div>

                  {/* Product card glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Call to Action with parallax */}
        <div 
          className="text-center"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          <div className="inline-block bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 animate-gradient-flow"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 animate-bounce-gentle">
                🎉 Còn nhiều sản phẩm khác đang chờ bạn khám phá!
              </h3>
              <p className="text-gray-600 mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                Hàng ngàn sản phẩm chất lượng với giá tốt nhất thị trường
              </p>
              <button
                onClick={() => onNavigate("home")}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-button"
              >
                <span className="animate-bounce-x">Khám Phá Ngay 🚀</span>
              </button>
            </div>

            {/* Floating promotional elements */}
            <div className="absolute top-2 left-2 text-xl animate-float-particle">✨</div>
            <div className="absolute top-2 right-2 text-xl animate-float-particle-delay">🌟</div>
            <div className="absolute bottom-2 left-2 text-xl animate-float-particle-fast">💫</div>
            <div className="absolute bottom-2 right-2 text-xl animate-float-particle">⭐</div>
          </div>
        </div>
      </div>

      {/* Enhanced floating elements with parallax */}
      <div 
        className="absolute top-1/4 left-0 w-2 h-16 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full animate-pulse-glow"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      ></div>
      <div 
        className="absolute top-1/2 right-0 w-2 h-20 bg-gradient-to-b from-pink-400 to-red-400 rounded-l-full animate-pulse-glow"
        style={{
          transform: `translateY(${scrollY * -0.1}px)`,
          animationDelay: "1000ms"
        }}
      ></div>
    </section>
  );
}
