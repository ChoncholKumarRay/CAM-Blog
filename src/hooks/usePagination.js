import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = (initialPage = 1) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlPage = parseInt(searchParams.get("page")) || initialPage;
  const [page, setPage] = useState(urlPage);
  const [nextPage, setNextPage] = useState(null);
  const isFirstRender = useRef(true);

  // Update URL only when page changes via pagination
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setSearchParams({ page }, { replace: true });
  }, [page, setSearchParams]);

  const handlePageChange = (
    newPage,
    totalPages,
    isFetching,
    scrollToTop = true
  ) => {
    if (newPage < 1 || newPage > totalPages || isFetching) return;
    setNextPage(newPage);
    setPage(newPage);
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearNextPage = () => setNextPage(null);

  return {
    page,
    nextPage,
    setNextPage,
    handlePageChange,
    clearNextPage,
  };
};
