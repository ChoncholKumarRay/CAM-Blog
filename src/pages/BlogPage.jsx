import React, { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { useBlogs } from "../hooks/useBlogs";
import { usePagination } from "../hooks/usePagination";
import { useCategories } from "../hooks/useCategories";

import BlogListHeader from "../components/blogs/BlogListHeader";
import BlogListControls from "../components/blogs/BlogListControls";
import BlogList from "../components/blogs/BlogList";
import BlogPagination from "../components/blogs/BlogPagination";
import BlogSkeleton from "../components/blogs/BlogSkeleton";
import BlogError from "../components/blogs/BlogError";

import BlogCategoryChips from "../components/blogs/BlogCategoryChips";
import BlogSearchBar from "../components/blogs/BlogSearchBar";
import BlogSortDropdown from "../components/blogs/BlogSortDropdown";
import BlogActiveFilters from "../components/blogs/BlogActiveFilters";

const BlogPage = () => {
  const itemsPerPage = 5;
  const { page, nextPage, handlePageChange, clearNextPage } = usePagination(1);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  useEffect(() => {
    if (!isFetching) clearNextPage();
  }, [isFetching, clearNextPage]);

  useEffect(() => {
    if (page !== 1) handlePageChange(1, totalPages, false, false);
  }, [activeCategory, debouncedSearch, sortBy]);

  const handleClearAll = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setSortBy("latest");
  };
  const {
    data: categoryData,
    isLoading: catLoading,
    isError: catError,
  } = useCategories();
  const categories = categoryData?.categories || ["All"];

  return (
    <div className="relative z-10 min-h-screen flex justify-center pt-20 py-12 px-4 md:pt-16">
      <div className="w-full max-w-6xl">
        <BlogListHeader
          title="Welcome to CAM Blog"
          description="Explore our collection of insightful articles on Astronomy, Astrophysics and more"
        />

        <div className="mb-6">
          <BlogCategoryChips
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            {/* Search bar on top for mobile, left for laptop */}
            <div className="flex-1">
              <BlogSearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClear={() => setSearchQuery("")}
              />
            </div>

            {/* Dropdown + Refresh aligned side by side on mobile */}
            <div className="flex flex-row sm:flex-row gap-3 sm:gap-3 justify-between sm:justify-start text-sm sm:text-base md:text-lg">
              <BlogSortDropdown sortBy={sortBy} onSortChange={setSortBy} />
              <button
                onClick={refetch}
                disabled={isFetching}
                className="flex items-center gap-2 bg-gray-800 bg-opacity-70 border border-gray-700 rounded-lg px-4 py-3 text-white hover:bg-gray-700 transition-all disabled:opacity-50"
              >
                <RefreshCw
                  size={20}
                  className={isFetching ? "animate-spin" : ""}
                />
                <span className="sm:hidden">Refresh</span>
              </button>
            </div>
          </div>

          <BlogActiveFilters
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            sortBy={sortBy}
            onClearAll={handleClearAll}
          />
        </div>

        {isLoading ? (
          <BlogSkeleton count={itemsPerPage} />
        ) : isError ? (
          <BlogError error={error} onRetry={() => window.location.reload()} />
        ) : blogs.length === 0 ? (
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
            <BlogListControls
              currentPage={page}
              itemsPerPage={itemsPerPage}
              totalItems={totalBlogs}
              onRefresh={refetch}
              isRefreshing={isFetching}
            />
            <BlogList
              blogs={blogs}
              isLoading={isLoading}
              isFetching={isFetching}
            />
            <BlogPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) =>
                handlePageChange(newPage, totalPages, isFetching, true)
              }
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
