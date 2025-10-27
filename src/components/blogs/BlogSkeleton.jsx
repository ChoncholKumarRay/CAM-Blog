import React from "react";

const BlogSkeleton = ({ count = 6 }) => {
  return (
    <div className="relative z-10 min-h-screen flex justify-center pt-20 py-12 px-4">
      <div className="w-full max-w-4xl space-y-8">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-700 rounded-lg h-40" />
        ))}
      </div>
    </div>
  );
};

export default BlogSkeleton;
