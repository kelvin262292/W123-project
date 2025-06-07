import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface HeroBannerProps {
  onNavigate: (page: any, slug?: string) => void;
}

export function HeroBanner({ onNavigate }: HeroBannerProps) {
  const banners = useQuery(api.banners.list) || [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (banners.length > 1 && !isPaused) {
      setProgress(0);
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleSlideChange((currentSlide + 1) % banners.length);
            return 0;
          }
          return prev + 1;
        });
      }, 50); // Smoother progress animation
      return () => clearInterval(progressTimer);
    }
  }, [banners.length, isPaused, currentSlide]);

  const handleSlideChange = (newSlide: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(newSlide);
    setProgress(0);
    
    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  if (banners.length === 0) {
    return (
      <section className="relative h-96 md:h-[600px] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white overflow-hidden">
        {/* Enhanced background decorations with parallax effect */}
        <div className="absolute inset-0 parallax-bg">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float-slow"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-white/5 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float-fast"></div>
          <div className="absolute bottom-32 right-1/3 w-40 h-40 bg-white/5 rounded-full animate-float-slow"></div>
          
          {/* Enhanced floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-sparkle"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-sparkle-delay"></div>
          <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-white/40 rounded-full animate-sparkle-fast"></div>
          
          {/* Gradient waves */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent animate-wave"></div>
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
          {/* Enhanced main heading with better animations */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold animate-slide-in-up">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent animate-gradient-shift">
                🎉 Chào mừng đến 
              </span>
              <br />
              <span className="text-white drop-shadow-2xl animate-glow-text">
                ShopVN
              </span>
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto rounded-full animate-expand"></div>
          </div>

          {/* Enhanced subtitle */}
          <p className="text-xl md:text-3xl opacity-95 animate-fade-in-up font-light leading-relaxed">
            🛍️ Khám phá hàng triệu sản phẩm chất lượng cao
            <br />
            <span className="text-yellow-200 font-semibold animate-pulse-glow">với giá tốt nhất thị trường!</span>
          </p>

          {/* Enhanced features highlight with stagger animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {[
              { icon: "🚚", title: "Giao hàng nhanh", subtitle: "Miễn phí ship", delay: "0ms" },
              { icon: "💎", title: "Chất lượng cao", subtitle: "Hàng chính hãng", delay: "200ms" },
              { icon: "🎁", title: "Ưu đại khủng", subtitle: "Giảm đến 70%", delay: "400ms" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:rotate-1 animate-slide-in-up"
                style={{ animationDelay: feature.delay }}
              >
                <div className="text-3xl mb-2 animate-bounce-gentle">{feature.icon}</div>
                <div className="text-sm font-semibold">{feature.title}</div>
                <div className="text-xs opacity-80">{feature.subtitle}</div>
              </div>
            ))}
          </div>

          {/* Enhanced call to action buttons */}
          <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <button 
              onClick={() => onNavigate("category")}
              className="group w-full md:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/25 animate-pulse-button"
            >
              <span className="group-hover:animate-bounce-x">🛒 Mua ngay</span>
            </button>
            <button 
              onClick={() => onNavigate("poster")}
              className="group w-full md:w-auto border-2 border-white/70 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 hover:border-white transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
            >
              <span className="group-hover:animate-sparkle">✨ Xem sản phẩm nổi bật</span>
            </button>
          </div>

          {/* Enhanced trust indicators */}
          <div className="flex justify-center items-center space-x-8 mt-8 opacity-80 animate-fade-in-up" style={{ animationDelay: "800ms" }}>
            {[
              { number: "1M+", label: "Khách hàng" },
              { number: "100K+", label: "Sản phẩm" },
              { number: "4.8⭐", label: "Đánh giá" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-2xl font-bold group-hover:animate-count-up transition-all duration-300">{stat.number}</div>
                <div className="text-xs">{stat.label}</div>
                {index < 2 && <div className="w-px h-8 bg-white/30 absolute right-0 top-0"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced animated border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 animate-gradient-flow"></div>
      </section>
    );
  }

  return (
    <section 
      className="relative h-96 md:h-[500px] overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Enhanced Banner Container with smooth transitions */}
      <div className="relative h-full">
        {banners.map((banner, index) => (
          <div
            key={banner._id}
            className={`absolute inset-0 transition-all duration-800 ease-in-out transform ${
              index === currentSlide 
                ? "opacity-100 scale-100 translate-x-0" 
                : index < currentSlide 
                  ? "opacity-0 scale-95 -translate-x-full" 
                  : "opacity-0 scale-95 translate-x-full"
            }`}
            style={{
              backgroundImage: `url(${banner.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Enhanced parallax overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 transition-opacity duration-500 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-black/50"></div>
            
            {/* Enhanced content with better animations */}
            <div className="relative h-full flex items-center justify-center text-white text-center">
              <div className="space-y-6 max-w-4xl px-4">
                <h1 className={`text-4xl md:text-6xl font-bold transition-all duration-1000 transform ${
                  index === currentSlide ? "animate-slide-in-up opacity-100" : "opacity-0 translate-y-8"
                }`}>
                  {banner.title}
                </h1>
                {banner.subtitle && (
                  <p className={`text-xl md:text-2xl opacity-90 transition-all duration-1000 delay-200 transform ${
                    index === currentSlide ? "animate-slide-in-up opacity-90" : "opacity-0 translate-y-8"
                  }`}>
                    {banner.subtitle}
                  </p>
                )}
                {banner.buttonText && (
                  <div className={`space-x-4 transition-all duration-1000 delay-400 transform ${
                    index === currentSlide ? "animate-slide-in-up opacity-100" : "opacity-0 translate-y-8"
                  }`}>
                    <button className="group bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse-gentle">
                      <span className="group-hover:animate-bounce-x">{banner.buttonText}</span>
                    </button>
                    <button className="group border-2 border-white/50 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                      <span className="group-hover:animate-sparkle">Xem ưu đãi</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Floating particles for each banner */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float-particle"></div>
              <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-float-particle-delay"></div>
              <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-white/40 rounded-full animate-float-particle-fast"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced progress bar */}
      {banners.length > 1 && !isPaused && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-100 ease-linear animate-gradient-flow"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Enhanced indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`transition-all duration-300 transform hover:scale-125 ${
                index === currentSlide
                  ? "w-8 h-3 bg-white rounded-full animate-pulse-glow"
                  : "w-3 h-3 bg-white/50 hover:bg-white/75 rounded-full"
              }`}
            />
          ))}
        </div>
      )}

      {/* Enhanced Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() => handleSlideChange((currentSlide - 1 + banners.length) % banners.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group hover:scale-110"
          >
            <svg className="w-6 h-6 transform group-hover:scale-110 group-hover:-translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => handleSlideChange((currentSlide + 1) % banners.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group hover:scale-110"
          >
            <svg className="w-6 h-6 transform group-hover:scale-110 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Slide transition overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 pointer-events-none"></div>
      )}
    </section>
  );
}
