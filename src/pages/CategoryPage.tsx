import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ProductGrid } from "../components/ProductGrid";

interface CategoryPageProps {
  slug: string;
  onNavigate: (page: any, slug?: string) => void;
}

export function CategoryPage({ slug, onNavigate }: CategoryPageProps) {
  // State cho các bộ lọc
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tempMinPrice, setTempMinPrice] = useState<string>("");
  const [tempMaxPrice, setTempMaxPrice] = useState<string>("");

  // Parse search query from slug if it contains search parameter
  const searchQuery = slug.includes("search=") 
    ? decodeURIComponent(slug.split("search=")[1]) 
    : "";
  
  // Lấy categoryId từ slug nếu không phải là tìm kiếm
  const categorySlug = !searchQuery ? slug : "";
  const category = useQuery(api.categories.getBySlug, { slug: categorySlug });
  const categoryId = category?._id;
  
  // Lấy danh sách sản phẩm với các bộ lọc
  const productsResult = useQuery(api.products.list, {
    categoryId: categoryId,
    search: searchQuery || undefined,
    sortBy,
    minPrice,
    maxPrice,
    minRating,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
  }) || { page: [], isDone: true, continueCursor: null, totalCount: 0 };

  const products = productsResult.page || [];
  const totalProducts = productsResult.totalCount || 0;
  
  const categories = useQuery(api.categories.list) || [];
  const allTags = useQuery(api.products.getAllTags) || [];

  // Xử lý khi áp dụng bộ lọc giá
  const handleApplyPriceFilter = () => {
    setMinPrice(tempMinPrice ? Number(tempMinPrice) : undefined);
    setMaxPrice(tempMaxPrice ? Number(tempMaxPrice) : undefined);
    setShowFilters(false);
  };

  // Xử lý khi chọn danh mục
  const handleCategoryChange = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Xử lý khi chọn tag
  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Xử lý khi chọn đánh giá
  const handleRatingChange = (rating: number) => {
    setMinRating(rating === minRating ? undefined : rating);
  };

  // Xóa tất cả các bộ lọc
  const clearAllFilters = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinRating(undefined);
    setSelectedCategories([]);
    setSelectedTags([]);
    setTempMinPrice("");
    setTempMaxPrice("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <button onClick={() => onNavigate("home")} className="hover:text-blue-600">
          Trang chủ
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">
          {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : category?.name || "Tất cả sản phẩm"}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block w-64 space-y-6">
          {/* Nút xóa bộ lọc */}
          {(minPrice !== undefined || maxPrice !== undefined || minRating !== undefined || selectedTags.length > 0) && (
            <button 
              onClick={clearAllFilters}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Xóa bộ lọc
            </button>
          )}

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-semibold text-gray-900 mb-4">Danh mục</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category._id} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                  />
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
                  value={tempMinPrice}
                  onChange={(e) => setTempMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Đến"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={tempMaxPrice}
                  onChange={(e) => setTempMaxPrice(e.target.value)}
                />
              </div>
              <button 
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleApplyPriceFilter}
              >
                Áp dụng
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-semibold text-gray-900 mb-4">Đánh giá</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    checked={minRating === rating}
                    onChange={() => handleRatingChange(rating)}
                  />
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

          {allTags.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="space-y-2">
                {allTags.map((tag) => (
                  <label key={tag} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300"
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                    />
                    <span className="text-sm">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : category?.name || "Tất cả sản phẩm"}
              </h1>
              <p className="text-gray-600 mt-1">
                Tìm thấy {totalProducts} sản phẩm
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Applied Filters */}
              {(minPrice !== undefined || maxPrice !== undefined || minRating !== undefined || selectedTags.length > 0) && (
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Đã lọc:</span>
                  {minPrice !== undefined && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Từ {minPrice.toLocaleString()}đ
                    </span>
                  )}
                  {maxPrice !== undefined && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Đến {maxPrice.toLocaleString()}đ
                    </span>
                  )}
                  {minRating !== undefined && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {minRating}⭐ trở lên
                    </span>
                  )}
                  {selectedTags.length > 0 && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {selectedTags.length} tags
                    </span>
                  )}
                </div>
              )}

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
                <option value="rating_desc">Đánh giá cao nhất</option>
                <option value="popularity">Phổ biến nhất</option>
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
            
            {/* Mobile filter content */}
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Danh mục</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category._id} className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300"
                        checked={selectedCategories.includes(category._id)}
                        onChange={() => handleCategoryChange(category._id)}
                      />
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Khoảng giá</h4>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Từ"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      value={tempMinPrice}
                      onChange={(e) => setTempMinPrice(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Đến"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      value={tempMaxPrice}
                      onChange={(e) => setTempMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Đánh giá</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300"
                        checked={minRating === rating}
                        onChange={() => handleRatingChange(rating)}
                      />
                      <div className="flex items-center space-x-1">
                        {[...Array(rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">⭐</span>
                        ))}
                      </div>
                      <span className="text-sm">trở lên</span>
                    </label>
                  ))}
                </div>
              </div>

              {allTags.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Tags</h4>
                  <div className="space-y-2">
                    {allTags.map((tag) => (
                      <label key={tag} className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300"
                          checked={selectedTags.includes(tag)}
                          onChange={() => handleTagChange(tag)}
                        />
                        <span className="text-sm">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t flex space-x-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Xóa bộ lọc
              </button>
              <button
                onClick={handleApplyPriceFilter}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
