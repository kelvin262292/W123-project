import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";

interface FlashSaleProps {
  products: any[];
  onNavigate: (page: any, slug?: string) => void;
}

export function FlashSale({ products, onNavigate }: FlashSaleProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (products.length > 0) {
      const endTime = Math.max(...products.map(p => p.flashSaleEndTime || 0));
      
      const timer = setInterval(() => {
        const now = Date.now();
        const diff = endTime - now;
        
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          setTimeLeft({ hours, minutes, seconds });
        } else {
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [products]);

  if (products.length === 0) return null;

  return (
    <section className="bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Flash Sale</h2>
            <p className="opacity-90">Giảm giá sốc trong thời gian có hạn</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px]">
              <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-xs opacity-75">Giờ</div>
            </div>
          </div>
          <div className="text-2xl">:</div>
          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px]">
              <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-xs opacity-75">Phút</div>
            </div>
          </div>
          <div className="text-2xl">:</div>
          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px]">
              <div className="text-2xl font-bold animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-xs opacity-75">Giây</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <div key={product._id} className="bg-white rounded-2xl p-4 transform hover:scale-105 transition-all duration-300">
            <ProductCard product={product} onNavigate={onNavigate} />
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => onNavigate("category", "flash-sale")}
          className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300"
        >
          <span>Xem tất cả</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
