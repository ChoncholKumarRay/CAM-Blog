import React from "react";

const BlogCategoryChips = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  const scrollRef = React.useRef(null);

  return (
    <div className="relative mb-4">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
              activeCategory === category
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
                : "bg-gray-800 bg-opacity-70 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogCategoryChips;
