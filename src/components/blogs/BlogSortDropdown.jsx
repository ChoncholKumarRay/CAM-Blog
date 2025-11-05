import React, { useState } from "react";
import { SlidersHorizontal, TrendingUp, Clock, Calendar } from "lucide-react";

const BlogSortDropdown = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "latest", label: "Latest First", icon: Calendar },
    { value: "oldest", label: "Oldest First", icon: Clock },
    { value: "popular", label: "Most Popular", icon: TrendingUp },
  ];

  const currentSort = sortOptions.find((opt) => opt.value === sortBy);
  const CurrentIcon = currentSort.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-800 bg-opacity-70 border border-gray-700 rounded-lg px-4 py-3 text-white hover:bg-gray-700 transition-colors"
      >
        <SlidersHorizontal size={20} />
        <span className="hidden sm:inline">{currentSort.label}</span>
        <span className="sm:hidden">Sort</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    sortBy === option.value
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Icon size={18} />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogSortDropdown;
