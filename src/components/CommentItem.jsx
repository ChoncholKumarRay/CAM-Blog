import { User2 } from "lucide-react";
import { getFontFamily } from "../utils/textUtils";
import { formatCommentDate } from "../utils/dateFormatters";

const CommentItem = ({ comment }) => {
  return (
    <div className="flex items-start space-x-3 border-b border-gray-700 pb-3 last:border-none">
      <div className="flex-shrink-0">
        <User2 className="w-7 h-7 text-blue-500 mt-1" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span
            className="font-semibold text-white text-sm"
            style={{
              fontFamily: getFontFamily(comment.name),
            }}
          >
            {comment.name}
          </span>
          {comment.timestamp && (
            <span className="text-xs text-gray-500">
              {formatCommentDate(comment.timestamp)}
            </span>
          )}
        </div>
        <p
          className="text-gray-300 text-sm leading-snug mt-1"
          style={{
            fontFamily: getFontFamily(comment.text),
          }}
        >
          {comment.text}
        </p>
      </div>
    </div>
  );
};

export default CommentItem;
