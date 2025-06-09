import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: any[];
  onNavigate: (page: any, slug?: string) => void;
}

export function ProductGrid({ products, onNavigate }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛍️</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Không tìm thấy sản phẩm
        </h3>
        <p className="text-gray-600">
          Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
        </p>
      </div>
    );
  }

  return (
    <div data-testid="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onNavigate={onNavigate} />
      ))}
    </div>
  );
}
