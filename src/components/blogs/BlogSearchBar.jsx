import React from "react";
import { Search, X } from "lucide-react";

const BlogSearchBar = ({ searchQuery, onSearchChange, onClear }) => (
  <div className="relative">
    <Search
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      size={20}
    />
    <input
      type="text"
      placeholder="Search blogs..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full bg-gray-800 bg-opacity-70 border border-gray-700 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
    />
    {searchQuery && (
      <button
        onClick={onClear}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>
    )}
  </div>
);

export default BlogSearchBar;
