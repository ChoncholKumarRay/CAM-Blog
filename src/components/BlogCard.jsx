import React from "react";
import { Calendar, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import placeholderImage from "../assets/placeholder.jpg";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/${blog.id}`);
  };

  // Handle base64 featured image
  const imageSrc = blog.featured_image
    ? blog.featured_image.startsWith("data:image")
      ? blog.featured_image
      : `data:image/jpeg;base64,${blog.featured_image}`
    : "/placeholder.jpg";

  // Format date as "20 Jan, 2025"
  const formattedDate = new Date(blog.published_date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#234C6A] flex flex-col md:flex-row">
      {/* Featured Image (Left Side) */}
      <div className="md:w-1/2 w-full aspect-video overflow-hidden flex items-center justify-center bg-gray-800">
        <img
          src={imageSrc}
          alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = `${placeholderImage}`)}
        />
      </div>

      {/* Content (Right Side) */}
      <div className="md:w-1/2 w-full p-6 pt-6 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="inline-block  text-s font-semibold text-blue-400 pt-0 rounded mb-3 uppercase tracking-wider">
            {blog.category}
          </span>

          {/* Title */}
          <h1
            className="text-2xl font-bold text-gray-100 mb-3 hover:text-blue-500 transition-colors cursor-pointer leading-tight line-clamp-2"
            onClick={handleReadMore}
          >
            {blog.title}
          </h1>

          {/* Excerpt (HTML render) */}
          <div
            className="text-gray-300 mb-4 leading-relaxed prose prose-invert max-w-none line-clamp-4"
            dangerouslySetInnerHTML={{ __html: blog.excerpt }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-400 pt-4 pb-2 border-t border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4 text-gray-400" />
              <span>{blog.comments_count} Comments</span>
            </div>

            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <button
            onClick={handleReadMore}
            className="text-blue-400 hover:text-blue-500 transition-colors font-medium"
          >
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
