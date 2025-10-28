import React from "react";

const BlogError = ({ error, onRetry }) => {
  return (
    <div className="flex justify-center items-center min-h-screen text-white text-center px-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Failed to load blogs</h2>
        <p className="text-gray-400 mb-4">
          {error?.message || "Something went wrong"}
        </p>
        <button
          onClick={onRetry}
          className="bg-blue-300 hover:bg-blue-400 px-6 py-2 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default BlogError;
