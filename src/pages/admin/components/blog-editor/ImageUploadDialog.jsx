// src/components/blog-editor/ImageUploadDialog.jsx
import React, { useState } from "react";
import { Upload, X } from "lucide-react";

const ImageUploadDialog = ({ isOpen, onClose, onInsertImage }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageCaption, setImageCaption] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onInsertImage(reader.result, imageCaption);
        handleClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertUrl = () => {
    if (imageUrl) {
      onInsertImage(imageUrl, imageCaption);
      handleClose();
    }
  };

  const handleClose = () => {
    setImageUrl("");
    setImageCaption("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Add Image</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Caption Input */}
          <div>
            <label className="block text-white mb-2 text-sm">
              Image Caption (optional)
            </label>
            <input
              type="text"
              value={imageCaption}
              onChange={(e) => setImageCaption(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter image caption..."
            />
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-white mb-2 text-sm">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            <button
              type="button"
              onClick={handleInsertUrl}
              disabled={!imageUrl}
              className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Insert from URL
            </button>
          </div>

          <div className="text-center text-gray-400">OR</div>

          {/* File Upload */}
          <div>
            <label className="block text-white mb-2 text-sm">
              Upload Image
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-750 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">
                Click to upload image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="w-full mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ImageUploadDialog;
