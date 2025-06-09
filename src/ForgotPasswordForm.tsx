"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { toast } from "sonner";

export function ForgotPasswordForm({ onSuccess, onCancel }: { onSuccess?: () => void; onCancel?: () => void }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const requestPasswordReset = useMutation(api.auth.requestPasswordReset);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await requestPasswordReset({ email });
      setSubmitted(true);
      toast.success("Yêu cầu đặt lại mật khẩu đã được gửi!");
      onSuccess?.();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xử lý yêu cầu của bạn.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="text-4xl mb-4">📧</div>
        <h3 className="text-xl font-semibold mb-2">Kiểm tra email của bạn</h3>
        <p className="text-gray-600 mb-4">
          Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email {email}. 
          Vui lòng kiểm tra hộp thư đến của bạn và làm theo hướng dẫn.
        </p>
        <p className="text-gray-500 text-sm">
          Nếu bạn không nhận được email trong vòng vài phút, vui lòng kiểm tra thư mục spam 
          hoặc <button onClick={() => setSubmitted(false)} className="text-blue-600 hover:underline">thử lại</button>.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Quên mật khẩu?</h2>
        <p className="text-gray-600">
          Nhập email của bạn và chúng tôi sẽ gửi cho bạn hướng dẫn để đặt lại mật khẩu.
        </p>
      </div>
      
      <form className="flex flex-col gap-form-field" onSubmit={handleSubmit}>
        <input
          className="auth-input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        
        <button 
          className="auth-button" 
          type="submit" 
          disabled={submitting}
        >
          {submitting ? "Đang xử lý..." : "Gửi yêu cầu đặt lại mật khẩu"}
        </button>
        
        <div className="text-center">
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-800 hover:underline text-sm"
          >
            Quay lại đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
} 