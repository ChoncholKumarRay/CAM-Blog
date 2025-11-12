import { useState, useRef, useEffect } from "react";
import { User2 } from "lucide-react";
import { getFontFamily } from "../../utils/textUtils";
import { formatCommentDate } from "../../utils/dateFormatters";

const CommentItem = ({ comment }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  // Check if text overflows
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        // Get line height
        const computedStyle = getComputedStyle(textRef.current);
        const lineHeight = parseFloat(computedStyle.lineHeight);

        // Clamped height for 3 lines
        const clampedHeight = lineHeight * 3;

        // Full content height
        const fullHeight = textRef.current.scrollHeight;

        // Add a small tolerance (1px) for rounding errors
        const isNowOverflowing = fullHeight > clampedHeight + 1;

        setIsOverflowing(isNowOverflowing);
      }
    };

    // Small delay to ensure layout is complete
    const timer = setTimeout(checkOverflow, 0);

    // Check on window resize
    window.addEventListener("resize", checkOverflow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [comment.text]);

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
          ref={textRef}
          className={`text-gray-300 text-sm leading-snug mt-1 transition-all duration-200 whitespace-pre-line ${
            expanded ? "" : "line-clamp-3"
          }`}
          style={{
            fontFamily: getFontFamily(comment.text),
          }}
        >
          {comment.text}
        </p>
        {isOverflowing && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-400 text-xs mt-1 hover:underline focus:outline-none"
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
