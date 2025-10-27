import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllBlogs } from "../api/blogApi";
import { useEffect } from "react";

export const useBlogs = (page, limit = 6) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => fetchAllBlogs(page, limit),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const pagination = query.data?.pagination || {};

  // Prefetch previous and next pages
  useEffect(() => {
    if (pagination.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ["blogs", page + 1],
        queryFn: () => fetchAllBlogs(page + 1, limit),
      });
    }
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["blogs", page - 1],
        queryFn: () => fetchAllBlogs(page - 1, limit),
      });
    }
  }, [page, pagination, queryClient, limit]);

  return query;
};
