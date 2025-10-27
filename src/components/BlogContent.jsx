import { User } from "lucide-react";

const BlogContent = ({ authors, body }) => {
  return (
    <>
      {authors && (
        <div className="flex items-center space-x-2 text-gray-300 mb-4">
          <User className="w-4 h-4" />
          <span>
            By {Array.isArray(authors) ? authors.join(", ") : authors}
          </span>
        </div>
      )}
      <div
        className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </>
  );
};

export default BlogContent;
