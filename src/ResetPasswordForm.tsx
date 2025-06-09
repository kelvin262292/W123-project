"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { toast } from "sonner";

export function ResetPasswordForm({ 
  resetCode, 
  onSuccess, 
  onCancel 
}: { 
  resetCode: string; 
  onSuccess?: () => void; 
  onCancel?: () => void;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const resetPassword = useMutation(api.auth.resetPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }
    
    if (password.length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự!");
      return;
    }
    
    setSubmitting(true);
    
    try {
      await resetPassword({ resetCode, newPassword: password });
      setSubmitted(true);
      toast.success("Mật khẩu đã được đặt lại thành công!");
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi đặt lại mật khẩu.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-semibold mb-2">Mật khẩu đã được đặt lại</h3>
        <p className="text-gray-600 mb-4">
          Mật khẩu của bạn đã được đặt lại thành công. Bạn có thể đăng nhập bằng mật khẩu mới ngay bây giờ.
        </p>
        <button 
          onClick={onSuccess} 
          className="auth-button"
        >
          Đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Đặt lại mật khẩu</h2>
        <p className="text-gray-600">
          Nhập mật khẩu mới của bạn bên dưới.
        </p>
      </div>
      
      <form className="flex flex-col gap-form-field" onSubmit={handleSubmit}>
        <input
          className="auth-input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu mới"
          minLength={8}
          required
        />
        
        <input
          className="auth-input-field"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Nhập lại mật khẩu mới"
          minLength={8}
          required
        />
        
        <button 
          className="auth-button" 
          type="submit" 
          disabled={submitting}
        >
          {submitting ? "Đang xử lý..." : "Đặt lại mật khẩu"}
        </button>
        
        {onCancel && (
          <div className="text-center">
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-600 hover:text-gray-800 hover:underline text-sm"
            >
              Hủy
            </button>
          </div>
        )}
      </form>
    </div>
  );
} 