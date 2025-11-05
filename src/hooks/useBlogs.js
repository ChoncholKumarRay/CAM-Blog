// hooks/useBlogs.js
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllBlogs } from "../api/blogApi";
import { useEffect } from "react";

export const useBlogs = (
  page,
  limit = 6,
  category = null,
  search = "",
  sortBy = "latest"
) => {
  const queryClient = useQueryClient();

  // Create a unique query key that includes all filter parameters
  const queryKey = ["blogs", page, category, search, sortBy];

  const query = useQuery({
    queryKey,
    queryFn: () => fetchAllBlogs(page, limit, category, search, sortBy),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const pagination = query.data?.pagination || {};

  // Prefetch next page with same filters
  useEffect(() => {
    if (pagination.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ["blogs", page + 1, category, search, sortBy],
        queryFn: () => fetchAllBlogs(page + 1, limit, category, search, sortBy),
      });
    }
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["blogs", page - 1, category, search, sortBy],
        queryFn: () => fetchAllBlogs(page - 1, limit, category, search, sortBy),
      });
    }
  }, [page, pagination, queryClient, limit, category, search, sortBy]);

  return query;
};
