import React from "react";

const BlogSkeleton = ({ count = 6 }) => {
  return (
    <div className="relative z-10 w-full flex justify-center mt-10 pt-6 pb-8">
      <div className="w-full max-w-6xl space-y-8">
        {[...Array(count - 1)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-900 rounded-lg overflow-hidden shadow-lg border-t-4 border-[#234C6A] flex flex-col md:flex-row"
          >
            {/* Left side (image placeholder) */}
            <div className="md:w-1/2 w-full h-72 md:h-auto bg-gray-700" />

            {/* Right side (text placeholder) */}
            <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
              <div>
                <div className="h-4 w-20 bg-gray-700 rounded mb-4"></div>
                <div className="h-6 w-3/4 bg-gray-700 rounded mb-3"></div>
                <div className="h-6 w-1/2 bg-gray-700 rounded mb-3"></div>
                <div className="h-4 w-full bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-700 rounded mb-4"></div>
              </div>

              <div className="flex items-center justify-between mt-4 border-t border-gray-800 pt-4">
                <div className="h-4 w-32 bg-gray-700 rounded"></div>
                <div className="h-4 w-20 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSkeleton;
