import React from "react";

const BlogListHeader = ({ title, description }) => {
  return (
    <div className="mb-4 text-center mt-8">
      <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
      <p className="text-gray-400 text-lg">{description}</p>
    </div>
  );
};

export default BlogListHeader;
