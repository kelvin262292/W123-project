import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export function AdminCategories() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useQuery(api.categories.list) || [];
  const deleteCategory = useMutation(api.categories.remove);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCategory = async (categoryId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        await deleteCategory({ categoryId: categoryId as any });
        toast.success("Đã xóa danh mục!");
      } catch (error) {
        toast.error("Có lỗi xảy ra!");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý danh mục</h1>
          <p className="text-gray-600 mt-1">Tổ chức và phân loại sản phẩm</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
        >
          <span className="text-xl">➕</span>
          <span>Thêm danh mục</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">📂</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
              <div className="text-sm text-gray-600">Tổng danh mục</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">⭐</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {categories.filter(c => c.isFeatured).length}
              </div>
              <div className="text-sm text-gray-600">Nổi bật</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">🔗</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {categories.filter(c => c.parentId).length}
              </div>
              <div className="text-sm text-gray-600">Danh mục con</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xl">✅</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {categories.filter(c => c.isActive !== false).length}
              </div>
              <div className="text-sm text-gray-600">Đang hoạt động</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm danh mục..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                  {category.icon || "📂"}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.slug}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {category.isFeatured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    ⭐ Nổi bật
                  </span>
                )}
                {category.isActive !== false ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    ✅ Hoạt động
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    ❌ Tạm dừng
                  </span>
                )}
              </div>
            </div>

            {category.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {category.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {category.parentId ? "Danh mục con" : "Danh mục chính"}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingCategory(category)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <span className="text-sm">✏️</span>
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <span className="text-sm">🗑️</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Không tìm thấy danh mục
          </h3>
          <p className="text-gray-600">
            Thử thay đổi từ khóa tìm kiếm hoặc thêm danh mục mới
          </p>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {(showAddForm || editingCategory) && (
        <CategoryModal
          category={editingCategory}
          categories={categories}
          onClose={() => {
            setShowAddForm(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
}

function CategoryModal({ 
  category, 
  categories, 
  onClose 
}: { 
  category?: any; 
  categories: any[]; 
  onClose: () => void; 
}) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    icon: category?.icon || "",
    description: category?.description || "",
    parentId: category?.parentId || "",
    isActive: category?.isActive !== false,
    isFeatured: category?.isFeatured || false,
  });

  const createCategory = useMutation(api.categories.create);
  const updateCategory = useMutation(api.categories.update);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (category) {
        await updateCategory({
          categoryId: category._id,
          ...formData,
          parentId: formData.parentId || undefined,
        });
        toast.success("Đã cập nhật danh mục!");
      } else {
        await createCategory({
          ...formData,
          parentId: formData.parentId || undefined,
        });
        toast.success("Đã thêm danh mục!");
      }
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

  const parentCategories = categories.filter(c => !c.parentId && c._id !== category?._id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {category ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
              </h3>
              <p className="text-sm text-gray-600">
                {category ? "Cập nhật thông tin danh mục" : "Tạo danh mục sản phẩm mới"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên danh mục *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập tên danh mục"
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
                    placeholder="tu-dong-tao-tu-ten"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="📱"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục cha
                  </label>
                  <select
                    value={formData.parentId}
                    onChange={(e) => setFormData(prev => ({ ...prev, parentId: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Danh mục gốc</option>
                    {parentCategories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mô tả về danh mục này"
                />
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Kích hoạt danh mục
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                    Danh mục nổi bật
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                {category ? "Cập nhật" : "Thêm danh mục"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
