import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  SlidersHorizontal,
  TrendingUp,
  Clock,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { useBlogs } from "../hooks/useBlogs";
import { usePagination } from "../hooks/usePagination";
import BlogListHeader from "../components/blogs/BlogListHeader";
import BlogListControls from "../components/blogs/BlogListControls";
import BlogList from "../components/blogs/BlogList";
import BlogPagination from "../components/blogs/BlogPagination";
import BlogSkeleton from "../components/blogs/BlogSkeleton";
import BlogError from "../components/blogs/BlogError";

const categories = [
  "All",
  "Deep Sky",
  "Research",
  "Photography",
  "Events",
  "DIY",
  "Observation",
  "Astrophysics",
  "Equipment",
  "News",
  "Tutorial",
  "Theory",
];

// Category Chips Component
const CategoryChips = ({ categories, activeCategory, onCategoryChange }) => {
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

// Search Bar Component
const SearchBar = ({ searchQuery, onSearchChange, onClear }) => {
  return (
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
        className="w-full bg-gray-800 bg-opacity-70 border border-gray-700 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
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
};

// Sort Dropdown Component
const SortDropdown = ({ sortBy, onSortChange }) => {
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

// Active Filters Display
const ActiveFilters = ({ activeCategory, searchQuery, sortBy, onClearAll }) => {
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
        <span className="px-3 py-1 bg-indigo-900 bg-opacity-50 text-indigo-300 text-sm rounded-full">
          Category: {activeCategory}
        </span>
      )}
      {searchQuery && (
        <span className="px-3 py-1 bg-indigo-900 bg-opacity-50 text-indigo-300 text-sm rounded-full">
          Search: "{searchQuery}"
        </span>
      )}
      {sortBy !== "latest" && (
        <span className="px-3 py-1 bg-indigo-900 bg-opacity-50 text-indigo-300 text-sm rounded-full">
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

// Main Blog Page Component
const BlogPage = () => {
  const itemsPerPage = 6;

  // Pagination hook
  const { page, nextPage, handlePageChange, clearNextPage } = usePagination(1);

  // Filter states
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // Debounced search query
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch blogs with filters
  // TODO: Update useBlogs hook to accept these parameters
  const { data, isLoading, isFetching, isError, error, refetch } = useBlogs(
    page,
    itemsPerPage,
    activeCategory !== "All" ? activeCategory : null,
    debouncedSearch,
    sortBy
  );

  const blogs = data?.blogs || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const totalBlogs = pagination.totalBlogs || 0;

  // Clear nextPage indicator when fetching completes
  useEffect(() => {
    if (!isFetching) clearNextPage();
  }, [isFetching, clearNextPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (page !== 1) {
      handlePageChange(1, totalPages, false, false);
    }
  }, [activeCategory, debouncedSearch, sortBy]);

  const onPageChange = (newPage) => {
    handlePageChange(newPage, totalPages, isFetching, true);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleClearAll = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setSortBy("latest");
  };

  return (
    <div className="relative z-10 min-h-screen flex justify-center pt-20 py-12 px-4 md:pt-16">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <BlogListHeader
          title="Welcome to CAM Blog"
          description="Explore our collection of insightful articles on Astronomy, Astrophysics and more"
        />

        {/* Filters Section */}
        <div className="mb-6">
          {/* Category Chips */}
          <CategoryChips
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onClear={() => setSearchQuery("")}
              />
            </div>
            <SortDropdown sortBy={sortBy} onSortChange={handleSortChange} />
            <button
              onClick={refetch}
              disabled={isFetching}
              className={`bg-gray-800 bg-opacity-70 border border-gray-700 rounded-lg px-4 py-3 text-white hover:bg-gray-700 transition-all disabled:opacity-50 ${
                isFetching ? "animate-spin" : ""
              }`}
            >
              <RefreshCw size={20} />
            </button>
          </div>

          {/* Active Filters */}
          <ActiveFilters
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            sortBy={sortBy}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <BlogSkeleton count={itemsPerPage} />
        ) : isError ? (
          <BlogError error={error} onRetry={() => window.location.reload()} />
        ) : blogs.length === 0 ? (
          // Empty State
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={handleClearAll}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            {/* Results Counter */}
            <BlogListControls
              currentPage={page}
              itemsPerPage={itemsPerPage}
              totalItems={totalBlogs}
              onRefresh={refetch}
              isRefreshing={isFetching}
            />

            {/* Blog List */}
            <BlogList
              blogs={blogs}
              isLoading={isLoading}
              isFetching={isFetching}
            />

            {/* Pagination */}
            <BlogPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
              isFetching={isFetching}
              nextPage={nextPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
