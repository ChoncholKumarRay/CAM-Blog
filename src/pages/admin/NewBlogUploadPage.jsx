// src/pages/NewBlogUploadPage.jsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogEditor from "./components/blog-editor/BlogEditor";

import FeaturedImageUpload from "./components/ImageUpload/FeaturedImageUpload";
import { useBlogForm } from "./components/hooks/useBlogForm";

const NewBlogUploadPage = () => {
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();
  const {
    blogData,
    editorContent,
    handleChange,
    handleFeaturedImageChange,
    handleEditorChange,
    resetForm,
    getFormData,
  } = useBlogForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editorContent.trim()) {
      alert("Please add some content to your blog");
      return;
    }

    try {
      const formData = getFormData();
      setIsPublishing(true);

      const response = await fetch("http://localhost:5000/api/blog/new", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("Blog created:", result);

      alert(`Blog post published successfully!\nBlog ID: ${result.blogId}`);

      resetForm();

      // Optional: Navigate to blog list or view
      // navigate("/admin/dashboard");
      // or
      // navigate(`/${result.blogId}`);
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert(`Failed to publish blog: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="relative z-10 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            Create New Blog Post
          </h1>
          <p className="text-gray-400">
            Fill in the details and write your content below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-900 bg-opacity-60 backdrop-blur-sm rounded-lg p-6 border border-gray-800 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-white mb-2 font-medium text-sm">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter an engaging title"
                required
              />
            </div>

            {/* Date, Category, Authors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white mb-2 font-medium text-sm">
                  Published Date
                </label>
                <input
                  type="date"
                  name="published_date"
                  value={blogData.published_date}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium text-sm">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={blogData.category}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Technology"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium text-sm">
                  Authors
                </label>
                <input
                  type="text"
                  name="authors"
                  value={blogData.authors}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                  placeholder="John Doe, Jane Smith"
                  required
                />
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-white mb-2 font-medium text-sm">
                Featured Image
              </label>
              <FeaturedImageUpload
                value={blogData.featured_image}
                onChange={handleFeaturedImageChange}
              />
            </div>
          </div>

          {/* Blog Editor */}
          <BlogEditor content={editorContent} onChange={handleEditorChange} />

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPublishing}
              className="px-8 py-3 bg-gradient-to-r bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600  transition-all duration-300"
            >
              {isPublishing ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBlogUploadPage;
