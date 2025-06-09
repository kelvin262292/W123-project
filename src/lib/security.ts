/**
 * Cấu hình và tiện ích bảo mật cho ShopVN
 */

// Cấu hình CSRF
export const CSRF_CONFIG = {
  headerName: 'X-CSRF-Token',
  cookieName: 'csrf-token',
  secret: process.env.CSRF_SECRET || 'default-csrf-secret-key-change-in-production',
  expiryMinutes: 60
};

// Cấu hình Content Security Policy
export const CSP_CONFIG = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
    connectSrc: ["'self'", "https://*.convex.cloud"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
  }
};

// Cấu hình Rate Limiting
export const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn mỗi IP: 100 request mỗi 15 phút
  standardHeaders: true,
  legacyHeaders: false,
};

// Cấu hình Password
export const PASSWORD_CONFIG = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  maxAttempts: 5, // Số lần đăng nhập thất bại tối đa
  lockoutMinutes: 15, // Thời gian khóa tài khoản sau khi đăng nhập thất bại nhiều lần
};

/**
 * Tạo CSRF token
 * @returns CSRF token
 */
export function generateCSRFToken(): string {
  return Array(32)
    .fill(0)
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
}

/**
 * Xác thực CSRF token
 * @param token Token cần xác thực
 * @param storedToken Token đã lưu trữ
 * @returns Kết quả xác thực
 */
export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) {
    return false;
  }
  return token === storedToken;
}

/**
 * Tạo nonce ngẫu nhiên cho CSP
 * @returns Chuỗi nonce
 */
export function generateNonce(): string {
  return Array(16)
    .fill(0)
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
}

/**
 * Kiểm tra độ mạnh của mật khẩu
 * @param password Mật khẩu cần kiểm tra
 * @returns Đánh giá độ mạnh và thông báo
 */
export function checkPasswordStrength(password: string): { 
  score: number; 
  message: string;
  isStrong: boolean;
} {
  if (!password) {
    return { score: 0, message: 'Vui lòng nhập mật khẩu', isStrong: false };
  }

  let score = 0;
  const messages = [];

  // Độ dài
  if (password.length < PASSWORD_CONFIG.minLength) {
    messages.push(`Mật khẩu phải có ít nhất ${PASSWORD_CONFIG.minLength} ký tự`);
  } else {
    score += 1;
  }

  // Chữ hoa
  if (PASSWORD_CONFIG.requireUppercase && !/[A-Z]/.test(password)) {
    messages.push('Mật khẩu phải có ít nhất 1 chữ hoa');
  } else if (PASSWORD_CONFIG.requireUppercase) {
    score += 1;
  }

  // Chữ thường
  if (PASSWORD_CONFIG.requireLowercase && !/[a-z]/.test(password)) {
    messages.push('Mật khẩu phải có ít nhất 1 chữ thường');
  } else if (PASSWORD_CONFIG.requireLowercase) {
    score += 1;
  }

  // Số
  if (PASSWORD_CONFIG.requireNumbers && !/\d/.test(password)) {
    messages.push('Mật khẩu phải có ít nhất 1 chữ số');
  } else if (PASSWORD_CONFIG.requireNumbers) {
    score += 1;
  }

  // Ký tự đặc biệt
  if (PASSWORD_CONFIG.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    messages.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt');
  } else if (PASSWORD_CONFIG.requireSpecialChars) {
    score += 1;
  }

  // Độ dài thêm
  if (password.length >= 12) {
    score += 1;
  }

  // Tính điểm và thông báo
  let message = '';
  let isStrong = false;

  if (score >= 5) {
    message = 'Mật khẩu rất mạnh';
    isStrong = true;
  } else if (score === 4) {
    message = 'Mật khẩu mạnh';
    isStrong = true;
  } else if (score === 3) {
    message = 'Mật khẩu trung bình';
    isStrong = false;
  } else {
    message = messages.join('. ');
    isStrong = false;
  }

  return { score, message, isStrong };
}

/**
 * Lọc dữ liệu đầu vào để ngăn chặn XSS
 * @param input Dữ liệu đầu vào cần lọc
 * @returns Dữ liệu đã được lọc
 */
export function sanitizeInput(input: string): string {
  if (!input) {
    return '';
  }
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Kiểm tra quyền truy cập
 * @param userRoles Vai trò của người dùng
 * @param requiredRoles Vai trò yêu cầu
 * @returns Kết quả kiểm tra
 */
export function checkPermission(userRoles: string[], requiredRoles: string[]): boolean {
  if (!userRoles || !requiredRoles || requiredRoles.length === 0) {
    return false;
  }
  
  return requiredRoles.some(role => userRoles.includes(role));
}

/**
 * Mã hóa dữ liệu nhạy cảm
 * @param data Dữ liệu cần mã hóa
 * @param key Khóa mã hóa
 * @returns Dữ liệu đã mã hóa
 */
export function encryptSensitiveData(data: string, key: string): string {
  // Trong thực tế, bạn sẽ sử dụng một thư viện mã hóa như crypto-js
  // Đây chỉ là một ví dụ đơn giản
  const encoded = btoa(data);
  return encoded;
}

/**
 * Giải mã dữ liệu nhạy cảm
 * @param encryptedData Dữ liệu đã mã hóa
 * @param key Khóa mã hóa
 * @returns Dữ liệu đã giải mã
 */
export function decryptSensitiveData(encryptedData: string, key: string): string {
  // Trong thực tế, bạn sẽ sử dụng một thư viện mã hóa như crypto-js
  // Đây chỉ là một ví dụ đơn giản
  try {
    const decoded = atob(encryptedData);
    return decoded;
  } catch (error) {
    console.error('Failed to decrypt data:', error);
    return '';
  }
}

/**
 * Tạo JWT token
 * @param payload Dữ liệu cần mã hóa
 * @param expiresIn Thời gian hết hạn (giây)
 * @returns JWT token
 */
export function createJWT(payload: Record<string, any>, expiresIn: number = 3600): string {
  // Trong thực tế, bạn sẽ sử dụng một thư viện JWT như jsonwebtoken
  // Đây chỉ là một ví dụ đơn giản
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const data = {
    ...payload,
    iat: now,
    exp: now + expiresIn
  };
  
  const base64Header = btoa(JSON.stringify(header));
  const base64Payload = btoa(JSON.stringify(data));
  const signature = 'dummy-signature'; // Trong thực tế, đây sẽ là chữ ký thực sự
  
  return `${base64Header}.${base64Payload}.${signature}`;
}

/**
 * Xác thực JWT token
 * @param token JWT token cần xác thực
 * @returns Dữ liệu đã giải mã hoặc null nếu token không hợp lệ
 */
export function verifyJWT(token: string): Record<string, any> | null {
  // Trong thực tế, bạn sẽ sử dụng một thư viện JWT như jsonwebtoken
  // Đây chỉ là một ví dụ đơn giản
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < now) {
      return null; // Token đã hết hạn
    }
    
    return payload;
  } catch (error) {
    console.error('Invalid JWT token:', error);
    return null;
  }
} 