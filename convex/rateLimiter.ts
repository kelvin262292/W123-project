// convex/rateLimiter.ts
// Rate limiter utility cho Convex với sliding window approach

// Type definitions
type RateLimitEntry = {
  timestamps: number[];  // Mảng các timestamps của các requests
  lastAccess: number;    // Thời điểm truy cập gần nhất để cleanup
};

type RateLimitAction = 
  | "login"
  | "password_reset"
  | "api_call"
  | "checkout"
  | "account_creation"
  | "admin_access";

// In-memory cache cho rate limiting
const rateLimitCache = new Map<string, Map<string, RateLimitEntry>>();

// Default configurations
const DEFAULT_LIMITS: Record<RateLimitAction, { limit: number, windowMs: number }> = {
  login: { limit: 5, windowMs: 60 * 1000 }, // 5 lần/phút
  password_reset: { limit: 3, windowMs: 10 * 60 * 1000 }, // 3 lần/10 phút
  api_call: { limit: 100, windowMs: 60 * 1000 }, // 100 lần/phút
  checkout: { limit: 10, windowMs: 60 * 60 * 1000 }, // 10 lần/giờ
  account_creation: { limit: 3, windowMs: 60 * 60 * 1000 }, // 3 lần/giờ
  admin_access: { limit: 20, windowMs: 60 * 1000 } // 20 lần/phút
};

// Error messages tiếng Việt
const ERROR_MESSAGES: Record<RateLimitAction, string> = {
  login: "Quá nhiều lần đăng nhập không thành công. Vui lòng thử lại sau {timeLeft} giây.",
  password_reset: "Quá nhiều yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau {timeLeft} giây.",
  api_call: "Quá nhiều yêu cầu API. Vui lòng thử lại sau {timeLeft} giây.",
  checkout: "Quá nhiều lần thanh toán. Vui lòng thử lại sau {timeLeft} giây.",
  account_creation: "Quá nhiều tài khoản được tạo từ địa chỉ này. Vui lòng thử lại sau {timeLeft} giây.",
  admin_access: "Quá nhiều yêu cầu truy cập admin. Vui lòng thử lại sau {timeLeft} giây."
};

/**
 * Kiểm tra rate limit cho một identifier và action cụ thể
 * @param identifier - IP address hoặc user ID
 * @param action - Loại hành động (login, password_reset, etc.)
 * @param limit - (Optional) Số lượng requests tối đa trong window
 * @param windowMs - (Optional) Khoảng thời gian window tính bằng ms
 * @returns Object với isLimited và message nếu bị limit
 */
export function checkRateLimit(
  identifier: string,
  action: RateLimitAction,
  limit?: number,
  windowMs?: number
): { isLimited: boolean; message?: string; timeLeft?: number } {
  // Sử dụng default limits nếu không được cung cấp
  const actualLimit = limit || DEFAULT_LIMITS[action].limit;
  const actualWindow = windowMs || DEFAULT_LIMITS[action].windowMs;
  
  // Lấy cache cho action này, tạo mới nếu chưa tồn tại
  if (!rateLimitCache.has(action)) {
    rateLimitCache.set(action, new Map<string, RateLimitEntry>());
  }
  const actionCache = rateLimitCache.get(action)!;
  
  const now = Date.now();
  
  // Lấy entry cho identifier này, tạo mới nếu chưa tồn tại
  if (!actionCache.has(identifier)) {
    actionCache.set(identifier, { timestamps: [now], lastAccess: now });
    return { isLimited: false };
  }
  
  // Lấy entry hiện tại
  const entry = actionCache.get(identifier)!;
  entry.lastAccess = now;
  
  // Lọc ra các timestamps trong sliding window
  const windowStart = now - actualWindow;
  entry.timestamps = entry.timestamps.filter(time => time >= windowStart);
  
  // Kiểm tra nếu đã vượt quá limit
  if (entry.timestamps.length >= actualLimit) {
    // Tính thời gian còn lại cho đến khi có thể thử lại
    const oldestTimestamp = entry.timestamps[0];
    const timeLeft = Math.ceil((oldestTimestamp + actualWindow - now) / 1000);
    
    // Cập nhật lại entry
    actionCache.set(identifier, entry);
    
    // Trả về thông báo lỗi với thời gian còn lại
    const message = ERROR_MESSAGES[action].replace('{timeLeft}', timeLeft.toString());
    return { isLimited: true, message, timeLeft };
  }
  
  // Thêm timestamp mới và cập nhật entry
  entry.timestamps.push(now);
  actionCache.set(identifier, entry);
  
  return { isLimited: false };
}

/**
 * Wrapper function để áp dụng rate limiting cho Convex mutations
 * @param identifier - IP address hoặc user ID
 * @param action - Loại hành động
 * @param handler - Function xử lý mutation
 * @param limit - (Optional) Số lượng requests tối đa
 * @param windowMs - (Optional) Khoảng thời gian window
 */
export function rateLimitWrapper<T extends any[], R>(
  identifier: string,
  action: RateLimitAction,
  handler: (...args: T) => Promise<R>,
  limit?: number,
  windowMs?: number
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    const { isLimited, message } = checkRateLimit(identifier, action, limit, windowMs);
    
    if (isLimited) {
      throw new Error(message);
    }
    
    return await handler(...args);
  };
}

/**
 * Hàm cleanup để xóa các entries cũ không còn được sử dụng
 * @param maxAge - Thời gian tối đa (ms) mà một entry không được truy cập sẽ bị xóa
 */
export function cleanupRateLimitCache(maxAge: number = 24 * 60 * 60 * 1000): void {
  const now = Date.now();
  
  rateLimitCache.forEach((actionCache, action) => {
    actionCache.forEach((entry, identifier) => {
      // Xóa entries không được truy cập trong maxAge
      if (now - entry.lastAccess > maxAge) {
        actionCache.delete(identifier);
      }
    });
    
    // Nếu actionCache trống, xóa luôn action đó khỏi rateLimitCache
    if (actionCache.size === 0) {
      rateLimitCache.delete(action);
    }
  });
}

/**
 * Utility function để lấy IP address từ Convex context
 * Lưu ý: Cần được điều chỉnh dựa trên cách Convex cung cấp thông tin IP
 */
export function getClientIP(ctx: any): string {
  // Đây là placeholder, cần điều chỉnh dựa trên API của Convex
  // Trong thực tế, có thể lấy từ ctx.request.headers['x-forwarded-for'] hoặc tương tự
  return ctx.request?.headers?.['x-forwarded-for'] || 
         ctx.request?.connection?.remoteAddress || 
         'unknown-ip';
}

/**
 * Helper để tạo identifier dựa trên user ID hoặc IP
 */
export function getRateLimitIdentifier(ctx: any, userId?: string): string {
  // Ưu tiên user ID nếu có (đã đăng nhập)
  if (userId) {
    return `user:${userId}`;
  }
  
  // Fallback to IP address
  return `ip:${getClientIP(ctx)}`;
}

// Định kỳ chạy cleanup để tránh memory leak
// Trong thực tế, nên sử dụng cron job hoặc scheduler
setInterval(() => {
  cleanupRateLimitCache();
}, 60 * 60 * 1000); // Chạy mỗi giờ
