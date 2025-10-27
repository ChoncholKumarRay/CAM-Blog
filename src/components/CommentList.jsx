import CommentItem from "./CommentItem";

const CommentList = ({ comments, isLoading, isFetching }) => {
  if (comments.length === 0 && !isLoading) {
    return (
      <p className="text-gray-400 mb-4">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div
      className={`space-y-6 ${
        isFetching ? "opacity-50" : "opacity-100"
      } transition-opacity duration-200`}
    >
      {comments.map((comment, idx) => (
        <CommentItem key={comment.id || idx} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
