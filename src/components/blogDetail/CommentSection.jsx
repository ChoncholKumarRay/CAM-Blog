import React, { useState, useCallback } from "react";
import { useComments } from "../../hooks/useComments";
import { useCommentSubmission } from "../../hooks/useCommentSubmission";
import CommentList from "../comment/CommentList";
import CommentPagination from "../comment/CommentPagination";
import CommentForm from "../comment/CommentForm";

const CommentSection = ({ blogId }) => {
  const commentsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    text: "",
  });
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    data: commentsData,
    isLoading,
    isFetching,
  } = useComments(blogId, currentPage, commentsPerPage);

  const commentMutation = useCommentSubmission(
    blogId,
    commentsPerPage,
    () => {
      setCurrentPage(1);
      // Only clear the comment text, keep name and email
      setCommentData((prev) => ({ ...prev, text: "" }));
      setSubmitSuccess(true);
      setSubmitError(null);
      setTimeout(() => setSubmitSuccess(false), 3000);
    },
    (error) => {
      setSubmitError(error.message);
    }
  );

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  // Handle loading user data from localStorage
  const handleUserDataLoad = useCallback((userData) => {
    setCommentData((prev) => ({
      ...prev,
      name: userData.name || prev.name,
      email: userData.email || prev.email,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentData.name || !commentData.email || !commentData.text) return;

    setNextPage(1);
    commentMutation.mutate({ id: blogId, commentData });
  };

  const handlePageChange = (newPage) => {
    const totalPages = commentsData?.pagination?.totalPages || 1;
    if (newPage >= 1 && newPage <= totalPages && !isFetching) {
      setNextPage(newPage);
      setCurrentPage(newPage);
      document.getElementById("comments-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const comments = commentsData?.comments || [];
  const totalPages = commentsData?.pagination?.totalPages || 1;

  return (
    <>
      <div
        id="comments-section"
        className="mt-8"
        style={{
          fontFamily: "'Open Sans', sans-serif",
        }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-white">Comments</h2>

        <CommentList
          comments={comments}
          isLoading={isLoading}
          isFetching={isFetching}
        />

        <CommentPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isFetching={isFetching}
          nextPage={nextPage}
        />
      </div>

      <CommentForm
        commentData={commentData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onUserDataLoad={handleUserDataLoad}
        isSubmitting={commentMutation.isLoading}
        submitError={submitError}
        submitSuccess={submitSuccess}
      />
    </>
  );
};

export default CommentSection;
