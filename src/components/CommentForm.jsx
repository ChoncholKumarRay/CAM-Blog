import React from "react";

const CommentForm = ({
  commentData,
  onChange,
  onSubmit,
  isSubmitting,
  submitError,
  submitSuccess,
}) => {
  return (
    <div
      className="mt-8"
      style={{
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      <h2 className="text-2xl font-semibold mb-4">Leave a Comment</h2>

      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-900/50 border border-green-600 rounded-lg text-green-200">
          Comment submitted successfully!
        </div>
      )}

      {submitError && (
        <div className="mb-4 p-4 bg-red-900/50 border border-red-600 rounded-lg text-red-200">
          {submitError}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="space-y-4 bg-gray-900/80 p-6 rounded-lg"
      >
        <input
          type="text"
          name="name"
          value={commentData.name}
          onChange={onChange}
          placeholder="Your Name"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          required
          disabled={isSubmitting}
        />
        <input
          type="email"
          name="email"
          value={commentData.email}
          onChange={onChange}
          placeholder="Your Email"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          required
          disabled={isSubmitting}
        />
        <textarea
          name="text"
          value={commentData.text}
          onChange={onChange}
          placeholder="Your Comment"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          rows={5}
          required
          disabled={isSubmitting}
        />
        <input type="text" name="website" style={{ display: "none" }} />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
