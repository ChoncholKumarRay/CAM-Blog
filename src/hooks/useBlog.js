import { useQuery } from "@tanstack/react-query";
import { fetchDetailedBlog } from "../api/blogApi";

export const useBlog = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchDetailedBlog(id),
    staleTime: 0,
    refetchOnMount: true,
    enabled: !!id,
  });
};
