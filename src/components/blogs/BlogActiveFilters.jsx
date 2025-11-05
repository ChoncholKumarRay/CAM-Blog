import React from "react";
import { X } from "lucide-react";

const BlogActiveFilters = ({
  activeCategory,
  searchQuery,
  sortBy,
  onClearAll,
}) => {
  const hasFilters =
    activeCategory !== "All" || searchQuery || sortBy !== "latest";
  if (!hasFilters) return null;

  const sortLabels = {
    latest: "Latest First",
    oldest: "Oldest First",
    popular: "Most Popular",
  };

  return (
    <div className="flex items-center gap-3 flex-wrap mb-4">
      <span className="text-gray-400 text-sm">Active filters:</span>
      {activeCategory !== "All" && (
        <span className="px-3 py-1 bg-blue-900 bg-opacity-50 text-blue-300 text-sm rounded-full">
          Category: {activeCategory}
        </span>
      )}
      {searchQuery && (
        <span className="px-3 py-1 bg-blue-900 bg-opacity-50 text-blue-300 text-sm rounded-full">
          Search: "{searchQuery}"
        </span>
      )}
      {sortBy !== "latest" && (
        <span className="px-3 py-1 bg-blue-900 bg-opacity-50 text-blue-300 text-sm rounded-full">
          Sort: {sortLabels[sortBy]}
        </span>
      )}
      <button
        onClick={onClearAll}
        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
      >
        <X size={14} />
        Clear all
      </button>
    </div>
  );
};

export default BlogActiveFilters;
