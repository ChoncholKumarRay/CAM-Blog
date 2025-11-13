// src/components/blog-editor/ImageUploadDialog.jsx
import React, { useState } from "react";
import { Upload, X, Loader2, AlertCircle } from "lucide-react";

const ImageUploadDialog = ({ isOpen, onClose, onInsertImage }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  if (!isOpen) return null;

  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "http://localhost:5000/api/blog/upload-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.url; // Assuming API returns { url: "cloudinary-url" }
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      // Step 1: Create temporary blob URL for instant preview
      const tempUrl = URL.createObjectURL(file);

      // Step 2: Insert image with temporary URL and loading state
      onInsertImage(tempUrl, imageCaption, true); // Pass `isLoading: true`

      // Step 3: Upload to server
      const uploadedUrl = await uploadImageToServer(file);

      // Step 4: Replace temporary URL with uploaded URL
      onInsertImage(uploadedUrl, imageCaption, false, tempUrl);

      // Step 5: Success notification
      alert("✅ Image uploaded successfully!");

      // Cleanup
      URL.revokeObjectURL(tempUrl);
      handleClose();
    } catch (error) {
      setUploadError(error.message);
      alert("❌ Image upload failed: " + error.message);
      setIsUploading(false);
    }
  };

  const handleInsertUrl = () => {
    if (imageUrl) {
      onInsertImage(imageUrl, imageCaption, false);
      handleClose();
    }
  };

  const handleClose = () => {
    setImageUrl("");
    setImageCaption("");
    setUploadError(null);
    setIsUploading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Add Image</h3>
          <button
            onClick={handleClose}
            disabled={isUploading}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {uploadError && (
          <div className="mb-4 p-3 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-sm text-red-300">{uploadError}</span>
          </div>
        )}

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
              disabled={isUploading}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
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
              disabled={isUploading}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
              placeholder="https://example.com/image.jpg"
            />
            <button
              type="button"
              onClick={handleInsertUrl}
              disabled={!imageUrl || isUploading}
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
            <label
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-750 transition-colors ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-2" />
                  <span className="text-sm text-gray-400">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-400">
                    Click to upload image
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          disabled={isUploading}
          className="w-full mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ImageUploadDialog;
