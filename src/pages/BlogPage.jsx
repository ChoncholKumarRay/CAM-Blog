import React, { useState, useEffect, useRef } from "react";
import BlogCard from "../components/BlogCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const fetchBlogs = async (page) => {
  const response = await fetch(
    `http://localhost:5000/api/blog?page=${page}&limit=6`
  );
  if (!response.ok) throw new Error("Failed to fetch blogs");
  return response.json();
};

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  const [nextPage, setNextPage] = useState(null);
  const queryClient = useQueryClient();
  const isFirstRender = useRef(true);

  // React Query uses the actual page state, not pageFromUrl
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => fetchBlogs(page),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const blogs = data?.blogs || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const totalBlogs = pagination.totalBlogs || 0;

  // Prefetch previous and next pages
  useEffect(() => {
    if (pagination.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ["blogs", page + 1],
        queryFn: () => fetchBlogs(page + 1),
      });
    }
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["blogs", page - 1],
        queryFn: () => fetchBlogs(page - 1),
      });
    }
  }, [page, pagination, queryClient]);

  // Update URL only when page changes via pagination
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setSearchParams({ page }, { replace: true });
  }, [page, setSearchParams]);

  useEffect(() => {
    if (!isFetching) setNextPage(null);
  }, [isFetching]);

  const handleRefresh = () => refetch();

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || isFetching) return;
    setNextPage(newPage);
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="relative z-10 min-h-screen flex justify-center pt-20 py-12 px-4">
        <div className="w-full max-w-4xl space-y-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-700 rounded-lg h-40"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white text-center px-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Failed to load blogs</h2>
          <p className="text-gray-400 mb-4">
            {error?.message || "Something went wrong"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen flex justify-center pt-20 py-12 px-4">
      <div className="w-full max-w-4xl">
        <div className="mb-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Latest Articles
          </h1>
          <p className="text-gray-400 text-lg">
            Explore our collection of insightful articles on technology,
            education, lifestyle, and more.
          </p>
        </div>

        {/* Refresh button and blog count below header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-300 text-sm">
            {totalBlogs > 0
              ? `Showing ${(page - 1) * 6 + 1} - ${Math.min(
                  page * 6,
                  totalBlogs
                )} of ${totalBlogs} blogs`
              : "No blogs"}
          </div>
          <button
            onClick={handleRefresh}
            disabled={isFetching}
            className="flex items-center gap-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh blogs"
          >
            <RefreshCw
              className={`w-5 h-5 ${isFetching ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No blogs available yet.</p>
          </div>
        ) : (
          <>
            <div
              className={`space-y-8 transition-opacity duration-200 ${
                isFetching && !isLoading ? "opacity-60" : "opacity-100"
              }`}
            >
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1 || isFetching}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const p = index + 1;
                    const isLoadingThisPage = nextPage === p && isFetching;
                    if (
                      p === 1 ||
                      p === totalPages ||
                      (p >= page - 1 && p <= page + 1)
                    ) {
                      return (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          disabled={isFetching}
                          className={`px-4 py-2 rounded-lg transition-colors relative ${
                            page === p
                              ? "bg-blue-600 text-white"
                              : "bg-gray-700 text-white hover:bg-gray-600"
                          }`}
                        >
                          <span
                            className={
                              isLoadingThisPage ? "opacity-0" : "opacity-100"
                            }
                          >
                            {p}
                          </span>
                          {isLoadingThisPage && (
                            <RefreshCw className="w-4 h-4 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          )}
                        </button>
                      );
                    } else if (p === page - 2 || p === page + 2) {
                      return (
                        <span key={p} className="text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages || isFetching}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
