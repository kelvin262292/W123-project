"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export function SignInForm({ onSuccess }: { onSuccess?: () => void }) {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp" | "forgotPassword">("signIn");
  const [submitting, setSubmitting] = useState(false);

  if (flow === "forgotPassword") {
    return (
      <ForgotPasswordForm 
        onSuccess={() => setFlow("signIn")}
        onCancel={() => setFlow("signIn")}
      />
    );
  }

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-form-field"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
          const formData = new FormData(e.target as HTMLFormElement);
          formData.set("flow", flow);
          void signIn("password", formData)
            .then(() => {
              onSuccess?.();
            })
            .catch((error) => {
              let toastTitle = "";
              if (error.message.includes("Invalid password")) {
                toastTitle = "Mật khẩu không đúng. Vui lòng thử lại.";
              } else {
                toastTitle =
                  flow === "signIn"
                    ? "Không thể đăng nhập. Bạn có muốn đăng ký tài khoản mới?"
                    : "Không thể đăng ký. Bạn có muốn đăng nhập?";
              }
              toast.error(toastTitle);
              setSubmitting(false);
            });
        }}
      >
        <input
          className="auth-input-field"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="auth-input-field"
          type="password"
          name="password"
          placeholder="Mật khẩu"
          required
        />
        
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            onClick={() => setFlow("forgotPassword")}
          >
            Quên mật khẩu?
          </button>
        </div>
        
        <button className="auth-button" type="submit" disabled={submitting}>
          {submitting ? "Đang xử lý..." : (flow === "signIn" ? "Đăng nhập" : "Đăng ký")}
        </button>
        <div className="text-center text-sm text-secondary">
          <span>
            {flow === "signIn"
              ? "Chưa có tài khoản? "
              : "Đã có tài khoản? "}
          </span>
          <button
            type="button"
            className="text-primary hover:text-primary-hover hover:underline font-medium cursor-pointer"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Đăng ký ngay" : "Đăng nhập"}
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center my-3">
        <hr className="my-4 grow border-gray-200" />
        <span className="mx-4 text-secondary">hoặc</span>
        <hr className="my-4 grow border-gray-200" />
      </div>
      <button className="auth-button" onClick={() => void signIn("anonymous")}>
        Đăng nhập khách
      </button>
    </div>
  );
}
