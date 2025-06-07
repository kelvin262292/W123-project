import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";

interface CategoryGridProps {
  onNavigate: (page: any, slug?: string) => void;
}

export function CategoryGrid({ onNavigate }: CategoryGridProps) {
  const categories = useQuery(api.categories.getFeatured) || [];
  const [visibleCategories, setVisibleCategories] = useState<number[]>([]);
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stagger animation for categories
  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCategories(prev => [...prev, index]);
        }, index * 150);
      });
    }
  }, [categories.length]);

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Enhanced parallax background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-pink-200 rounded-full animate-float-fast"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-indigo-200 rounded-full animate-float-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header with parallax */}
        <div 
          className="text-center mb-12"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-slide-in-up">
            🏷️ Danh Mục Sản Phẩm
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-expand"></div>
          <p className="text-xl text-gray-600 mt-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Khám phá các danh mục sản phẩm đa dạng
          </p>
        </div>

        {/* Enhanced category grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const isVisible = visibleCategories.includes(index);
            
            return (
              <div
                key={category._id}
                className={`transform transition-all duration-700 ${
                  isVisible 
                    ? "translate-y-0 opacity-100 scale-100" 
                    : "translate-y-8 opacity-0 scale-95"
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transform: `translateY(${scrollY * 0.05 * (index % 2 === 0 ? 1 : -1)}px)`,
                }}
              >
                <button
                  onClick={() => onNavigate("category", category.slug)}
                  className="group w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 text-center border border-gray-100 hover:border-blue-200 transform hover:scale-105 hover:rotate-1 relative overflow-hidden"
                >
                  {/* Promotional pulse effect for featured categories */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow"></div>
                  
                  {/* Category icon with enhanced animations */}
                  <div className="text-4xl md:text-5xl mb-4 group-hover:animate-bounce-gentle transition-all duration-300 transform group-hover:scale-110">
                    {category.icon}
                  </div>
                  
                  {/* Category name */}
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  {/* Category description */}
                  {category.description && (
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {category.description}
                    </p>
                  )}

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-2 right-2 w-1 h-1 bg-blue-400 rounded-full animate-sparkle"></div>
                    <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400 rounded-full animate-sparkle-delay"></div>
                    <div className="absolute top-1/2 left-2 w-1 h-1 bg-pink-400 rounded-full animate-sparkle-fast"></div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Enhanced promotional banner */}
        <div 
          className="mt-16 text-center"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          <div className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden animate-pulse-glow">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 animate-gradient-flow"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 animate-bounce-gentle">
                🔥 KHUYẾN MÃI HOT 🔥
              </h3>
              <p className="text-lg mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                Giảm giá lên đến <span className="text-3xl font-bold animate-pulse">70%</span> cho tất cả danh mục!
              </p>
              <button 
                onClick={() => onNavigate("category")}
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce-x"
              >
                Mua Ngay 🛒
              </button>
            </div>

            {/* Floating promotional elements */}
            <div className="absolute top-2 left-2 text-2xl animate-bounce">💥</div>
            <div className="absolute top-2 right-2 text-2xl animate-bounce" style={{ animationDelay: "500ms" }}>⚡</div>
            <div className="absolute bottom-2 left-2 text-2xl animate-bounce" style={{ animationDelay: "1000ms" }}>🎉</div>
            <div className="absolute bottom-2 right-2 text-2xl animate-bounce" style={{ animationDelay: "1500ms" }}>🎁</div>
          </div>
        </div>
      </div>

      {/* Enhanced floating elements */}
      <div className="absolute top-1/4 left-0 w-2 h-20 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full animate-pulse-glow"></div>
      <div className="absolute top-1/2 right-0 w-2 h-24 bg-gradient-to-b from-pink-400 to-red-400 rounded-l-full animate-pulse-glow" style={{ animationDelay: "1000ms" }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-sparkle"></div>
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-sparkle-delay"></div>
    </section>
  );
}
