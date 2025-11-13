// src/components/blog-editor/ImageUploadDialog.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Upload, X, Loader2, RefreshCw } from "lucide-react";

const ImageUploadDialog = ({ isOpen, onClose, onInsertImage }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);

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
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Upload failed: ${response.statusText}`
        );
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

    // Show preview in modal
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);
    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0);

    try {
      // Simulate progress (since we don't have real progress tracking)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to server
      const uploadedUrl = await uploadImageToServer(file);

      // Complete progress
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Success notification
      setTimeout(() => {
        toast.success("Image uploaded successfully!");

        // Insert image into editor
        onInsertImage(uploadedUrl, imageCaption, false);

        // Cleanup
        URL.revokeObjectURL(tempUrl);
        handleClose();
      }, 500);
    } catch (error) {
      setUploadError(error.message);
      setIsUploading(false);
      setUploadProgress(0);
      toast.error("Image upload failed. " + error.message);
    }
  };

  const handleInsertUrl = () => {
    if (imageUrl) {
      onInsertImage(imageUrl, imageCaption, false);
      handleClose();
    }
  };

  const handleClose = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageUrl("");
    setImageCaption("");
    setUploadError(null);
    setIsUploading(false);
    setUploadProgress(0);
    setPreviewUrl(null);
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

        {/* Upload Preview */}
        {previewUrl && isUploading && (
          <div className="mb-4 relative">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={previewUrl}
                alt="Upload preview"
                className="w-full h-48 object-cover"
              />

              {/* Upload overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-400 animate-spin mb-3" />
                <p className="text-white text-sm font-medium mb-2">
                  Uploading...
                </p>

                {/* Progress bar */}
                <div className="w-3/4 bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-gray-300 text-xs mt-2">{uploadProgress}%</p>
              </div>
            </div>
          </div>
        )}

        {!previewUrl && (
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
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-400">
                  Click to upload image
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF (MAX 10MB)
                </span>
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
        )}

        <button
          type="button"
          onClick={handleClose}
          disabled={isUploading}
          className="w-full mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Cancel"}
        </button>
      </div>
    </div>
  );
};

export default ImageUploadDialog;
