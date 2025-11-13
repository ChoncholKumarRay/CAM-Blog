// src/components/ImageUpload/FeaturedImageUpload.jsx
import React, { useState } from "react";
import { Upload } from "lucide-react";
import ImagePreview from "./ImagePreview";

const FeaturedImageUpload = ({ value, onChange }) => {
  const [preview, setPreview] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Pass file to parent immediately
    onChange(file);

    // Create preview URL - THIS IS INSTANT!
    const previewUrl = URL.createObjectURL(file);

    // Set preview immediately (no waiting)
    setPreview(previewUrl);
    setIsImageLoading(true);

    // Optional: Wait for browser to decode image
    // This happens in background, doesn't block rendering
    const img = new Image();
    img.onload = () => {
      setIsImageLoading(false);
    };
    img.onerror = () => {
      setIsImageLoading(false);
      console.error("Failed to load image");
    };
    img.src = previewUrl;
  };

  const handleRemove = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setIsImageLoading(false);
    onChange(null);
  };

  if (preview) {
    return (
      <ImagePreview
        src={preview}
        onRemove={handleRemove}
        isLoading={isImageLoading}
      />
    );
  }

  return (
    <label className="flex flex-col items-center justify-center w-[480px] h-[270px] mx-auto border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-750 transition-colors">
      <div className="flex flex-col items-center justify-center">
        <Upload className="w-10 h-10 text-gray-400 mb-2" />
        <p className="text-sm text-gray-400">
          <span className="font-semibold">Click to upload</span>
        </p>
        <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX 10MB)</p>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
};

export default FeaturedImageUpload;
