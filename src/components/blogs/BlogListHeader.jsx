import React from "react";

const BlogListHeader = ({ title, description }) => {
  return (
    <div className="mb-4 text-center mt-2 font-roboto sm:mt-8">
      <h1 className="text-2xl font-bold text-white mb-2 sm:text-4xl">
        {title}
      </h1>
      <p className="text-gray-400 text-m sm:text-lg">{description}</p>
    </div>
  );
};

export default BlogListHeader;
