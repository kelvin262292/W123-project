import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageUploaded: (storageId: string) => void;
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
}

export function ImageUpload({ 
  onImageUploaded, 
  className = "", 
  accept = "image/*",
  maxSize = 5 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File quá lớn. Kích thước tối đa là ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Vui lòng chọn file hình ảnh");
      return;
    }

    setIsUploading(true);

    try {
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();

      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const json = await result.json();
      if (!result.ok) {
        throw new Error(`Upload failed: ${JSON.stringify(json)}`);
      }

      const { storageId } = json;
      
      // Step 3: Call the callback with the storage ID
      onImageUploaded(storageId);
      toast.success("Tải ảnh lên thành công!");
      
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Có lỗi xảy ra khi tải ảnh lên");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <button
        type="button"
        onClick={handleClick}
        disabled={isUploading}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Đang tải lên...</span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl text-gray-400">📷</div>
            <div className="text-gray-600">
              <p className="font-medium">Nhấn để chọn ảnh</p>
              <p className="text-sm">Hỗ trợ: JPG, PNG, GIF (tối đa {maxSize}MB)</p>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
