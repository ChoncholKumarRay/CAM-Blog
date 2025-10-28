import { Calendar, MessageCircle, Tag } from "lucide-react";
import { formatDate } from "../../utils/dateFormatters";

const BlogMeta = ({ publishedDate, commentsCount, category }) => {
  return (
    <div className="flex items-center text-gray-400 space-x-6">
      <div className="flex items-center space-x-1">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(publishedDate)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <MessageCircle className="w-4 h-4" />
        <span>{commentsCount} Comments</span>
      </div>
      {category && (
        <div className="flex items-center space-x-1">
          <Tag className="w-4 h-4" />
          <span className="uppercase">{category}</span>
        </div>
      )}
    </div>
  );
};

export default BlogMeta;
