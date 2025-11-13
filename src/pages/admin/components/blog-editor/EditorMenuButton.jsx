// src/components/blog-editor/EditorMenuButton.jsx
import React from "react";

const EditorMenuButton = ({ onClick, isActive, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded hover:bg-gray-700 transition-colors ${
      isActive ? "bg-gray-700 text-blue-400" : "text-gray-300"
    }`}
    title={title}
  >
    {children}
  </button>
);

export default EditorMenuButton;
