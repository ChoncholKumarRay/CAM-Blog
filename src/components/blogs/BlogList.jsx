import BlogCard from "../BlogCard";
import BlogSkeleton from "./BlogSkeleton";

const BlogList = ({ blogs, isLoading, isFetching }) => {
  if (blogs.length === 0) {
    return <BlogSkeleton count={4} />;
  }

  return (
    <div
      className={`space-y-8 transition-opacity duration-200 ${
        isFetching && !isLoading ? "opacity-60" : "opacity-100"
      }`}
    >
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
