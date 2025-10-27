import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitComment } from "../api/commentApi";

export const useCommentSubmission = (
  id,
  commentsPerPage,
  onSuccess,
  onError
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitComment,
    onMutate: async ({ commentData: newComment }) => {
      await queryClient.cancelQueries(["comments", id, 1]);
      const previousComments = queryClient.getQueryData(["comments", id, 1]);

      queryClient.setQueryData(["comments", id, 1], (old) => {
        if (!old) return old;

        const optimisticComment = {
          id: `temp-${Date.now()}`,
          name: newComment.name,
          email: newComment.email,
          text: newComment.text,
          timestamp: new Date().toISOString(),
        };

        return {
          ...old,
          comments: [optimisticComment, ...old.comments].slice(
            0,
            commentsPerPage
          ),
          pagination: {
            ...old.pagination,
            totalComments: old.pagination.totalComments + 1,
          },
        };
      });

      queryClient.setQueryData(["blog", id], (old) => {
        if (!old) return old;
        return {
          ...old,
          comments_count: old.comments_count + 1,
        };
      });

      return { previousComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
      queryClient.invalidateQueries(["blog", id]);
      onSuccess?.();
    },
    onError: (error, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", id, 1], context.previousComments);
      }
      onError?.(error);
    },
  });
};
