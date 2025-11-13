// src/components/ImageUpload/ImagePreview.jsx
import React from "react";
import { X } from "lucide-react";

const ImagePreview = ({ src, onRemove, isLoading = false }) => {
  return (
    <div className="relative w-[480px] h-[270px] mx-auto">
      {/* Image - ALWAYS visible */}
      <img
        src={src}
        alt="Featured preview"
        className={`w-full h-full object-cover rounded-lg transition-all duration-300 ${
          isLoading ? "opacity-50 blur-sm" : "opacity-100 blur-0"
        }`}
        loading="eager"
      />

      {/* Loading overlay - shows while processing */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}

      {/* Remove button - always enabled */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
        title="Remove image"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ImagePreview;
