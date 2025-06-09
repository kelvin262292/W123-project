/**
 * Cấu hình và tiện ích để tối ưu hóa hiệu suất cho ShopVN
 */

// Thời gian tối đa cho các request API (ms)
export const API_TIMEOUT = 5000;

// Kích thước trang mặc định cho phân trang
export const DEFAULT_PAGE_SIZE = 12;

// Số lượng sản phẩm tối đa được tải trong một lần
export const MAX_PRODUCTS_PER_REQUEST = 50;

// Thời gian cache cho các truy vấn (ms)
export const CACHE_DURATION = {
  PRODUCTS: 5 * 60 * 1000, // 5 phút
  CATEGORIES: 10 * 60 * 1000, // 10 phút
  USER_DATA: 2 * 60 * 1000, // 2 phút
};

// Cấu hình lazy loading cho hình ảnh
export const IMAGE_LAZY_LOADING = {
  enabled: true,
  threshold: 0.1, // Tỷ lệ hiển thị trước khi tải
  placeholder: '/placeholder.jpg', // Hình ảnh placeholder
};

/**
 * Theo dõi thời gian thực hiện của một hàm
 * @param name Tên của hàm cần theo dõi
 * @param fn Hàm cần theo dõi
 * @returns Kết quả của hàm
 */
export function measurePerformance<T>(name: string, fn: () => T): T {
  const startTime = performance.now();
  try {
    const result = fn();
    const endTime = performance.now();
    console.log(`[Performance] ${name}: ${Math.round(endTime - startTime)}ms`);
    return result;
  } catch (error) {
    const endTime = performance.now();
    console.error(`[Performance] ${name} failed after ${Math.round(endTime - startTime)}ms`, error);
    throw error;
  }
}

/**
 * Theo dõi thời gian thực hiện của một hàm bất đồng bộ
 * @param name Tên của hàm cần theo dõi
 * @param fn Hàm bất đồng bộ cần theo dõi
 * @returns Promise với kết quả của hàm
 */
export async function measureAsyncPerformance<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const startTime = performance.now();
  try {
    const result = await fn();
    const endTime = performance.now();
    console.log(`[Performance] ${name}: ${Math.round(endTime - startTime)}ms`);
    return result;
  } catch (error) {
    const endTime = performance.now();
    console.error(`[Performance] ${name} failed after ${Math.round(endTime - startTime)}ms`, error);
    throw error;
  }
}

/**
 * Debounce một hàm để tránh gọi quá nhiều lần
 * @param fn Hàm cần debounce
 * @param delay Thời gian delay (ms)
 * @returns Hàm đã được debounce
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle một hàm để giới hạn tần suất gọi
 * @param fn Hàm cần throttle
 * @param limit Thời gian giới hạn (ms)
 * @returns Hàm đã được throttle
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Cache kết quả của một hàm
 * @param fn Hàm cần cache
 * @param duration Thời gian cache (ms)
 * @returns Hàm đã được cache
 */
export function memoize<T extends (...args: any[]) => any>(fn: T, duration: number = CACHE_DURATION.PRODUCTS): T {
  const cache = new Map<string, { value: ReturnType<T>, expiry: number }>();
  
  return function(this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    const now = Date.now();
    
    if (cached && cached.expiry > now) {
      return cached.value;
    }
    
    const result = fn.apply(this, args);
    cache.set(key, { value: result, expiry: now + duration });
    return result;
  } as T;
}

/**
 * Theo dõi sử dụng bộ nhớ
 * @returns Thông tin về bộ nhớ đang sử dụng
 */
export function monitorMemoryUsage(): { used: number, total: number, percentage: number } | null {
  if (typeof performance === 'undefined' || !performance.memory) {
    return null;
  }
  
  const memory = (performance as any).memory;
  if (!memory) {
    return null;
  }
  
  const used = Math.round(memory.usedJSHeapSize / (1024 * 1024));
  const total = Math.round(memory.jsHeapSizeLimit / (1024 * 1024));
  const percentage = Math.round((used / total) * 100);
  
  return { used, total, percentage };
}

/**
 * Tối ưu hóa danh sách sản phẩm để hiển thị
 * @param products Danh sách sản phẩm gốc
 * @returns Danh sách sản phẩm đã được tối ưu hóa
 */
export function optimizeProductList<T extends { id: string; images?: string[] }>(products: T[]): T[] {
  return products.map(product => ({
    ...product,
    // Chỉ giữ lại URL của ảnh đầu tiên để giảm kích thước dữ liệu
    images: product.images ? [product.images[0]] : []
  }));
}

/**
 * Tối ưu hóa hình ảnh với các kích thước khác nhau
 * @param imageUrl URL của hình ảnh
 * @param size Kích thước cần tối ưu ('small', 'medium', 'large')
 * @returns URL của hình ảnh đã được tối ưu
 */
export function optimizeImage(imageUrl: string, size: 'small' | 'medium' | 'large' = 'medium'): string {
  if (!imageUrl) {
    return IMAGE_LAZY_LOADING.placeholder;
  }
  
  // Thêm tham số kích thước vào URL của hình ảnh
  // Trong thực tế, bạn sẽ sử dụng một dịch vụ như Cloudinary hoặc Imgix
  const dimensions = {
    small: 'w=200&h=200',
    medium: 'w=400&h=400',
    large: 'w=800&h=800'
  };
  
  const separator = imageUrl.includes('?') ? '&' : '?';
  return `${imageUrl}${separator}${dimensions[size]}&q=80`;
} 