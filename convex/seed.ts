import { mutation } from "./_generated/server";

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existingCategories = await ctx.db.query("categories").collect();
    const existingProducts = await ctx.db.query("products").collect();
    
    if (existingCategories.length > 0 || existingProducts.length > 0) {
      return "Data already exists";
    }

    // Create categories first
    const categories = [
      {
        name: "Điện tử",
        slug: "dien-tu",
        description: "Thiết bị điện tử, công nghệ",
        icon: "📱",
        isActive: true,
        isFeatured: true,
      },
      {
        name: "Thời trang",
        slug: "thoi-trang",
        description: "Quần áo, phụ kiện thời trang",
        icon: "👕",
        isActive: true,
        isFeatured: true,
      },
      {
        name: "Gia dụng",
        slug: "gia-dung",
        description: "Đồ gia dụng, nội thất",
        icon: "🏠",
        isActive: true,
        isFeatured: true,
      },
      {
        name: "Sách & Văn phòng phẩm",
        slug: "sach-van-phong-pham",
        description: "Sách, dụng cụ học tập, văn phòng",
        icon: "📚",
        isActive: true,
        isFeatured: false,
      },
    ];

    const categoryIds: Record<string, any> = {};
    
    for (const category of categories) {
      const categoryId = await ctx.db.insert("categories", category);
      categoryIds[category.slug] = categoryId;
    }

    // Create sample products
    const products = [
      {
        name: "iPhone 15 Pro Max",
        slug: "iphone-15-pro-max",
        description: "Smartphone cao cấp với chip A17 Pro, camera 48MP và màn hình Super Retina XDR 6.7 inch.",
        shortDescription: "Điện thoại thông minh cao cấp với hiệu năng vượt trội",
        price: 29990000,
        originalPrice: 32990000,
        categoryId: categoryIds["dien-tu"],
        images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"],
        stock: 25,
        rating: 4.8,
        reviewCount: 156,
        isActive: true,
        isFeatured: true,
        isFlashSale: true,
        flashSaleEndTime: Date.now() + 7 * 24 * 60 * 60 * 1000,
        tags: ["smartphone", "apple", "cao-cap"],
        specifications: [
          { name: "Màn hình", value: "6.7 inch Super Retina XDR" },
          { name: "Chip", value: "A17 Pro" },
          { name: "Camera", value: "48MP + 12MP + 12MP" },
          { name: "Pin", value: "4422 mAh" }
        ]
      },
      {
        name: "MacBook Air M3",
        slug: "macbook-air-m3",
        description: "Laptop siêu mỏng với chip M3 mạnh mẽ, pin 18 giờ và màn hình Liquid Retina 13.6 inch.",
        shortDescription: "Laptop siêu mỏng, hiệu năng cao cho công việc và sáng tạo",
        price: 27990000,
        originalPrice: 29990000,
        categoryId: categoryIds["dien-tu"],
        images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500"],
        stock: 15,
        rating: 4.9,
        reviewCount: 89,
        isActive: true,
        isFeatured: true,
        tags: ["laptop", "apple", "macbook"],
        specifications: [
          { name: "Chip", value: "Apple M3" },
          { name: "RAM", value: "8GB" },
          { name: "SSD", value: "256GB" },
          { name: "Màn hình", value: "13.6 inch Liquid Retina" }
        ]
      },
      {
        name: "Áo Polo Nam Premium",
        slug: "ao-polo-nam-premium",
        description: "Áo polo nam chất liệu cotton cao cấp, thiết kế thanh lịch, phù hợp cho công sở và dạo phố.",
        shortDescription: "Áo polo nam chất liệu cao cấp, thiết kế thanh lịch",
        price: 299000,
        originalPrice: 399000,
        categoryId: categoryIds["thoi-trang"],
        images: ["https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500"],
        stock: 50,
        rating: 4.5,
        reviewCount: 234,
        isActive: true,
        isFeatured: true,
        tags: ["ao-polo", "nam", "cotton"],
        specifications: [
          { name: "Chất liệu", value: "100% Cotton" },
          { name: "Size", value: "S, M, L, XL, XXL" },
          { name: "Màu sắc", value: "Trắng, Đen, Xanh navy" },
          { name: "Xuất xứ", value: "Việt Nam" }
        ]
      },
      {
        name: "Nồi Cơm Điện Cao Cấp",
        slug: "noi-com-dien-cao-cap",
        description: "Nồi cơm điện thông minh 1.8L với công nghệ IH, lòng nồi chống dính cao cấp.",
        shortDescription: "Nồi cơm điện thông minh với công nghệ IH hiện đại",
        price: 2490000,
        originalPrice: 2990000,
        categoryId: categoryIds["gia-dung"],
        images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"],
        stock: 30,
        rating: 4.7,
        reviewCount: 67,
        isActive: true,
        isFeatured: true,
        isFlashSale: true,
        flashSaleEndTime: Date.now() + 3 * 24 * 60 * 60 * 1000,
        tags: ["noi-com", "dien-tu", "gia-dung"],
        specifications: [
          { name: "Dung tích", value: "1.8L" },
          { name: "Công nghệ", value: "IH (Induction Heating)" },
          { name: "Lòng nồi", value: "Chống dính cao cấp" },
          { name: "Công suất", value: "860W" }
        ]
      },
      {
        name: "Giày Sneaker Unisex",
        slug: "giay-sneaker-unisex",
        description: "Giày sneaker thời trang unisex, đế êm ái, thiết kế hiện đại phù hợp mọi hoạt động.",
        shortDescription: "Giày sneaker thời trang, thoải mái cho mọi hoạt động",
        price: 899000,
        originalPrice: 1199000,
        categoryId: categoryIds["thoi-trang"],
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"],
        stock: 40,
        rating: 4.6,
        reviewCount: 178,
        isActive: true,
        isFeatured: true,
        tags: ["giay", "sneaker", "unisex"],
        specifications: [
          { name: "Chất liệu", value: "Da tổng hợp + Vải mesh" },
          { name: "Đế", value: "Cao su non êm ái" },
          { name: "Size", value: "36-44" },
          { name: "Màu sắc", value: "Trắng, Đen, Xám" }
        ]
      },
      {
        name: "Máy Pha Cà Phê Espresso",
        slug: "may-pha-ca-phe-espresso",
        description: "Máy pha cà phê espresso bán tự động với áp suất 15 bar, tạo ra ly cà phê hoàn hảo.",
        shortDescription: "Máy pha cà phê espresso chuyên nghiệp tại nhà",
        price: 3990000,
        categoryId: categoryIds["gia-dung"],
        images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"],
        stock: 12,
        rating: 4.8,
        reviewCount: 45,
        isActive: true,
        isFeatured: true,
        tags: ["may-pha-ca-phe", "espresso", "gia-dung"],
        specifications: [
          { name: "Áp suất", value: "15 bar" },
          { name: "Dung tích bình nước", value: "1.5L" },
          { name: "Công suất", value: "1350W" },
          { name: "Chất liệu", value: "Inox cao cấp" }
        ]
      },
      {
        name: "Sách: Đắc Nhân Tâm",
        slug: "sach-dac-nhan-tam",
        description: "Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử của Dale Carnegie.",
        shortDescription: "Sách kinh điển về nghệ thuật giao tiếp và ứng xử",
        price: 89000,
        originalPrice: 120000,
        categoryId: categoryIds["sach-van-phong-pham"],
        images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500"],
        stock: 100,
        rating: 4.9,
        reviewCount: 567,
        isActive: true,
        isFeatured: true,
        tags: ["sach", "ky-nang", "giao-tiep"],
        specifications: [
          { name: "Tác giả", value: "Dale Carnegie" },
          { name: "Số trang", value: "320" },
          { name: "Kích thước", value: "14.5 x 20.5 cm" },
          { name: "Nhà xuất bản", value: "NXB Tổng hợp TP.HCM" }
        ]
      },
      {
        name: "Tai Nghe Bluetooth Premium",
        slug: "tai-nghe-bluetooth-premium",
        description: "Tai nghe Bluetooth chống ồn chủ động, pin 30 giờ, chất âm Hi-Fi cao cấp.",
        shortDescription: "Tai nghe Bluetooth chống ồn, chất âm Hi-Fi",
        price: 1990000,
        originalPrice: 2490000,
        categoryId: categoryIds["dien-tu"],
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
        stock: 35,
        rating: 4.7,
        reviewCount: 123,
        isActive: true,
        isFeatured: true,
        isFlashSale: true,
        flashSaleEndTime: Date.now() + 5 * 24 * 60 * 60 * 1000,
        tags: ["tai-nghe", "bluetooth", "chong-on"],
        specifications: [
          { name: "Kết nối", value: "Bluetooth 5.3" },
          { name: "Pin", value: "30 giờ" },
          { name: "Chống ồn", value: "ANC chủ động" },
          { name: "Driver", value: "40mm Hi-Fi" }
        ]
      },
      {
        name: "Bộ Chăn Ga Cotton Cao Cấp",
        slug: "bo-chan-ga-cotton-cao-cap",
        description: "Bộ chăn ga gối cotton 100% cao cấp, mềm mại, thấm hút tốt, an toàn cho da.",
        shortDescription: "Bộ chăn ga cotton 100% mềm mại, thấm hút tốt",
        price: 599000,
        originalPrice: 799000,
        categoryId: categoryIds["gia-dung"],
        images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500"],
        stock: 25,
        rating: 4.6,
        reviewCount: 89,
        isActive: true,
        isFeatured: true,
        tags: ["chan-ga", "cotton", "noi-that"],
        specifications: [
          { name: "Chất liệu", value: "100% Cotton" },
          { name: "Kích thước", value: "1m6, 1m8, 2m" },
          { name: "Bao gồm", value: "1 chăn, 1 ga, 2 vỏ gối" },
          { name: "Màu sắc", value: "Trắng, Xám, Be" }
        ]
      },
      {
        name: "Bút Bi Cao Cấp Parker",
        slug: "but-bi-cao-cap-parker",
        description: "Bút bi Parker cao cấp với thân kim loại sang trọng, viết mượt mà, bền bỉ.",
        shortDescription: "Bút bi Parker cao cấp, thiết kế sang trọng",
        price: 450000,
        categoryId: categoryIds["sach-van-phong-pham"],
        images: ["https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500"],
        stock: 60,
        rating: 4.8,
        reviewCount: 34,
        isActive: true,
        isFeatured: false,
        tags: ["but-bi", "parker", "van-phong"],
        specifications: [
          { name: "Thương hiệu", value: "Parker" },
          { name: "Chất liệu", value: "Kim loại cao cấp" },
          { name: "Màu mực", value: "Xanh, Đen" },
          { name: "Bảo hành", value: "2 năm" }
        ]
      }
    ];

    // Insert products
    for (const product of products) {
      await ctx.db.insert("products", product);
    }

    return `Created ${categories.length} categories and ${products.length} products`;
  },
});
