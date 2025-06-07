import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export function AdminProducts() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const products = useQuery(api.products.list, {
    search: searchTerm || undefined,
    sortBy,
  }) || [];

  const categories = useQuery(api.categories.list) || [];
  const deleteProduct = useMutation(api.products.remove);

  const filteredProducts = products.filter(product => {
    if (selectedCategory && product.categoryId !== selectedCategory) {
      return false;
    }
    return true;
  });

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct({ productId: productId as any });
        toast.success("Đã xóa sản phẩm!");
      } catch (error) {
        toast.error("Có lỗi xảy ra!");
      }
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: "Hết hàng", color: "bg-red-100 text-red-800" };
    if (stock < 10) return { text: "Sắp hết", color: "bg-yellow-100 text-yellow-800" };
    return { text: "Còn hàng", color: "bg-green-100 text-green-800" };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
          <p className="text-gray-600 mt-1">Quản lý toàn bộ sản phẩm trong cửa hàng</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
        >
          <span className="text-xl">➕</span>
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tên sản phẩm, SKU..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sắp xếp
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="price_asc">Giá thấp đến cao</option>
              <option value="price_desc">Giá cao đến thấp</option>
              <option value="stock_asc">Tồn kho ít nhất</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
              <span>📊</span>
              <span>Xuất Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sản phẩm</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">SKU</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Danh mục</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Giá</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tồn kho</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Trạng thái</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const category = categories.find(c => c._id === product.categoryId);
                const stockStatus = getStockStatus(product.stock);
                
                return (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.images[0] || "/placeholder.jpg"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-gray-600">
                        {product._id.slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {category?.name || "Chưa phân loại"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {product.price.toLocaleString('vi-VN')}đ
                        </p>
                        {product.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            {product.originalPrice.toLocaleString('vi-VN')}đ
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <span className="text-sm">✏️</span>
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <span className="text-sm">👁️</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <span className="text-sm">🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-gray-600">
              Thử thay đổi bộ lọc hoặc thêm sản phẩm mới
            </p>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddForm && (
        <AddProductModal
          onClose={() => setShowAddForm(false)}
          categories={categories}
        />
      )}
    </div>
  );
}

function AddProductModal({ onClose, categories }: { onClose: () => void; categories: any[] }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
    originalPrice: 0,
    categoryId: "",
    stock: 0,
    images: [] as string[],
    tags: [] as string[],
  });

  const addProduct = useMutation(api.products.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addProduct({
        ...formData,
        categoryId: formData.categoryId as any,
      });
      toast.success("Đã thêm sản phẩm!");
      onClose();
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Thêm sản phẩm mới</h3>
              <p className="text-sm text-gray-600">Bước {step}/3</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          {/* Progress */}
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= stepNum ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNum ? "bg-blue-600" : "bg-gray-200"
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={step >= 1 ? "text-blue-600 font-medium" : "text-gray-600"}>
                Thông tin cơ bản
              </span>
              <span className={step >= 2 ? "text-blue-600 font-medium" : "text-gray-600"}>
                Giá & Kho
              </span>
              <span className={step >= 3 ? "text-blue-600 font-medium" : "text-gray-600"}>
                Hình ảnh & Tags
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên sản phẩm *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nhập tên sản phẩm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="tu-dong-tao-tu-ten-san-pham"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danh mục *
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả sản phẩm
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Mô tả chi tiết về sản phẩm"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Price & Stock */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giá bán *
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                        required
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giá gốc
                      </label>
                      <input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số lượng tồn kho *
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                      required
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>

                  {formData.originalPrice > 0 && formData.price > 0 && formData.originalPrice > formData.price && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">💰</span>
                        <span className="text-green-800 font-medium">
                          Giảm giá {Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Images & Tags */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hình ảnh sản phẩm
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <div className="text-4xl mb-4">📷</div>
                      <p className="text-gray-600 mb-2">Kéo thả hình ảnh vào đây</p>
                      <p className="text-sm text-gray-500">hoặc click để chọn file</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (phân cách bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Apple, iPhone, 5G"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {step > 1 ? "Quay lại" : "Hủy"}
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tiếp tục
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Thêm sản phẩm
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
