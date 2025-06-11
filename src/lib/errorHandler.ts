// src/lib/errorHandler.ts

import { toast } from 'sonner'; // Assuming sonner is used for toasts
import React from 'react';

// 1. Define Error Categories
export enum ErrorCategory {
  NETWORK = 'NETWORK_ERROR',
  API = 'API_ERROR',
  AUTH = 'AUTHENTICATION_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  SERVER = 'SERVER_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR',
}

// 2. Centralized Error Logging (and potential alerting)
interface ErrorContext {
  componentStack?: string;
  info?: React.ErrorInfo;
  [key: string]: any; // For additional context
}

/**
 * Logs the error to console and potentially to an external monitoring service.
 * @param error The error object.
 * @param context Additional context about where the error occurred.
 */
function logError(error: any, context?: ErrorContext) {
  console.error('--- Application Error ---');
  console.error('Error:', error);
  if (context) {
    console.error('Context:', context);
  }
  // In a real application, integrate with Sentry, Datadog, etc.
  // Sentry.captureException(error, { extra: context });
}

// 3. Error Classification
/**
 * Classifies an error into a predefined category.
 * @param error The error object.
 * @returns The classified ErrorCategory.
 */
function classifyError(error: any): ErrorCategory {
  if (!error) return ErrorCategory.UNKNOWN;

  if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
    return ErrorCategory.NETWORK;
  }
  if (error.message && typeof error.message === 'string') {
    if (error.message.includes('Unauthorized') || error.message.includes('Authentication')) {
      return ErrorCategory.AUTH;
    }
    if (error.message.includes('Validation') || error.message.includes('Invalid')) {
      return ErrorCategory.VALIDATION;
    }
    if (error.message.includes('Internal Server Error') || error.message.includes('Convex')) {
      return ErrorCategory.SERVER;
    }
  }
  // Check for specific API error codes/structures if applicable
  if (error.status && error.status >= 400 && error.status < 500) {
    return ErrorCategory.API;
  }
  if (error.status && error.status >= 500) {
    return ErrorCategory.SERVER;
  }

  return ErrorCategory.UNKNOWN;
}

// 4. Retry Mechanism
/**
 * Retries an async function a specified number of times.
 * @param fn The async function to retry.
 * @param retries The number of retries.
 * @param delayMs The delay between retries in milliseconds.
 * @returns The result of the function.
 */
export async function retryOperation<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      logError(error, { context: `Retry attempt ${i + 1}/${retries}` });
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError; // Re-throw if all retries fail
}

// 5. Alerting (placeholder - actual implementation depends on monitoring tools)
/**
 * Sends an alert for critical errors.
 * @param error The error object.
 * @param category The classified error category.
 */
function sendAlert(error: any, category: ErrorCategory) {
  // In a real app, this would send alerts to Slack, PagerDuty, etc.
  console.warn(`ALERT: Critical error detected - ${category}:`, error.message);
}

// 6. Graceful Degradation / Fallback Components (conceptual, implemented via HOC/wrapper)
// This is more about how the UI/data fetching logic uses the error handler.
// The handler itself provides the tools (logging, classification, user message).

// 7. User-facing Error UI & Hiding System Errors
/**
 * Provides a user-friendly message for an error.
 * @param error The error object.
 * @param category The classified error category.
 * @returns A user-friendly error message.
 */
function getUserFriendlyErrorMessage(error: any, category: ErrorCategory): string {
  // Hide sensitive details from the user
  switch (category) {
    case ErrorCategory.NETWORK:
      return 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet của bạn.';
    case ErrorCategory.AUTH:
      return 'Phiên đăng nhập của bạn đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.';
    case ErrorCategory.VALIDATION:
      // For validation errors, we might expose specific messages if they are safe
      return error.message || 'Dữ liệu nhập vào không hợp lệ. Vui lòng kiểm tra lại.';
    case ErrorCategory.SERVER:
      return 'Có lỗi xảy ra từ hệ thống. Chúng tôi đang khắc phục. Vui lòng thử lại sau.';
    case ErrorCategory.API:
      return 'Có lỗi xảy ra khi xử lý yêu cầu của bạn. Vui lòng thử lại.';
    case ErrorCategory.UNKNOWN:
    default:
      return 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại hoặc liên hệ hỗ trợ.';
  }
}

/**
 * Central error handling function.
 * Logs the error, classifies it, shows a user-friendly toast, and sends alerts for critical errors.
 * @param error The error object.
 * @param context Optional context about where the error occurred.
 * @param options Options for handling the error.
 */
export function handleError(
  error: any,
  context?: ErrorContext,
  options?: {
    showToast?: boolean;
    alertCritical?: boolean;
    customMessage?: string;
  }
) {
  const { showToast = true, alertCritical = true, customMessage } = options || {};

  logError(error, context);
  const category = classifyError(error);
  const userMessage = customMessage || getUserFriendlyErrorMessage(error, category);

  if (showToast) {
    toast.error(userMessage);
  }

  if (alertCritical && (category === ErrorCategory.SERVER || category === ErrorCategory.UNKNOWN)) {
    sendAlert(error, category);
  }

  // You might want to re-throw the error if it's not fully handled
  // For example, if it's a critical error that should stop execution
  // throw error;
}

