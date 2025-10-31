import React, { useEffect } from "react";
import { useBlogs } from "../hooks/useBlogs";
import { usePagination } from "../hooks/usePagination";
import BlogListHeader from "../components/blogs/BlogListHeader";
import BlogListControls from "../components/blogs/BlogListControls";
import BlogList from "../components/blogs/BlogList";
import BlogPagination from "../components/blogs/BlogPagination";
import BlogSkeleton from "../components/blogs/BlogSkeleton";
import BlogError from "../components/blogs/BlogError";

const BlogPage = () => {
  const itemsPerPage = 6;
  const { page, nextPage, handlePageChange, clearNextPage } = usePagination(1);

  const { data, isLoading, isFetching, isError, error, refetch } = useBlogs(
    page,
    itemsPerPage
  );

  const blogs = data?.blogs || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const totalBlogs = pagination.totalBlogs || 0;

  // Clear nextPage indicator when fetching completes
  useEffect(() => {
    if (!isFetching) clearNextPage();
  }, [isFetching, clearNextPage]);

  const onPageChange = (newPage) => {
    handlePageChange(newPage, totalPages, isFetching, true);
  };

  if (isLoading) {
    return (
      <div className="pt-20 px-4">
        <BlogListHeader
          title="Welcome to CAM Blog"
          description="Explore our collection of insightful articles on Astronomy, Astrophysics and more"
        />
        <BlogSkeleton count={itemsPerPage} />{" "}
      </div>
    );
  }

  if (isError) {
    return <BlogError error={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="relative z-10 min-h-screen flex justify-center pt-20 py-12 px-4">
      <div className="w-full max-w-4xl">
        <BlogListHeader
          title="Welcome to CAM Blog"
          description="Explore our collection of insightful articles on Astronomy, Astrophysics and more"
        />

        <BlogListControls
          currentPage={page}
          itemsPerPage={itemsPerPage}
          totalItems={totalBlogs}
          onRefresh={refetch}
          isRefreshing={isFetching}
        />

        <BlogList blogs={blogs} isLoading={isLoading} isFetching={isFetching} />

        <BlogPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          isFetching={isFetching}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};

export default BlogPage;
