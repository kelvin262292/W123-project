import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { HeroBanner } from "../components/HeroBanner";
import { CategoryGrid } from "../components/CategoryGrid";
import { FlashSale } from "../components/FlashSale";
import { ProductGrid } from "../components/ProductGrid";
import { toast } from "sonner";

interface HomePageProps {
  onNavigate: (page: any, slug?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredProducts = useQuery(api.products.getFeatured, { limit: 8 }) || [];
  const flashSaleProducts = useQuery(api.products.getFlashSale) || [];
  const seedData = useMutation(api.seed.seedData);

  const handleSeedData = async () => {
    try {
      const result = await seedData();
      toast.success(result);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tạo dữ liệu mẫu");
    }
  };

  return (
    <div className="space-y-12">
      {/* Temporary seed button - remove after seeding */}
      {featuredProducts.length === 0 && (
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Chưa có dữ liệu sản phẩm
            </h3>
            <p className="text-blue-700 mb-4">
              Click nút bên dưới để tạo dữ liệu mẫu (sản phẩm và danh mục)
            </p>
            <button
              onClick={handleSeedData}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Tạo dữ liệu mẫu
            </button>
          </div>
        </div>
      )}
      
      <HeroBanner onNavigate={onNavigate} />
      <CategoryGrid onNavigate={onNavigate} />
      
      {flashSaleProducts.length > 0 && (
        <section className="container mx-auto px-4">
          <FlashSale products={flashSaleProducts} onNavigate={onNavigate} />
        </section>
      )}
      
      <section className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sản phẩm nổi bật
          </h2>
          <p className="text-gray-600">
            Những sản phẩm được yêu thích nhất
          </p>
        </div>
        <ProductGrid products={featuredProducts} onNavigate={onNavigate} />
      </section>
    </div>
  );
}
