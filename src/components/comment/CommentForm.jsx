import React, { useState, useEffect } from "react";
import {
  getUserFromStorage,
  saveUserToStorage,
  removeUserFromStorage,
  hasStoredUser,
} from "../../utils/localStorage";

const CommentForm = ({
  commentData,
  onChange,
  onSubmit,
  isSubmitting,
  submitError,
  submitSuccess,
  onUserDataLoad,
}) => {
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved user data on mount
  useEffect(() => {
    if (hasStoredUser()) {
      const savedUser = getUserFromStorage();
      if (savedUser.name || savedUser.email) {
        setRememberMe(true);
        // Notify parent component to update form data
        onUserDataLoad?.(savedUser);
      }
    }
  }, [onUserDataLoad]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save or remove user data based on checkbox
    if (rememberMe) {
      saveUserToStorage(commentData.name, commentData.email);
    } else {
      removeUserFromStorage();
    }

    onSubmit(e);
  };

  const handleRememberMeChange = (e) => {
    const checked = e.target.checked;
    setRememberMe(checked);

    // If unchecking, remove from storage immediately
    if (!checked) {
      removeUserFromStorage();
    }
  };

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
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-900/80 pt-4 p-6 rounded-lg"
      >
        <label className="text-sm text-gray-300 cursor-pointer select-none">
          Please fill up all the fields to comment. Your email won't be public.
        </label>
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

        {/* Remember Me Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
            disabled={isSubmitting}
            className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
          />
          <label
            htmlFor="rememberMe"
            className="text-sm text-gray-300 cursor-pointer select-none"
          >
            Remember my name and email for next time
          </label>
        </div>

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
