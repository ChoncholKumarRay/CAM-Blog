// src/components/ImageUpload/FeaturedImageUpload.jsx
import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import ImagePreview from "./ImagePreview";

const FeaturedImageUpload = ({ value, onChange }) => {
  const [preview, setPreview] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Reset preview when form is reset
  useEffect(() => {
    if (!value) {
      setPreview(null);
      setIsImageLoading(false);
    }
  }, [value]);

  // Common file handler (used for click + drag)
  const handleFileSelect = (file) => {
    if (!file) return;

    // Pass file to parent immediately
    onChange(file);

    // Instant preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setIsImageLoading(true);

    // Decode in background for smooth load
    const img = new Image();
    img.onload = () => setIsImageLoading(false);
    img.onerror = () => {
      console.error("Failed to load image");
      setIsImageLoading(false);
    };
    img.src = previewUrl;
  };

  // When file is chosen via click
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  // When image is dropped
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  // Drag state styling
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // Remove selected image
  const handleRemove = () => {
    if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
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
    <label
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`flex flex-col items-center justify-center w-[480px] h-[270px] mx-auto rounded-lg cursor-pointer transition-colors border-2 ${
        isDragging
          ? "border-blue-500 bg-gray-700"
          : "border-gray-700 border-dashed bg-gray-800 hover:bg-gray-750"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <Upload className="w-10 h-10 text-gray-400 mb-2" />
        <p className="text-sm text-gray-400 font-semibold">
          Drag & drop or click to upload
        </p>
        <p className="text-xs text-gray-500">PNG, JPG, JPEG, WEBP (MAX 2 MB)</p>
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
