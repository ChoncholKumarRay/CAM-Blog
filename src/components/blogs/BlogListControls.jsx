import React from "react";
import { RefreshCw } from "lucide-react";

const BlogListControls = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onRefresh,
  isRefreshing,
}) => {
  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="px-2 mb-2 mt-8 text-gray-300 text-sm">
      {totalItems > 0
        ? `Showing ${startItem} - ${endItem} of ${totalItems} blogs`
        : "No blogs"}
    </div>
    /* <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="flex items-center gap-2 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Refresh blogs"
      >
        <RefreshCw
          className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
        />
      </button> */
  );
};

export default BlogListControls;
