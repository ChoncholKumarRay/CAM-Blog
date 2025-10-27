import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  MessageCircle,
  Tag,
  User,
  User2,
  Loader2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// API functions
const fetchBlog = async (id) => {
  const response = await fetch(`http://localhost:5000/api/blog/${id}`);
  if (!response.ok) throw new Error("Failed to fetch blog data");
  return response.json();
};

const fetchComments = async (id, page, limit) => {
  const response = await fetch(
    `http://localhost:5000/api/blog/${id}/comments?page=${page}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json();
};

const submitComment = async ({ id, commentData }) => {
  const response = await fetch(`http://localhost:5000/api/blog/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to submit comment");
  }
  return response.json();
};

const BlogDetailPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const commentsPerPage = 5;

  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    text: "",
  });
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);

  const isBengaliText = (text) => /[\u0980-\u09FF]/.test(text);

  // Fetch blog data
  const {
    data: blog,
    isLoading: loadingBlog,
    isError: blogError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlog(id),
    staleTime: 0,
    refetchOnMount: true,

    enabled: !!id,
  });

  // Fetch comments with pagination
  const {
    data: commentsData,
    isLoading: loadingComments,
    isFetching: fetchingComments,
  } = useQuery({
    queryKey: ["comments", id, currentPage],
    queryFn: () => fetchComments(id, currentPage, commentsPerPage),
    staleTime: 2 * 60 * 1000,
    enabled: !!id,
    onSuccess: () => {
      setNextPage(null); // Clear loading indicator
    },
  });

  // Prefetch next and previous page
  React.useEffect(() => {
    if (commentsData?.pagination?.hasNextPage) {
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
  }, [currentPage, commentsData, id, queryClient]);

  // Comment submission mutation
  const commentMutation = useMutation({
    mutationFn: submitComment,
    onMutate: async ({ commentData: newComment }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(["comments", id, 1]);

      // Snapshot previous value
      const previousComments = queryClient.getQueryData(["comments", id, 1]);

      // Optimistically update to the new value
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

      // Also update blog comment count
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
      // Reset to page 1
      setCurrentPage(1);

      // Refetch to get actual data from server
      queryClient.invalidateQueries(["comments", id]);
      queryClient.invalidateQueries(["blog", id]);

      // Clear form and show success
      setCommentData({ name: "", email: "", text: "" });
      setSubmitSuccess(true);
      setSubmitError(null);
      setTimeout(() => setSubmitSuccess(false), 3000);
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", id, 1], context.previousComments);
      }
      setSubmitError(error.message);
    },
  });

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentData.name || !commentData.email || !commentData.text) return;

    setNextPage(1);
    commentMutation.mutate({ id, commentData });
  };

  const handlePageChange = (newPage) => {
    const totalPages = commentsData?.pagination?.totalPages || 1;
    if (newPage >= 1 && newPage <= totalPages && !fetchingComments) {
      setNextPage(newPage);
      setCurrentPage(newPage);
      document.getElementById("comments-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCommentDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return formatDate(timestamp);
  };

  if (loadingBlog)
    return (
      <div className="p-8 text-gray-300 text-center text-xl">Loading...</div>
    );

  if (blogError || !blog)
    return (
      <div className="p-8 text-white text-center">
        <h1 className="text-3xl font-bold mb-2">Blog not found</h1>
        <p className="text-gray-400">
          {blogError?.message || "The requested blog does not exist."}
        </p>
      </div>
    );

  const comments = commentsData?.comments || [];
  const totalPages = commentsData?.pagination?.totalPages || 1;

  return (
    <div
      className="relative z-10 min-h-screen flex justify-center pt-28 px-4 pb-12"
      style={{
        fontFamily: "'Tiro Bangla', sans-serif",
      }}
    >
      <div className="w-full max-w-4xl bg-gray-800/80 rounded-xl p-8 shadow-lg backdrop-blur-sm text-white space-y-6">
        {/* Blog Title */}
        <h1
          className="text-4xl font-bold"
          style={{
            fontFamily: isBengaliText(blog.title)
              ? "'Tiro Bangla', sans-serif"
              : "'Roboto', sans-serif",
          }}
        >
          {blog.title}
        </h1>

        {/* Blog Meta */}
        <div className="flex items-center text-gray-400 space-x-6">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.published_date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>{blog.comments_count} Comments</span>
          </div>
          {blog.category && (
            <div className="flex items-center space-x-1">
              <Tag className="w-4 h-4" />
              <span className="uppercase">{blog.category}</span>
            </div>
          )}
        </div>

        {/* Blog Featured Image */}
        {blog.featured_image && (
          <img
            src={
              blog.featured_image.startsWith("data:image")
                ? blog.featured_image
                : `data:image/jpeg;base64,${blog.featured_image}`
            }
            alt={blog.title}
            className="w-full rounded-lg object-cover max-h-[500px]"
          />
        )}

        {/* Author */}
        {blog.authors && (
          <div className="flex items-center space-x-2 text-gray-300 mb-4">
            <User className="w-4 h-4" />
            <span>
              By{" "}
              {Array.isArray(blog.authors)
                ? blog.authors.join(", ")
                : blog.authors}
            </span>
          </div>
        )}

        {/* Blog Body (from TipTap) */}
        <div
          className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        />

        {/* Comments */}
        <div
          id="comments-section"
          className="mt-8"
          style={{
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-white">Comments</h2>

          {/* Keep showing comments even while loading */}
          {comments.length === 0 && !loadingComments ? (
            <p className="text-gray-400 mb-4">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div
              className={`space-y-6 ${
                fetchingComments ? "opacity-50" : "opacity-100"
              } transition-opacity duration-200`}
            >
              {comments.map((c, idx) => (
                <div
                  key={c.id || idx}
                  className="flex items-start space-x-3 border-b border-gray-700 pb-3 last:border-none"
                >
                  <div className="flex-shrink-0">
                    <User2 className="w-7 h-7 text-blue-500 mt-1" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className="font-semibold text-white text-sm"
                        style={{
                          fontFamily: isBengaliText(c.name)
                            ? "'Tiro Bangla', sans-serif"
                            : "'Roboto', sans-serif",
                        }}
                      >
                        {c.name}
                      </span>
                      {c.timestamp && (
                        <span className="text-xs text-gray-500">
                          {formatCommentDate(c.timestamp)}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-gray-300 text-sm leading-snug mt-1"
                      style={{
                        fontFamily: isBengaliText(c.text)
                          ? "'Tiro Bangla', sans-serif"
                          : "'Roboto', sans-serif",
                      }}
                    >
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || fetchingComments}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  const isLoadingThisPage =
                    nextPage === page && fetchingComments;

                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        disabled={fetchingComments}
                        className={`px-4 py-2 rounded-lg transition-colors relative ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-white hover:bg-gray-600"
                        } ${fetchingComments ? "cursor-not-allowed" : ""}`}
                      >
                        <span
                          className={
                            isLoadingThisPage ? "opacity-0" : "opacity-100"
                          }
                        >
                          {page}
                        </span>
                        {isLoadingThisPage && (
                          <Loader2 className="w-4 h-4 animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || fetchingComments}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Comment Form */}
        <div
          className="mt-8"
          style={{
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          <h2 className="text-2xl font-semibold mb-4">Leave a Comment</h2>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-4 p-4 bg-green-900/50 border border-green-600 rounded-lg text-green-200">
              Comment submitted successfully!
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="mb-4 p-4 bg-red-900/50 border border-red-600 rounded-lg text-red-200">
              {submitError}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-gray-900/80 p-6 rounded-lg"
          >
            <input
              type="text"
              name="name"
              value={commentData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              required
              disabled={commentMutation.isLoading}
            />
            <input
              type="email"
              name="email"
              value={commentData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              required
              disabled={commentMutation.isLoading}
            />
            <textarea
              name="text"
              value={commentData.text}
              onChange={handleChange}
              placeholder="Your Comment"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              rows={5}
              required
              disabled={commentMutation.isLoading}
            />
            <input type="text" name="website" style={{ display: "none" }} />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={commentMutation.isLoading}
            >
              {commentMutation.isLoading ? "Submitting..." : "Submit Comment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
