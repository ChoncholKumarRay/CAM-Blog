import React, { useState } from "react";
import NewBlogUploadPage from "./NewBlogUploadPage";
import UpdateBlogPage from "./UpdateBlogPage";
import BlogCommentPage from "./BlogCommentPage";

const BlogAdminDashboard = () => {
  const [activePage, setActivePage] = useState("newBlog");

  const renderContent = () => {
    switch (activePage) {
      case "newBlog":
        return <NewBlogUploadPage />;
      case "updateBlog":
        return <UpdateBlogPage />;
      case "comments":
        return <BlogCommentPage />;
      default:
        return <NewBlogUploadPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white pt-10">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 flex flex-col space-y-4 border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
        <button
          onClick={() => setActivePage("newBlog")}
          className={`text-left px-4 py-2 rounded-lg transition ${
            activePage === "newBlog"
              ? "bg-indigo-600"
              : "hover:bg-gray-700 bg-gray-800"
          }`}
        >
          📝 New Blog
        </button>
        <button
          onClick={() => setActivePage("updateBlog")}
          className={`text-left px-4 py-2 rounded-lg transition ${
            activePage === "updateBlog"
              ? "bg-indigo-600"
              : "hover:bg-gray-700 bg-gray-800"
          }`}
        >
          ✏️ Update Blog
        </button>
        <button
          onClick={() => setActivePage("comments")}
          className={`text-left px-4 py-2 rounded-lg transition ${
            activePage === "comments"
              ? "bg-indigo-600"
              : "hover:bg-gray-700 bg-gray-800"
          }`}
        >
          💬 Comments
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">{renderContent()}</div>
    </div>
  );
};

export default BlogAdminDashboard;
