import { getFontFamily } from "../utils/textUtils";

const BlogHeader = ({ title }) => {
  return (
    <h1
      className="text-4xl font-bold"
      style={{
        fontFamily: getFontFamily(title),
      }}
    >
      {title}
    </h1>
  );
};

export default BlogHeader;
