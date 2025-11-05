import React from "react";

const BlogListHeader = ({ title, description }) => {
  return (
    <div className="mb-4 text-center mt-2 font-roboto sm:mt-8">
      <h1 className="font-bold text-white mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="text-gray-400 text-lg sm:text-xl md:text-2xl">
        {description}
      </p>
    </div>
  );
};

export default BlogListHeader;
