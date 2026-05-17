import { useWarehouseStore } from "@/store/warehouse-store";
import { ImageIcon, Loader2, UploadCloud, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  onSuccess: () => void;
  warehouseId: string;
}

export default function WarehouseImageForm({ onSuccess, warehouseId }: Props) {
  const { uploadImage, error, isLoading } = useWarehouseStore();
  const [image, setImage] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file)
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function handleRemove() {
    setImage(undefined);
    setPreview(undefined);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!image) return;

    await uploadImage(image, warehouseId);

    if (!error) {
      toast.success("Image updated successfully")
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleUpload} className="flex flex-col gap-6 m-4">
      <div
        onClick={() => inputRef.current?.click()}
        className="relative flex flex-col items-center justify-center gap-3 border-2 border-gray-300 rounded-xl p-8 cursor-pointer hover:border-amber-500 hover:bg-amber-50/15 transition-colors"
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-64 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleRemove(); }}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-red-50 transition-colors"
            >
              <X className="size-4 text-red-500" />
            </button>
          </>
        ) : (
          <>
            <UploadCloud className="size-10 text-gray-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">Click to upload an image</p>
              <p className="text-xs text-gray-400 mt-1">JPG, JPEG, PNG or WEBP — max 5MB</p>
            </div>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {image && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ImageIcon className="size-4 text-amber-500" />
          <span className="truncate">{image.name}</span>
          <span className="text-gray-400 shrink-0">
            ({(image.size / 1024 / 1024).toFixed(2)} MB)
          </span>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={!image || isLoading}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-sm font-medium transition-colors"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <UploadCloud className="size-4" />
            Upload Image
          </>
        )}
      </button>
    </form>
  )
}