/**
 * A Higher-Order Component (HOC) or wrapper for React components to catch and handle errors.
 * This is a conceptual example; actual implementation might use React Error Boundaries.
 * @param Component The React component to wrap.
 * @param FallbackComponent A component to render when an error occurs.
 */
export function withErrorHandler<P extends object>(
  Component: React.ComponentType<P>,
  FallbackComponent?: React.ComponentType<{ error: any }>
): React.ComponentType<P> {
  return class ErrorBoundaryWrapper extends React.Component<P, { hasError: boolean; error: any }> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true, error };
    }

    componentDidCatch(error: any, info: React.ErrorInfo) {
      // Log the error and show a user-friendly message
      handleError(error, { componentStack: info.componentStack, info });
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        if (FallbackComponent) {
          return <FallbackComponent error={this.state.error} />;
        }
        return (
          <div className="flex flex-col items-center justify-center min-h-[200px] p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <p className="font-semibold mb-2">Đã xảy ra lỗi khi tải nội dung này.</p>
            <p className="text-sm">Vui lòng thử lại sau hoặc liên hệ hỗ trợ nếu vấn đề tiếp diễn.</p>
            {/* Optionally, show a generic error message, but hide sensitive details */}
            {/* <p className="text-xs mt-2">{getUserFriendlyErrorMessage(this.state.error, classifyError(this.state.error))}</p> */}
          </div>
        );
      }

      return <Component {...this.props} />;
    }
  };
}

// Example of a generic fallback component
export const GenericErrorFallback: React.FC<{ error: any }> = ({ error }) => {
  const userMessage = getUserFriendlyErrorMessage(error, classifyError(error));
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
      <p className="font-semibold mb-2">Rất tiếc, có lỗi xảy ra!</p>
      <p className="text-sm text-center">{userMessage}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Tải lại trang
      </button>
    </div>
  );
};

// Add monitoring capabilities
export const monitoring = {
  // Track performance metrics
  trackPerformance: (name: string, duration: number, tags?: Record<string, string>) => {
    console.log(`Performance metric: ${name} - ${duration}ms`, tags);
    // In production, send to monitoring service:
    // monitoringService.trackMetric(name, duration, tags);
  },

  // Track custom events
  trackEvent: (name: string, properties?: Record<string, any>) => {
    console.log(`Event tracked: ${name}`, properties);
    // In production:
    // monitoringService.trackEvent(name, properties);
  },

  // Start a timer for performance tracking
  startTimer: (name: string): (() => void) => {
    const startTime = performance.now();
    return () => {
      const duration = performance.now() - startTime;
      monitoring.trackPerformance(name, duration);
    };
  },

  // Track errors with context
  trackError: (error: any, context?: ErrorContext) => {
    const category = classifyError(error);
    logError(error, context);
    
    console.log(`Error tracked: ${category}`, {
      message: error.message,
      stack: error.stack,
      context
    });
    
    // In production:
    // monitoringService.trackException(error, { 
    //   category,
    //   ...context
    // });
  },

  // Health check function
  healthCheck: async (): Promise<{ status: 'healthy' | 'degraded' | 'unhealthy', checks: Record<string, boolean> }> => {
    const checks: Record<string, boolean> = {};
    
    try {
      // Check API connectivity
      const apiCheck = await fetch('/api/health').then(res => res.ok);
      checks.api = apiCheck;
    } catch {
      checks.api = false;
    }
    
    // Add more health checks as needed
    
    // Determine overall status
    const allChecks = Object.values(checks);
    const status = allChecks.every(c => c) 
      ? 'healthy' 
      : allChecks.some(c => c) 
        ? 'degraded' 
        : 'unhealthy';
        
    return { status, checks };
  }
};

// Recovery strategies for different error scenarios
export const recoveryStrategies = {
  // Retry a failed network request with exponential backoff
  networkRetry: async <T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> => {
    return retryOperation(fn, maxRetries, 1000);
  },
  
  // Try to recover from auth errors by refreshing token
  authRecovery: async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      return await fn();
    } catch (error) {
      if (classifyError(error) === ErrorCategory.AUTH) {
        // Try to refresh the token
        try {
          // Placeholder for token refresh logic
          // await refreshAuthToken();
          console.log('Attempting to refresh auth token');
          
          // Retry the original function with new token
          return await fn();
        } catch (refreshError) {
          // If refresh fails, redirect to login
          window.location.href = '/login';
          throw new Error('Authentication failed. Please log in again.');
        }
      }
      throw error;
    }
  },
  
  // Cache fallback for when API is unavailable
  cacheFallback: async <T>(
    fn: () => Promise<T>, 
    cacheKey: string,
    options?: { expireAfter?: number }
  ): Promise<T> => {
    try {
      // Try to get fresh data
      const result = await fn();
      
      // Cache the successful result
      localStorage.setItem(cacheKey, JSON.stringify({
        data: result,
        timestamp: Date.now()
      }));
      
      return result;
    } catch (error) {
      // On failure, try to use cached data
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        const parsedCache = JSON.parse(cached);
        const expireAfter = options?.expireAfter || 3600000; // Default 1 hour
        
        // Check if cache is still valid
        if (Date.now() - parsedCache.timestamp < expireAfter) {
          monitoring.trackEvent('cache_fallback_used', { cacheKey });
          return parsedCache.data as T;
        }
      }
      
      // If no valid cache, re-throw the error
      throw error;
    }
  }
};
