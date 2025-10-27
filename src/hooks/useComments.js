import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchComments } from "../api/commentApi";
import { useEffect } from "react";

export const useComments = (id, currentPage, commentsPerPage = 5) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["comments", id, currentPage],
    queryFn: () => fetchComments(id, currentPage, commentsPerPage),
    staleTime: 2 * 60 * 1000,
    enabled: !!id,
  });

  // Prefetch next and previous page
  useEffect(() => {
    if (query.data?.pagination?.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ["comments", id, currentPage + 1],
        queryFn: () => fetchComments(id, currentPage + 1, commentsPerPage),
      });
    }
    if (currentPage > 1) {
      queryClient.prefetchQuery({
        queryKey: ["comments", id, currentPage - 1],
        queryFn: () => fetchComments(id, currentPage - 1, commentsPerPage),
      });
    }
  }, [currentPage, query.data, id, queryClient, commentsPerPage]);

  return query;
};
