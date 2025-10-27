import { useParams } from "react-router-dom";
import { useDetailedBlog } from "../hooks/useDetailedBlog";
import BlogHeader from "../components/BlogHeader";
import BlogMeta from "../components/BlogMeta";
import BlogImage from "../components/BlogImage";
import BlogContent from "../components/BlogContent";
import CommentSection from "../components/CommentSection";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { data: blog, isLoading, isError, error } = useDetailedBlog(id);

  if (isLoading) {
    return (
      <div className="p-8 text-gray-300 text-center text-xl">Loading...</div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="p-8 text-white text-center">
        <h1 className="text-3xl font-bold mb-2">Blog not found</h1>
        <p className="text-gray-400">
          {error?.message || "The requested blog does not exist."}
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative z-10 min-h-screen flex justify-center pt-28 px-4 pb-12"
      style={{
        fontFamily: "'Tiro Bangla', sans-serif",
      }}
    >
      <div className="w-full max-w-4xl bg-gray-800/80 rounded-xl p-8 shadow-lg backdrop-blur-sm text-white space-y-6">
        <BlogHeader title={blog.title} />
        <BlogMeta
          publishedDate={blog.published_date}
          commentsCount={blog.comments_count}
          category={blog.category}
        />
        <BlogImage featuredImage={blog.featured_image} title={blog.title} />
        <BlogContent authors={blog.authors} body={blog.body} />
        <CommentSection blogId={id} />
      </div>
    </div>
  );
};

export default BlogDetailPage;
