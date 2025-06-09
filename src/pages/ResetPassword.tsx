import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResetPasswordForm } from "../ResetPasswordForm";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resetCode, setResetCode] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      void navigate("/login");
    } else {
      setResetCode(code);
    }
  }, [searchParams, navigate]);

  const handleSuccess = () => {
    void navigate("/login");
  };

  if (!resetCode) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-center">
            <div className="text-4xl mb-4">⏳</div>
            <h3 className="text-xl font-semibold mb-2">Đang tải...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <ResetPasswordForm
          resetCode={resetCode}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
} 