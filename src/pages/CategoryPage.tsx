import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ProductGrid } from "../components/ProductGrid";

interface CategoryPageProps {
  slug: string;
  onNavigate: (page: any, slug?: string) => void;
}

export function CategoryPage({ slug, onNavigate }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Parse search query from slug if it contains search parameter
  const searchQuery = slug.includes("search=") 
    ? decodeURIComponent(slug.split("search=")[1]) 
    : "";
  
  const products = useQuery(api.products.list, {
    search: searchQuery || undefined,
    sortBy,
  }) || [];

  const categories = useQuery(api.categories.list) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <button onClick={() => onNavigate("home")} className="hover:text-blue-600">
          Trang chủ
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">
          {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : "Tất cả sản phẩm"}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block w-64 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-semibold text-gray-900 mb-4">Danh mục</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category._id} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-semibold text-gray-900 mb-4">Khoảng giá</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Từ"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Đến"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Áp dụng
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-semibold text-gray-900 mb-4">Đánh giá</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <div className="flex items-center space-x-1">
                    {[...Array(rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                      <span key={i} className="text-gray-300">⭐</span>
                    ))}
                  </div>
                  <span className="text-sm">trở lên</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : "Tất cả sản phẩm"}
              </h1>
              <p className="text-gray-600 mt-1">
                Tìm thấy {products.length} sản phẩm
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Lọc</span>
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Mới nhất</option>
                <option value="price_asc">Giá thấp đến cao</option>
                <option value="price_desc">Giá cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid products={products} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)}></div>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Bộ lọc</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Mobile filter content would go here */}
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Danh mục</h4>
                <div className="space-y-2">
                  {categories.slice(0, 5).map((category) => (
                    <label key={category._id} className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Áp dụng bộ lọc
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
