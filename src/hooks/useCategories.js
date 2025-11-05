// hooks/useCategories.js
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/blogApi";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 0,
    refetchOnMount: true,
  });
};
